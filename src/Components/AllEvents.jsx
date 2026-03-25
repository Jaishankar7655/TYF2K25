import React from "react";
import { Link } from "react-router-dom";
import { Monitor, BookOpen, Music, Trophy, Star } from "lucide-react";

function AllEvents() {
  const allEvents = [
    { name: "Technical", path: "/technical", icon: <Monitor className="w-10 h-10 mb-3" />, color: "text-neon-cyan", borderColor: "border-neon-cyan/30", hoverBorder: "hover:border-neon-cyan", glow: "hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]", emoji: "💻" },
    { name: "Literary", path: "/literary", icon: <BookOpen className="w-10 h-10 mb-3" />, color: "text-neon-purple", borderColor: "border-neon-purple/30", hoverBorder: "hover:border-neon-purple", glow: "hover:shadow-[0_0_25px_rgba(176,38,255,0.2)]", emoji: "📚" },
    { name: "Cultural", path: "/culture", icon: <Music className="w-10 h-10 mb-3" />, color: "text-neon-pink", borderColor: "border-neon-pink/30", hoverBorder: "hover:border-neon-pink", glow: "hover:shadow-[0_0_25px_rgba(255,45,149,0.2)]", emoji: "🎭" },
    { name: "Sports", path: "/sport", icon: <Trophy className="w-10 h-10 mb-3" />, color: "text-neon-yellow", borderColor: "border-neon-yellow/30", hoverBorder: "hover:border-neon-yellow", glow: "hover:shadow-[0_0_25px_rgba(255,230,0,0.2)]", emoji: "🏆" },
    { name: "SEC Committee", path: "/sac", icon: <Star className="w-10 h-10 mb-3" />, color: "text-green-400", borderColor: "border-green-400/30", hoverBorder: "hover:border-green-400", glow: "hover:shadow-[0_0_25px_rgba(74,222,128,0.2)]", emoji: "🌟" },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-extrabold gradient-party tracking-tight">🪩 Explore Events 🪩</h3>
        <p className="text-gray-400 mt-2 text-lg font-medium">Discover your passion across our four flagship categories.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {allEvents.map((event, index) => (
          <Link
            key={index}
            to={event.path}
            className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33%-16px)] xl:w-[calc(20%-20px)] group flex flex-col items-center justify-center p-8 bg-dark-card/80 border-2 ${event.borderColor} rounded-2xl hover:-translate-y-2 transition-all duration-400 ${event.hoverBorder} ${event.glow} backdrop-blur-xl`}
          >
            <div className="text-3xl mb-3">{event.emoji}</div>
            <div className={`p-4 rounded-2xl bg-dark-surface/50 ${event.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
              {event.icon}
            </div>
            <h4 className="text-2xl font-bold text-white">{event.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
