document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load the metadata
        const response = await fetch('./images-metadata.json');
        
        if (!response.ok) {
            throw new Error('Could not load images metadata');
        }
        
        const metadata = await response.json();
        
        // Display featured image
        displayFeaturedImage(metadata.selectedImage);
        
        // Display gallery
        displayGallery(metadata.allImages);
        
        // Display generation time
        displayGenerationTime(metadata.generatedAt);
        
    } catch (error) {
        console.error('Error loading images:', error);
        displayError('Failed to load images. Please make sure the images have been generated.');
    }
});

function displayFeaturedImage(selectedImage) {
    const featuredImg = document.getElementById('featured-image');
    const featuredDesc = document.getElementById('featured-description');
    
    if (selectedImage) {
        featuredImg.src = selectedImage.url;
        featuredImg.alt = selectedImage.prompt;
        featuredDesc.textContent = selectedImage.prompt;
    } else {
        displayError('No featured image available');
    }
}

function displayGallery(images) {
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!images || images.length === 0) {
        galleryGrid.innerHTML = '<p class="loading">No images available</p>';
        return;
    }
    
    galleryGrid.innerHTML = images.map((image, index) => `
        <div class="gallery-item">
            <img src="${image.url}" alt="${image.prompt}" loading="lazy">
            <div class="gallery-item-content">
                <h3>Image ${index + 1}</h3>
                <p>${image.prompt}</p>
            </div>
        </div>
    `).join('');
}

function displayGenerationTime(generatedAt) {
    const timeElement = document.getElementById('generation-time');
    
    if (generatedAt) {
        const date = new Date(generatedAt);
        timeElement.textContent = `Generated on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }
}

function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const main = document.querySelector('main');
    main.insertBefore(errorDiv, main.firstChild);
}
