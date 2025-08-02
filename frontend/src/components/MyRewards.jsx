import React, { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Gift, Star, Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";

const MyRewards = () => {
  const { token } = useAuth();
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [certificates, setCertificates] = useState([]); // replaces badges
  const [xpHistory, setXpHistory] = useState([]);

  const prevStreakRef = useRef(0);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/rewards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // 🎉 Toast + confetti for new streak
        if (data.streak > prevStreakRef.current) {
          toast.success(`🔥 You've maintained a ${data.streak}-day streak!`, {
            icon: "🔥",
            position: "bottom-right",
            autoClose: 3000,
            className: "animated-toast",
          });

          confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: 1, y: 1 },
            scalar: 0.8,
          });
        }

        setXP(data.totalXP);
        setStreak(data.streak);
        setCertificates(data.badges?.unlocked || []); // course titles as certificates
        setXpHistory(data.xpHistory || []);
        prevStreakRef.current = data.streak;
      } catch (err) {
        console.error("Failed to load rewards:", err);
      }
    };

    if (token) fetchRewards();
  }, [token]);

  return (
    <div className="min-h-screen w-full text-black py-10 px-4">
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/80 border border-gray-100 rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">My Rewards</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
          <div className="bg-white shadow-md rounded-lg p-4">
            <Gift className="mx-auto mb-2 text-blue-600" size={28} />
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={xp} duration={2} />
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Star className="mx-auto mb-2 text-yellow-500" size={28} />
            <p className="text-sm text-gray-600">Certificates</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={certificates.length} duration={2} />
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Flame className="mx-auto mb-2 text-red-500" size={28} />
            <p className="text-sm text-gray-600">Learning Streak</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={streak} duration={2} /> Days
            </p>
          </div>
        </div>

        {/* XP Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <p className="text-sm font-semibold mb-2 text-gray-700">XP History (Last 7 Days)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={xpHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Certificates Section */}
        <div className="mt-10">
          <h3 className="text-md font-semibold mb-3 text-gray-700">Certificates Earned</h3>
          <div className="flex gap-4 flex-wrap">
            {certificates.length > 0 ? (
              certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md border border-gray-200 p-4 rounded-lg w-64 flex flex-col justify-between"
                >
                  <div className="text-blue-700 font-semibold mb-2 text-sm truncate">
                    {cert.courseTitle}
                  </div>
                  <p className="text-xs text-gray-600 mb-4">Certificate of Completion</p>
                  <a
                    href={`/certificate/${cert.courseId}`}
                    className="text-center bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded"
                  >
                    View Certificate
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No certificates earned yet.</p>
            )}
          </div>
        </div>


        <ToastContainer />
      </div>
    </div>
  );
};

export default MyRewards;
