// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensure uniqueness per user later
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Link to the user
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
