import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import Rulespdf from "../assets/Rules.pdf";

function Rules() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="p-5 bg-neon-cyan/10 text-neon-cyan rounded-2xl border border-neon-cyan/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">📜 Rules & Regulations</h3>
          <p className="text-gray-400 mt-1 font-medium">Read the party guidelines for participation.</p>
        </div>
      </div>
      
      <a 
        href={Rulespdf}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-party group inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl"
      >
        <span>View Rules</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

export default Rules;