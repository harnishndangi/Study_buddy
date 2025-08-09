import express from 'express';
import { startSession, logSession, getSessions, getStats } from '../controllers/pomodoroController.js';
const router = express.Router();
 

// Start a new Pomodoro session
router.post('/start/:userId', startSession);

// Log a completed Pomodoro session
router.post('/log/:userId', logSession);

// Get all Pomodoro sessions
router.get('/', getSessions);

// Get Pomodoro session stats
router.get('/stats/:userId', getStats);

export default router;
