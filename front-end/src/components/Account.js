import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from '@mui/joy';

const Accounts = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/auth/account', {
          headers: { 'x-auth-token': token },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user data', error);
        setSnackbarMessage('Failed to fetch user data.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5000/api/auth/account', user, {
        headers: { 'x-auth-token': token },
      });
      setSnackbarMessage('User data updated successfully.');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error updating user data', error);
      setSnackbarMessage('Failed to update user data.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flex: 1, width: '100%', p: 4 }}>
      <Typography level="h2" component="h1" sx={{ mb: 2 }}>
        Account Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={user.username}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        {isEditing ? (
          <>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="solid" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Stack>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Accounts;
