import express from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask, completeTask, updatePriority, updateDeadline } from '../controllers/taskController.js';
import upload from '../middleware/upload.js'; // Multer middleware for file uploads

const router = express.Router();
 

// Get all tasks
router.get('/', getTasks);

// Get a single task by ID
router.get('/:id', getTaskById);

// Create a new task
router.post('/', upload.array('files', 5), createTask);

// Update a task by ID
router.put('/:id', upload.array('files', 5), updateTask);

// Delete a task by ID
router.delete('/:id', deleteTask);

// Mark a task as completed
router.post('/:id/complete', completeTask);

// Update task priority
router.post('/:id/priority', updatePriority);

// Update task deadline
router.post('/:id/deadline',updateDeadline);


export default router;
