import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginSignup from './components/LoginSignup';
import YourCourses from './components/YourCourses';
import ProtectedRoute from './components/ProtectedRoute';
import Queries from './components/Queries';
import CourseDetail from "./components/CourseDetail";
import EnrollForm from "./components/EnrollForm";
import Certificate from './pages/Certificate';

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
        <Route
          path="/queries"
          element={
            <ProtectedRoute>
              <Queries />
            </ProtectedRoute>
          }
        />

        <Route path="/course/:id" element={<CourseDetail />} />

        <Route
          path="/enroll/:id"
          element={
            <ProtectedRoute>
              <EnrollForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate/:courseId"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />

          <Route path="/certificates" element={<Navigate to="/" replace />} />


        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </div>
  );
};

export default App;
