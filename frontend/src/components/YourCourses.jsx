import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const bgColors = [
  "bg-green-600",
  "bg-blue-600",
  "bg-red-600",
  "bg-yellow-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-indigo-600",
  "bg-orange-600",
];

const YourCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // 🔁 Fetch all available courses once
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Filter enrolled courses when user or courses change
  useEffect(() => {
    if (user?.enrolledCourses?.length && courses.length) {
      const filtered = courses.filter((course) =>
        user.enrolledCourses.includes(course._id)
      );
      setEnrolledCourses(filtered);
    } else {
      setEnrolledCourses([]);
    }
  }, [user?.enrolledCourses, courses]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Courses</h2>
        <p className="text-sm text-gray-500 hover:underline cursor-pointer">More...</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <p className="text-sm text-gray-600">You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {enrolledCourses.map((course, index) => (
            <div
              key={course._id}
              className={`min-w-[220px] rounded-xl text-white p-4 shadow-md flex flex-col justify-between ${
                bgColors[index % bgColors.length]
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/30 text-white font-bold rounded px-2 py-1 text-xs">
                  {String.fromCharCode(65 + index)}{index + 1}
                </div>
                <div>
                  <div className="text-sm font-bold">{course.title.split(" ")[0]}</div>
                  <div className="text-xs">{course.title.split(" ").slice(1).join(" ")}</div>
                </div>
              </div>
              <div className="text-xs opacity-80">
                <p>Level: {course.level}</p>
                <p>Duration: {course.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourCourses;
