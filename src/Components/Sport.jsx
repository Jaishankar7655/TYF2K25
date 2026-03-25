import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sport() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();

  const sportsEvents = [
    {
      id: 4,
      name: "BGMI AND FREE FIRE",
      rules: [
        "AT LEAST TWO TEAM MEMBERS HAVE TO BE PRESENT AT THE VENUE.",
        "CANDIDATES SHOULD REACH THE VENUE BEFORE 30 MINUTES.",
      ],
      date: "Not Decided",
      fees: "RS 350 PER SQUAD",
      prizes:
        "CASH PRIZE(DEPENDS ON REGISTRATION) AND CERTIFICATES TO ALL PARTICIPANTS",
      emoji: "🎮",
    },
    {
      id: 8,
      name: "CHESS",
      rules: ["REGULAR RULES."],
      date: "Not Decided",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER ",
      emoji: "♟️",
    },
    {
      id: 9,
      name: "BADMINTON",
      rules: ["SINGLES WILL BE THERE.", "MATCH WILL BE OF 11 POINTS."],
      date: "Not Decided",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
      emoji: "🏸",
    },
    {
      id: 10,
      name: "KHO-KHO",
      rules: ["8 PARTICIPANTS SHOULD BE THERE IN THE TEAM."],
      date: "Not Decided",
      fees: "RS 150 PER TEAM",
      prizes: "MEDAL & TROPHY FOR WINNING TEAM",
      emoji: "🏃",
    },
    {
      id: 11,
      name: "ARM WRESTLING",
      rules: [
        "ELBOWS MUST REMAIN ON TABLE AND HAND CENTERED, STRAIGHT WRIST.",
        "OPPONENT HAND TOUCHES THE TABLE OR COMMITS TO FOULS.",
        "LIFTING ELBOW, GRIP CHANGE, EARLY START, INTENTIONAL SLIP.",
        "WEIGHT RANGE: 60-80 KG AND 80-ABOVE 100KG.",
      ],
      date: "Not Decided",
      fees: "Rs 50",
      prizes:
        "TROPHY AND MEDAL FOR BOTH THE CATEGORY OF 60-80KG AND 80-ABOVE 100KG.",
      emoji: "💪",
    },
    {
      id: 12,
      name: "VOLLEYBALL",
      rules: [
        "EVERY SET IS OF 15 POINTS.",
        "TWO SUBSTITUTIONS ARE ALLOWED.",
        "PROPER SPORTS DRESS & SHOES ARE MANDATORY.",
        "UMPIRE DECISION WILL BE FINAL.",
        "TEAM CAN HAVE MAXIMUM 9 MEMBERS.",
      ],
      date: "Not Decided",
      fees: "RS 600 PER TEAM",
      prizes:
        " 1 TROPHY & 9 GOLD MEDALS TO WINNING TEAM & SILVER MEDALS FOR RUNNERUP TEAM",
      emoji: "🏐",
    },
    {
      id: 13,
      name: "KABADDI",
      rules: [
        "EVERY SET WILL BE OF 10 MIN.",
        "TEAM CAN USE MAXIMUM 2 SUBSTITUTIONS.",
        "BREAK WILL BE OF 1 MIN.",
        "PROPER DRESS AND SHOES ARE MANDATORY.",
        "UMPIRE DECISION WILL BE FINAL.",
      ],
      date: "Not Decided",
      fees: "RS 500 PER TEAM",
      prizes:
        " 1 TROPHY & 9 GOLD MEDALS TO WINNING TEAM & SILVER MEDALS FOR RUNNERUP TEAM",
      emoji: "🤼",
    },
    {
      id: 14,
      name: "CARROM",
      rules: ["REGULAR RULES."],
      date: "Not Decided",
      fees: "Rs 50",
      prizes: "Not specified",
      emoji: "🎯",
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
          <div className="text-4xl mb-4">⚡🏆⚡</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Compete?</h2>
          <p className="text-gray-400 mb-6">Register now to participate in these exciting sports events!</p>
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

export default Sport;
