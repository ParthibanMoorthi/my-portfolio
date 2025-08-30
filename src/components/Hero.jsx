import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import { motion } from "framer-motion";

export default function Hero() {
  const [stars, setStars] = useState([]);

  // Function to create a new star
  const createStar = () => {
    const size = Math.random() * 6 + 6; // Star size
    const left = Math.random() * window.innerWidth;
    const duration = 10 + Math.random() * 8; // Fall duration
    return { id: Math.random(), size, left, duration };
  };

  useEffect(() => {
    // Continuously spawn stars every 200ms
    const interval = setInterval(() => {
      setStars((prev) => [...prev, createStar()]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationComplete = (id) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Falling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          initial={{ y: -50, x: star.left, opacity: 1 }}
          animate={{ y: window.innerHeight + 50, opacity: 0 }}
          transition={{ duration: star.duration, ease: "linear" }}
          onAnimationComplete={() => handleAnimationComplete(star.id)}
          style={{ width: star.size, height: star.size }}
        >
          <svg viewBox="0 0 24 24" fill="#8B5CF6" className="w-full h-full">
            <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847L19.336 24 12 20.202 4.664 24 6 15.6 0 9.753l8.332-1.735z" />
          </svg>
        </motion.div>
      ))}

      {/* Top-right glowing circle */}
      <div className="absolute top-10 -right-32 w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] bg-purple-400/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Grid container */}
      <div className="mx-auto w-full h-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-center">
        {/* Text column */}
       <motion.div
  className="flex flex-col justify-center items-center text-center md:text-left px-4 order-2 md:order-1 md:col-span-2 md:px-6 h-full"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
          <div className="max-w-2xl mx-auto md:mx-0">
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug text-gray-900"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Hi, I’m <br />
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent font-semibold">
                Parthiban M
              </span>
              <br />
              <span className="block text-gray-800 text-base xs:text-lg sm:text-xl md:text-2xl mt-1">
                Frontend Developer
              </span>
            </motion.h1>

            <motion.p
              className="mt-4 xs:mt-5 text-gray-700 text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Passionate about crafting clean, responsive, and user-friendly web experiences. Skilled in React, Tailwind CSS, and modern frontend workflows.
            </motion.p>

            <motion.p
              className="mt-3 xs:mt-5 italic text-gray-500 text-xs xs:text-sm sm:text-base md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              "Code is like humor. When you have to explain it, it’s bad." – Cory House
            </motion.p>
          </div>
        </motion.div>

      {/* Image column (static) */}
<div className="col-span-1 order-1 md:order-2 flex justify-center md:justify-end items-center md:items-end h-full mt-6 md:mt-0 hidden md:flex">
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
