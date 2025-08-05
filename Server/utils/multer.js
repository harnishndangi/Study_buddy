// Multer configuration for handling file uploads
// This file sets up Multer middleware for processing multipart/form-data (file uploads)

import multer from 'multer';


// Use memory storage so files can be uploaded directly to Cloudinary without saving to disk
const storage = multer.memoryStorage();

// Optional: File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  // Accept all files, or restrict by mimetype if needed
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export default upload;

/*
How to use:
import upload from '../utils/multer.js';
app.post('/route', upload.single('fileFieldName'), controllerFunction);
*/
