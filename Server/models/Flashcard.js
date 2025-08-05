import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
    box: { type: Number, default: 1 }, // For spaced repetition (Leitner system)
    progress: { type: Number, default: 0 },
  },
  { _id: false }
);

const FlashcardSchema = new mongoose.Schema(
  {
    deck: { type: String, required: true },
    cards: [CardSchema],
  },
  { timestamps: true }
);

export const Flashcard= mongoose.model("Flashcard", FlashcardSchema);
