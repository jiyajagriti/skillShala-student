import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // ✅ For navigation to detail page

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('📚 Fetching all courses...');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses`);
        const data = await res.json();
        console.log('📋 All courses fetched:', data);
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, [user?.enrolledCourses]); // Re-fetch when enrolled courses change

  useEffect(() => {
    console.log('🔍 Filtering enrolled courses...');
    console.log('👤 User enrolled courses:', user?.enrolledCourses);
    console.log('📚 Available courses:', courses);
    
    if (user?.enrolledCourses?.length && courses.length) {
      console.log('🔍 Comparing enrolled courses with available courses...');
      console.log('📋 User enrolled course IDs:', user.enrolledCourses);
      console.log('📋 Available course IDs:', courses.map(c => c._id));
      
      const filtered = courses.filter((course) => {
        const isEnrolled = user.enrolledCourses.includes(course._id);
        console.log(`Course ${course.title} (${course._id}): ${isEnrolled ? '✅ Enrolled' : '❌ Not enrolled'}`);
        return isEnrolled;
      });
      console.log('✅ Filtered enrolled courses:', filtered);
      setEnrolledCourses(filtered);
    } else {
      console.log('❌ No enrolled courses or no courses available');
      console.log('User enrolled courses length:', user?.enrolledCourses?.length);
      console.log('Available courses length:', courses.length);
      setEnrolledCourses([]);
    }
  }, [user?.enrolledCourses, courses]);

  const handleDebug = async () => {
    console.log('🔍 Debugging enrollment issue...');
    console.log('👤 Current user:', user);
    console.log('📚 Current courses:', courses);
    console.log('📋 Current enrolled courses:', enrolledCourses);
    
    // Test API calls
    try {
      const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("skillshala-token")}` }
      });
      const userData = await userRes.json();
      console.log('👤 User data from API:', userData);
      
      const coursesRes = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses`);
      const coursesData = await coursesRes.json();
      console.log('📚 Courses data from API:', coursesData);
    } catch (err) {
      console.error('❌ Debug API call failed:', err);
    }
  };

  const handleSyncCourses = async () => {
    try {
      console.log('🔄 Manually syncing courses...');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses/sync-manual`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem("skillshala-token")}` }
      });
      const data = await res.json();
      console.log('✅ Sync result:', data);
      
      // Refresh the page to show updated courses
      window.location.reload();
    } catch (err) {
      console.error('❌ Sync failed:', err);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Courses</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleDebug}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Debug
          </button>
          <button 
            onClick={handleSyncCourses}
            className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Sync Courses
          </button>
          <p className="text-sm text-gray-500 hover:underline cursor-pointer">More...</p>
        </div>
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
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/course/${course._id}`)} // ✅ Navigate to course detail
                >
                  <div className="text-sm font-bold hover:underline">{course.title.split(" ")[0]}</div>
                  <div className="text-xs">{course.title.split(" ").slice(1).join(" ")}</div>
                </div>
              </div>
              <div className="text-xs opacity-80">
                <p>Level: {course.level}</p>
                <p>Duration: {course.duration || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourCourses;
