import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import confetti from "canvas-confetti";
import "react-toastify/dist/ReactToastify.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState(new Set());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/courses/${id}`);
        const foundCourse = res.data;

        if (!user?.enrolledCourses?.includes(foundCourse._id)) {
          setAccessDenied(true);
        } else {
          setCourse(foundCourse);
        }
      } catch (err) {
        console.error("Failed to load course:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 1, y: 1 }, // bottom right
      angle: 270,
    });
  };

  const handleVideoComplete = async (videoUrl) => {
    if (watchedVideos.has(videoUrl)) return; // prevent double XP
    setWatchedVideos(new Set([...watchedVideos, videoUrl]));

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/xp/complete-video`,
        {
          courseId: course._id,
          videoUrl: videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
          },
        }
      );

      refreshUser?.(); // update XP in context

      toast.success("🎉 10 XP awarded!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      triggerConfetti();
    } catch (err) {
      console.warn("⚠️ XP not awarded:", err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading course...</p>;
  if (accessDenied) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-red-600">
        <p>🚫 You are not enrolled in this course.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Level:</strong> {course.level} | <strong>Price:</strong> ₹{course.price}
      </p>

      <div className="grid gap-4">
        {course.videos && course.videos.length > 0 ? (
          course.videos.map((video, index) => (
            <div key={index}>
              <p className="text-sm text-gray-600 mb-1">Video {video.order}</p>
              <video
                controls
                onEnded={() => handleVideoComplete(video.url)}
                className="w-full rounded shadow"
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        ) : (
          <p className="text-red-600">No videos available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
