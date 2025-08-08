import express from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote, highlightNote, attachFile } from '../controllers/noteController.js';
import upload from '../middleware/upload.js'; // Multer middleware for file uploads

const router = express.Router();

// Get all notes or search (query param: ?search=term)
router.get('/', getNotes);

// Get a single note by ID
router.get('/:id', getNoteById);

// Create a new note
router.post('/', createNote);

// Update a note by ID
router.put('/:id', updateNote);

// Delete a note by ID
router.delete('/:id', deleteNote);

// Highlight text in a note (body: { highlight })
router.post('/:id/highlight', highlightNote);

// Attach a file to a note (multipart/form-data, file field: 'file')
router.post('/:id/attach', upload.single('file'), attachFile);
  
export default router;
