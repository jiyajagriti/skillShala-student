import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AllCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/courses");
        const data = await res.json();
        console.log("✅ Approved courses fetched:", data);
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) return alert("Please login first");

    try {
      const res = await fetch("http://localhost:5000/api/v1/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
        },
        body: JSON.stringify({
          courseId: courseId,
        }),
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
        <h2 className="text-sm font-semibold text-gray-800">All Approved Courses</h2>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
          key={course._id}
          className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[360px] transition-transform duration-200 hover:scale-105"
        >
          {/* Thumbnail */}
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-36 object-cover bg-gray-100"
            onError={(e) => (e.target.src = "/fallback.jpg")}
          />

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-blue-600 font-semibold text-base mb-1 truncate">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {course.description}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Level:</strong> {course.level}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Price:</strong> ₹{course.price}
            </p>

            <button
              onClick={() => handleEnroll(course._id)}
              className="mt-auto bg-blue-600 text-white text-sm px-4 py-1.5 rounded shadow hover:bg-blue-700"
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