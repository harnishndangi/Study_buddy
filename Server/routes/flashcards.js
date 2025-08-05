import express from 'express';
import { getDecks, getDeckById, createDeck, addCard, reviewCard, deleteCard, deleteDeck } from '../controllers/flashcardController.js';

const router = express.Router();

// Get all decks
router.get('/', getDecks);

// Get a single deck by ID
router.get('/:id', getDeckById);

// Create a new deck
router.post('/', createDeck);

// Add a card to a deck
router.post('/:id/cards', addCard);

// Review a card (spaced repetition)
router.post('/:deckId/cards/:cardId/review', reviewCard);

// Delete a card from a deck
router.delete('/:deckId/cards/:cardId', deleteCard);

// Delete a deck
router.delete('/:id', deleteDeck);

export default router;
