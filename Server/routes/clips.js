import express from 'express';
import { getClips, getClipById, saveClip, organizeClips, searchClips } from '../controllers/clipController';
const router = express.Router();

// Get all clips
router.get('/', getClips);

// Get a single clip by ID
router.get('/:id', getClipById);

// Save a new clip
router.post('/', saveClip);

// Organize clips by topic/category
router.post('/organize', organizeClips);
export default router;
// Search clips
router.get('/search', searchClips);
 
module.exports = router;
