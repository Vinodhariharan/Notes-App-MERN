// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Check if the token is expired
//   const isTokenExpired = (token) => {
//     if (!token) return true; // If there's no token, consider it expired
//     const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
//     const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
//     return Date.now() > expirationTime; // Check if current time is past expiration
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });
//       const token = res.data.token;

//       // Store the token in localStorage
//       localStorage.setItem('token', token);

//       // Check if the token is expired
//       if (!isTokenExpired(token)) {
//         setIsLoggedIn(true); // Update login status
//         console.log("Done");
//       } else {
//         console.error('Token is expired');
//       }
//     } catch (err) {
//       console.error(err.response.data);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token from localStorage
//     setIsLoggedIn(false); // Update login status
//   };

//   // Check login status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && !isTokenExpired(token)) {
//       setIsLoggedIn(true); // Set the login status if the token is valid
//     }
//   }, [setIsLoggedIn]);

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//       <button onClick={handleLogout}>Log Out</button>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, Typography, Box } from '@mui/joy';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // For redirection to the note creation page

  // Check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    return Date.now() > expirationTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const token = res.data.token;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Check if the token is expired
      if (!isTokenExpired(token)) {
        setIsLoggedIn(true);
        navigate('/notes'); // Redirect to note creation page
      } else {
        console.error('Token is expired');
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const navigateSignup = () => {
    // localStorage.removeItem('token'); // Remove the token from localStorage
    // setIsLoggedIn(false); // Update login status
    navigate('/signup')
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true); // Set the login status if the token is valid
    }
  }, [setIsLoggedIn]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card variant="outlined" sx={{ padding: 4, maxWidth: 400 }}>
        <Typography level="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Input
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            sx={{ marginBottom: 2 }}
          />
          <Input
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" fullWidth variant="solid" sx={{ marginBottom: 2 }}>
            Log In
          </Button>
        </form>
        <Button fullWidth variant="outlined" onClick={navigateSignup}>
          Sign Up
        </Button>
      </Card>
    </Box>
  );
};

export default Login;
