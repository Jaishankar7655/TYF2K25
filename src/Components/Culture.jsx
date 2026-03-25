import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Culture() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();
  const culturalEvents = [
    {
      id: 22, name: "TRUDIES",
      rules: ["NO SPECIFIC RULES."],
      date: "6TH MARCH, 12:00 AM", fees: "Rs 50", prizes: "TROPHY FOR WINNER", emoji: "🎤",
    },
    {
      id: 23, name: "SONG COMPETITION",
      rules: ["TIME DURATION WILL BE UNDER 5 MIN.", "MAXIMUM 5 MAMBER IS ALLOWED IN THE GROUP."],
      date: "8TH MARCH, 1:00 PM", fees: "SOLO- Rs 50, DUET Rs 100, GROUP Rs150",
      prizes: "SOLO:- 1 TROPHY FOR WINNER, DUO :- 2 TROPHY FOR WINNER, GROUP:- 1 TROPHY FOR WINNING GROUP", emoji: "🎵",
    },
    {
      id: 24, name: "DANCE COMPETITION",
      rules: ["ALL THE PARTICIPANTS MUST REGISTER BEFORE THE DEADLINE.", "EACH PERFORMANCE SHOULD BE PERFORMED UNDER 5 MIN.", "PARTICIPANTS MUST PROVIDE THEIR OWN MUSIC.", "GROUP CAN HAVE MAXIMUM 8 MEMBER."],
      date: "8TH MARCH, 1:00 PM", fees: "SOLO- Rs 100, DUET Rs 150, GROUP Rs 250",
      prizes: "SOLO:- 1ST, 2ND & 3RD PRICE, DUO :- 1ST, 2ND & 3RD PRICE, GROUP:- 1ST & 2ND PRICE.", emoji: "💃",
    },
    {
      id: 25, name: "RANGOLI",
      rules: ["RANGOLI COLOURS IS ALLOWED FOR RANGOLI.(NO PAINTS OR FLOWER IS ALLOWED)", "THEME:- WOMEN DAY.", "TIME LIMITS WILL BE 1 HRS.", "SIZE OF AREA FOR RANGOLI WILL BE 4FT * 4 FT"],
      date: "8TH MARCH, 10:30 AM", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🎨",
    },
    {
      id: 26, name: "FACE PAINTAING",
      rules: ["THERE WILL BE ONLY SINGLE ROUND"],
      date: "9TH MARCH, 10:30 AM", fees: "Rs 50", prizes: "TROPHY FOR WINNER AND RUNNERUP", emoji: "🖌️",
    },
    {
      id: 27, name: "RAMP WALK",
      rules: ["DAY 1 THEME :- BOLLYWOOD.", "DAY-2 THEME:- ANGEL AND DEVIL."],
      date: "8TH MARCH, 4:30 PM", fees: "Rs100", prizes: "TROPHY FOR WINNER AND RUNNERUP FOR MALE AND FEMALE CANDIDATE", emoji: "🕺",
    },
    {
      id: 28, name: "NUKKAD NATAK",
      rules: ["THEME:- SOCIAL AWARENESS.", "MAX 10 MEMBER PER TEAM.", "TIME LIMIT WILL BE 10 MIN.", "TEAM SHOULD BRING THEIR OWN PROPS.", "MIC AND SOUND SYSTEM IS NOT ALLOWED"],
      date: "9TH MARCH, 1.00PM", fees: "Rs100 PER TEAM", prizes: " TROPHY FOR WINNING GROUP", emoji: "🎭",
    },
    {
      id: 29, name: "DANCE BATTLE",
      rules: ["FIRST ROUND:- PERFORMED UNDER 2 MIN.(THEME:- BOLLYWOOD)", "SECOND ROUND:- PERFORMED UNDER 2 MIN. (THEME:- HIP-HOP BEAT)", "THIRD ROUND:- PERFORMED UNDER 4 MIN.((THEME:- GIVEN ON THE SPOT)"],
      date: "9TH MARCH, 1:30 PM", fees: "Rs100", prizes: "TROPHY FOR 1ST, 2ND & 3RD", emoji: "🔥",
    },
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
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pb-6 border-b border-neon-pink/20">
          <div className="text-5xl mb-4">🎭🎤🪩</div>
          <h1 className="text-4xl font-black gradient-party mb-2">Cultural Events</h1>
          <p className="text-lg text-gray-400">
            Showcase your talents and celebrate art, music, and performance!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {culturalEvents.map((event) => (
            <div 
              key={event.id} 
              className="party-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border-b border-neon-pink/10">
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
          <div className="text-4xl mb-4">🎵🪩🎵</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Showcase Your Cultural Talent?</h2>
          <p className="text-gray-400 mb-6">Register now to participate in these exciting cultural events!</p>
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

export default Culture;