import express from 'express';
import { createEvent, deleteEvent, getEventById, getEvents, syncWithGoogle, updateEvent } from '../controllers/calendarController';

 
const router = express.Router();

// Get all calendar events
router.get('/', getEvents);

// Get a single event by ID
router.get('/:id',getEventById);

// Create a new event
router.post('/',createEvent);

// Update an event by ID
router.put('/:id', updateEvent);

// Delete an event by ID
router.delete('/:id', deleteEvent);

// Sync with Google Calendar
router.post('/sync/google', syncWithGoogle);

export default router;
