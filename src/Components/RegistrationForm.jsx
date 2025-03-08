import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, School, Tag, Loader2, AlertTriangle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Event schedule data from the list
const eventSchedule = {
  "Commerce Quiz": { date: "2025-03-07", time: "11:00 AM" },
  "Buddhi Vimarsh": { date: "2025-03-07", time: "2:00 PM" },
  "Tech Paper presentation": { date: "2025-03-07", time: "11:00 AM" },
  "BGMI": { date: "2025-03-08", time: "10:00 AM" },
  "Freefire": { date: "2025-03-08", time: "10:00 AM" },
  "Cure Celebration": { date: "2025-03-08", time: "10:30 AM" },
  "Tech Quiz": { date: "2025-03-08", time: "2:00 PM" },
  "Code Encounter": { date: "2025-03-09", time: "11:00 AM" },
  "Chess": { date: "2025-03-06", time: "10:00 AM" },
  "Badminton": { date: "2025-03-06", time: "11:00 AM" },
  "Kho-Kho": { date: "2025-03-06", time: "11:00 AM" },
  "Arm Wrestling": { date: "2025-03-07", time: "1:00 PM" },
  "Volleyball": { date: "2025-03-07", time: "10:30 AM" },
  "Carrom": { date: "2025-03-07", time: "11:00 AM" },
  "Poster presentation": { date: "2025-03-07", time: "3:00 PM" },
  "Becho To Jaane": { date: "2025-03-07", time: "2:00 PM" },
  "IPL Auction": { date: "2025-03-08", time: "11:00 AM" },
  "Kavi Kosh": { date: "2025-03-08", time: "1:00 PM" },
  "Extempore": { date: "2025-03-08", time: "2:00 PM" },
  "Mind Marathon": { date: "2025-03-09", time: "11:00 AM" },
  "AD-MAD-SHOW": { date: "2025-03-09", time: "11:00 AM" },
  "Designer Cut": { date: "2025-03-09", time: "11:00 AM" },
  "Trudies": { date: "2025-03-06", time: "12:00 PM" },
  "Singing Competition": { date: "2025-03-08", time: "1:00 PM" },
  "Dance Competition": { date: "2025-03-08", time: "1:00 PM" },
  "Rangoli": { date: "2025-03-08", time: "10:00 AM" },
  "Face Painting": { date: "2025-03-09", time: "10:30 AM" },
  "Ramp Walk": { date: "2025-03-08", time: "4:30 PM" },
  "Nukkad natak": { date: "2025-03-09", time: "1:00 PM" },
  "Dance Battle": { date: "2025-03-09", time: "1:30 PM" },
  "Mono Act": { date: "2025-03-09", time: "1:00 PM" }, // Assuming same date as Nukkad natak
  "Kabbadi": { date: "2025-03-06", time: "10:00 AM" }, // Assuming same date as Chess
};

// Original categories data
const categories = [
  {
    title: "Cultural",
    icon: "🎭",
    events: [
      { name: "Trudies (Rodies of Truba)", price: 100, closed: true },
      {
        name: "Dance Competition",
        hasOptions: true,
        options: [
          { type: "Solo", price: 100 },
          { type: "Duo", price: 150 },
          { type: "Group", price: 250 },
        ],
      },
      { name: "Face Painting", price: 50 },
      { name: "Dance Battle", price: 100 },
      { name: "Ramp Walk", price: 100 },
      { name: "Rangoli", price: 50 },
      {
        name: "Singing Competition",
        hasOptions: true,
        options: [
          { type: "Solo", price: 50 },
          { type: "Duo", price: 100 },
          { type: "Group", price: 150 },
        ],
      },
      { name: "Nukkad natak", price: 100 },
      { name: "Mono Act", price: 100 },
    ],
  },
  {
    title: "Literary",
    icon: "📚",
    events: [
      { name: "Poster presentation", price: 50, closed: true },
      { name: "Kavi Kosh (Poetry)", price: 50 },
      { name: "Mind Marathon (Duo)", price: 70 },
      { name: "AD-MAD-SHOW (per team )", price: 100 },
      { name: "IPL Auction (Per team) ", price: 150 },
      { name: "Extempore", price: 50 },
      { name: "Designer Cut", price: 50 },
      { name: "Becho To Jaane (Per team)", price: 50, closed: true },
    ],
  },
  {
    title: "Technical",
    icon: "💻",
    events: [
      { name: "Tech Paper presentation , (Single/Duo) ", price: 100 },
      { name: "Code Encounter", price: 100 },
      { name: "Cure Celebration (Duo)", price: 100 },
      { name: "Tech Quiz", price: 50 },
      { name: "Buddhi Vimarsh", price: 50 },
      { name: "Commerce Quiz (Duo)", price: 100 },
    ],
  },
  {
    title: "E-Sports",
    icon: "🎮",
    events: [
      { name: "BGMI (Per Squad)", price: 350 },
      { name: "Freefire (Per squad)", price: 350 },
    ],
  },
  {
    title: "Sports",
    icon: "🏆",
    events: [
      { name: "Kabbadi (per team)", price: 500, closed: true },
      { name: "Arm Wrestling", price: 50, closed: true },
      { name: "Badminton", price: 50, closed: true },
      { name: "Chess", price: 50, closed: true },
      { name: "Volleyball (Per Team) ", price: 600, closed: true },
      { name: "Kho-Kho (Per team)", price: 150, closed: true },
      { name: "Carrom", price: 50, closed: true },
    ],
  },
];

// Utility function to format date to YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Utility function to get remaining time as a string
const getRemainingTime = (eventDate, eventTime) => {
  const now = new Date();
  const eventDateTime = new Date(`${eventDate} ${eventTime}`);
  
  if (isNaN(eventDateTime.getTime())) {
    return "Invalid date";
  }
  
  const diffMs = eventDateTime - now;
  if (diffMs <= 0) {
    return "Registration closed";
  }
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `Closes in ${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hr${diffHours > 1 ? 's' : ''}`;
  } else {
    return `Closes in ${diffHours} hr${diffHours > 1 ? 's' : ''}`;
  }
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventOptions, setEventOptions] = useState({
    "Singing Competition": "",
    "Dance Competition": "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState(categories);
  const [currentDate, setCurrentDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      college: "",
      events: [],
      "Singing Competition Options": "",
      "Dance Competition Options": "",
    },
  });

  // Update event closure status based on current date
  useEffect(() => {
    const today = formatDate(currentDate);
    
    // Create a deep copy of the categories array
    const updatedCategoriesData = JSON.parse(JSON.stringify(categories));
    
    // Update the closure status for each event
    updatedCategoriesData.forEach(category => {
      category.events.forEach(event => {
        // Extract the base event name without options
        let eventName = event.name.split(" (")[0];
        
        // Special case handling for events with different names in schedule
        if (eventName === "BGMI") eventName = "BGMI (Per Squad)";
        if (eventName === "Freefire") eventName = "Freefire (Per squad)";
        if (eventName === "Kavi Kosh") eventName = "Kavi Kosh (Poetry)";
        if (eventName === "IPL Auction") eventName = "IPL Auction (Per team)";
        if (eventName === "Tech Paper presentation") eventName = "Tech Paper presentation , (Single/Duo)";
        if (eventName === "Trudies") eventName = "Trudies (Rodies of Truba)";
        if (eventName === "Commerce Quiz") eventName = "Commerce Quiz (Duo)";
        
        // Find the event in the schedule
        const scheduleEvent = Object.keys(eventSchedule).find(key => {
          return eventName.includes(key) || key.includes(eventName);
        });
        
        if (scheduleEvent && eventSchedule[scheduleEvent]) {
          const eventDate = eventSchedule[scheduleEvent].date;
          // Close registration if today is the event date or after
          if (today >= eventDate) {
            event.closed = true;
          }
          // Store the date for display purposes
          event.date = eventSchedule[scheduleEvent].date;
          event.time = eventSchedule[scheduleEvent].time;
        }
      });
    });
    
    setUpdatedCategories(updatedCategoriesData);
    
    // Remove any selected events that are now closed
    setSelectedEvents(prev => prev.filter(eventName => {
      const eventFound = updatedCategoriesData.some(category => 
        category.events.some(event => 
          event.name === eventName && !event.closed
        )
      );
      return eventFound;
    }));
    
  }, [currentDate]);

  const calculateTotal = () => {
    let total = 0;

    selectedEvents.forEach((eventName) => {
      for (const category of updatedCategories) {
        const event = category.events.find((e) => e.name === eventName);
        if (event) {
          if (event.hasOptions) {
            const selectedOption = eventOptions[event.name];
            if (selectedOption) {
              const option = event.options.find(
                (opt) => opt.type === selectedOption
              );
              if (option) {
                total += option.price;
              }
            }
          } else {
            total +=
              typeof event.price === "number"
                ? event.price
                : parseInt(event.price);
          }
          break;
        }
      }
    });

    return total;
  };

  const handleEventSelection = (event, isChecked) => {
    if (event.closed) {
      setAlertMessage(`Registration for "${event.name}" is closed.`);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return;
    }

    if (isChecked) {
      setSelectedEvents((prev) => [...prev, event.name]);
    } else {
      setSelectedEvents((prev) => prev.filter((e) => e !== event.name));
      if (
        event.name === "Singing Competition" ||
        event.name === "Dance Competition"
      ) {
        setEventOptions((prev) => ({
          ...prev,
          [event.name]: "",
        }));
        setValue(`${event.name} Options`, "");
      }
    }
  };

  const handleOptionChange = (eventName, option) => {
    setEventOptions((prev) => ({
      ...prev,
      [eventName]: option,
    }));
  };

  const validateEventOptions = (eventName) => {
    if (selectedEvents.includes(eventName) && !eventOptions[eventName]) {
      return "Please select a category";
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setError("");
      setIsSubmitting(true);
  
      const eventsData = selectedEvents
        .map((eventName) => {
          if (
            eventName === "Singing Competition" ||
            eventName === "Dance Competition"
          ) {
            return `${eventName} (${eventOptions[eventName]})`;
          }
          return eventName;
        })
        .join(", ");
  
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("college", data.college);
      formData.append("events", eventsData);
      formData.append("totalAmount", calculateTotal());
  
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxVdY1Leca6iuIwN-Msb0gKIQehwh488UT7E3Z4J84rTRBT7Cno5I4TDaZa1xcaSrN5/exec";
  
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
  
      if (response.type === "opaque") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
  
        navigate("/payment", {
          state: {
            totalAmount: calculateTotal(),
            email: data.email,
            phone: data.phone,
            message:
              "Registration successful! Please check your email for the confirmation and QR code.",
          },
        });
      } else {
        throw new Error("Registration submission failed");
      }
    } catch (error) {
      setError(
        "Failed to submit registration. Please refresh the page and try again."
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
              Join the Celebration!
            </h2>
            <p className="text-gray-600 text-lg">
              Register for Truba Youth Fest 2K25
            </p>
            <p className="text-gray-500 mt-2 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-1" />
              Current Date: {currentDate.toLocaleDateString()}
            </p>
          </div>
  
          {/* Alert Message */}
          {alertMessage && (
            <div className="fixed top-6 left-0 right-0 mx-auto w-full max-w-md z-50">
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p>{alertMessage}</p>
              </div>
            </div>
          )}
  
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
  
              {/* Email Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
  
              {/* Phone Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
  
              {/* College Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <School className="w-4 h-4" />
                  <span>College Name</span>
                </label>
                <input
                  {...register("college", {
                    required: "College name is required",
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Enter your college name"
                />
                {errors.college && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.college.message}
                  </p>
                )}
              </div>
            </div>
  
            {/* Events Selection */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Tag className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-900">
                  Select Your Events
                </h3>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {updatedCategories.map((category) => (
                  <div
                    key={category.title}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <h4 className="text-xl font-bold text-purple-900 mb-4 flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </h4>
                    <div className="space-y-3">
                      {category.events.map((event) => (
                        <div key={event.name} className="space-y-2">
                          <div 
                            className={`flex flex-col p-2 rounded-lg 
                                     ${event.closed ? 'bg-gray-50 opacity-75' : 'hover:bg-purple-50 cursor-pointer'} 
                                     transition-colors duration-200`}
                            onClick={() => !event.closed && handleEventSelection(event, !selectedEvents.includes(event.name))}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  disabled={event.closed}
                                  checked={selectedEvents.includes(event.name)}
                                  onChange={() => {}} // Handling via the onClick of the parent div
                                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
                                />
                                <span className={`${event.closed ? 'text-gray-400' : 'text-gray-700'}`}>
                                  {event.name}
                                </span>
                              </div>
                              <span className={`font-medium ${event.closed ? 'text-gray-400' : 'text-purple-600'}`}>
                                {event.hasOptions
                                  ? "Price varies"
                                  : `₹${event.price}`}
                              </span>
                            </div>
                            
                            {/* Event schedule information */}
                            {event.date && (
                              <div className={`text-xs mt-1 ml-8 flex items-center ${event.closed ? 'text-red-400' : 'text-green-600'}`}>
                                <Calendar className="w-3 h-3 mr-1" />
                                {event.closed 
                                  ? "Registration closed" 
                                  : getRemainingTime(event.date, event.time)}
                                <span className="ml-1">
                                  ({new Date(event.date).toLocaleDateString()} {event.time})
                                </span>
                              </div>
                            )}
  
                            {event.hasOptions &&
                              selectedEvents.includes(event.name) && (
                                <div className="ml-8 mt-2">
                                  <select
                                    {...register(`${event.name} Options`, {
                                      validate: () =>
                                        validateEventOptions(event.name),
                                    })}
                                    value={eventOptions[event.name]}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        event.name,
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                  >
                                    <option value="">Select Category</option>
                                    {event.options.map((option) => (
                                      <option
                                        key={option.type}
                                        value={option.type}
                                      >
                                        {option.type} - ₹{option.price}
                                      </option>
                                    ))}
                                  </select>
                                  {errors[`${event.name} Options`] && (
                                    <p className="mt-1 text-red-500 text-sm">
                                      {errors[`${event.name} Options`].message}
                                    </p>
                                  )}
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Total Amount and Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg p-4 border-t border-gray-200">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="text-lg font-bold text-purple-900">
                  Total Amount: ₹{calculateTotal()}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedEvents.length === 0}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-xl
                           shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing..
                    </>
                  ) : (
                    "Continue For Payment"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  };
  
  export default RegistrationForm;