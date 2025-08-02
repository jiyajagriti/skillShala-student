import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer, folder) => {
  try {
    // Convert buffer to base64
    const base64String = fileBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64String}`;
    
    const result = await cloudinary.v2.uploader.upload(dataURI, { 
      folder,
      resource_type: 'image'
    });
    
    return result;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};
