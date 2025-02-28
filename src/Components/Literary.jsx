import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Literary() {
  const [openEventId, setOpenEventId] = useState(null);
  const navigate = useNavigate();
  const literaryEvents = [
    {
      id: 14,
      name: "POSTER PRESENTATION",
      rules: [
        "THEME:- WOMENS DAY.",
        "USE GRAPHICS & ILLUSTRATIONS.",
        "ONLY HAND MADE POSTER WILL BE CONSIDERED.",
        "PRESENTATION TIME LIMIT FOR EXPLAINATION WILL BE 2 MIN.",
        "POSTER SIZE IS A0 SIZE(33* 46 INCH).",
        "POSTERS HAS TO BE PRE HAND MADE"
      ],
      date: "7TH MARCH, 3:00 PM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 15,
      name: "BECHO TO JAANE",
      rules: [
        "SELLING MATERIAL WILL BE PROVIDED BY INSTITUTION.",
        "TIME LIMIT WILL BE HALF N HOUR."
      ],
      date: "7TH MARCH, 2:00 PM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 16,
      name: "IPL AUCATION",
      rules: [
        "TEAM SHOULD HAVE 3 MEMBERS.",
        "BIDDING HAS TO BE DONE WITHIN ASSIGN BUDGET"
      ],
      date: "8TH MARCH, 11:00 AM",
      fees: "Rs 150 PER TEAM",
      prizes: "TROPHY FOR WINNING AND RUNNERUP TEAM",
    },
    {
      id: 17,
      name: "POETRY (KAVI KOSH)",
      rules: [
        "VULGAR WRITING IS NOT ALLOWED."
      ],
      date: "8TH MARCH, 1:00 PM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 18,
      name: "EXTEMPORE",
      rules: [
        "PARTICIPANTS WILL BE GIVEN A TANDOM TOPIC AND THEY HAVE TO SPEAK ON THAT TOPIC.",
        "PERTICULAR TIME WILL BE GIVEN TO SPEAK.",
        "PARTICIPANTS WILL NOT BE ALLOWED TO PREPARE SPEECH IN ADVANCE."
      ],
      date: "8TH MARCH, 2:00 PM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 19,
      name: "MIND MARATHON",
      rules: [
        "THERE WILL BE 4 ROUNDS.",
        "QUESTIONS WILL BE ON GENERAL SCIENCE, GK AND CURRENT AFFAIRS.",
        "TIME LIMIT WILL BE THERE FOR FIRST"
      ],
      date: "9TH MARCH, 11:00 AM",
      fees: "RS 70 DUO",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
    },
    {
      id: 20,
      name: "AD MAD SHOW",
      rules: [
        "MAX FOUR MEMBER PER TEAM.",
        "TIME LIMIT WILL BE 2 MIN.",
        "ONE AD HAS TO BE PREPARED IN ADVANCED FOR ROUND ONE."
      ],
      date: "9TH MARCH, 11:00 AM",
      fees: "Rs100 PER TEAM",
      prizes: "TROPHY FOR 1ST, 2ND & 3RD ",
    },
    {
      id: 21,
      name: "DESIGNER CUT",
      rules: [
        "MAX TWO MEMBER PER TEAM.",
        "NEWSPAPER IS PROVIDED BY INSTITUTION.",
        "CUT AND DESIGN WILL BE DONE IN THE GIVEN TIME.",
        "DRESS CAN BE WAREABLE AND DECENT.",
        "NO PRE-PREPARED DRESS WILL BE ALLOWED."
      ],
      date: "9TH MARCH, 11:00 AM",
      fees: "Rs 50",
      prizes: "TROPHY FOR WINNER AND RUNNERUP",
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Literary Events</h1>
        <p className="text-lg text-gray-600">
          Express your creativity and showcase your literary talents!
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {literaryEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
          >
            {/* Event Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-400 text-white">
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
                <span className="text-gray-800">{event.prizes.toLowerCase()}</span>
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Showcase Your Talent?</h2>
        <p className="text-gray-600 mb-6">Register now to participate in these exciting literary events!</p>
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

export default Literary;