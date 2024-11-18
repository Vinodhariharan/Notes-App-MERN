const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all notes for the authenticated user
router.get('/', auth, getNotes);

// Create a new note
router.post('/', auth, createNote);

// Update a note by ID
router.put('/:id', auth, updateNote);

// Delete a note by ID
router.delete('/:id', auth, deleteNote);

module.exports = router;
