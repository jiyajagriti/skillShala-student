import React from 'react';

const Profile = () => {
  return (
    <div className="w-full max-w-6xl px-4 mb-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between relative">
        
        {/* Left: Profile Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Your Profile</h2>
          <p className="text-sm text-gray-600">
            Name: <span className="font-semibold text-gray-900">Jiya Jagriti</span>
          </p>
          <p className="text-sm text-gray-600">
            Active Courses: <span className="font-semibold text-gray-900">03</span>
          </p>
          <p className="text-sm text-gray-600">
            Total XPs Gained: <span className="font-semibold text-gray-900">2240</span>
          </p>
        </div>

        {/* Right: Upload Button */}
        <label className="cursor-pointer relative">
          <input type="file" className="hidden" />
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-200">
            <span className="text-sm text-blue-800 font-medium">Upload</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Profile;
