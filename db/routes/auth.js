const express = require('express');
const { signup, login, getAccount, updateUser } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/account', auth, getAccount);
router.put('/account', auth, updateUser); // Protected route for updating user

module.exports = router;
