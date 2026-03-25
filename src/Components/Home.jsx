import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Music, Users, Trophy, ArrowRight, Sparkles, Disc3, PartyPopper, Headphones } from "lucide-react";
import festlogo from "../assets/festlogo.png";
import trb from "../assets/trb.png";
import EventLists from "./EventLists";
import Rules from "./Rules";
import AllEvents from "./AllEvents";

// Confetti particle component
const ConfettiParticle = ({ delay, left, color, size }) => (
  <div
    className="fixed pointer-events-none z-50"
    style={{
      left: `${left}%`,
      top: '-20px',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      animation: `confettiFall ${4 + Math.random() * 4}s linear ${delay}s infinite`,
      opacity: 0.8,
    }}
  />
);

// Music equalizer component
const MusicEqualizer = () => (
  <div className="flex items-end gap-[3px] h-6">
    {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
      <div
        key={i}
        className="eq-bar"
        style={{ animationDelay: `${delay}s`, height: '8px' }}
      />
    ))}
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const colors = ['#ff2d95', '#00f0ff', '#b026ff', '#ffe600', '#39ff14', '#ff6b00', '#ff00ff'];
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white relative overflow-hidden font-outfit selection:bg-neon-pink/30">
      
      {/* Confetti overlay */}
      {confettiPieces.map((piece) => (
        <ConfettiParticle key={piece.id} {...piece} />
      ))}
      
      {/* Animated Background Effects - Party Lights */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Disco spotlight beams */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-neon-pink/10 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-neon-cyan/10 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-neon-purple/10 blur-[180px] animate-disco-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-neon-yellow/5 blur-[120px] animate-disco-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 w-full flex justify-between items-center px-6 md:px-12 py-4 border-b border-neon-purple/20 glass-party">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative p-1.5 md:p-2 rounded-2xl bg-dark-card/80 border border-neon-purple/30 group-hover:border-neon-pink/60 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,45,149,0.3)]">
            <img className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-xl" src={trb} alt="Truba Logo" />
          </div>
        </div>
        
        {/* Center - Music Equalizer */}
        <div className="hidden md:flex items-center gap-3">
          <MusicEqualizer />
          <span className="text-neon-cyan/70 text-sm font-medium tracking-wider uppercase">Live Party Mode</span>
          <MusicEqualizer />
        </div>
        
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative p-1.5 md:p-2 rounded-2xl bg-dark-card/80 border border-neon-cyan/30 group-hover:border-neon-cyan/60 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <img className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-xl" src={festlogo} alt="Fest Logo" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 pt-10 pb-20">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Party badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-card/80 border border-neon-pink/30 backdrop-blur-md mb-8 text-neon-pink font-semibold text-sm shadow-[0_0_20px_rgba(255,45,149,0.15)] hover:shadow-[0_0_30px_rgba(255,45,149,0.25)] transition-all duration-300 animate-party-float">
            <PartyPopper className="w-5 h-5 text-neon-yellow" />
            <span className="tracking-wider uppercase">🎉 Registration Open • April 6-8, 2026 🎉</span>
            <Disc3 className="w-5 h-5 text-neon-cyan animate-spin" style={{animationDuration: '3s'}} />
          </div>

          {/* Main title with neon glow */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4 flex flex-col items-center leading-[1.1]">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">TRUBA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan mt-2 px-2 pb-2 drop-shadow-[0_0_40px_rgba(255,45,149,0.3)]">
              YOUTH FEST
            </span>
          </h1>

          {/* Year with party vibe */}
          <div className="relative mb-10 mt-2 flex items-center gap-4">
            <Headphones className="w-8 h-8 md:w-10 md:h-10 text-neon-cyan animate-party-float" style={{animationDelay: '0.5s'}} />
            <h2 className="text-5xl md:text-7xl font-black neon-text bg-clip-text text-neon-cyan">
              2K26
            </h2>
            <Music className="w-8 h-8 md:w-10 md:h-10 text-neon-pink animate-party-float" style={{animationDelay: '1s'}} />
          </div>

          {/* DJ / Party tagline */}
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-14 font-medium leading-relaxed">
            🎧 The Ultimate <span className="text-neon-pink font-bold">Party</span> • <span className="text-neon-cyan font-bold">Music</span> • <span className="text-neon-purple font-bold">Dance</span> Experience. 
            Join Central India's most <span className="text-neon-yellow font-bold">electrifying</span> youth festival! 🎶
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/register")}
            className="btn-party group relative inline-flex items-center gap-3 px-10 py-5 font-bold text-lg md:text-xl rounded-full transition-all duration-300 active:scale-95 neon-border"
          >
            <span>🎉 Register Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Party emojis row */}
          <div className="mt-10 flex items-center gap-6 text-3xl animate-party-float">
            <span>🎵</span><span>🪩</span><span>🎤</span><span>🎸</span><span>🥁</span><span>🎷</span><span>🎺</span>
          </div>
        </div>
      </main>

      {/* Feature Section - Party Stats */}
      <section className="relative z-10 container mx-auto px-4 py-20 border-y border-neon-purple/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black">
            <span className="gradient-party">🪩 The Party Lineup 🪩</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { icon: <Calendar className="w-8 h-8" />, title: "3 Epic Days", desc: "Non-stop party & celebration", color: "neon-pink", emoji: "🎉" },
            { icon: <Music className="w-8 h-8" />, title: "25+ Events", desc: "Dance, sing, compete & party", color: "neon-cyan", emoji: "🎶" },
            { icon: <Users className="w-8 h-8" />, title: "1000+ Students", desc: "The biggest youth gathering", color: "neon-purple", emoji: "🕺" },
            { icon: <Trophy className="w-8 h-8" />, title: "Massive Prizes", desc: "Win glory and epic rewards", color: "neon-yellow", emoji: "🏆" },
          ].map((item, idx) => (
            <div key={idx} className="party-card rounded-2xl p-8 flex flex-col items-center text-center group cursor-pointer" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="text-4xl mb-4">{item.emoji}</div>
              <div className={`p-4 rounded-2xl bg-${item.color}/10 text-${item.color} mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(255,45,149,0.2)]`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details Components */}
      <section className="relative z-10 container mx-auto px-4 py-24 space-y-16">
        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative party-card rounded-3xl p-8 md:p-14">
            <EventLists />
          </div>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative party-card rounded-3xl p-8 md:p-14">
            <Rules />
          </div>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-yellow/20 to-neon-pink/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative party-card rounded-3xl p-8 md:p-14 mb-12">
            <AllEvents />
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
