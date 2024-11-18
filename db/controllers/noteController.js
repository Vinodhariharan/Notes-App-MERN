// controllers/noteController.js
const Note = require('../models/Note');
const Category = require('../models/Category');
const mongoose = require('mongoose'); // Import mongoose


// Create a new note
exports.createNote = async (req, res) => {
  const { title, content, category: categoryName } = req.body;

  try {
    // Check if the category exists by name and userId
    let existingCategory = await Category.findOne({ name: categoryName, userId: req.user.id });

    // If not found, create a new category
    if (!existingCategory) {
      existingCategory = new Category({ name: categoryName, userId: req.user.id }); // Include userId
      await existingCategory.save();
      console.log('New category created:', existingCategory);
    }

    // Create the note with the existing or newly created category
    const note = new Note({
      title,
      content,
      category: existingCategory._id, // Use the ID of the found or created category
      userId: req.user.id,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get notes for the authenticated user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).populate('category');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  note.title = title || note.title;
  note.content = content || note.content;
  note.category = category || note.category;

  await note.save();
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedNote = await Note.deleteOne({ _id: id });

    // Check if any document was deleted (returns { deletedCount: 0 } if not)
    if (deletedNote.deletedCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};