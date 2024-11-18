const express = require('express');
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all categories for the authenticated user
router.get('/', auth, getCategories);

// Create a new category
router.post('/', auth, createCategory);

// Delete a category by ID
router.delete('/:id', auth, deleteCategory);

module.exports = router;
