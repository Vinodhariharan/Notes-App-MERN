import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Textarea, Box, Typography, Card, Snackbar, Modal } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create a note.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/notes',
        {
          title,
          content,
          category,
        },
        {
          headers: { 'x-auth-token': token },
        }
      );

      if (res.data.message) {
        setSnackbarMessage(res.data.message);
        setSnackbarOpen(true);
      }

      // Redirect to /notes after a successful submission
      navigate(0);

      // Reset the form
      setTitle('');
      setContent('');
      setCategory('');
      setError(null);
      handleCloseModal(); // Close the modal after successful submission
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('No response from the server.');
      } else {
        setError('Error setting up the request.');
      }
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Button variant="solid" onClick={handleOpenModal}>
        Create Note
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: 2,
          }}
        >
          <Card variant="outlined" sx={{ padding: 4, maxWidth: 500 }}>
            <Typography level="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Create a New Note
            </Typography>
            <form onSubmit={handleSubmit}>
              <Input
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                sx={{ marginBottom: 2 }}
              />
              <Textarea
                fullWidth
                minRows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
                sx={{ marginBottom: 2 }}
              />
              <Input
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category Name"
                sx={{ marginBottom: 2 }}
              />
              <Button type="submit" fullWidth variant="solid" sx={{ marginBottom: 2 }}>
                Create Note
              </Button>
              <Button fullWidth variant="plain" onClick={handleCloseModal}>
                Cancel
              </Button>
            </form>
            {error && (
              <Typography color="danger" sx={{ marginTop: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              message={snackbarMessage}
            />
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNote;
