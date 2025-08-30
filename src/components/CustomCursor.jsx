import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const magnifierRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [isOverText, setIsOverText] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const magnifier = magnifierRef.current;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    document.body.style.cursor = "none";

    const moveHandler = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", moveHandler);

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;

      if (cursor && visible) {
        gsap.set(cursor, { x: pos.x, y: pos.y });
      }
      if (magnifier && visible && isOverText) {
        gsap.set(magnifier, { x: pos.x, y: pos.y });
        // Also update background position inside magnifier to create zoom effect
        magnifier.style.backgroundPosition = `calc(50% + ${-pos.x * 1.5}px) calc(50% + ${-pos.y * 1.5}px)`;
      } else if (magnifier) {
        gsap.set(magnifier, { x: -9999, y: -9999 }); // Hide magnifier offscreen
      }

      requestAnimationFrame(tick);
    };
    tick();

    // Handlers for text hover detection
    const textElements = document.querySelectorAll(".glass-text");

    const onTextEnter = () => setIsOverText(true);
    const onTextLeave = () => setIsOverText(false);

    textElements.forEach((el) => {
      el.addEventListener("mouseenter", onTextEnter);
      el.addEventListener("mouseleave", onTextLeave);
    });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveHandler);
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", onTextEnter);
        el.removeEventListener("mouseleave", onTextLeave);
      });
    };
  }, [visible, isOverText]);

  return (
    <>
      {/* Custom cursor dot and ring */}
      <div
        id="ai-cursor"
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 flex items-center justify-center transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
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

      {/* Glass magnifier */}
      <div
        ref={magnifierRef}
        className="fixed pointer-events-none w-32 h-32 rounded-full border border-white/50 backdrop-blur-md shadow-lg"
        style={{
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 200%",
          backgroundImage: "none", // set below in effect
          mixBlendMode: "screen",
          zIndex: 9998,
          display: isOverText ? "block" : "none",
        }}
      ></div>
    </>
  );
}
