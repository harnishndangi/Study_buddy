import mongoose from "mongoose";

const PomodoroSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associates the session with a user
    studyPeriod: { type: Number, required: true }, // Duration of focus/study session in minutes
    shortBreak: { type: Number, default: 5 },      // Duration of short break in minutes
    longBreak: { type: Number, default: 15 },      // Duration of long break in minutes
    completedRounds: { type: Number, default: 0 },
    startTime: { type: Date },
    endTime: { type: Date },
    purpose: { type: String },
    tag: { type: String },
  },
  { timestamps: true }
);

export const PomodoroSession = mongoose.model("PomodoroSession", PomodoroSessionSchema);
