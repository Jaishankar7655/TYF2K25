import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import Rulespdf from "../assets/Rules.pdf";

function Rules() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="p-5 bg-cyan-50 text-cyan-600 rounded-2xl shadow-sm border border-cyan-100">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Rules & Regulations</h3>
          <p className="text-slate-500 mt-1 font-medium">Read the comprehensive guidelines for participation.</p>
        </div>
      </div>
      
      <a 
        href={Rulespdf}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <span>View Rules</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

export default Rules;