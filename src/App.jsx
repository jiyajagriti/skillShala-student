import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginSignup from './components/LoginSignup';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </div>
  );
};

export default App;
