import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, School, Tag, Loader2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Global registration deadline — after this, the entire registration form is closed
const GLOBAL_REG_DEADLINE = "2026-04-07T21:00:00+05:30";

// Force close online registration
const ONLINE_REG_CLOSED = true;

// Categories data — all registrations open
const categories = [
  {
    title: "Technical",
    icon: "💻",
    events: [
      { name: "LAN Gaming", price: 350, closingDate: "2026-04-06T10:30:00+05:30", closingDateStr: "6 APRIL, 10:30 AM" },
      { name: "Tech Talk", price: 0, closingDate: "2026-04-06T10:30:00+05:30", closingDateStr: "6 APRIL, 10:30 AM" },
      { name: "Poster-Paper Presentation", price: 150, closingDate: "2026-04-06T10:30:00+05:30", closingDateStr: "6 APRIL, 10:30 AM" },
      { name: "Cure Creation", price: 50, closingDate: "2026-04-06T11:00:00+05:30", closingDateStr: "6 APRIL, 11:00 AM" },
      { name: "Tech Quiz", price: 50, closingDate: "2026-04-06T12:30:00+05:30", closingDateStr: "6 APRIL, 12:30 PM" },
      { name: "Coding Contest", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Treasure Hunt", price: 200, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Cyber Security", price: 200, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Pharma Quiz", price: 50, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Debugging Contest", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
    ],
  },
  {
    title: "Sports",
    icon: "🏆",
    events: [
      { name: "Javelin Throw", price: 50, closingDate: "2026-04-04T10:00:00+05:30", closingDateStr: "4 APRIL, 10:00 AM" },
      { name: "Cricket 2v2 ", price: 300, closingDate: "2026-04-04T10:00:00+05:30", closingDateStr: "4 APRIL, 10:00 AM" },
      { name: "Carrom", price: 50, closingDate: "2026-04-04T10:30:00+05:30", closingDateStr: "4 APRIL, 10:30 AM" },
      { name: "Discus Throw", price: 50, closingDate: "2026-04-04T10:30:00+05:30", closingDateStr: "4 APRIL, 10:30 AM" },
      { name: "Rapid Run-Race", price: 50, closingDate: "2026-04-04T11:00:00+05:30", closingDateStr: "4 APRIL, 11:00 AM" },
      { name: "Shot Put", price: 50, closingDate: "2026-04-02T12:00:00+05:30", closingDateStr: "4 APRIL, 12:00 PM" },
      { name: "Badminton", price: 50, closingDate: "2026-04-05T10:00:00+05:30", closingDateStr: "5 APRIL, 10:00 AM" },
      { name: "Kabaddi", price: 300, closingDate: "2026-04-05T10:00:00+05:30", closingDateStr: "5 APRIL, 10:00 AM" },
      { name: "Kho-Kho", price: 300, closingDate: "2026-04-05T11:00:00+05:30", closingDateStr: "5 APRIL, 11:00 AM" },
      { name: "Tug of War", price: 50, closingDate: "2026-04-04T21:00:00+05:30", closingDateStr: "4 APRIL, 9:00 PM" },
      { name: "Table Tennis", price: 50, closingDate: "2026-04-05T11:00:00+05:30", closingDateStr: "5 APRIL, 11:00 AM" },
      { name: "Chess", price: 50, closingDate: "2026-04-05T11:00:00+05:30", closingDateStr: "5 APRIL, 11:00 AM" },
    ],
  },
  {
    title: "Literary",
    icon: "📚",
    events: [
      { name: "Cinematic Capital (Reel Making)", price: 100, closingDate: "2026-04-06T11:00:00+05:30", closingDateStr: "6 APRIL, 11:00 AM" },
      { name: "Focus & Frame (Photography)", price: 50, closingDate: "2026-04-06T11:00:00+05:30", closingDateStr: "6 APRIL, 11:00 AM" },
      { name: "IPL - The Final Bidder", price: 200, closingDate: "2026-04-06T11:00:00+05:30", closingDateStr: "6 APRIL, 11:00 AM" },
      { name: "Ink & Insight (Poetry)", price: 50, closingDate: "2026-04-06T12:00:00+05:30", closingDateStr: "6 APRIL, 12:00 PM" },
      { name: "Becho Toh Jaane (Sold Out)", price: 100, closingDate: "2026-04-06T13:00:00+05:30", closingDateStr: "6 APRIL, 1:00 PM" },
      { name: "Commerce Quiz", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Face Painting", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Extempore", price: 50, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
    ],
  },
  {
    title: "Cultural",
    icon: "🎭",
    events: [
      { name: "Colorful Canvas (Rangoli)", price: 50, closingDate: "2026-04-06T11:00:00+05:30", closingDateStr: "6 APRIL, 11:00 AM" },
      { name: "Henna Harmony (Mehendi)", price: 50, closingDate: "2026-04-06T11:00:00+05:30", closingDateStr: "6 APRIL, 11:00 AM" },
      { name: "Dance Battle", price: 100, closingDate: "2026-04-06T14:00:00+05:30", closingDateStr: "6 APRIL, 2:00 PM" },
      { name: "Open Mic", price: 50, closingDate: "2026-04-06T15:00:00+05:30", closingDateStr: "6 APRIL, 3:00 PM" },
      { name: "Copy Paste (Mimicry)", price: 50, closingDate: "2026-04-06T15:00:00+05:30", closingDateStr: "6 APRIL, 3:00 PM" },
      { name: "Acting Antics (Skit)", price: 250, closingDate: "2026-04-06T15:00:00+05:30", closingDateStr: "6 APRIL, 3:00 PM" },
      {
        name: "Dance (Solo-Duo-Group)",
        hasOptions: true,
        options: [
          { type: "Solo", price: 100 },
          { type: "Duo", price: 200 },
          { type: "Group", price: 250 },
        ],
        closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM"
      },
      {
        name: "Singing (Solo-Duo)",
        hasOptions: true,
        options: [
          { type: "Solo", price: 50 },
          { type: "Duo", price: 100 },
        ],
        closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM"
      },
      { name: "Walk & Wow (Ramp Walk)", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
    ],
  },
  {
    title: "SAC Committee",
    icon: "🌟",
    events: [
      { name: "Push-Up Challenge", price: 50, closingDate: "2026-04-06T23:59:00+05:30", closingDateStr: "6 APRIL 2026" },
      { name: "Spoon Tie-Knot Challenge", price: 50, closingDate: "2026-04-06T23:59:00+05:30", closingDateStr: "6 APRIL 2026" },
      { name: "Arm Wrestling (SAC)", price: 50, closingDate: "2026-04-06T23:59:00+05:30", closingDateStr: "6 APRIL 2026" },
      { name: "Blind Fold Challenge", price: 0, closingDate: "2026-04-06T23:59:00+05:30", closingDateStr: "6 APRIL 2026" },
      { name: "Cup Pyramid", price: 0, closingDate: "2026-04-06T23:59:00+05:30", closingDateStr: "6 APRIL 2026" },
      { name: "Dare to Drink", price: 50, closingDate: "2026-04-06T23:59:00+05:30", closingDateStr: "6 APRIL 2026" },
      { name: "Plank / Weight Add-On Challenge", price: 50, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Poetry", price: 0, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Bottle Flip", price: 0, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Thug of War (Per Team, Max 10)", price: 300, closingDate: "2026-04-04T21:00:00+05:30", closingDateStr: "4 APRIL, 9:00 PM" },
      { name: "Dance-Freeze Challenge", price: 0, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Paper Folding Dance", price: 0, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Truba Roadies", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Sign - Walk Game", price: 50, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
      { name: "Cricket Circle Game", price: 100, closingDate: "2026-04-07T21:00:00+05:30", closingDateStr: "7 APRIL, 9:00 PM" },
    ],
  },
];

// Check if global registration is closed
const isGlobalRegistrationClosed = () => new Date() > new Date(GLOBAL_REG_DEADLINE);

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventOptions, setEventOptions] = useState({
    "Singing (Solo-Duo)": "",
    "Dance (Solo-Duo-Group)": "",
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
      "Singing (Solo-Duo) Options": "",
      "Dance (Solo-Duo-Group) Options": "",
    },
  });

  // If global registration is closed, show closed message
  if (isGlobalRegistrationClosed()) {
    return (
      <div className="min-h-screen bg-dark-bg party-bg py-12 px-4 relative overflow-hidden flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-lg mx-auto relative z-10 text-center">
          <div className="party-card rounded-3xl p-10">
            <div className="text-6xl mb-6">🚫</div>
            <h2 className="text-4xl font-black text-red-400 mb-4">
              Registration Closed
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              The registration deadline for <span className="text-neon-cyan font-bold">Truba Fest 2026</span> has passed. All registrations are now closed.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              If you have already registered, please check your email for confirmation details.
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn-party inline-flex items-center justify-center font-bold py-3 px-8 rounded-xl"
            >
              <span>🏠 Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    const isClosed = event.closed || (event.closingDate && new Date() > new Date(event.closingDate));
    if (isClosed) {
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
        event.name === "Singing (Solo-Duo)" ||
        event.name === "Dance (Solo-Duo-Group)"
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

      const detailedEventsList = selectedEvents.map((eventName) => {
        let price = null;
        let category = null;
        for (const cat of categories) {
          const event = cat.events.find((e) => e.name === eventName);
          if (event) {
            let catTitle = cat.title === "SAC Committee" ? "SAC Committee" : cat.title;
            if (event.hasOptions) {
              const selectedOption = eventOptions[event.name] || null;
              category = selectedOption ? `${catTitle} - ${selectedOption}` : catTitle;
              if (selectedOption) {
                const opt = event.options.find((o) => o.type === selectedOption);
                if (opt) price = opt.price;
              }
            } else {
              category = catTitle;
              price = typeof event.price === "number" ? event.price : parseInt(event.price);
            }
            break;
          }
        }
        return { name: eventName, category: category, price: price };
      });

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("college", data.college);
      formData.append("events", JSON.stringify(detailedEventsList));
      formData.append("totalAmount", calculateTotal());

      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVdY1Leca6iuIwN-Msb0gKIQehwh488UT7E3Z4J84rTRBT7Cno5I4TDaZa1xcaSrN5/exec";

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      if (response.type === "opaque") {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const totalAmt = calculateTotal();
        if (totalAmt === 0) {
          navigate("/registration-confirmed", {
            state: {
              email: data.email,
              phone: data.phone,
            },
          });
        } else {
          navigate("/payment", {
            state: {
              totalAmount: totalAmt,
              email: data.email,
              phone: data.phone,
              message:
                "Registration successful! Please check your email for the confirmation and QR code.",
            },
          });
        }
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
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* ✅ ONLINE REGISTRATION CLOSED BANNER */}
      {ONLINE_REG_CLOSED && (
        <div className="relative z-20 max-w-5xl mx-auto mb-6">
          <div className="bg-yellow-400/10 border border-yellow-400/50 rounded-2xl px-5 py-4 flex items-start gap-3 backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.15)]">
            <span className="text-2xl mt-0.5">📢</span>
            <div>
              <p className="text-yellow-300 font-black text-sm uppercase tracking-widest mb-1">
                Important Notice
              </p>
              <p className="text-yellow-100 font-bold text-base leading-snug">
                ONLINE REGISTRATION HAS BEEN CLOSED.
              </p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                OFFLINE / ON-SPOT REGISTRATION WILL BE TAKEN FOR TOMORROW{" "}
                <span className="text-neon-cyan font-bold">(07-04-2026)</span> EVENTS.
                KINDLY REACH CAMPUS BEFORE EVENTS STARTS FOR OFFLINE / ON-SPOT REGISTRATION.
              </p>
            </div>
          </div>
        </div>
      )}

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
