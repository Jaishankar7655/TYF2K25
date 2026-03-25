import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Music, Users, Trophy, ArrowRight, Sparkles } from "lucide-react";
import festlogo from "../assets/festlogo.jpg";
import trb from "../assets/trb.png";
import EventLists from "./EventLists";
import Rules from "./Rules";
import AllEvents from "./AllEvents";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft geometric background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Vibrant soft glowing orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[60%] h-[60%] rounded-full bg-pink-300/20 blur-[150px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 w-full flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/50 bg-white/40 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative p-1 md:p-2 rounded-2xl bg-white/60 border border-white group-hover:border-purple-300 transition-colors shadow-sm">
            <img className="w-12 h-12 md:w-16 md:h-16 object-contain mix-blend-multiply rounded-xl" src={trb} alt="Truba Logo" />
          </div>
        </div>
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative p-1 md:p-2 rounded-2xl bg-white/60 border border-white group-hover:border-pink-300 transition-colors shadow-sm">
             <img className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-xl" src={festlogo} alt="Fest Logo" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 pt-10 pb-20">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-purple-100 backdrop-blur-md mb-8 text-purple-700 font-semibold text-sm shadow-[0_4px_20px_-5px_rgba(168,85,247,0.2)] hover:shadow-[0_6px_25px_-5px_rgba(168,85,247,0.3)] transition-shadow">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="tracking-wide">Registration Open • April 6-8, 2026</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-4 flex flex-col items-center leading-[1.1]">
            <span className="text-slate-900 drop-shadow-sm">TRUBA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 mt-2 px-2 pb-2">YOUTH FEST</span>
          </h1>

          <div className="relative mb-10 mt-2">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 drop-shadow-[0_4px_15px_rgba(56,189,248,0.2)] pb-2">
              2K26
            </h2>
          </div>

          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-14 font-medium leading-relaxed">
            Experience the vibrant convergence of technology, culture, and sports at Central India's most spectacular youth event.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-semibold text-lg md:text-xl rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_-10px_rgba(15,23,42,0.4)] active:scale-95 border border-transparent hover:border-slate-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            <span className="relative z-10 transition-colors">Register Now</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Feature Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 bg-white/30 backdrop-blur-sm border-y border-white/60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { icon: <Calendar className="w-8 h-8 text-purple-600" />, title: "3 Epic Days", desc: "Non-stop cultural & technical excitement", glow: "group-hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.2)] group-hover:border-purple-200", bg: "bg-purple-50" },
            { icon: <Music className="w-8 h-8 text-pink-600" />, title: "25+ Events", desc: "Showcase your diverse talents in style", glow: "group-hover:shadow-[0_15px_40px_-10px_rgba(236,72,153,0.2)] group-hover:border-pink-200", bg: "bg-pink-50" },
            { icon: <Users className="w-8 h-8 text-cyan-600" />, title: "1000+ Students", desc: "Network with the brightest minds around", glow: "group-hover:shadow-[0_15px_40px_-10px_rgba(6,182,212,0.2)] group-hover:border-cyan-200", bg: "bg-cyan-50" },
            { icon: <Trophy className="w-8 h-8 text-amber-600" />, title: "Massive Prizes", desc: "Win ultimate glory and massive rewards", glow: "group-hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.2)] group-hover:border-amber-200", bg: "bg-amber-50" },
          ].map((item, idx) => (
            <div key={idx} className={`relative p-[1px] rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-2`}>
              <div className={`relative h-full bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 flex flex-col items-start transition-all duration-500 shadow-lg ${item.glow}`}>
                <div className={`p-4 rounded-2xl ${item.bg} border border-white box-content mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-wide">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details Components */}
      <section className="relative z-10 container mx-auto px-4 py-24 space-y-16">
        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-14 border border-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500">
            <EventLists />
          </div>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-14 border border-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500">
            <Rules />
          </div>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-14 border border-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500 mb-12">
            <AllEvents />
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
