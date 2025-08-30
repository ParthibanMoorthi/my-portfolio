import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNetworkWired, FaHtml5, FaCss3Alt, FaExternalLinkAlt } from "react-icons/fa";
import { SiTailwindcss, SiPostman, SiRazorpay } from "react-icons/si";
gsap.registerPlugin(ScrollTrigger);

const techIconsMap = {
  "React.js": <FaReact className="inline-block mr-1 text-indigo-500" />,
  "Tailwind CSS": <SiTailwindcss className="inline-block mr-1 text-teal-400" />,
  "REST APIs": <FaNetworkWired className="inline-block mr-1 text-green-500" />,
  "Tally APIs": <SiPostman className="inline-block mr-1 text-orange-500" />,
  "Razorpay Integration": <SiRazorpay className="inline-block mr-1 text-blue-500" />,
  "HTML5": <FaHtml5 className="inline-block mr-1 text-orange-600" />,
  "CSS3": <FaCss3Alt className="inline-block mr-1 text-blue-600" />,
};

const projects = [
  {
    id: 1,
    title: "AXN Audit Management (CRM System)",
    techStack: ["React.js", "Tailwind CSS", "REST APIs"],
    desc: [
      "Client, Employee, Case, Task, and Report modules.",
      "Used for case management by auditors with task assignment.",
      "Role-based access control to ensure data security.",
      "Real-time notifications for task updates and deadlines.",
      "Comprehensive reporting tools with export options.",
    ],
    url: "https://demo.auditcrm.in/crm/",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Champions Paper (CRM + Tally Integration)",
    techStack: ["React.js", "Tailwind CSS", "Tally APIs"],
    desc: [
      "Customer, Employee, Sales, Task, and Report modules.",
      "Synced sales and customer data directly from Tally ERP.",
      "Automated invoice generation and payment tracking.",
      "Dashboard with real-time sales and inventory analytics.",
      "Integrated notification system for payment reminders.",
    ],
    url: "https://championpaper.axninfotech.in/crm/",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "ARWA (Residential CRM Platform)",
    techStack: ["React.js", "Tailwind CSS", "Razorpay Integration"],
    desc: [
      "Modules: Members, Dues, Expenses.",
      "Integrated Razorpay for handling online payments.",
      "Monthly billing and dues management with automated reminders.",
      "Expense tracking with categorized reports.",
      "User-friendly dashboard for residents and admins.",
    ],
    url: "https://arwa.dreamstech.biz/crm/Login",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Navan Associates (Website)",
    techStack: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
    desc: [
      "Developed a responsive corporate website for a construction firm.",
      "Custom animations and interactive UI components.",
      "SEO optimized with fast load times.",
      "Content management system integration for easy updates.",
      "Mobile-first design ensuring accessibility on all devices.",
    ],
    url: "https://navanassociates.in/",
    img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsOverview() {
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

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
      default: return { x: "0%", y: "-100%" };
    }
  };

  const handleEnter = (e, index) => {
    const overlay = btnRefs.current[index]?.querySelector(".overlay");
    if (!overlay) return;
    const dir = getDirection(e, btnRefs.current[index]);
    const from = getTransform(dir);

    gsap.fromTo(
      overlay,
      { x: from.x, y: from.y },
      { x: "0%", y: "0%", duration: 0.4, ease: "power3.out" }
    );
  };

  const handleLeave = (e, index) => {
    const overlay = btnRefs.current[index]?.querySelector(".overlay");
    if (!overlay) return;
    const dir = getDirection(e, btnRefs.current[index]);
    const to = getTransform(dir);

    gsap.to(overlay, { x: to.x, y: to.y, duration: 0.4, ease: "power3.in" });
  };

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".project-section");
    const totalWidth = container.scrollWidth;

    // Only enable horizontal scroll pinning on medium+ screens
    if (window.innerWidth >= 768) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (totalWidth - window.innerWidth),
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full flex flex-col md:flex-row md:overflow-hidden"
    >
      {projects.map((project, i) => (
        <article
          key={project.id}
          className="project-section flex-shrink-0 w-full md:w-screen h-auto md:h-screen pt-18 pb-4 px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center md:items-start"
        >
          <img
            src={project.img}
            alt={project.title}
            className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-12"
            loading="lazy"
          />

          <div className="md:w-1/2 max-w-2xl relative">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-700 leading-snug">
              {project.title}
            </h2>

            <p className="font-medium mb-4 flex flex-wrap gap-2 sm:gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center bg-[#f0ebfc] text-black rounded-full px-3 py-1 text-xs sm:text-sm font-medium border border-[#d2c3f5] hover:bg-[#e6e0f8] transition-colors"
                >
                  {techIconsMap[tech] || null}
                  {tech}
                </span>
              ))}
            </p>

            <ul className="my-4 sm:my-6 space-y-3 sm:space-y-4 text-gray-700 list-inside">
              {project.desc.map((point, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-sm sm:text-base">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id={`grad3d-${i}-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#5b21b6" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 15l-5.878 3.09L5.82 12.18 1 8.41l6.06-.52L10 2l2.94 5.89 6.06.52-4.82 3.77 1.7 5.91z"
                      fill={`url(#grad3d-${i}-${idx})`}
                    />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="group inline-block relative overflow-hidden px-5 py-2.5 border border-[#654CAC] text-[#654CAC] text-sm sm:text-base font-medium rounded-lg cursor-pointer mt-2 sm:mt-4"
              ref={(el) => (btnRefs.current[i] = el)}
              onMouseEnter={(e) => handleEnter(e, i)}
              onMouseLeave={(e) => handleLeave(e, i)}
              // Disable hover animation on touch devices
              onTouchStart={(e) => handleEnter(e, i)}
              onTouchEnd={(e) => handleLeave(e, i)}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Visit Project <FaExternalLinkAlt />
              </span>
              <span
                className="overlay absolute inset-0 bg-[#654CAC] rounded-md pointer-events-none"
                style={{ transform: "translateX(100%)" }}
              />
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
