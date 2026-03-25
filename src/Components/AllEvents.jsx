import React from "react";
import { Link } from "react-router-dom";
import { Monitor, BookOpen, Music, Trophy } from "lucide-react";

function AllEvents() {
  // Event categories with icons
  const allEvents = [
    { name: "Technical", path: "/technical", icon: <Monitor className="w-10 h-10 mb-3" />, color: "text-blue-600", bg: "bg-blue-50", hover: "hover:border-blue-300 hover:shadow-blue-500/10" },
    { name: "Literary", path: "/literary", icon: <BookOpen className="w-10 h-10 mb-3" />, color: "text-purple-600", bg: "bg-purple-50", hover: "hover:border-purple-300 hover:shadow-purple-500/10" },
    { name: "Cultural", path: "/culture", icon: <Music className="w-10 h-10 mb-3" />, color: "text-pink-600", bg: "bg-pink-50", hover: "hover:border-pink-300 hover:shadow-pink-500/10" },
    { name: "Sports", path: "/sport", icon: <Trophy className="w-10 h-10 mb-3" />, color: "text-amber-500", bg: "bg-amber-50", hover: "hover:border-amber-300 hover:shadow-amber-500/10" },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Explore Events</h3>
        <p className="text-slate-500 mt-2 text-lg font-medium">Discover your passion across our four flagship categories.</p>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allEvents.map((event, index) => (
          <Link
            key={index}
            to={event.path}
            className={`group flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 ${event.hover}`}
          >
            <div className={`p-4 rounded-3xl ${event.bg} ${event.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
              {event.icon}
            </div>
            <h4 className="text-2xl font-bold text-slate-800">{event.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
