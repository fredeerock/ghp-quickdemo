# AI Generated Images Gallery

A simple website that generates AI images using OpenAI's DALL-E API and displays them on a GitHub Pages site.

## Features

- Generates 3 AI images using OpenAI's DALL-E API
- Randomly selects one image to feature on the website
- Displays all generated images in a gallery
- Modern, responsive design
- Automatically deployed to GitHub Pages

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ghp-quickdemo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up OpenAI API key**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Copy `.env` and add your API key:
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```

4. **Generate images**
   ```bash
   npm run generate-images
   ```

5. **Deploy to GitHub Pages**
   - Push your changes to GitHub
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/docs" folder
   - Save and wait for deployment

## How it works

1. **Image Generation**: The `generate-images.js` script uses OpenAI's DALL-E API to create 3 images based on predefined prompts
2. **Random Selection**: One image is randomly selected to be featured on the homepage
3. **Website Generation**: Images and metadata are saved to the `docs/` folder for GitHub Pages
4. **Static Website**: The website is a simple HTML/CSS/JS site that loads the generated images

## File Structure

```
ghp-quickdemo/
├── docs/                    # GitHub Pages source
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   ├── script.js           # JavaScript functionality
│   ├── images/             # Generated images
│   └── images-metadata.json # Image metadata
├── generate-images.js      # Image generation script
├── package.json           # Node.js dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

## Customization

### Change Image Prompts
Edit the `imagePrompts` array in `generate-images.js`:

```javascript
const imagePrompts = [
  "Your custom prompt 1",
  "Your custom prompt 2", 
  "Your custom prompt 3"
];
```

### Modify Styling
Edit `docs/styles.css` to change the website appearance.

### Update Content
Modify `docs/index.html` to change the website content and structure.

## Requirements

- Node.js 16+
- OpenAI API key with DALL-E access
- GitHub repository for Pages deployment

## Notes

- Images are generated in 1024x1024 resolution
- The free OpenAI tier has usage limits
- GitHub Pages has a 1GB repository size limit
- Images are committed to the repository for GitHub Pages hosting

## License

MIT
