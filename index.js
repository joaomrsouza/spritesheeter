const fs = require("fs");
const Jimp = require("jimp");

// Function to read all images from a folder
async function readImagesFromFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const images = files.filter(
        (file) =>
          file.endsWith(".png") ||
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg")
      );
      resolve(images);
    });
  });
}

// Function to combine images into a single image
async function createCollage(images, outputFileName) {
  if (images.length === 0) {
    console.log("No images found in the folder.");
    return;
  }

  const firstImage = await Jimp.read(images[0]);
  const imageSize = {
    width: firstImage.bitmap.width,
    height: firstImage.bitmap.height,
  };

  const collageWidth = Math.ceil(Math.sqrt(images.length)) * imageSize.width;
  const collageHeight =
    Math.ceil(images.length / Math.ceil(Math.sqrt(images.length))) *
    imageSize.height;

  const collage = new Jimp(collageWidth, collageHeight);

  let x = 0,
    y = 0;
  for (let i = 0; i < images.length; i++) {
    const image = await Jimp.read(images[i]);
    collage.blit(image, x, y);
    x += imageSize.width;
    if (x >= collageWidth) {
      x = 0;
      y += imageSize.height;
    }
  }

  collage.write(outputFileName, (err) => {
    if (err) {
      console.error("Error writing output file:", err);
      return;
    }
    console.log("Collage created successfully:", outputFileName);
  });
}

// create function to erase all files in the folder
async function eraseFilesInFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      files.forEach((file) => {
        fs.unlink(`${folderPath}/${file}`, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });
      });

      resolve();
    });
  });
}

async function main() {
  const folderPath = "./input";

  try {
    const images = await readImagesFromFolder(folderPath);
    const name = images[0].split("_")[0];

    await createCollage(
      images.map((image) => `${folderPath}/${image}`),
      `${name}_spritesheet.png`
    );

    await eraseFilesInFolder(folderPath);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
