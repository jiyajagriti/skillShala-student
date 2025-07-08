import React from "react";

const courses = [
  { id: "B3", topic: "HTML", title: "Anchor tags", color: "bg-green-300", cardBg: "bg-green-600" },
  { id: "A1", topic: "CSS", title: "Selectors", color: "bg-blue-300", cardBg: "bg-blue-600" },
  { id: "B6", topic: "CSS", title: "Box Model", color: "bg-red-300", cardBg: "bg-red-600" },
  { id: "C2", topic: "JS", title: "Variables", color: "bg-yellow-300", cardBg: "bg-yellow-600" },
  { id: "D4", topic: "JS", title: "Functions", color: "bg-purple-300", cardBg: "bg-purple-600" },
  { id: "E5", topic: "HTML", title: "Forms", color: "bg-pink-300", cardBg: "bg-pink-600" },
];

const YourCourses = () => {
  return (
    <div className="w-full max-w-6xl px-4 relative">
      <div className="bg-white rounded-2xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Your Courses</h2>
        </div>

        {/* Scrollable Course Cards */}
        <div
          className="relative overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex flex-nowrap gap-4 pr-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`flex-shrink-0 flex items-center ${course.cardBg} rounded-xl px-4 py-3 min-w-[200px] max-w-[220px] transition-all duration-300`}
              >
                {/* ID box */}
                <div
                  className={`w-12 h-12 ${course.color} rounded-md flex items-center justify-center text-white font-bold mr-4 text-sm`}
                >
                  {course.id}
                </div>

                {/* Text section */}
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-semibold text-white">{course.topic}</span>
                  <span className="text-xs text-white">{course.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hide scrollbar (WebKit) */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default YourCourses;
