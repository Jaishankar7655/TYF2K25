import React from 'react';
import { Calendar } from 'lucide-react';
// const pdfUrl = "/assets/list.pdf";
import pdfUrl from "../assets/list.pdf";
function EventLists() {
  
  
  return (
    <div className="bg-gradient-to-r from-red-300  to-red-100 p-2 md:w-2/3 w-full mx-auto rounded-[10px]">
      <p className="text-center text-xl">
        To check the Date and Time of Events.{' '}
        <a 
          className="text-red-700 font-semibold text-xl hover:underline"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>
      </p>
    </div>
  );
}

export default EventLists;