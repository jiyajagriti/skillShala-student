import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EnrollForm = () => {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err.message);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/v1/enroll",
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
          },
        }
      );

      await refreshUser(); // ✅ Update user data (enrolledCourses)
      alert("🎉 Enrolled successfully!");
      navigate("/your-courses");
    } catch (err) {
      alert("❌ Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p>Loading course...</p>;

  // ✅ Optional: Prevent re-enroll
  if (user?.enrolledCourses?.includes(course._id)) {
    return <p className="text-green-600 text-center mt-10">✅ Already Enrolled</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enroll in {course.title}</h2>
      <p className="text-gray-700 mb-2">Price: ₹{course.price}</p>
      {/* Mock payment + enroll */}
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay & Enroll"}
      </button>
    </div>
  );
};

export default EnrollForm;
