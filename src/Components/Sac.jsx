import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Sac() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();
  const sacEvents = [
      { id: 1, name: "Push-Up Challenge", rules: ["Standard rules apply."], date: "Not Decided", fees: "Rs 50", prizes: "Surprise Reward", emoji: "💪" },
      { id: 2, name: "Plank / Weight Add-On Challenge", rules: ["Standard rules apply."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "🏋️" },
      { id: 3, name: "Spoon Tie-Knot Challenge", rules: ["Perform the challenge in given time."], date: "Not Decided", fees: "Rs 50", prizes: "Surprise Reward", emoji: "🥄" },
      { id: 4, name: "Poetry", rules: ["Any topic."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "✍️" },
      { id: 5, name: "Arm Wrestling (SAC)", rules: ["Standard rules apply."], date: "Not Decided", fees: "Rs 50", prizes: "Surprise Reward", emoji: "✊" },
      { id: 6, name: "Bottle Flip", rules: ["Maximum consecutive flips win."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "🍾" },
      { id: 7, name: "Thug of War (Per Team)", rules: ["Max 10 per team."], date: "Not Decided", fees: "Rs 300", prizes: "Surprise Reward", emoji: "🪢" },
      { id: 8, name: "Teacher's Ramp Walk", rules: ["Exclusive for teachers."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "🧑‍🏫" },
      { id: 9, name: "Blind Fold Challenge", rules: ["Follow the guided route."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "🙈" },
      { id: 10, name: "Dance-Freeze Challenge", rules: ["Freeze when music stops."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "🧊" },
      { id: 11, name: "Paper Folding Dance", rules: ["Dance and stay on the paper."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "📰" },
      { id: 12, name: "Truba Roadies", rules: ["Task based event."], date: "Not Decided", fees: "100", prizes: "Surprise Reward", emoji: "🏍️" },
      { id: 13, name: "Cup Pyramid", rules: ["Fastest to build wins."], date: "Not Decided", fees: "Free", prizes: "Surprise Reward", emoji: "🥤" },
      { id: 14, name: "Sign - Walk Game", rules: ["Follow the instructions."], date: "Not Decided", fees: "Rs 50", prizes: "Surprise Reward", emoji: "🚶‍♂️" },
      { id: 15, name: "Cricket Circle Game", rules: ["Hit boundaries."], date: "Not Decided", fees: "Rs 100", prizes: "Surprise Reward", emoji: "🏏" },
      { id: 16, name: "Dare to Drink", rules: ["Mystery drink challenge."], date: "Not Decided", fees: "Rs 50", prizes: "Surprise Reward", emoji: "🍹" },
  ];

  const handleToggleRules = (id) => {
    setOpenEventId(openEventId === id ? null : id);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-dark-bg party-bg">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-neon-green/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-neon-yellow/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pb-6 border-b border-neon-green/20">
          <div className="text-5xl mb-4">🌟🔥✨</div>
          <h1 className="text-4xl font-black gradient-party mb-2">SAC Committee Events</h1>
          <p className="text-lg text-gray-400">
            Fun activities, challenges, and amazing surprise rewards!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sacEvents.map((event) => (
            <div 
              key={event.id} 
              className="party-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-neon-green/20 to-neon-yellow/10 border-b border-neon-green/10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{event.emoji}</span>
                  <h2 className="text-xl font-bold text-white">{event.name}</h2>
                </div>
                <div className="text-sm text-neon-green/80 flex items-center ml-10">
                  📅 {event.date}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="px-6 py-4 border-b border-neon-green/10">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-medium">Registration Fees:</span>
                  <span className="text-neon-yellow font-semibold">{event.fees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Prizes:</span>
                  <span className="text-neon-green text-sm text-right max-w-[60%]">{event.prizes.toLowerCase()}</span>
                </div>
              </div>
              
              {/* Rules Section */}
              <div className="px-6">
                <button 
                  className={`w-full text-left py-4 font-medium transition-colors duration-200 ${
                    openEventId === event.id ? "text-neon-cyan" : "text-neon-green"
                  } focus:outline-none`}
                  onClick={() => handleToggleRules(event.id)}
                >
                  {openEventId === event.id ? "🔽 Hide Rules" : "▶️ Show Rules"}
                </button>
                
                {openEventId === event.id && (
                  <div className="pb-4">
                    <h3 className="text-lg font-medium text-neon-green mb-2">Rules & Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                      {event.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Register Button */}
              <div className="px-6 py-4 mt-auto">
                <button 
                  onClick={handleRegister}
                  className="btn-party w-full py-2.5 px-4 rounded-xl font-medium border-neon-green text-neon-green"
                >
                  <span>🎉 Register Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Register Section */}
        <div className="party-card rounded-2xl p-8 text-center border border-neon-green/30">
          <div className="text-4xl mb-4">✨🤸🏻✨</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready for Fun?</h2>
          <p className="text-gray-400 mb-6">Register now for SAC committee challenges!</p>
          <button 
            onClick={handleRegister}
            className="btn-party py-3 px-8 rounded-xl font-medium"
          >
            <span>🎉 Register for Events</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sac;
