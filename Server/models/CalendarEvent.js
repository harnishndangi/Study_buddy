import mongoose from "mongoose";

const CalendarEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    eventType: { type: String }, // e.g., exam, session, etc.
    notifications: [
      {
        time: Date, // when to notify
        method: {
          type: String,
          enum: ["email", "popup", "sms"],
          default: "popup",
        },
      },
    ],
    color: { type: String },
  },
  { timestamps: true }
);

export const CalendarEvent = mongoose.model(
  "CalendarEvent",
  CalendarEventSchema
);
