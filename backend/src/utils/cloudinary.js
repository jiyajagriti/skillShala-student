import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localPath, folder) => {
  try {
    const result = await cloudinary.v2.uploader.upload(localPath, { folder });
    fs.unlinkSync(localPath); // delete local file after upload
    return result;
  } catch (err) {
    throw err;
  }
};
