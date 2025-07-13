import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginSignup from './components/LoginSignup';
import YourCourses from './components/YourCourses'; // ✅ NEW
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-courses"
          element={
            <ProtectedRoute>
              <YourCourses />
            </ProtectedRoute>
          }
        />

        {/* Public Route */}
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </div>
  );
};

export default App;
