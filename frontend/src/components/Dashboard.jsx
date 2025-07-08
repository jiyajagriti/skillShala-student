import React from 'react';
import Profile from './Profile';
import YourCourses from './YourCourses';
import AllCourses from './AllCourses';
import MyRewards from './MyRewards';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 py-20 px-4 md:px-8 flex flex-col items-center space-y-12">
      <Profile />
      <YourCourses />
      <AllCourses />
      <MyRewards />
    </div>
  );
};

export default Dashboard;
