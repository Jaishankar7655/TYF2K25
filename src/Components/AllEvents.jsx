import React from "react";
import { Link, Routes, Route } from "react-router-dom";

function AllEvents() {
  // Event categories with icons
  const allEvents = [
    { name: "Technical", path: "/technical", icon: "🖥️" },
    { name: "Literary", path: "/literary", icon: "📚" },
    { name: "Cultural", path: "/culture", icon: "🎭" },
    { name: "Sports", path: "/sport", icon: "🏆" },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-6">All Events</h1>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allEvents.map((event, index) => (
          <Link
            key={index}
            to={event.path}
            className="bg-gradient-to-r from-pink-500 to-purple-400 text-white p-6  rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition transform duration-200"
          >
            <span className="text-4xl">{event.icon}</span>
            <h2 className="text-xl font-semibold mt-2">{event.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
