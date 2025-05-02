import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Select, Option, Box, Typography, Grid, Button, Modal, ModalDialog, Stack, Snackbar, Alert } from '@mui/joy';
import CreateNote from './CreateNote';
import CreateCategory from './CreateCategory';
import NoteCard from './NoteCard';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [updatedNote, setUpdatedNote] = useState({ title: '', content: '', category: '' });
  
  // Snackbar State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch notes and categories from the API
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      const notesRes = await axios.get('http://localhost:5000/api/notes', {
        headers: { 'x-auth-token': token },
      });
      setNotes(notesRes.data);
    };

    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      const categoriesRes = await axios.get('http://localhost:5000/api/categories', {
        headers: { 'x-auth-token': token },
      });
      setCategories(categoriesRes.data);
    };

    fetchNotes();
    fetchCategories();
  }, []);

  // Handle note deletion
  const handleDelete = async (noteId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: { 'x-auth-token': token },
      });
      setNotes(notes.filter(note => note._id !== noteId));
      setSnackbarMessage('Note deleted successfully!');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
  };

  // Open dialog for editing a note
  const handleEdit = (note) => {
    setEditingNote(note);
    setUpdatedNote({
      title: note.title,
      content: note.content,
      category: note.category ? note.category._id : '',
    });
    setOpenDialog(true);
  };

  // Handle note update
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/notes/${editingNote._id}`, updatedNote, {
      headers: { 'x-auth-token': token },
    });
    setNotes(notes.map(note => (note._id === editingNote._id ? { ...note, ...updatedNote } : note)));
    setOpenDialog(false);
    setSnackbarMessage('Note updated successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography level="h4" sx={{ marginBottom: 2 }}>
        My Notes
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Input
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Select
            placeholder="Select Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ minWidth: '150px' }}
          >
            <Option value="">All Categories</Option>
            {categories.map(category => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>

          <CreateNote />
          <CreateCategory />
        </Box>
      </Box>

      <Grid container spacing={2}>
        {notes.filter(note => {
          const matchesCategory = selectedCategory ? note.category._id === selectedCategory : true;
          const matchesSearchTerm = note.title.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesCategory && matchesSearchTerm;
        }).map(note => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <NoteCard
              note={note}
              onEdit={() => handleEdit(note)}
              onDelete={() => handleDelete(note._id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {/* <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}> */}
          {snackbarMessage}
        {/* </Alert> */}
      </Snackbar>

      {/* Dialog for editing a note */}
      <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
        <ModalDialog>
          <Typography level="h5">Edit Note</Typography>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <Input
              placeholder="Title"
              value={updatedNote.title}
              onChange={(e) => setUpdatedNote({ ...updatedNote, title: e.target.value })}
            />
            <Input
              placeholder="Content"
              value={updatedNote.content}
              onChange={(e) => setUpdatedNote({ ...updatedNote, content: e.target.value })}
              multiline
              minRows={3}
            />
            <Select
              placeholder="Select Category"
              value={updatedNote.category}
              onChange={(e) => setUpdatedNote({ ...updatedNote, category: e.target.value })}
            >
              {categories.map(category => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Button onClick={handleUpdate} variant="solid" color="primary">
              Save
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Notes;
