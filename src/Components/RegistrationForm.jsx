import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, School, Tag, Loader2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Global registration deadline — CLOSED (past date triggers closed screen)
const GLOBAL_REG_DEADLINE = "2026-04-06T23:59:00+05:30";

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
      { name: "Coding Contest", price: 100, closingDate: "2026-04-07T10:30:00+05:30", closingDateStr: "7 APRIL, 10:30 AM" },
      { name: "Treasure Hunt", price: 200, closingDate: "2026-04-07T11:30:00+05:30", closingDateStr: "7 APRIL, 11:30 AM" },
      { name: "Cyber Security", price: 200, closingDate: "2026-04-07T12:30:00+05:30", closingDateStr: "7 APRIL, 12:30 PM" },
      { name: "Pharma Quiz", price: 50, closingDate: "2026-04-07T13:00:00+05:30", closingDateStr: "7 APRIL, 1:00 PM" },
      { name: "Debugging Contest", price: 100, closingDate: "2026-04-07T14:00:00+05:30", closingDateStr: "7 APRIL, 2:00 PM" },
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
      { name: "Commerce Quiz", price: 100, closingDate: "2026-04-07T11:00:00+05:30", closingDateStr: "7 APRIL, 11:00 AM" },
      { name: "Face Painting", price: 100, closingDate: "2026-04-07T12:00:00+05:30", closingDateStr: "7 APRIL, 12:00 PM" },
      { name: "Extempore", price: 50, closingDate: "2026-04-07T14:00:00+05:30", closingDateStr: "7 APRIL, 2:00 PM" },
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
        closingDate: "2026-04-07T11:00:00+05:30", closingDateStr: "7 APRIL, 11:00 AM"
      },
      {
        name: "Singing (Solo-Duo)",
        hasOptions: true,
        options: [
          { type: "Solo", price: 50 },
          { type: "Duo", price: 100 },
        ],
        closingDate: "2026-04-07T11:00:00+05:30", closingDateStr: "7 APRIL, 11:00 AM"
      },
      { name: "Walk & Wow (Ramp Walk)", price: 100, closingDate: "2026-04-07T11:00:00+05:30", closingDateStr: "7 APRIL, 11:00 AM" },
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
      { name: "Plank / Weight Add-On Challenge", price: 50, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Poetry", price: 0, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Bottle Flip", price: 0, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Thug of War (Per Team, Max 10)", price: 300, closingDate: "2026-04-04T21:00:00+05:30", closingDateStr: "4 APRIL, 9:00 PM" },
      { name: "Dance-Freeze Challenge", price: 0, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Paper Folding Dance", price: 0, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Truba Roadies", price: 100, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Sign - Walk Game", price: 50, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
      { name: "Cricket Circle Game", price: 100, closingDate: "2026-04-07T23:59:00+05:30", closingDateStr: "7 APRIL 2026" },
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

  // ─── REGISTRATION CLOSED SCREEN ───────────────────────────────────────────
  if (isGlobalRegistrationClosed()) {
    return (
      <div className="min-h-screen bg-dark-bg party-bg py-12 px-4 relative overflow-hidden flex items-center justify-center">
        {/* Animated background orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/3 blur-[180px] animate-disco-pulse" style={{ animationDelay: "0.5s" }}></div>
        </div>

        <div className="max-w-lg w-full mx-auto relative z-10 text-center">
          <div
            className="party-card rounded-3xl p-10"
            style={{
              border: "1px solid rgba(250, 204, 21, 0.35)",
              boxShadow: "0 0 60px rgba(250, 204, 21, 0.08), 0 0 120px rgba(239, 68, 68, 0.06)",
            }}
          >
            {/* Icon */}
            <div className="text-6xl mb-5 animate-bounce">🚨</div>

            {/* Title */}
            <h2
              className="text-3xl font-black uppercase tracking-widest mb-1"
              style={{ color: "#facc15", textShadow: "0 0 20px rgba(250,204,21,0.4)" }}
            >
              Online Registration
            </h2>
            <h3
              className="text-2xl font-black uppercase tracking-wide mb-7"
              style={{ color: "#f87171", textShadow: "0 0 16px rgba(248,113,113,0.4)" }}
            >
              Has Been Closed
            </h3>

            {/* Divider */}
            <div className="w-16 h-px mx-auto mb-7" style={{ background: "linear-gradient(90deg, transparent, rgba(250,204,21,0.6), transparent)" }}></div>

            {/* Announcement box */}
            <div
              className="rounded-2xl p-5 mb-7 text-left"
              style={{
                background: "rgba(250, 204, 21, 0.06)",
                border: "1px solid rgba(250, 204, 21, 0.25)",
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-xl mt-0.5">📋</span>
                <p className="text-sm font-bold uppercase tracking-wide" style={{ color: "#facc15" }}>
                  Offline / On-Spot Registration
                </p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed ml-8">
                Offline / On-Spot registration will be taken for{" "}
                <span
                  className="font-bold"
                  style={{ color: "#67e8f9" }}
                >
                  tomorrow's (07-04-2026) events.
                </span>
              </p>
              <div
                className="mt-4 ml-8 p-3 rounded-xl text-sm font-semibold text-center"
                style={{
                  background: "rgba(250, 204, 21, 0.12)",
                  color: "#fde68a",
                  border: "1px dashed rgba(250,204,21,0.3)",
                }}
              >
                ⏰ Kindly reach the campus{" "}
                <span className="underline underline-offset-2">before events start</span>{" "}
                for offline / on-spot registration.
              </div>
            </div>

            {/* Already registered note */}
            <p className="text-gray-500 text-xs mb-8">
              Already registered? Check your email for confirmation &amp; payment details.
            </p>

            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="btn-party inline-flex items-center justify-center font-bold py-3 px-8 rounded-xl w-full"
            >
              <span>🏠 Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  // ─── END CLOSED SCREEN ────────────────────────────────────────────────────

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
    const isClosed =
      event.closed ||
      (event.closingDate && new Date() > new Date(event.closingDate));
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
            let catTitle =
              cat.title === "SAC Committee" ? "SAC Committee" : cat.title;
            if (event.hasOptions) {
              const selectedOption = eventOptions[event.name] || null;
              category = selectedOption
                ? `${catTitle} - ${selectedOption}`
                : catTitle;
              if (selectedOption) {
                const opt = event.options.find((o) => o.type === selectedOption);
                if (opt) price = opt.price;
              }
            } else {
              category = catTitle;
              price =
                typeof event.price === "number"
                  ? event.price
                  : parseInt(event.price);
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

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxVdY1Leca6iuIwN-Msb0gKIQehwh488UT7E3Z4J84rTRBT7Cno5I4TDaZa1xcaSrN5/exec";

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
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
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
                  <span>College / Institution</span>
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
            <div>
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-6">
                <Tag className="w-4 h-4 text-neon-cyan" />
                <span className="text-xl font-bold gradient-party">
                  Select Events
                </span>
              </label>

              <div className="space-y-8">
                {categories.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span className="gradient-party">{category.title}</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.events.map((event) => {
                        const isClosed =
                          event.closed ||
                          (event.closingDate &&
                            new Date() > new Date(event.closingDate));
                        const isSelected = selectedEvents.includes(event.name);

                        return (
                          <div
                            key={event.name}
                            className={`relative rounded-xl p-4 border transition-all cursor-pointer ${
                              isClosed
                                ? "opacity-50 border-gray-700/30 bg-gray-800/20 cursor-not-allowed"
                                : isSelected
                                ? "border-neon-pink/60 bg-neon-pink/5 shadow-[0_0_20px_rgba(255,0,128,0.1)]"
                                : "border-neon-purple/20 bg-dark-surface/40 hover:border-neon-purple/40"
                            }`}
                            onClick={() =>
                              !isClosed &&
                              handleEventSelection(event, !isSelected)
                            }
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-3 flex-1">
                                <div
                                  className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                                    isSelected
                                      ? "bg-neon-pink border-neon-pink"
                                      : "border-gray-500"
                                  }`}
                                >
                                  {isSelected && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="text-white font-medium text-sm">
                                    {event.name}
                                  </p>
                                  {isClosed ? (
                                    <p className="text-red-400 text-xs mt-0.5 font-semibold">
                                      🔒 Registration Closed
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 text-xs mt-0.5">
                                      Closes: {event.closingDateStr}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                {event.hasOptions ? (
                                  <p className="text-neon-cyan text-xs font-bold">
                                    Multiple
                                  </p>
                                ) : event.price === 0 ? (
                                  <p className="text-green-400 text-sm font-bold">
                                    FREE
                                  </p>
                                ) : (
                                  <p className="text-neon-yellow text-sm font-bold">
                                    ₹{event.price}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Options for events with sub-types */}
                            {event.hasOptions && isSelected && (
                              <div
                                className="mt-3 pt-3 border-t border-neon-purple/20"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <p className="text-gray-400 text-xs mb-2">
                                  Select category:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {event.options.map((opt) => (
                                    <button
                                      key={opt.type}
                                      type="button"
                                      onClick={() =>
                                        handleOptionChange(
                                          event.name,
                                          opt.type
                                        )
                                      }
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        eventOptions[event.name] === opt.type
                                          ? "bg-neon-pink text-white shadow-[0_0_10px_rgba(255,0,128,0.3)]"
                                          : "bg-dark-surface border border-neon-purple/30 text-gray-300 hover:border-neon-pink/40"
                                      }`}
                                    >
                                      {opt.type} — ₹{opt.price}
                                    </button>
                                  ))}
                                </div>
                                {selectedEvents.includes(event.name) &&
                                  !eventOptions[event.name] && (
                                    <p className="text-neon-pink text-xs mt-1">
                                      Please select a category
                                    </p>
                                  )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Amount */}
            {selectedEvents.length > 0 && (
              <div className="party-card rounded-2xl p-6 border border-neon-yellow/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Selected Events</p>
                    <p className="text-white font-bold">
                      {selectedEvents.length} event
                      {selectedEvents.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Total Amount</p>
                    <p className="text-3xl font-black text-neon-yellow">
                      {calculateTotal() === 0
                        ? "FREE"
                        : `₹${calculateTotal()}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Validation: must select at least one event */}
            {errors.events && (
              <p className="text-neon-pink text-sm">{errors.events.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || selectedEvents.length === 0}
              className="btn-party w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>🎉 Complete Registration</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
