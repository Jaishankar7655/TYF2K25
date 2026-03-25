import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import pdfUrl from "../assets/list.pdf";

function EventLists() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="p-5 bg-purple-50 text-purple-600 rounded-2xl shadow-sm border border-purple-100">
          <Calendar className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Event Schedule</h3>
          <p className="text-slate-500 mt-1 font-medium">Check the detailed date and time for all events.</p>
        </div>
      </div>
      
      <a 
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <span>View Schedule</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

export default EventLists;