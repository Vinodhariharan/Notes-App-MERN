const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Sign up user
exports.signup = async (req, res) => {
  const { firstName, lastName, username, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ firstName, lastName, username, email, password, phone }); // Add all fields here
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Error during signup' });
  }
};


// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ error: 'Error during login' });
  }
};

// Get user details
exports.getAccount = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const { firstName, lastName, username, email, phone } = req.body;
  const userId = req.user.id;

  try {
    const existingUser = await User.findOne({ email, _id: { $ne: userId } }); // Exclude updating self with duplicate email
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const updatedFields = { firstName, lastName, username, email, phone }; // Update only provided fields
    const allowedUpdates = Object.keys(updatedFields); // Ensure only allowed fields are updated
    const isValidOperation = allowedUpdates.every(field => User.schema.paths[field]); // Validate field existence

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }

    const user = await User.findOneAndUpdate({ _id: userId }, updatedFields, { new: true }); // Return updated user

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error during user update' });
  }
};