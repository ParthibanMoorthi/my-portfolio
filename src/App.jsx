import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => t * (2 - t),
      smoothWheel: true,
      smoothTouch: false,
      normalizeWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") lenis.scrollTo(window.scrollY + 250);
      if (e.key === "ArrowUp") lenis.scrollTo(window.scrollY - 250);
      if (e.key === "PageDown") lenis.scrollTo(window.scrollY + window.innerHeight);
      if (e.key === "PageUp") lenis.scrollTo(window.scrollY - window.innerHeight);
      if (e.key === " ") lenis.scrollTo(window.scrollY + window.innerHeight);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lenis.destroy();
      window.removeEventListener("keydown", handleKeyDown);
      ScrollTrigger.killAll();
    };
  }, []);

  // Detect active section using scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      let current = "home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function for Header
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-br from-white via-[#f8f6fc] to-[#f1eef9]">

      <CustomCursor />
      <Header
        active={activeSection}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        scrollToSection={scrollToSection}
      />

      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}
