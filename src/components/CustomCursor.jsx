import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cursor = document.querySelector("#ai-cursor");
    const ring = document.querySelector("#ai-cursor-ring");
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    document.body.style.cursor = "none";

    const moveHandler = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", moveHandler);

    gsap.ticker.add(() => {
      if (!cursor || !visible) return;
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    });

    let rotationTween = gsap.to(ring, {
      rotation: 360,
      repeat: -1,
      ease: "linear",
      duration: 2,
      transformOrigin: "center center",
      paused: false,
    });

    // Target header logo
    const headerLogo = document.querySelector("#header-logo");

    const onLogoEnter = () => {
      setVisible(false);
      document.body.style.cursor = "auto";
      if (rotationTween) rotationTween.pause();
    };
    const onLogoLeave = () => {
      setVisible(true);
      document.body.style.cursor = "none";
      if (rotationTween) rotationTween.resume();
    };

    if (headerLogo) {
      headerLogo.addEventListener("mouseenter", onLogoEnter);
      headerLogo.addEventListener("mouseleave", onLogoLeave);
    }

    // Target all nav links with class 'header-link'
    const headerLinks = document.querySelectorAll(".header-link");

    headerLinks.forEach((link) => {
      link.addEventListener("mouseenter", onLogoEnter);
      link.addEventListener("mouseleave", onLogoLeave);
    });

    // Hover effects on all a, button, .magnetic elements (ring color + rotation)
    document.querySelectorAll("a, button, .magnetic").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ring, { borderColor: "rgba(99, 146, 245, 1)", duration: 0.2 });
        gsap.to(ring, { duration: 1, rotation: "+=180", ease: "power2.inOut" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(ring, { borderColor: "rgba(58, 95, 207, 0.6)", duration: 0.2 });
      });
    });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveHandler);
      if (headerLogo) {
        headerLogo.removeEventListener("mouseenter", onLogoEnter);
        headerLogo.removeEventListener("mouseleave", onLogoLeave);
      }
      headerLinks.forEach((link) => {
        link.removeEventListener("mouseenter", onLogoEnter);
        link.removeEventListener("mouseleave", onLogoLeave);
      });
    };
  }, [visible]);

  return (
    <div
      id="ai-cursor"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 flex items-center justify-center transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"
        }`}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Center dot */}
      <div
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: "#2A52BE",
          boxShadow: "0 0 8px rgba(42, 82, 190, 0.9)",
        }}
      ></div>

      {/* Rotating ring */}
      <div
        id="ai-cursor-ring"
        className="absolute w-8 h-8 rounded-full border"
        style={{
          borderColor: "rgba(58, 95, 207, 0.6)",
          boxShadow: "0 0 12px rgba(58, 95, 207, 0.6)",
        }}
      ></div>
    </div>
  );
}
