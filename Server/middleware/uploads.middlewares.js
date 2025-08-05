// File Controller: Handles media/file uploads to Cloudinary


import { Note } from "../models/Note.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Upload a file to Cloudinary
 */
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const cloudinaryResponse = await cloudinary.uploader.upload(file.buffer, {
      folder: 'notes',
      public_id: file.originalname,
      overwrite: true,
    });
    res.status(200).json({
      success: true,
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
 