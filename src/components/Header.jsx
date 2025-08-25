import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";

const navItems = ["Home", "About", "Projects", "Contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateActive = () => {
      const hash = window.location.hash.replace("#", "");
      if (navItems.map(i => i.toLowerCase()).includes(hash)) {
        setActive(hash);
      }
    };
    window.addEventListener("hashchange", updateActive);
    updateActive();
    return () => window.removeEventListener("hashchange", updateActive);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-gradient-to-br from-[#ECECF8] to-[#F7F7F7] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => {
            setActive("home");
            window.location.hash = "#home";
          }}
          className="text-2xl font-extrabold text-[#654CAC] tracking-tight cursor-pointer select-none hover:scale-105 transition-transform duration-300"
        >
          Parthiban
        </div>

        {/* Navigation */}
        <nav className="flex space-x-10 text-sm font-medium text-[#4B3B7A] relative">
          {navItems.map((item) => {
            const lower = item.toLowerCase();
            const isActive = active === lower;

            return (
              <NavLink
                key={item}
                to={`#${lower}`}
                onClick={() => setActive(lower)}
                className={`group relative px-2 py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#654CAC] font-semibold"
                    : "hover:text-[#654CAC]"
                }`}
              >
                {item}
                {/* Underline animation */}
                <span
                  className={`absolute bottom-0 left-[1px] rounded-full h-[2px] w-full bg-[#654CAC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    isActive ? "" : ""
                  }`}
                />
              </NavLink>
            );
          })}
        </nav>

        {/* Call-to-action */}
        <a
          href="#contact"
          className="ml-6 px-5 py-2 border border-[#654CAC] rounded-full text-[#654CAC] text-sm font-semibold hover:bg-[#654CAC] hover:text-white transition duration-300 shadow-sm"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
}
