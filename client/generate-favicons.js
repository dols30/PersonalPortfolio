import favicons from 'favicons';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source SVG file path
const source = path.resolve(__dirname, 'public/favicon.svg');
// Output directory
const outputDir = path.resolve(__dirname, 'public');

// Configuration for favicon generation
const configuration = {
  path: '/',
  appName: 'Dol Raj Bashyal - Portfolio',
  appShortName: 'DB Portfolio',
  appDescription: 'Portfolio website of Dol Raj Bashyal',
  background: '#ffffff',
  theme_color: '#2563eb',
  lang: 'en-US',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  },
};

// Run the favicon generation
(async () => {
  try {
    const response = await favicons(source, configuration);
    
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save the generated files
    response.images.forEach(image => {
      fs.writeFileSync(
        path.join(outputDir, image.name),
        image.contents
      );
      console.log(`Generated: ${image.name}`);
    });
    
    response.files.forEach(file => {
      fs.writeFileSync(
        path.join(outputDir, file.name),
        file.contents
      );
      console.log(`Generated: ${file.name}`);
    });
    
    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
})(); 