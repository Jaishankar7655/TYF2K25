import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, School, Tag, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Updated event categories data with both singing and dance options
const categories = [
  {
    title: "Cultural",
    icon: "🎭",
    events: [
      { name: "Trudies (Rodies of Truba)", price: 50 },
      {
        name: "Dance Competition",
        hasOptions: true,
        options: [
          { type: "Solo", price: 100 },
          { type: "Group", price: 150 },
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
          { type: "Group", price: 100 },
          { type: "Group", price: 150 },
        ],
      },
      { name: "Nukkad Natak", price: 100 },
    ],
  },
  {
    title: "Literary",
    icon: "📚",
    events: [
      { name: "Poster presentation", price: 50 },
      { name: "Kavi Kosh (Poetry)", price: 50 },
      { name: "Mind Marathon (Group)", price: 70 },
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
      { name: "Tech Paper presentation , (Single/Group) ", price: 100 },
      { name: "Code Encounter", price: 100 },
      { name: "Cure Celebration (Group)", price: 100 },
      { name: "Tech Quiz", price: 50 },
      { name: "Buddhi Vimarsh", price: 50 },
      { name: "Commerce Quiz (Group)", price: 100 },
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
      { name: "Volleyball (Per Team) ", price: 600 },
      { name: "Kho-Kho (Per team)", price: 150 },
      { name: "Carrom", price: 50 },
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

  const handleEventSelection = (eventName, isChecked) => {
    if (isChecked) {
      setSelectedEvents((prev) => [...prev, eventName]);
    } else {
      setSelectedEvents((prev) => prev.filter((e) => e !== eventName));
      if (
        eventName === "Singing Competition" ||
        eventName === "Dance Competition"
      ) {
        setEventOptions((prev) => ({
          ...prev,
          [eventName]: "",
        }));
        setValue(`${eventName} Options`, "");
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
          </div>

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
                {categories.map((category) => (
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
                          <label className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors duration-200">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={selectedEvents.includes(event.name)}
                                onChange={(e) =>
                                  handleEventSelection(
                                    event.name,
                                    e.target.checked
                                  )
                                }
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                              />
                              <span className="text-gray-700">
                                {event.name}
                              </span>
                            </div>
                            <span className="text-purple-600 font-medium">
                              {event.hasOptions
                                ? "Price varies"
                                : `₹${event.price}`}
                            </span>
                          </label>

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
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-3 rounded-xl
                           shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing..
                    </>
                  ) : (
                    "Continue For payment"
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
