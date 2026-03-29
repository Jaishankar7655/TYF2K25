import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import pdfUrl from "../assets/list.pdf";

function EventLists() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="p-5 bg-neon-pink/10 text-neon-pink rounded-2xl border border-neon-pink/20 shadow-[0_0_15px_rgba(255,45,149,0.1)]">
          <Calendar className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">📅 Event Schedule</h3>
          <p className="text-gray-400 mt-1 font-medium">Check the detailed date and time for all party events.</p>
        </div>
      </div>
      
      <a 
       href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-party group inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl"
      >
        <span>View Schedule</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
      
    </div>
  );
}

export default EventLists;
