import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const fileInputRef = useRef();
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadStatus("Uploading...");

      const res = await axios.put(
        "http://localhost:8000/api/v1/auth/update-profile-pic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
          },
        }
      );

      toast.success("✅ Profile picture updated!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      console.log("New profile pic URL:", res.data.profilePic);

      setUploadStatus("✅ Profile picture updated!");
      refreshUser?.(); // Refresh user context

    } catch (err) {
      console.error("❌ Upload failed:", err?.response?.data || err.message);
      setUploadStatus("❌ Upload failed");
      toast.error("❌ Failed to update profile picture");
    }
  };

  if (!user) return <p className="px-4 py-6">Loading profile...</p>;

  return (
    <div className="w-full max-w-6xl px-4 mb-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between relative">
        
        {/* Profile Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Your Profile</h2>
          <p className="text-sm text-gray-600">
            Name: <span className="font-semibold text-gray-900">{user?.name || "Guest"}</span>
          </p>
          <p className="text-sm text-gray-600">
            Email: <span className="font-semibold text-gray-900">{user.email}</span>
          </p>
          <p className="text-sm text-gray-600">
            Active Courses:{" "}
            <span className="font-semibold text-gray-900">
              {user?.enrolledCourses?.length || 0}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Total XPs Gained:{" "}
            <span className="font-semibold text-gray-900">
              {user?.totalXP || 0}
            </span>
          </p>
        </div>

        {/* Profile Picture with Edit Icon */}
        <div className="relative group w-24 h-24 rounded-full overflow-hidden shadow border-4 border-white bg-gray-100 cursor-pointer">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {/* Centered Edit Icon (visible on hover) */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <CiEdit size={26} className="text-white" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Upload status below the card */}
      {uploadStatus && (
        <p className="text-sm mt-2 text-center text-green-600">{uploadStatus}</p>
      )}
    </div>
  );
};

export default Profile;
