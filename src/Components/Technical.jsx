import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Technical() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();

  const technicalEvents = [
    {
      id: 1,
      name: "COMMERCE QUIZ",
      rules: [
        "THERE WILL BE THREE ROUNDS (MCQ, PRESENTATION, RAPID FIRE).",
        "TIME LIMIT WILL BE THERE FOR EACH ROUND.",
        "POINTS FOR CORRECT ANSWERS AND PENALTIES FOR INCORRECT.",
      ],
      date: "7TH MARCH, 11:00 AM",
      fees: "RS 100 DUO",
      prizes: "TROPHY FOR WINNING AND RUNNERUP DUO",
    },
    {
      id: 2,
      name: "BUDDHI VIMARSH",
      rules: [
        "MAXIMUM 6 SLIDES CAN BE THERE.",
        "IT SHOULD BE RELATED TO PHARMACY TOPIC.",
        "EXPLANATION SHOULD BE SHORT AND SIMPLE.",
      ],
      date: "7TH MARCH, 2:00 PM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 3,
      name: "TECH PAPER PRESENTATION",
      rules: [
        "SINGLE ROUND WILL BE HELD.",
        "PRESENTATION SHOULD BE UNDER 10 MIN.",
      ],
      date: "7TH MARCH, 2:00 PM",
      fees: "RS 100 SINGLE /DUO",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 6,
      name: "TECHNICAL QUIZ (TECH TITAN)",
      rules: [
        "TOTAL 5 SECTION WILL BE THERE.",
        "QUESTION ATTEMPTATION SHOULD BE MANDATORY.",
        "ALL THE QUESTION WILL BE MULTIPLE CHOICE",
      ],
      date: "8TH MARCH, 2:00 PM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 7,
      name: "CODE ENCOUNTER",
      rules: [
        "THERE WILL BE TWO ROUNDS (1ST WILL BE CHOOSE THE CORRECT ANSWER & 2ND WILL BE CODE EXECUTION)",
      ],
      date: "9TH MARCH, 11:00 AM",
      fees: "Rs 100",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 5,
      name: "CURE CELEBRATION",
      rules: [
        "IT WILL BE OF TWO ROUNDS. (SIMPLE SYRUP IN FIRST ROUND & EFFERVESCENT POWDER IS FOR SECOND ROUND)",
      ],
      date: "8TH MARCH, 10:30 AM",
      fees: "RS 100 DUO",
      prizes: "TROPHY FOR WINNING AND RUNNERUP DUO",
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Technical Events</h1>
        <p className="text-lg text-gray-600">
          Showcase your technical skills and win exciting prizes!
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {technicalEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
          >
            {/* Event Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-pink-600 to-purple-400 text-white">
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
      
      {/* Register Section */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Participate?</h2>
        <p className="text-gray-600 mb-6">Register now to secure your spot in these exciting technical events!</p>
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

export default Technical;