import React from "react";
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

const xpHistory = [
  { day: "Mon", xp: 200 },
  { day: "Tue", xp: 340 },
  { day: "Wed", xp: 290 },
  { day: "Thu", xp: 500 },
  { day: "Fri", xp: 700 },
  { day: "Sat", xp: 920 },
  { day: "Sun", xp: 1240 },
];

const unlockedBadges = [
  { name: "HTML Pro", icon: "./public/html.png" },
  { name: "CSS Master", icon: "./public/css.png" },
];

const lockedBadges = [
  { name: "JavaScript Guru", icon: "./public/js.png" },
  { name: "React Star", icon: "./public/react.png" },
];

const MyRewards = () => {
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
              <CountUp end={7420} duration={2} />
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Star className="mx-auto mb-2 text-yellow-500" size={28} />
            <p className="text-sm text-gray-600">Badges Earned</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={12} duration={2} />
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Flame className="mx-auto mb-2 text-red-500" size={28} />
            <p className="text-sm text-gray-600">Learning Streak</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={15} duration={2} /> Days
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
              {unlockedBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-white shadow-sm border border-gray-200 p-3 rounded-lg hover:scale-105 transition-transform"
                >
                  <img src={badge.icon} alt={badge.name} className="w-12 h-12" />
                  <p className="text-xs mt-1 text-blue-700">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Locked */}
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-700">Locked Badges</p>
            <div className="bg-gray-100 rounded-lg p-4 shadow-inner grid grid-cols-2 gap-4">
              {lockedBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center opacity-40 grayscale"
                >
                  <img src={badge.icon} alt={badge.name} className="w-12 h-12" />
                  <p className="text-xs mt-1 text-gray-500">{badge.name}</p>
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
