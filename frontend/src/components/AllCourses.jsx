import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AllCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Handle enroll
  const handleEnroll = async (courseId) => {
    if (!user) return alert("Please login first");

    try {
      const res = await fetch("http://localhost:8000/api/v1/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Enrollment failed");
      alert("🎉 Enrolled successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full max-w-6xl px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">All Courses</h2>
        <p className="text-sm text-gray-500 hover:underline cursor-pointer">More...</p>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
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
              <span className="text-sm text-blue-600 font-medium">{course.price}</span>
              <button
                onClick={() => handleEnroll(course._id)}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded shadow hover:bg-blue-700"
              >
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
