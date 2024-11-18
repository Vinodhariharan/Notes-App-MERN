// controllers/categoryController.js
const Category = require('../models/Category');

// Get categories for the authenticated user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id }); // Fetch categories for the logged-in user
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new category for the authenticated user
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  // Check if the category already exists for the user
  const existingCategory = await Category.findOne({ name, userId: req.user.id });
  if (existingCategory) {
    return res.status(400).json({ message: 'Category already exists' });
  }

  const category = new Category({
    name,
    userId: req.user.id, // Associate the category with the authenticated user
  });

  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a category for the authenticated user
exports.deleteCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id, userId: req.user.id });
  if (!category) return res.status(404).json({ message: 'Category not found' });

  try {
    await category.remove();
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
