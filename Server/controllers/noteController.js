// Note Controller: Handles CRUD and utility logic for notes
// Includes: create, read, update, delete, search, highlight, file attach

import { Note}  from "../models/Note.js";
import uploadToCloudinary  from "../utils/uploadtocloudinary.js";

/**
 * Create a new note
 */
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = new Note({ title, content, tags });
    await note.save();
    console.log("Note created:", note);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

/**
 * Get all notes or search notes
 */
/**
 * Get all notes or search notes by title/content/tags
 * Query params: ?search=term
 */
export const getNotes = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      // Search in title, content, or tags
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
        ],
      };
    }
    const notes = await Note.find(query).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

/**
 * Get a single note by ID
 */
/**
 * Get a single note by ID
 * Route param: /:id
 */
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

/**
 * Update a note by ID
 */
/**
 * Update a note by ID
 * Route param: /:id
 * Body: { title, content, tags }
 */
export const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );
    if(note){
      console.log("Note updated:", note);
      return res.json({ message: "Note updated successfully", note });
    } else {
      console.log("Note not found for update");
    }
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Failed to update note" });
  }
};

/**
 * Delete a note by ID
 */
/**
 * Delete a note by ID
 * Route param: /:id
 */
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note){
      console.log("Note not found");
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Failed to delete note" });
    
  }
};

/**
 * Highlight text in a note
 */
/**
 * Highlight text in a note
 * Body: { highlight } (string to highlight)
 */
export const highlightNote = async (req, res) => {
  try {
    const { highlight } = req.body;
    if (!highlight) return res.status(400).json({ error: "Highlight text required" });
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { highlights: highlight } },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to highlight note" });
  }
};

// Attach a file to a note: receives file from Multer, uploads to Cloudinary, and saves the file info to the note
export const attachFile = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const { buffer, originalname, mimetype, size } = req.file;

    // Upload the file buffer to Cloudinary
    const result = await uploadToCloudinary(buffer, `notes_attachments/${originalname}`, mimetype);
    if (!result || !result.secure_url) {
      return res.status(500).json({ error: "Cloudinary upload failed" });
    }

    // Prepare file data to store in the note
    const fileData = {
      filename: originalname,
      url: result.secure_url,
      mimetype,
      size,
    };

    // Add the file data to the note's attachments array
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $push: { attachments: fileData } },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to attach file" });
  }
};
