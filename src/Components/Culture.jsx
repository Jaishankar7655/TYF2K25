import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Culture() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();
  const culturalEvents = [
    {
      id: 22,
      name: "TRUDIES",
      rules: [
        "NO SPECIFIC RULES."
      ],
      date: "6TH MARCH, 12:00 AM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER",
    },
    {
      id: 23,
      name: "SONG COMPETITION",
      rules: [
        "TIME DURATION WILL BE UNDER 5 MIN.",
        "MAXIMUM 5 MAMBER IS ALLOWED IN THE GROUP."
      ],
      date: "8TH MARCH, 1:00 PM",
      fees: "SOLO- Rs 50, DUET Rs 100, GROUP Rs150",
      prizes: "SOLO:- 1 TROPHY FOR WINNER, DUO :- 2 TROPHY FOR WINNER, GROUP:- 1 TROPHY FOR WINNING GROUP",
    },
    {
      id: 24,
      name: "DANCE COMPETITION",
      rules: [
        "ALL THE PARTICIPANTS MUST REGISTER BEFORE THE DEADLINE.",
        "EACH PERFORMANCE SHOULD BE PERFORMED UNDER 5 MIN.",
        "PARTICIPANTS MUST PROVIDE THEIR OWN MUSIC.",
        "GROUP CAN HAVE MAXIMUM 8 MEMBER."
      ],
      date: "8TH MARCH, 1:00 PM",
      fees: "SOLO- Rs 100, DUET Rs 150, GROUP Rs 250",
      prizes: "SOLO:- 1ST, 2ND & 3RD PRICE, DUO :- 1ST, 2ND & 3RD PRICE, GROUP:- 1ST & 2ND PRICE.",
    },
    {
      id: 25,
      name: "RANGOLI",
      rules: [
        "RANGOLI COLOURS IS ALLOWED FOR RANGOLI.(NO PAINTS OR FLOWER IS ALLOWED)",
        "THEME:- WOMEN DAY.",
        "TIME LIMITS WILL BE 1 HRS.",
        "SIZE OF AREA FOR RANGOLI WILL BE 4FT * 4 FT"
      ],
      date: "8TH MARCH, 10:30 AM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 26,
      name: "FACE PAINTAING",
      rules: [
        "THERE WILL BE ONLY SINGLE ROUND"
      ],
      date: "9TH MARCH, 10:30 AM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 27,
      name: "RAMP WALK",
      rules: [
        "DAY 1 THEME :- BOLLYWOOD.",
        "DAY-2 THEME:- ANGEL AND DEVIL."
      ],
      date: "8TH MARCH, 4:30 PM",
      fees: "Rs100",
      prizes: "TROPHY FOR WINNER AND RUNNERUP FOR MALE AND FEMALE CANDIDATE",
    },
    {
      id: 28,
      name: "NUKKAD NATAK",
      rules: [
        "THEME:- SOCIAL AWARENESS.",
        "MAX 10 MEMBER PER TEAM.",
        "TIME LIMIT WILL BE 10 MIN.",
        "TEAM SHOULD BRING THEIR OWN PROPS.",
        "MIC AND SOUND SYSTEM IS NOT ALLOWED"
      ],
      date: "9TH MARCH, 1.00PM",
      fees: "Rs100 PER TEAM",
      prizes: " TROPHY FOR WINNING GROUP",
    },
    {
      id: 29,
      name: "DANCE BATTLE",
      rules: [
        "FIRST ROUND:- PERFORMED UNDER 2 MIN.(THEME:- BOLLYWOOD)",
        "SECOND ROUND:- PERFORMED UNDER 2 MIN. (THEME:- HIP-HOP BEAT)",
        "THIRD ROUND:- PERFORMED UNDER 4 MIN.((THEME:- GIVEN ON THE SPOT)"
      ],
      date: "9TH MARCH, 1:30 PM",
      fees: "Rs100",
      prizes: "TROPHY FOR 1ST, 2ND & 3RD",
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Cultural Events</h1>
        <p className="text-lg text-gray-600">
          Showcase your talents and celebrate art, music, and performance!
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {culturalEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
          >
            {/* Event Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
              <div className="text-sm opacity-90 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
                {event.date}
              </div>
            </div>
            
            {/* Event Details */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Registration Fees:</span>
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
                  openEventId === event.id ? "text-red-500" : "text-blue-600"
                } focus:outline-none`}
                onClick={() => handleToggleRules(event.id)}
              >
                {openEventId === event.id ? "Hide Rules" : "Show Rules"}
              </button>
              
              {openEventId === event.id && (
                <div className="pb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Rules & Guidelines</h3>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <p className='text-center text-red-500 ' >"ALL THE PARTICIPANTS WILL GET THE CERTIFICATE OF PARTICIPATION AND THERE ARE PRIZE FOR WINNER AND RUNNERUP"</p>
      {/* Register Section */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Showcase Your Cultural Talent?</h2>
        <p className="text-gray-600 mb-6">Register now to participate in these exciting cultural events!</p>
        <button 
          onClick={handleRegister}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
        >
          Register for Events
        </button>
      </div>
    </div>
  );
}

export default Culture;