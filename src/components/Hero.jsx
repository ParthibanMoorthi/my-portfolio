import React from "react";
import profile from "../assets/profile.png";

export default function Hero() {
  return (
   <section
  id="home"
  className="relative min-h-screen px-6 sm:px-8 md:px-12 md:pt-0 overflow-hidden pb-24 md:pb-0"
>

      {/* Top-right glowing effect */}
      <div className="absolute top-24 -right-32 w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] bg-purple-400/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Grid container */}
      <div className="mx-auto w-full h-screen grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Text column */}
      <div className="flex flex-col justify-center text-center px-4 order-2 md:order-1 md:col-span-2 md:text-left md:px-6">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug text-gray-900">
              Hi, I’m <br />
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent font-semibold">
                Parthiban M
              </span>
              <br />
              <span className="block text-gray-800 text-base xs:text-lg sm:text-xl md:text-2xl mt-1">
                Frontend Developer
              </span>
            </h1>

            <p className="mt-4 xs:mt-5 text-gray-700 text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed">
              Passionate about crafting clean, responsive, and user-friendly web experiences. Skilled in React, Tailwind CSS, and modern frontend workflows.
            </p>

            <p className="mt-3 xs:mt-5 italic text-gray-500 text-xs xs:text-sm sm:text-base md:text-base">
              "Code is like humor. When you have to explain it, it’s bad." – Cory House
            </p>
          </div>
        </div>

        {/* Image column */}
        <div className="col-span-1 order-1 md:order-2 flex justify-center md:justify-end items-center md:items-end h-full mt-6 md:mt-0">
          <img
            src={profile}
            alt="Professional portrait"
           className="max-h-56 sm:max-h-64 md:max-h-full w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
