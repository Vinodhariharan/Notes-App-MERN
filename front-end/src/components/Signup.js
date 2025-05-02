import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Button, Box, Typography } from '@mui/material';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();  // For navigation after successful signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Optional: Validate that passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        firstName,
        lastName,
        username,
        email,
        password,
        phone,
      });
      console.log(res.data);
      // Navigate to login page on success
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Signup;
