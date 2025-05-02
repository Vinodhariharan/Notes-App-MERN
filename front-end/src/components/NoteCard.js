// NoteCard.js
import React from 'react';
import { Card, Typography, Button } from '@mui/joy';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ padding: 2 }}>
      <Typography level="h6">{note.title}</Typography>
      <Typography>{note.content}</Typography>
      <Typography variant="body2" color="text.secondary">
        Category: {note.category ? note.category.name : 'No Category'}
      </Typography>
      <Button variant="soft" color="primary" onClick={onEdit} sx={{ marginTop: 2 }}>
        Edit
      </Button>
      <Button variant="soft" color="danger" onClick={onDelete} sx={{ marginTop: 2 }}>
        Delete
      </Button>
    </Card>
  );
};

export default NoteCard;
