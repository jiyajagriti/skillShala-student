import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllCourses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAndSyncCourses = async () => {
      try {
        // 1. Fetch from admin backend (5000)
        const res = await axios.get("http://localhost:8000/api/v1/courses");
        const approvedCourses = res.data;

        // 2. Sync to student backend (8000)
        for (const course of approvedCourses) {
          await axios.post("http://localhost:8000/api/v1/courses/sync", course);
        }
        console.log("✅ Synced all courses to student DB");

        // 3. Fetch from student backend
        const studentRes = await axios.get("http://localhost:8000/api/v1/courses");
        setCourses(studentRes.data);
        console.log("📦 Loaded from student DB:", studentRes.data);
      } catch (err) {
        console.error("❌ Error syncing or fetching:", err.message);
      }
    };

    fetchAndSyncCourses();
  }, []);

  const isEnrolled = (courseId) => {
    return user?.enrolledCourses?.includes(courseId);
  };

  const handleEnrollRedirect = (courseId) => {
    if (!user) return alert("Please login first to enroll.");
    navigate(`/enroll/${courseId}`);
  };

  const handleEnroll = async (courseId) => {
    if (!user) return alert("Please login first");

    try {
      const res = await fetch("http://localhost:8000/api/v1/courses/enroll", {
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
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[400px] transition-transform duration-200 hover:scale-105"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-36 object-cover bg-gray-100"
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />

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
              <p className="text-sm text-gray-700 mb-2">
                <strong>Price:</strong> ₹{course.price}
              </p>

              <div className="mt-auto space-y-2">
                <Link to={`/course/${course._id}`}>
                  <button className="w-full bg-gray-100 text-sm text-gray-800 px-3 py-1.5 rounded hover:bg-gray-200">
                    View Details
                  </button>
                </Link>

                {isEnrolled(course._id) ? (
                  <Link to={`/course/${course._id}`}>
                    <button className="w-full bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700">
                      Go to Course
                    </button>
                  </Link>
                ) : (
                      <button
                        onClick={() => handleEnrollRedirect(course._id)}
                        className="w-full bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700"
                      >
                        Enroll Now
                      </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
