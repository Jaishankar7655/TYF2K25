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
      date: "8TH MARCH, 10:00 AM",
      fees: "RS 350 PER SQUAD",
      prizes:
        "CASH PRIZE(DEPENDS ON REGISTRATION) AND CERTIFICATES TO ALL PARTICIPANTS",
    },
    {
      id: 8,
      name: "CHESS",
      rules: ["REGULAR RULES."],
      date: "6TH MARCH, 10:00 AM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER ",
    },
    {
      id: 9,
      name: "BADMINTON",
      rules: ["SINGLES WILL BE THERE.", "MATCH WILL BE OF 11 POINTS."],
      date: "6TH MARCH, 11:00 AM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 10,
      name: "KHO-KHO",
      rules: ["8 PARTICIPANTS SHOULD BE THERE IN THE TEAM."],
      date: "6TH MARCH, 11:00 AM",
      fees: "RS 150 PER TEAM",
      prizes: "MEDAL & TROPHY FOR WINNING TEAM",
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
      date: "7TH MARCH, 1:00 PM",
      fees: "Rs 50",
      prizes:
        "TROPHY AND MEDAL FOR BOTH THE CATEGORY OF 60-80KG AND 80-ABOVE 100KG.",
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
      date: "7TH MARCH, 10:30 AM",
      fees: "RS 600 PER TEAM",
      prizes:
        " 1 TROPHY & 9 GOLD MEDALS TO WINNING TEAM & SILVER MEDALS FOR RUNNERUP TEAM",
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
      date: "7TH MARCH, 10:30 AM",
      fees: "RS 500 PER TEAM",
      prizes:
        " 1 TROPHY & 9 GOLD MEDALS TO WINNING TEAM & SILVER MEDALS FOR RUNNERUP TEAM",
    },
    {
      id: 14,
      name: "CARROM",
      rules: ["REGULAR RULES."],
      date: "7TH MARCH, 11:00 AM",
      fees: "Rs 50",
      prizes: "Not specified",
    },
  ];

  const handleToggleRules = (id) => {
    setOpenEventId(openEventId === id ? null : id);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Sports Events</h1>
        <p className="text-lg text-gray-600">
          Showcase your skills and compete in thrilling sports events!
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sportsEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
          >
            {/* Event Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-400 text-white">
              <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
              <div className="text-sm opacity-90 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {event.date}
              </div>
            </div>

            {/* Event Details */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">
                  Registration Fees:
                </span>
                <span className="text-gray-800">{event.fees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Prizes:</span>
                <span className="text-gray-800">{event.prizes}</span>
              </div>
            </div>

            {/* Rules Section */}
            <div className="px-6">
              <button
                className={`w-full text-left py-4 font-medium transition-colors duration-200 ${
                  openEventId === event.id ? "text-red-500" : "text-purple-600"
                } focus:outline-none`}
                onClick={() => handleToggleRules(event.id)}
              >
                {openEventId === event.id ? "Hide Rules" : "Show Rules"}
              </button>

              {openEventId === event.id && (
                <div className="pb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Rules & Guidelines
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-red-500 ">
        "ALL THE PARTICIPANTS WILL GET THE CERTIFICATE OF PARTICIPATION AND
        THERE ARE PRIZE FOR WINNER AND RUNNERUP"
      </p>

      {/* Register Section */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ready to Compete?
        </h2>
        <p className="text-gray-600 mb-6">
          Register now to participate in these exciting sports events!
        </p>
        <button
          onClick={handleRegister}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
        >
          Register for Events
        </button>
      </div>
    </div>
  );
}

export default Sport;
