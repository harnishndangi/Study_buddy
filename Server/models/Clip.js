import mongoose from "mongoose";

const ClipSchema = new mongoose.Schema({
  text: { type: String, required: true }, // text highlight
  source: { type: String }, // web URL or document reference
  topic: { type: String }, // topic or category
  category: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Clip = mongoose.model("Clip", ClipSchema);
