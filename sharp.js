const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directories for images
const targetDirs = [
  path.resolve(__dirname, 'src/public/images/heros'),
  path.resolve(__dirname, 'src/public/images/icons')
];

// Destination directory
const destination = path.resolve(__dirname, 'dist/images');

// Create the destination folder if it doesn't exist
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

// Function to process images in a given directory
const processImages = (target) => {
  fs.readdirSync(target).forEach((image) => {
    const imagePath = path.join(target, image);

    // Check if the item is a file (not a folder)
    if (fs.lstatSync(imagePath).isFile()) {
      // Resize to 800px wide with -large.jpg suffix
      sharp(imagePath)
        .resize(800)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`
        ));

      // Resize to 480px wide with -small.jpg suffix
      sharp(imagePath)
        .resize(480)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`
        ));
    }
  });
};

// Loop through each directory and process the images
targetDirs.forEach(processImages);
