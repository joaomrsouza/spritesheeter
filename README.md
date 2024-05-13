# Spritesheeter

Spritesheeter is a simple tool to generate sprite sheets from a folder of images.

## Installation

Clone the repository and install the dependencies with npm.

```bash
npm i
```

## Usage

Create a folder named "input" and place the images you want to include in the sprite sheet inside it.

The script will use the first image name and size for the rest of the sprites.

Make sure the images are named in order, and named like this: `mysprite_0.png`, `mysprite_1.png`, `mysprite_2.png`, etc.

The output will be saved as "mysprite_spritesheet.png" in the root folder.

```bash
node index.js
```

Or simply double click the `run.sh` file.

Keep in mind that after the sprite sheet is generated, the input folder contents will be deleted. So you can just throw more images in the input folder and run the script again.
