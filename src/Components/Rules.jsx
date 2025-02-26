import React from 'react'
import Rulespdf from "../assets/Rules.pdf"
function Rules() {
  return (
    <div className="bg-gradient-to-r my-9 from-red-300  to-red-100 p-2 md:w-2/3 w-full mx-auto rounded-[10px]">
    <p className="text-center text-xl">
      To check Rules and regulation  of Events.{" "}
      <a
        className="text-red-700 font-semibold text-xl hover:underline"
        href={Rulespdf}
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here
      </a>
    </p>
  </div>
  )
}

export default Rules