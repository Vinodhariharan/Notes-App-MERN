import React, { useState } from 'react';
import { List, ListItem, IconButton, Typography, Box, Switch } from '@mui/joy';
import { Logout, Home, Settings, AccountCircle, StickyNote2Rounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const SideNavBar = ({ onLogout }) => {

  return (
    <Box
      sx={{
        width: 340,
        height: '100vh',
        backgroundColor: '#1e3a5f', // Dark bluish background
        color: '#ffffff', // White text color
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        paddingTop: 3,
        paddingX: 2,
        paddingBottom: 8
      }}
    >
      {/* Header section */}
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
  <StickyNote2Rounded sx={{ fontSize: 40, marginRight: 1 }} /> {/* Adjust icon size and spacing */}
  <Typography level="h3" sx={{ fontWeight: 'bold', color:'#ffffff' }}>
    Notes App
  </Typography>
</Box>

      {/* User Information */}
      {/* <Box sx={{ paddingY: 2 }}>
        <Typography level="body1" sx={{ fontWeight: 'medium' }}>
          {username}
        </Typography>
        <Typography level="body2" color="rgba(255, 255, 255, 0.7)">
          {email}
        </Typography>
      </Box> */}

      {/* Navigation Links */}
      <List sx={{ paddingTop: 2 }}>
        <ListItem button component={Link} to="/notes" sx={{ paddingY: 1 }}>
          <IconButton sx={{ color: '#ffffff', marginRight: 1 }}>
            <Home />
          </IconButton>
          <Typography sx={{ color: '#ffffff', marginRight: 1 }}>Home</Typography>
        </ListItem>
        <ListItem button component={Link} to="/account" sx={{ paddingY: 1 }}>
          <IconButton sx={{ color: '#ffffff', marginRight: 1 }}>
            <AccountCircle />
          </IconButton>
          <Typography sx={{ color: '#ffffff', marginRight: 1 }}>Profile</Typography>
        </ListItem>
        {/* <ListItem button sx={{ paddingY: 1 }}>
          <IconButton sx={{ color: '#ffffff', marginRight: 1 }}>
            <Settings />
          </IconButton>
          <Typography sx={{ color: '#ffffff', marginRight: 1 }}>Settings</Typography>
        </ListItem> */}
      </List>

      {/* Logout Section */}
      <Box sx={{ marginTop: 'auto', paddingBottom: 2 }}>
        <ListItem button onClick={onLogout} sx={{ paddingY: 1 }}>
          <IconButton sx={{ color: '#ffffff', marginRight: 1 }}>
            <Logout />
          </IconButton>
          <Typography sx={{ color: '#ffffff', marginRight: 1 }}>Logout</Typography>
        </ListItem>
      </Box>
    </Box>
  );
};

export default SideNavBar;
