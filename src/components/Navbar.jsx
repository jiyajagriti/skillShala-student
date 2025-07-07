import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-800">SkillShala</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 font-medium items-center text-sm">
            <Link to="/" className="hover:text-blue-700">Dashboard</Link>
            <Link to="/courses" className="hover:text-blue-700">Courses</Link>
            <Link to="/tests" className="hover:text-blue-700">Tests</Link>
            <Link to="/users" className="hover:text-blue-700">Users</Link>
            <Link to="/profile" className="hover:text-blue-700">Profile</Link>
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
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
          <div className="md:hidden flex flex-col space-y-4 py-4 items-center bg-white shadow-md">
            <Link to="/" className="hover:text-blue-700">Dashboard</Link>
            <Link to="/courses" className="hover:text-blue-700">Courses</Link>
            <Link to="/tests" className="hover:text-blue-700">Tests</Link>
            <Link to="/users" className="hover:text-blue-700">Users</Link>
            <Link to="/profile" className="hover:text-blue-700">Profile</Link>
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
          </div>
        )}
      </nav>

      {/* Spacer to prevent overlap */}
      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;
