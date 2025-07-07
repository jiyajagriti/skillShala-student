import React from "react";

const courses = [
  {
    title: "Frontend Development",
    image: "./public/frontend.png",
    prerequisites: "Basic HTML & CSS knowledge",
    level: "Beginner",
    includes: "Hands-on labs, quizzes",
    duration: "4 weeks",
  },
  {
    title: "Database Essentials",
    image: "./public/database.png",
    prerequisites: "Basic programming understanding",
    level: "Intermediate",
    includes: "SQL practice, assignments",
    duration: "6 weeks",
  },
  {
    title: "React Crash Course",
    image: "./public/react.png",
    prerequisites: "HTML, CSS, JavaScript",
    level: "Intermediate",
    includes: "Projects, challenges",
    duration: "3 weeks",
  },
  {
    title: "Cloud Basics",
    image: "./public/cloud.png",
    prerequisites: "No prior experience",
    level: "Beginner",
    includes: "Hands-on with AWS",
    duration: "2 weeks",
  },
];

const AllCourses = () => {
  return (
    <div className="w-full max-w-6xl px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">All Courses</h2>
        <p className="text-sm text-gray-500 hover:underline cursor-pointer">More...</p>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[420px]"
        >
          {/* Image */}
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-40 object-contain p-2 bg-white scale-90 ease-out duration-500 hover:scale-105"
            />
        
          {/* Info */}
          <div className="p-4 flex-1">
            <h3 className="text-blue-600 font-semibold mb-2 text-sm">
              {course.title}
            </h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Prerequisite:</strong> {course.prerequisites}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Level:</strong> {course.level}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Includes:</strong> {course.includes}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Duration:</strong> {course.duration}
            </p>
          </div>
        
            {/* Footer */}
            <div className="flex items-center justify-between px-4 pb-4">
                <a
                href="#"
                className="text-sm text-blue-600 hover:underline font-medium"
                >
                more details
                </a>
                <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded shadow hover:bg-blue-700">
                Enroll Now
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
