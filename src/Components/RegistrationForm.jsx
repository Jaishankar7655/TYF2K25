import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, School, Tag, Loader2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Categories data — all registrations open
const categories = [
  {
    title: "Cultural",
    icon: "🎭",
    events: [
      { name: "Trudies (Rodies of Truba)", price: 100 },
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
      { name: "Poster presentation", price: 50 },
      { name: "Kavi Kosh (Poetry)", price: 50 },
      { name: "Mind Marathon (Duo)", price: 70 },
      { name: "AD-MAD-SHOW (per team )", price: 100 },
      { name: "IPL Auction (Per team) ", price: 150 },
      { name: "Extempore", price: 50 },
      { name: "Designer Cut", price: 50 },
      { name: "Becho To Jaane (Per team)", price: 50 },
    ],
  },
  {
    title: "Technical",
    icon: "💻",
    events: [
      { name: "Tech Quiz", price: 50 },
      { name: "Code Encounter", price: 100 },
      { name: "Tech Paper Presentation (Single/Duo)", price: 150 },
      { name: "Treasure Hunt", price: 200 },
      { name: "LAN Gaming", price: 350 },
      { name: "Cyber Security", price: 200 },
      { name: "Tech Talk", price: 0 },
      { name: "Pharma Quiz", price: 100 },
      { name: "Cure Creation", price: 100 },
      { name: "Buddhi Vimarsh", price: 50 },
      { name: "Commerce Quiz (Duo)", price: 100 },
      { name: "Cure Celebration (Duo)", price: 100 },
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
      { name: "Kabbadi (per team)", price: 500 },
      { name: "Arm Wrestling", price: 50 },
      { name: "Badminton", price: 50 },
      { name: "Chess", price: 50 },
      { name: "Volleyball (Per Team)", price: 600 },
      { name: "Kho-Kho (Per team)", price: 150 },
      { name: "Carrom", price: 50 },
    ],
  },
  {
    title: "SAC Committee",
    icon: "🌟",
    events: [
      { name: "Push-Up Challenge", price: 50 },
      { name: "Plank / Weight Add-On Challenge", price: 0 },
      { name: "Spoon Tie-Knot Challenge", price: 0 },
      { name: "Poetry", price: 0 },
      { name: "Arm Wrestling (SAC)", price: 50 },
      { name: "Bottle Flip", price: 0 },
      { name: "Thug of War (Per Team, Max 10)", price: 300 },
      { name: "Teacher's Ramp Walk", price: 0 },
      { name: "Blind Fold Challenge", price: 0 },
      { name: "Dance-Freeze Challenge", price: 0 },
      { name: "Paper Folding Dance", price: 0 },
      { name: "Truba Roadies", price: 0 },
      { name: "Cup Pyramid", price: 0 },
      { name: "Sign - Walk Game", price: 0 },
      { name: "Cricket Circle Game", price: 100 },
      { name: "Dare to Drink", price: 0 },
    ],
  },
];



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



  const calculateTotal = () => {
    let total = 0;

    selectedEvents.forEach((eventName) => {
      for (const category of categories) {
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
  
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_REGISTRATION_SCRIPT_URL;
  
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
    <div className="min-h-screen bg-dark-bg party-bg py-12 px-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="party-card rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">🎉🪩🎶</div>
            <h2 className="text-5xl font-black gradient-party mb-4">
              Join the Party!
            </h2>
            <p className="text-gray-400 text-lg">
              🎧 Register for Truba Fest 2026 🎧
            </p>
          </div>
  
          {/* Alert Message */}
          {alertMessage && (
            <div className="fixed top-6 left-0 right-0 mx-auto w-full max-w-md z-50">
              <div className="bg-red-900/80 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.2)] flex items-center backdrop-blur-md">
                <AlertTriangle className="h-5 w-5 mr-2 text-neon-yellow" />
                <p>{alertMessage}</p>
              </div>
            </div>
          )}
  
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl">
              <p className="text-red-300">{error}</p>
            </div>
          )}
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                  <User className="w-4 h-4 text-neon-pink" />
                  <span>Full Name</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface/80 border border-neon-purple/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 outline-none transition-all"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-neon-pink text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
  
              {/* Email Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                  <Mail className="w-4 h-4 text-neon-cyan" />
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
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface/80 border border-neon-purple/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 outline-none transition-all"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-neon-pink text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
  
              {/* Phone Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                  <Phone className="w-4 h-4 text-neon-purple" />
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
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface/80 border border-neon-purple/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50 outline-none transition-all"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-neon-pink text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
  
              {/* College Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                  <School className="w-4 h-4 text-neon-yellow" />
                  <span>College Name</span>
                </label>
                <input
                  {...register("college", {
                    required: "College name is required",
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface/80 border border-neon-purple/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-yellow/50 focus:border-neon-yellow/50 outline-none transition-all"
                  placeholder="Enter your college name"
                />
                {errors.college && (
                  <p className="mt-1 text-neon-pink text-sm">
                    {errors.college.message}
                  </p>
                )}
              </div>
            </div>
  
            {/* Events Selection */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Tag className="w-6 h-6 text-neon-pink" />
                <h3 className="text-2xl font-bold gradient-party">
                  🎶 Select Your Events
                </h3>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.title}
                    className="party-card rounded-xl p-6"
                  >
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </h4>
                    <div className="space-y-3">
                      {category.events.map((event) => (
                        <div key={event.name} className="space-y-2">
                          <div 
                            className="flex flex-col p-2 rounded-lg hover:bg-neon-purple/10 cursor-pointer transition-colors duration-200"
                            onClick={() => handleEventSelection(event, !selectedEvents.includes(event.name))}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={selectedEvents.includes(event.name)}
                                  onChange={() => {}}
                                  className="w-5 h-5 rounded border-neon-purple/30 text-neon-pink focus:ring-neon-pink bg-dark-surface"
                                />
                                <span className="text-gray-300 text-sm">
                                  {event.name}
                                </span>
                              </div>
                              <span className="font-medium text-neon-cyan text-sm">
                                {event.hasOptions
                                  ? "Price varies"
                                  : `₹${event.price}`}
                              </span>
                            </div>
  
                            {event.hasOptions &&
                              selectedEvents.includes(event.name) && (
                                <div className="ml-8 mt-2" onClick={(e) => e.stopPropagation()}>
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
                                    className="w-full px-3 py-2 rounded-lg bg-dark-surface border border-neon-purple/20 text-white focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 outline-none"
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
                                    <p className="mt-1 text-neon-pink text-sm">
                                      {errors[`${event.name} Options`].message}
                                    </p>
                                  )}
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {category.title === "SAC Committee" && (
                      <p className="mt-3 text-xs text-neon-yellow font-semibold text-center animate-pulse">
                        ✨ More events coming soon!
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

  
            {/* Total Amount and Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 glass-party border-t border-neon-purple/20 p-4 z-50">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-neon-yellow">🎟️</span> Total: <span className="text-neon-cyan">₹{calculateTotal()}</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedEvents.length === 0}
                  className="btn-party inline-flex items-center justify-center font-bold py-3 px-6 rounded-xl
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <span>Processing..</span>
                    </>
                  ) : (
                    <span>🎉 Continue For Payment</span>
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