import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const Cloudinary_File_Upload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;


    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

const deleteOnCloudinary = async (public_id, resource_type = "image") => {
  try {
    if (!public_id) return false;

    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: `${resource_type}`
    });
    if (response && response.result === 'ok') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(" Delete on Cloudinary failed entirely:", error);
    return false;
  }
};



export { Cloudinary_File_Upload, deleteOnCloudinary };
