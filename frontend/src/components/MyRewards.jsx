import React, { useEffect, useState } from "react";
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

const MyRewards = () => {
  const { token } = useAuth();
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState({ unlocked: [], locked: [] });
  const [xpHistory, setXpHistory] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/rewards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setXP(data.totalXP);
        setStreak(data.streak);
        setBadges(data.badges);
        setXpHistory(data.xpHistory);
      } catch (err) {
        console.error("Failed to load rewards:", err);
      }
    };

    if (token) fetchRewards();
  }, [token]);

  const badgeIcons = {
    "HTML Pro": "/html.png",
    "CSS Master": "/css.png",
    "JavaScript Guru": "/js.png",
    "React Star": "/react.png",
  };

  return (
    <div className="min-h-screen w-full text-black py-10 px-4">
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/80 border border-gray-100 rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">My Rewards</h2>
          <button className="text-sm text-orange-500 hover:underline">
            View All Rewards
          </button>
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
            <p className="text-sm text-gray-600">Badges Earned</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={badges.unlocked.length} duration={2} />
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  color: "#111827",
                }}
              />
              <Line type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Unlocked */}
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-700">Unlocked Badges</p>
            <div className="flex gap-4 flex-wrap">
              {badges.unlocked.map((name, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-white shadow-sm border border-gray-200 p-3 rounded-lg hover:scale-105 transition-transform"
                >
                  <img src={badgeIcons[name]} alt={name} className="w-12 h-12" />
                  <p className="text-xs mt-1 text-blue-700">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Locked */}
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-700">Locked Badges</p>
            <div className="bg-gray-100 rounded-lg p-4 shadow-inner grid grid-cols-2 gap-4">
              {badges.locked.map((name, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center opacity-40 grayscale"
                >
                  <img src={badgeIcons[name]} alt={name} className="w-12 h-12" />
                  <p className="text-xs mt-1 text-gray-500">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRewards;
