import express from 'express';
import { uploadFile } from '../controllers/fileController';


const router = express.Router();

// Upload a file to Cloudinary
router.post('/upload', uploadFile);

export default router;
