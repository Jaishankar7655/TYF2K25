import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-6 mt-auto glass-party border-t border-neon-purple/20">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xl">🎵</span>
        <div className="flex items-end gap-[2px] h-4">
          {[0, 0.1, 0.2, 0.15, 0.25].map((d, i) => (
            <div key={i} className="w-[2px] rounded bg-gradient-to-t from-neon-pink to-neon-cyan" style={{height: `${8 + Math.random() * 10}px`, animation: `musicBars 0.8s ease-in-out ${d}s infinite`}} />
          ))}
        </div>
        <span className="text-xl">🎵</span>
      </div>
      <p className="text-gray-400 text-sm font-medium">
        Created and developed with <span className="text-neon-pink">❤️</span> by Student Committee (SOC) of Truba Group of Institute
      </p>
      <p className="text-gray-500 text-xs mt-1">🎉 Party Never Stops 🎉</p>
    </footer>
  );
};

export default Footer;
