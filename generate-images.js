const OpenAI = require('openai');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const imagePrompts = [
  "A serene mountain landscape at sunset with vibrant orange and pink clouds reflecting on a calm lake",
  "A futuristic city skyline with flying cars and neon lights against a starry night sky",
  "A cozy coffee shop interior with warm lighting, books on shelves, and steam rising from a cup"
];

async function generateImages() {
  console.log('Starting image generation...');
  
  // Create directories
  await fs.ensureDir('./docs/images');
  await fs.ensureDir('./generated-images');
  
  const generatedImages = [];
  
  for (let i = 0; i < imagePrompts.length; i++) {
    try {
      console.log(`Generating image ${i + 1}/3: ${imagePrompts[i]}`);
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: imagePrompts[i],
        size: "1024x1024",
        quality: "standard",
        n: 1,
      });
      
      const imageUrl = response.data[0].url;
      
      // Download the image
      const imageResponse = await fetch(imageUrl);
      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Save to both directories
      const filename = `image-${i + 1}.png`;
      await fs.writeFile(`./generated-images/${filename}`, buffer);
      await fs.writeFile(`./docs/images/${filename}`, buffer);
      
      generatedImages.push({
        filename,
        prompt: imagePrompts[i],
        url: `./images/${filename}`
      });
      
      console.log(`✓ Image ${i + 1} generated and saved`);
      
    } catch (error) {
      console.error(`Error generating image ${i + 1}:`, error.message);
    }
  }
  
  // Randomly select one image to be featured
  const selectedImage = generatedImages[Math.floor(Math.random() * generatedImages.length)];
  
  // Create a metadata file for the website
  const metadata = {
    selectedImage,
    allImages: generatedImages,
    generatedAt: new Date().toISOString()
  };
  
  await fs.writeFile('./docs/images-metadata.json', JSON.stringify(metadata, null, 2));
  
  console.log('✓ All images generated successfully!');
  console.log(`✓ Selected image for display: ${selectedImage.filename}`);
  
  return metadata;
}

// Run if called directly
if (require.main === module) {
  generateImages().catch(console.error);
}

module.exports = generateImages;
