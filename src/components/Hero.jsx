import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import profile from "../assets/profile.png";
import { TbDownload } from "react-icons/tb";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Hero() {
  const [directions, setDirections] = useState({});
  const diamondsRef = useRef([]);

  const diamond = "7.5,0 15,7.5 7.5,15 0,7.5";
  const square = "0,0 15,0 15,15 0,15";
  const roundedDiamond = "7.5,3 12,7.5 7.5,12 3,7.5";

  const handleMouseEnter = (event, buttonId) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const fromLeft = mouseX < rect.width / 2;
    const fromTop = mouseY < rect.height / 2;

    let direction;
    if (
      Math.abs(mouseX - rect.width / 2) >
      Math.abs(mouseY - rect.height / 2)
    ) {
      direction = fromLeft ? "left" : "right";
    } else {
      direction = fromTop ? "top" : "bottom";
    }

    setDirections((prev) => ({ ...prev, [buttonId]: direction }));
  };

  const getAnimationClasses = (direction) => {
    switch (direction) {
      case "left":
        return "origin-left scale-x-0 group-hover:scale-x-100";
      case "right":
        return "origin-right scale-x-0 group-hover:scale-x-100";
      case "top":
        return "origin-top scale-y-0 group-hover:scale-y-100";
      case "bottom":
        return "origin-bottom scale-y-0 group-hover:scale-y-100";
      default:
        return "origin-left scale-x-0 group-hover:scale-x-100";
    }
  };

  useEffect(() => {
    diamondsRef.current.forEach((el, index) => {
      if (el) {
        const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: index * 0.05 });
        tl.to(el, { duration: 2, ease: "sine.inOut", attr: { points: square } });
        tl.to(el, { duration: 2, ease: "sine.inOut", attr: { points: roundedDiamond } });
        tl.to(el, { duration: 2, ease: "sine.inOut", attr: { points: diamond } });
      }
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col sm:flex-row sm:items-center bg-gradient-to-br from-[#ECECF8] to-[#F7F7F7] overflow-hidden px-4 pt-24 scroll-mt-24"
    >

      {/* SVG Background (hidden on mobile) */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none hidden sm:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(400)].map((_, i) => {
          const cols = 20;
          const spacing = 75;
          const x = (i % cols) * spacing;
          const y = Math.floor(i / cols) * spacing;
          return (
            <polygon
              key={i}
              ref={(el) => (diamondsRef.current[i] = el)}
              points={diamond}
              fill="rgba(101, 76, 172, 0.07)"
              stroke="rgba(101, 76, 172, 0.12)"
              strokeWidth="1"
              transform={`translate(${x}, ${y})`}
            />
          );
        })}
      </svg>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between w-full max-w-7xl mx-auto gap-10 sm:gap-20">

        {/* LEFT TEXT COLUMN */}


        <div className="sm:col-span-1 md:col-span-2 flex flex-col gap-4 justify-center max-w-xl mx-auto text-center md:text-left">
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-extrabold leading-snug text-black">
            Hi, I’m <br />
            <span className="bg-gradient-to-r from-[#654CAC] to-[#654CAC] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Parthiban M
            </span>
            <br />
            <span className="text-black/80 text-sm sm:text-base md:text-lg">
              Frontend Developer
            </span>
          </h1>

          {/* Additional content starts here */}
          <p className="text-black/70 text-xs sm:text-sm md:text-base max-w-md mx-auto md:mx-0 leading-relaxed">
            Passionate about crafting clean, responsive, and user-friendly web experiences. Skilled in React, Tailwind CSS, and modern frontend workflows.
          </p>

          <p className="mt-4 italic text-black/50 text-xs sm:text-sm mx-auto md:mx-0">
            "Code is like humor. When you have to explain it, it’s bad." – Cory House
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start px-4 sm:px-0 max-w-xl mx-auto w-full mt-6">
            <a
              href="#contact"
              onMouseEnter={(e) => handleMouseEnter(e, "btn2")}
              className="group relative flex items-center justify-center overflow-hidden gap-2 px-5 py-3 rounded-full border border-[#654CAC] bg-white/30 text-[#654CAC] text-sm sm:text-base font-medium backdrop-blur-md transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#654CAC] hover:via-[#8A72C6] hover:to-[#9F8EDB] hover:text-white hover:border-[#654CAC] w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <TbDownload className="h-4 w-4 z-10 text-[#654CAC] transition-colors duration-300 group-hover:text-white" />
              <span className="relative z-10">Download CV</span>
              <span
                className={`absolute inset-0 transform transition-transform duration-300 ease-out ${getAnimationClasses(
                  directions["btn2"]
                )} scale-x-0 scale-y-0 group-hover:scale-100 bg-gradient-to-r from-[#7759c8] via-[#725ea5] to-[#654CAC]`}
              />
            </a>
          </div>

        </div>




        {/* RIGHT IMAGE COLUMN */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <div className="relative max-w-[320px] sm:max-w-[400px] md:max-w-[430px] aspect-square">
            {/* Purple background behind image */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-md bg-[#271A4E] z-0"></div>

            {/* Image container */}
            <div className="relative w-full h-full overflow-hidden transition-transform duration-200 ease-out rounded-md shadow-lg flex items-center justify-center bg-[#E1E3E7] z-10">
              <img
                src={profile}
                alt="Professional portrait"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
