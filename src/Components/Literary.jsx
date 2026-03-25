import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Literary() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();
  const literaryEvents = [
    { id: 14, name: "FOCUS & FRAME (PHOTOGRAPHY)", rules: ["THE NATURE OF EVENT."], date: "Not Decided", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "📸" },
    { id: 15, name: "CINEMATIC CAPITAL (REEL MAKING)", rules: ["CREATE A REEL.", "TIME LIMIT IS THERE."], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🎥" },
    { id: 16, name: "INK & INSIGHT (POETRY)", rules: ["VULGAR WRITING IS NOT ALLOWED."], date: "Not Decided", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "✍️" },
    { id: 17, name: "FACE PAINTING", rules: ["THERE WILL BE ONLY SINGLE ROUND"], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🖌️" },
    { id: 18, name: "COMMERCE QUIZ", rules: ["THERE WILL BE THREE ROUNDS.", "TIME LIMIT WILL BE THERE."], date: "Not Decided", fees: "Rs 100", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "📋" },
    { id: 19, name: "IPL - THE FINAL BIDDER", rules: ["TEAM SHOULD HAVE MAX 4 MEMBERS.", "BIDDING HAS TO BE DONE WITHIN ASSIGN BUDGET"], date: "Not Decided", fees: "Rs 200 (Per team max 4 person)", prizes: "TROPHY FOR WINNING TEAM", emoji: "🏏" },
    { id: 20, name: "EXTEMPORE", rules: ["PARTICIPANTS WILL BE GIVEN A RANDOM TOPIC AND THEY HAVE TO SPEAK ON THAT TOPIC."], date: "Not Decided", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🎙️" },
    { id: 21, name: "BECHO TOH JAANE (SOLD OUT)", rules: ["SELLING MATERIAL WILL BE PROVIDED BY INSTITUTION.", "MAX 4 PERSON PER TEAM."], date: "Not Decided", fees: "Rs 100 (Per team max 4 person)", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🛍️" },
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
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pb-6 border-b border-neon-purple/20">
          <div className="text-5xl mb-4">📚✍️🎙️</div>
          <h1 className="text-4xl font-black gradient-party mb-2">Literary Events</h1>
          <p className="text-lg text-gray-400">
            Express your creativity and showcase your literary talents!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {literaryEvents.map((event) => (
            <div 
              key={event.id} 
              className="party-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-b border-neon-purple/10">
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
          <div className="text-4xl mb-4">📚✨📚</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Showcase Your Talent?</h2>
          <p className="text-gray-400 mb-6">Register now to participate in these exciting literary events!</p>
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

export default Literary;