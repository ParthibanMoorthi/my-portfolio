import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

export default function App() {

 useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => t * (2 - t),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update(); 
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
    ScrollTrigger.killAll();
  };
}, []);


  useEffect(() => {
    // ========================
    // HERO INTRO ANIMATION
    // ========================
    const tl = gsap.timeline();
    tl.from(".hero-h1", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".hero-p",
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .from(
        ".hero-cta",
        { scale: 0.95, opacity: 0, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.3"
      );

    // ========================
    // HEADER SHOW/HIDE ON SCROLL (instant hide on down, delay show)
    // ========================
    let lastScroll = 0;
    let scrollTimeout;
    const header = document.getElementById("site-header");

    function hideHeader() {
      if (!header) return;
      gsap.to(header, {
        y: -header.offsetHeight,
        duration: 0.1,
        ease: "power2.out",
      });
    }

    function showHeader() {
      if (!header) return;
      gsap.to(header, {
        y: 0,
        duration: 0.1,
        ease: "power2.out",
      });
    }

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      clearTimeout(scrollTimeout);

      // Hide instantly on scroll down
      if (currentScroll > lastScroll && currentScroll > 80) {
        hideHeader();
      } else {
        // Show instantly on scroll up
        showHeader();
      }

      lastScroll = currentScroll;

      // Also show after scroll stops
      scrollTimeout = setTimeout(() => {
        showHeader();
      }, 120);
    });

    // ========================
    // SECTION FADE-IN (EXCLUDE HERO)
    // ========================
    document.querySelectorAll("section:not(#home)").forEach((sec) => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false,
      });
    });

    // ========================
    // PROJECT CARD FADE + TILT
    // ========================
    document.querySelectorAll(".project-card").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false,
      });

      el.addEventListener("mousemove", (ev) => {
        const rect = el.getBoundingClientRect();
        const mx = ev.clientX - rect.left - rect.width / 2;
        const my = ev.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          rotateX: -my / 20,
          rotateY: mx / 20,
          scale: 1.02,
          transformPerspective: 800,
          duration: 0.4,
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    });

    // ========================
    // HERO IMAGE PARALLAX
    // ========================
    gsap.to(".hero-img", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cleanup GSAP on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ========================
  // MOBILE MENU TOGGLE
  // ========================
  function toggleMobileMenu() {
    const menu = document.querySelector("#mobile-menu");
    if (!menu) return;
    menu.classList.toggle("hidden");
    if (!menu.classList.contains("hidden")) {
      gsap.fromTo(
        "#mobile-menu",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 }
      );
    }
  }

  return (
     <div className="min-h-screen text-white bg-gradient-to-br from-[#ECECF8] to-[#F7F7F7]">
      
        <CustomCursor />
      <Header onToggleMenu={toggleMobileMenu} />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden md:hidden fixed top-16 right-4 z-50 bg-black/70 p-4 rounded-lg shadow-lg"
      >
        <a href="#home" className="block py-2">
          Home
        </a>
        <a href="#about" className="block py-2">
          About
        </a>
        <a href="#projects" className="block py-2">
          Projects
        </a>
        <a href="#contact" className="block py-2">
          Contact
        </a>
      </div>

      <main className="">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

    
    </div>
  );
}
