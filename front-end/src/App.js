// App.js
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Account from './components/Account';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import CreateCategory from './components/CreateCategory';
import SideNavBar from './components/SideNavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    // Add logout logic here (clear tokens, etc.)
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Show the Sidebar only if logged in */}
      {isLoggedIn && (
        <SideNavBar
          onLogout={handleLogout}
          style={{
            width: '240px',
            height: '100vh',
            position: 'fixed',
            overflowY: 'auto',
          }}
        />
      )}

      <div
        style={{
          flexGrow: 1,
            padding: 16,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={!(isLoggedIn) ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/notes" />} />
          <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/" /> } />
          <Route path="/notes" element={isLoggedIn ? <Notes /> : <Navigate to="/" />} />
          <Route path="/create-category" element={isLoggedIn ? <CreateCategory /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
