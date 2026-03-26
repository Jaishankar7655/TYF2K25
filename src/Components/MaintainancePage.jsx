import React, { useState, useEffect } from "react";
import { Settings, Clock, ShieldAlert } from "lucide-react";

function MaintainancePage() {
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-dark-bg party-bg relative overflow-hidden flex items-center justify-center">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-pink/10 blur-[150px] animate-disco-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/10 blur-[150px] animate-disco-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 p-8 md:p-12 max-w-2xl w-full mx-4 party-card rounded-3xl text-center shadow-[0_0_50px_rgba(107,70,193,0.3)] backdrop-blur-xl border border-neon-purple/20">
        <div className="flex justify-center mb-8 relative">
          <div className="relative inline-block">
            <Settings className="w-24 h-24 text-neon-pink animate-[spin_4s_linear_infinite] drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]" />
            <ShieldAlert className="w-12 h-12 text-neon-yellow absolute -bottom-2 -right-2 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)] animate-pulse" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black gradient-party mb-4 tracking-tight">
          System Upgrade
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
          We're currently enhancing the TRUBA Fest 2K26 registration systems. We'll be back online before you know it! 🚀
        </p>

        <div className="inline-flex flex-col items-center justify-center p-8 rounded-2xl bg-dark-surface border border-neon-cyan/20 shadow-[inset_0_0_30px_rgba(0,255,255,0.05)]">
          <div className="flex items-center space-x-3 text-neon-cyan mb-3 font-bold tracking-widest uppercase text-sm">
            <Clock className="w-5 h-5 animate-pulse" />
            <span>Estimated Wait Time</span>
          </div>
          <div className="text-7xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mt-12 text-sm text-neon-purple flex items-center justify-center space-x-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-pink"></span>
          </span>
          <span className="font-medium tracking-wide">Our developers team is working hard in the background for better experience and better performance of TRUBA Fest 2K26 registration...</span>
        </div>
      </div>
    </div>
  );
}

export default MaintainancePage;