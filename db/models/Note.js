const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
