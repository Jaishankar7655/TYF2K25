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
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white relative overflow-hidden font-outfit selection:bg-neon-pink/30 flex flex-col">

      {/* Confetti overlay — fewer on mobile for performance */}
      <div className="hidden sm:block">
        {confettiPieces.map((piece) => (
          <ConfettiParticle key={piece.id} {...piece} />
        ))}
      </div>

      {/* Animated Background Effects - Party Lights */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-neon-pink/10 blur-[100px] sm:blur-[150px] animate-disco-pulse"></div>
        <div className="absolute top-1/3 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-neon-cyan/10 blur-[100px] sm:blur-[150px] animate-disco-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-neon-purple/10 blur-[120px] sm:blur-[180px] animate-disco-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="hidden sm:block absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-neon-yellow/5 blur-[120px] animate-disco-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 w-full flex justify-center items-center gap-2 sm:gap-8 md:gap-16 px-2 sm:px-6 md:px-12 py-3 sm:py-5">
        <div className="flex items-center group cursor-pointer flex-shrink-0">
          <img className="w-12 h-12 sm:w-16 sm:h-16 md:w-28 md:h-28 object-contain rounded-full transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,45,149,0.5)] group-hover:scale-105" src={trb} alt="Truba Logo" />
        </div>

        {/* Center - Music Equalizer */}
        <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-shrink min-w-0 justify-center">
          <div className="scale-[0.6] sm:scale-100"><MusicEqualizer /></div>
          <span className="text-neon-cyan text-[11px] sm:text-base md:text-3xl font-bold md:font-black tracking-normal sm:tracking-widest uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] truncate">Live Party Mode</span>
          <div className="scale-[0.6] sm:scale-100"><MusicEqualizer /></div>
        </div>

        <div className="flex items-center group cursor-pointer flex-shrink-0">
          <img className="w-12 h-12 sm:w-12 sm:h-12 md:w-28 md:h-28 object-contain rounded-full transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.5)] group-hover:scale-105" src={festlogo} alt="Fest Logo" />
        </div>
        
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-2 sm:py-4 md:py-0">
        <div className="text-center w-full max-w-5xl mx-auto flex flex-col items-center justify-evenly h-full gap-4 sm:gap-6 md:gap-2 lg:gap-4 xl:gap-8 min-h-[60vh]">

          {/* Party badge */}
          <div className="inline-flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-dark-card/80 border border-neon-pink/30 backdrop-blur-md text-neon-pink font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,45,149,0.15)] animate-party-float">
            <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-neon-yellow flex-shrink-0" />
            <span className="tracking-wide sm:tracking-wider uppercase whitespace-nowrap">🎉 Registration Open • April 6-8, 2026 🎉</span>
            
            <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan animate-spin flex-shrink-0" style={{ animationDuration: '3s' }} />
          </div>
         <div className="w-[90%] max-w-[600px] overflow-hidden rounded-lg py-2 my-3 md:my-0 lg:my-1 mx-auto">
  <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
    {[...Array(4)].map((_, i) => (
      <span
        key={i}
        className="whitespace-nowrap px-12 text-sm sm:text-base font-medium text-amber-200/90 tracking-wide"
      >
        📌 Note: Sport events will be from 4 – 5 April 2026
      </span>
    ))}
  </div>
</div>
          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight flex flex-col items-center leading-[1.1] md:leading-none">
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan px-2 pb-2 md:pb-0 drop-shadow-[0_0_40px_rgba(255,45,149,0.3)]">
             <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">TRUBA</span> FEST
            </span>
          </h1>

          {/* Year */}
          <div className="relative flex items-center gap-3 sm:gap-4">
            <Headphones className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-neon-cyan animate-party-float" style={{ animationDelay: '0.5s' }} />
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black neon-text bg-clip-text text-neon-cyan">
              2K26
            </h2>
            <Music className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-neon-pink animate-party-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Tagline */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto font-medium leading-relaxed px-2">
            🎧 The Ultimate <span className="text-neon-pink font-bold">Party</span> • <span className="text-neon-cyan font-bold">Music</span> • <span className="text-neon-purple font-bold">Dance</span> Experience.
            <span className="hidden sm:inline"> Join Central India's most <span className="text-neon-yellow font-bold">electrifying</span> fest!</span>
            <span className="sm:hidden"> Central India's most <span className="text-neon-yellow font-bold">electrifying</span> fest!</span> 🎶
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/register")}
            className="btn-party group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 md:px-8 lg:px-10 py-3 sm:py-5 md:py-3 lg:py-4 font-bold text-base sm:text-lg md:text-lg lg:text-xl rounded-full transition-all duration-300 active:scale-95 neon-border"
          >
            <span>🎉 Register Now</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Party emojis row */}
          <div className="flex items-center gap-3 sm:gap-6 text-xl sm:text-2xl md:text-3xl animate-party-float flex-wrap justify-center">
            <span>🎵</span><span>🪩</span><span>🎤</span><span>🎸</span>
            <span className="hidden sm:inline">🥁</span>
            <span className="hidden sm:inline">🎷</span>
            <span className="hidden md:inline">🎺</span>
          </div>
        </div>
      </main>

      {/* Feature Section - Party Stats */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 border-y border-neon-purple/10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            <span className="gradient-party">🪩 The Party Lineup 🪩</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
          {[
            { icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />, title: "3 Epic Days", desc: "Non-stop party & celebration", color: "neon-pink", emoji: "🎉" },
            { icon: <Music className="w-6 h-6 sm:w-8 sm:h-8" />, title: "25+ Events", desc: "Dance, sing, compete & party", color: "neon-cyan", emoji: "🎶" },
            { icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, title: "1000+ Students", desc: "The biggest youth gathering", color: "neon-purple", emoji: "🕺" },
            { icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Massive Prizes", desc: "Win glory and epic rewards", color: "neon-yellow", emoji: "🏆" },
          ].map((item, idx) => (
            <div key={idx} className="party-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group cursor-pointer" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4">{item.emoji}</div>
              <div className={`p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-${item.color}/10 text-${item.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(255,45,149,0.2)]`}>
                {item.icon}
              </div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base font-medium hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details Components */}
      <section className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-24 space-y-8 sm:space-y-12 md:space-y-16">
        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative party-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14">
            <EventLists />
          </div>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative party-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14">
            <Rules />
          </div>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-yellow/20 to-neon-pink/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative party-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 mb-6 sm:mb-12">
            <AllEvents />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
