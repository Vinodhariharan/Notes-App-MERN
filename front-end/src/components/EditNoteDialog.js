// EditNoteDialog.js
import React, { useState, useEffect } from 'react';
import { Modal, ModalDialog, Input, Button, Typography, Stack, Option, Select } from '@mui/joy';
import axios from 'axios';

const EditNoteDialog = ({ open, onClose, note, onNoteUpdate }) => {
  const [updatedNote, setUpdatedNote] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (note) {
      setUpdatedNote({
        title: note.title,
        content: note.content,
        category: note.category ? note.category._id : '',
      });
    }
  }, [note]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      const categoriesRes = await axios.get('http://localhost:5000/api/categories', {
        headers: { 'x-auth-token': token },
      });
      setCategories(categoriesRes.data);
    };

    fetchCategories();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/notes/${note._id}`, updatedNote, {
      headers: { 'x-auth-token': token },
    });
    onNoteUpdate({ ...note, ...updatedNote }); // Update the note in the parent component
    onClose(); // Close the dialog
  };

  return (
    <Modal open={open} onClose={onClose}>
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
  );
};

export default EditNoteDialog;
