import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Technical() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();

  const technicalEvents = [
    { id: 1, name: "TECH QUIZ", rules: ["TOTAL 5 SECTION WILL BE THERE.", "QUESTION ATTEMPTATION SHOULD BE MANDATORY.", "ALL THE QUESTION WILL BE MULTIPLE CHOICE"], date: "Not Decided", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🧪" },
    { id: 2, name: "CODING CONTEST", rules: ["THERE WILL BE TWO ROUNDS (1ST WILL BE CHOOSE THE CORRECT ANSWER & 2ND WILL BE CODE EXECUTION)"], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "💻" },
    { id: 3, name: "DEBUGGING CONTEST", rules: ["DEBUG THE GIVEN CODE.", "TIME LIMIT WILL BE THERE."], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🐛" },
    { id: 4, name: "POSTER-PAPER PRESENTATION", rules: ["SINGLE ROUND WILL BE HELD.", "PRESENTATION SHOULD BE UNDER 10 MIN."], date: "Not Decided", fees: "Rs 150", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "📝" },
    { id: 5, name: "TREASURE HUNT", rules: ["TEAM BASED EVENT.", "FOLLOW THE CLUES TO FIND THE TREASURE."], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🗺️" },
    { id: 6, name: "LAN GAMING", rules: ["PARTICIPANTS SHOULD BRING THEIR OWN DEVICES.", "GAME RULES WILL BE ANNOUNCED ON THE SPOT."], date: "Not Decided", fees: "Rs 350", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🎮" },
    { id: 7, name: "CYBER SECURITY", rules: ["KNOWLEDGE OF CYBERSECURITY CONCEPTS REQUIRED.", "PRACTICAL AND THEORETICAL ROUNDS."], date: "Not Decided", fees: "Rs 200", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🔐" },
    { id: 8, name: "TECH TALK", rules: ["OPEN FOR ALL PARTICIPANTS.", "NO REGISTRATION FEE REQUIRED."], date: "Not Decided", fees: "Free for all", prizes: "CERTIFICATE OF PARTICIPATION", emoji: "🎤" },
    { id: 9, name: "PHARMA QUIZ", rules: ["QUESTIONS WILL BE RELATED TO PHARMACY.", "TIME LIMIT WILL BE THERE FOR EACH ROUND."], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "💊" },
    { id: 10, name: "CURE CREATION", rules: ["PRACTICAL ROUND.", "RELATED TO PHARMACEUTICAL PREPARATIONS."], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "⚗️" },
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
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pb-6 border-b border-neon-cyan/20">
          <div className="text-5xl mb-4">💻🧪⚡</div>
          <h1 className="text-4xl font-black gradient-party mb-2">Technical Events</h1>
          <p className="text-lg text-gray-400">
            Showcase your technical skills and win exciting prizes!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {technicalEvents.map((event) => (
            <div 
              key={event.id} 
              className="party-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-b border-neon-cyan/10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{event.emoji}</span>
                  <h2 className="text-xl font-bold text-white">{event.name}</h2>
                </div>
                <div className="text-sm text-neon-cyan/80 flex items-center ml-10">
                  📅 {event.date}
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
                    <h3 className="text-lg font-medium text-neon-purple mb-2">Rules & Guidelines</h3>
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
                  className="btn-party w-full py-2.5 px-4 rounded-xl font-medium"
                >
                  <span>🎉 Register Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-neon-yellow/80 text-sm mb-8 font-medium">
          🏆 ALL PARTICIPANTS WILL GET THE CERTIFICATE OF PARTICIPATION AND THERE ARE PRIZES FOR WINNER AND RUNNERUP 🏆
        </p>

        {/* Register Section */}
        <div className="party-card rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">💻⚡💻</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Participate?</h2>
          <p className="text-gray-400 mb-6">Register now to secure your spot in these exciting technical events!</p>
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

export default Technical;