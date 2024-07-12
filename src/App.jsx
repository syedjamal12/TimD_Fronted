import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
