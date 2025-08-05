import mongoose from "mongoose";

const PomodoroSessionSchema = new mongoose.Schema(
  {
    sessionDuration: { type: Number, required: true }, // in minutes
    completedRounds: { type: Number, default: 0 },
    startTime: { type: Date },
    endTime: { type: Date },
    purpose: { type: String },
    tag: { type: String },
  },
  { timestamps: true }
);

export const PomodoroSession= mongoose.model("PomodoroSession", PomodoroSessionSchema);
