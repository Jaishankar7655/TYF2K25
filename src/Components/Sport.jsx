import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Global registration deadline
const GLOBAL_REG_DEADLINE = "2026-04-08T23:59:00+05:30";
const isRegClosed = () => new Date() > new Date(GLOBAL_REG_DEADLINE);

function Sport() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();

  const sportsEvents = [
    { id: 1, name: "JAVELIN THROW", rules: ["STANDARD RULES."], date: "4 APRIL, 10:00 AM", venue: "MAIN GROUND", fees: "Rs 50", prizes: "MEDAL AND CERTIFICATE", emoji: "🎯" },
    { id: 2, name: "CRICKET (2V2)", rules: ["STANDARD RULES."], date: "4 APRIL, 10:00 AM", venue: "MAIN GROUND", fees: "Rs 300", prizes: "TROPHY FOR WINNING TEAM", emoji: "🏏" },
    { id: 3, name: "CARROM", rules: ["REGULAR RULES."], date: "4 APRIL, 10:30 AM", venue: "RECEPTION", fees: "Rs 50", prizes: "TROPHY FOR WINNER", emoji: "🎯" },
    { id: 4, name: "DISCUS THROW", rules: ["STANDARD RULES."], date: "4 APRIL, 10:30 AM", venue: "MAIN GROUND", fees: "Rs 50", prizes: "MEDAL AND CERTIFICATE", emoji: "🛸" },
    { id: 5, name: "RAPID RUN (RACE)", rules: ["STANDARD RACE RULES."], date: "4 APRIL, 11:00 AM", venue: "MAIN GROUND", fees: "Rs 50", prizes: "MEDAL AND CERTIFICATE", emoji: "🏃" },
    { id: 6, name: "SHOT PUT", rules: ["STANDARD RULES."], date: "4 APRIL, 12:00 PM", venue: "MAIN GROUND", fees: "Rs 50", prizes: "MEDAL AND CERTIFICATE", emoji: "🪨" },
    { id: 7, name: "BADMINTON", rules: ["SINGLES WILL BE THERE.", "MATCH WILL BE OF 11 POINTS."], date: "5 APRIL, 10:00 AM", venue: "PHARMACY GROUND", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🏸" },
    { id: 8, name: "KABADDI", rules: ["EVERY SET WILL BE OF 10 MIN.", "PROPER DRESS AND SHOES ARE MANDATORY."], date: "5 APRIL, 10:00 AM", venue: "MAIN GROUND", fees: "Rs 300", prizes: "MEDAL AND TROPHY FOR WINNING TEAM", emoji: "🤼" },
    { id: 9, name: "KHO-KHO", rules: ["8 PARTICIPANTS SHOULD BE THERE IN THE TEAM."], date: "5 APRIL, 11:00 AM", venue: "MAIN GROUND", fees: "Rs 300", prizes: "MEDAL AND TROPHY FOR WINNING TEAM", emoji: "🏃" },
    { id: 10, name: "TUG OF WAR", rules: ["STANDARD RULES."], date: "5 APRIL, 11:00 AM", venue: "IN FRONT OF CSE", fees: "Rs 50", prizes: "MEDAL AND TROPHY", emoji: "🪢" },
    { id: 11, name: "TABLE TENNIS", rules: ["REGULAR RULES."], date: "5 APRIL, 11:00 AM", venue: "TBP", fees: "Rs 50", prizes: "TROPHY FOR WINNER", emoji: "🏓" },
    { id: 12, name: "CHESS", rules: ["REGULAR RULES."], date: "5 APRIL, 11:00 AM", venue: "RECEPTION", fees: "Rs 50", prizes: "TROPHY FOR WINNER", emoji: "♟️" },
  ];

  const handleToggleRules = (id) => {
    setOpenEventId(openEventId === id ? null : id);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const regClosed = isRegClosed();

  return (
    <div className="min-h-screen bg-dark-bg party-bg">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-yellow/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-neon-green/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pb-6 border-b border-neon-yellow/20">
          <div className="text-5xl mb-4">🏆⚡🏅</div>
          <h1 className="text-4xl font-black gradient-party mb-2">Sports Events</h1>
          <p className="text-lg text-gray-400">
            Showcase your skills and compete in thrilling sports events!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sportsEvents.map((event) => (
            <div
              key={event.id}
              className="party-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-neon-yellow/20 to-neon-green/20 border-b border-neon-yellow/10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{event.emoji}</span>
                  <h2 className="text-xl font-bold text-white">{event.name}</h2>
                </div>
                <div className="text-sm text-neon-cyan/80 flex flex-wrap items-center ml-10 gap-x-2">
                  <span>📅 {event.date}</span>
                  {event.venue && <span>| 📍 {event.venue}</span>}
                </div>
              </div>

              {/* Event Details */}
              <div className="px-6 py-4 border-b border-neon-purple/10">
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
                    openEventId === event.id ? "text-neon-pink" : "text-neon-cyan"
                  } focus:outline-none`}
                  onClick={() => handleToggleRules(event.id)}
                >
                  {openEventId === event.id ? "🔽 Hide Rules" : "▶️ Show Rules"}
                </button>

                {openEventId === event.id && (
                  <div className="pb-4">
                    <h3 className="text-lg font-medium text-neon-purple mb-2">
                      Rules & Guidelines
                    </h3>
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
                {regClosed ? (
                  <button 
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl font-medium bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
                  >
                    <span>🚫 Registration Closed</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    className="btn-party w-full py-2.5 px-4 rounded-xl font-medium"
                  >
                    <span>🎉 Register Now</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-neon-yellow/80 text-sm mb-8 font-medium">
          🏆 ALL PARTICIPANTS WILL GET THE CERTIFICATE OF PARTICIPATION AND THERE ARE PRIZES FOR WINNER AND RUNNERUP 🏆
        </p>

        {/* Register Section */}
        <div className="party-card rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">⚡🏆⚡</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Compete?</h2>
          <p className="text-gray-400 mb-6">Register now to participate in these exciting sports events!</p>
          {regClosed ? (
            <button 
              disabled
              className="py-3 px-8 rounded-xl font-medium bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
            >
              <span>🚫 Registration Closed</span>
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="btn-party py-3 px-8 rounded-xl font-medium"
            >
              <span>🎉 Register for Events</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sport;
