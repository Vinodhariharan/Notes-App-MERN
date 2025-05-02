import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalDialog, Input, Typography, Stack } from '@mui/joy';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false); // State to control modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/categories', { name }, {
        headers: { 'x-auth-token': token },
      });
      console.log(res.data);
      setName(''); // Clear the form field
      setOpen(false); // Close the modal after successful submission
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <>
      <Button variant="solid" color="primary" onClick={() => setOpen(true)}>
        Create Category
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Typography level="h5" sx={{ marginBottom: 2 }}>
            Create New Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                required
              />
              <Button type="submit" variant="solid" color="primary">
                Create Category
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default CreateCategory;
