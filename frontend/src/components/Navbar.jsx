import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-4 left-0 right-0 z-50 max-w-6xl mx-auto px-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-800">SkillShala</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 font-medium items-center text-sm">
            <Link to="/" className="hover:text-blue-700">Dashboard</Link>
            <Link to="/tests" className="hover:text-blue-700">Tests</Link>
            <Link to="/queries" className="hover:text-blue-700">Queries</Link> {/* ✅ Added */}
            <Link to="/profile" className="hover:text-blue-700">Profile</Link>
            {user ? (
              <>
                <Link to="/your-courses" className="hover:text-blue-700">Your Courses</Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-xl text-blue-800">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4 items-center bg-white/80 backdrop-blur-md rounded-b-xl shadow-lg">
            <Link to="/" className="hover:text-blue-700">Dashboard</Link>
            <Link to="/tests" className="hover:text-blue-700">Tests</Link>
            <Link to="/queries" className="hover:text-blue-700">Queries</Link> {/* ✅ Added */}
            <Link to="/users" className="hover:text-blue-700">Users</Link>
            <Link to="/profile" className="hover:text-blue-700">Profile</Link>
            {user ? (
              <>
                <Link to="/your-courses" className="hover:text-blue-700">Your Courses</Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </div>
  );
};

export default Navbar;
