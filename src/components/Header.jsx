import React, { useRef } from "react";
import gsap from "gsap";
import { TbDownload, TbHome, TbUser, TbFolder, TbMail } from "react-icons/tb";

const navItems = [
  { name: "Home", icon: <TbHome /> },
  { name: "About", icon: <TbUser /> },
  { name: "Projects", icon: <TbFolder /> },
  { name: "Contact", icon: <TbMail /> },
];

export default function BottomNav({ active, scrollToSection }) {
  const btnRef = useRef(null);

  const getDirection = (e, element) => {
    const { width, height, top, left } = element.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    return Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) % 4;
  };

  const getTransform = (dir) => {
    switch (dir) {
      case 0: return { x: "0%", y: "-100%" };
      case 1: return { x: "100%", y: "0%" };
      case 2: return { x: "0%", y: "100%" };
      case 3: return { x: "-100%", y: "0%" };
      default: return { x: "100%", y: "0%" };
    }
  };

  const handleEnter = (e) => {
    const overlay = btnRef.current.querySelector(".overlay");
    const dir = getDirection(e, btnRef.current);
    const from = getTransform(dir);

    gsap.fromTo(
      overlay,
      from,
      { x: "0%", y: "0%", duration: 0.35, ease: "power3.out" }
    );
  };

  const handleLeave = (e) => {
    const overlay = btnRef.current.querySelector(".overlay");
    const dir = getDirection(e, btnRef.current);
    const to = getTransform(dir);

    gsap.to(overlay, { ...to, duration: 0.35, ease: "power3.in" });
  };

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="relative rounded-2xl moving-border">
        <div className="bg-white py-3 px-2 sm:px-4 rounded-2xl flex justify-evenly items-center">
          {navItems.map((item) => {
            const lower = item.name.toLowerCase();
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(lower)}
                className={`relative flex outline-0 flex-col items-center justify-center px-1 py-1 text-[12px] sm:text-[15px] font-medium transition-colors duration-200 group ${
                  active === lower
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {/* Icon for mobile */}
                <span className="sm:hidden text-xl">{item.icon}</span>
                {/* Text for larger screens */}
                <span className="hidden sm:block">{item.name}</span>

                {/* Hover underline effect for desktop */}
                <span className="absolute left-1/2 -bottom-0.5 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0 sm:block hidden"></span>
              </button>
            );
          })}

          {/* Download CV Button */}
          <a
            ref={btnRef}
            href="/cv.pdf"
            download
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="hidden md:flex group items-center gap-1.5 relative px-3 sm:px-4 py-2 border border-[#654CAC] text-[#654CAC] rounded-full hover:text-white text-[12px] sm:text-[13px] font-medium overflow-hidden shadow-sm transition-colors duration-300"
          >
            <TbDownload className="-mt-0.5 h-4 w-4 relative z-10" />
            <span className="relative z-10">Download CV</span>
            <span
              className="overlay absolute inset-0 bg-[#654CAC] rounded-full z-0 pointer-events-none will-change-transform"
              style={{ transform: "translateX(100%)" }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
