// Pomodoro Controller: Handles Pomodoro session logic and analytics

import { PomodoroSession} from "../models/PomodoroSession.js";
import User from "../models/User.js";

/**
 * Start a new Pomodoro session
 */
export const startSession = async (req, res) => {
  try {
    const {
      studyPeriod,
      shortBreak = 5,
      longBreak = 15,
      completedRounds = 0,
      startTime = new Date(),
      endTime,
      purpose,
      tag
    } = req.body;

    const userId = req.params.userId;
    if (!userId || !studyPeriod) {
      return res.status(400).json({ error: "userId (from route) and studyPeriod are required." });
    }

    const session = new PomodoroSession({
      userId,
      studyPeriod,
      shortBreak,
      longBreak,
      completedRounds,
      startTime,
      endTime,
      purpose,
      tag
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Log a completed Pomodoro session
 */


export const logSession = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId (from route) is required." });
    }
    const session = new PomodoroSession({ ...req.body, userId });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all Pomodoro sessions
 */
export const getSessions = async (req, res) => {
  try {
    const filter = req.query.userId ? { userId: req.query.userId } : {};
    const sessions = await PomodoroSession.find(filter).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Pomodoro session stats for analytics
 */
export const getStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId (from route) is required." });
    }
    const stats = await PomodoroSession.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalStudyMinutes: { $sum: "$studyPeriod" },
          totalCompletedRounds: { $sum: "$completedRounds" },
        },
      },
    ]);
    res.json(stats[0] || { totalSessions: 0, totalStudyMinutes: 0, totalCompletedRounds: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
