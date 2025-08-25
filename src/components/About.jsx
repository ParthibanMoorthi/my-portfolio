import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const panelsRef = useRef(null);
  const contentRef = useRef(null);
  const svgRef = useRef(null);
  const pathsRef = useRef([]);

  useEffect(() => {
    const container = panelsRef.current;
    const content = contentRef.current;
    const panelCount = container.children.length;
    const svg = svgRef.current;

    const scrollDist = window.innerWidth * (panelCount - 1) * 0.5;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        xPercent: -100 * (panelCount - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.5,
          end: () => `+=${scrollDist}`,
          invalidateOnRefresh: true,
        },
      });

      const scrollAmount = () => {
        const contentHeight = content.scrollHeight;
        const containerHeight = content.parentElement.offsetHeight;
        return ((contentHeight - containerHeight) / contentHeight) * -100;
      };
      gsap.to(content, {
        yPercent: scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${scrollDist}`,
        },
      });

      pathsRef.current.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          stroke: "#bbb",
          filter: "drop-shadow(0 0 2px rgba(255,255,255,0.1))",
          strokeWidth: 1,
          vectorEffect: "non-scaling-stroke",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDist}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      pathsRef.current.forEach((path, i) => {
        if (!path) return;
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            ease: "power2.inOut",
            duration: 1.8,
          },
          i * 0.3
        );
      });

      gsap.to(svg, {
        rotation: 1.5,
        scale: 1.015,
        transformOrigin: "50% 50%",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        duration: 12,
      });

      gsap.to(svg, {
        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.12))",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        duration: 7,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-screen h-screen overflow-hidden text-gray-100 pt-24 bg-[#0F0F0F]"
    >
      <h2 className="text-4xl font-extrabold text-center mb-6 tracking-widest">
        About Me
      </h2>

      <div className="flex h-full mx-6 sm:mx-12">
        <div className="w-1/2 relative h-full overflow-hidden">
          <div
            ref={contentRef}
            className="absolute top-0 left-0 w-full flex flex-col space-y-16"
            style={{ minHeight: "180%" }}
          >
            <section>
              <h3 className="text-2xl font-semibold text-gray-400 mb-2 tracking-wide">
                Professional Experience
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Front‑End Developer — Company Name
                <br />
                Oct 2024 – Present
                <br />
                Developing high-performance web applications with clean, scalable
                code.
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-gray-400 mb-2 tracking-wide">
                Technical Skills
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 leading-relaxed">
                <li>JavaScript (ES6+)</li>
                <li>React.js, React Hooks</li>
                <li>Tailwind CSS & CSS Modules</li>
                <li>HTML5 & CSS3</li>
                <li>Git & GitHub</li>
              </ul>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-gray-400 mb-2 tracking-wide">
                Education
              </h3>
              <p className="text-gray-300 leading-relaxed">
                B.Sc. in Computer Science — XYZ College, 2020 – 2023
              </p>
            </section>
          </div>
        </div>

        {/* Minimalist tech wireframe SVG */}
        <div className="w-1/2 flex justify-center items-center mt-12">
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className="w-72 h-72"
            fill="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1"
          >
            {/* Outer square */}
            <rect
              ref={(el) => (pathsRef.current[0] = el)}
              x="10"
              y="10"
              width="220"
              height="220"
              stroke="#888"
            />

            {/* Inner grid lines vertical */}
            {[50, 90, 130, 170, 210].map((x, i) => (
              <line
                key={"v" + i}
                ref={(el) => (pathsRef.current[1 + i] = el)}
                x1={x}
                y1="10"
                x2={x}
                y2="230"
                stroke="#666"
              />
            ))}

            {/* Inner grid lines horizontal */}
            {[50, 90, 130, 170, 210].map((y, i) => (
              <line
                key={"h" + i}
                ref={(el) => (pathsRef.current[6 + i] = el)}
                x1="10"
                y1={y}
                x2="230"
                y2={y}
                stroke="#666"
              />
            ))}

            {/* Diagonal cross */}
            <line
              ref={(el) => (pathsRef.current[11] = el)}
              x1="10"
              y1="10"
              x2="230"
              y2="230"
              stroke="#555"
            />
            <line
              ref={(el) => (pathsRef.current[12] = el)}
              x1="230"
              y1="10"
              x2="10"
              y2="230"
              stroke="#555"
            />
          </svg>
        </div>
      </div>

      {/* Invisible panels for scroll */}
      <div
        ref={panelsRef}
        className="absolute top-0 left-0 h-0 opacity-0 pointer-events-none flex"
        style={{ width: "300vw" }}
      >
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="w-screen flex-shrink-0" />
        ))}
      </div>
    </section>
  );
}
