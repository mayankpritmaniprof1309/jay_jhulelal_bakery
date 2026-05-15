// storage.services.js
const ImageKit = require('imagekit');

let imagekitInstance = null;

function getImageKit() {
  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey:   process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey:  process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imagekitInstance;
}

async function uploadImage(file, fileName) {
  const imagekit = getImageKit();
  const result = await imagekit.upload({
    file:     file,
    fileName: fileName,
    folder:   "/bakery-products",
  });
  return result;
}

module.exports = { uploadImage };