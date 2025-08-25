import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "AXN Audit Management (CRM System)",
    techStack: ["React.js", "Tailwind CSS", "REST APIs"],
    desc: [
      "Client, Employee, Case, Task, and Report modules.",
      "Used for case management by auditors with task assignment and report generation.",
    ],
    url: "https://demo.auditcrm.in/crm/",
    img: "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Champions Paper (CRM + Tally Integration)",
    techStack: ["React.js", "Tailwind CSS", "Tally APIs"],
    desc: [
      "Customer, Employee, Sales, Task, and Report modules.",
      "Synced sales and customer data directly from Tally ERP.",
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
    ],
    url: "https://navanassociates.in/",
    img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsOverview() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".project-section");
    const totalWidth = container.scrollWidth;

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative flex overflow-hidden h-screen"
      style={{ width: `${projects.length * 100}vw` }}
    >
      {projects.map((project) => (
        <article
          key={project.id}
          className="project-section flex-shrink-0 w-screen h-screen p-12 flex flex-col md:flex-row items-center bg-white text-gray-900"
        >
          <img
            src={project.img}
            alt={project.title}
            className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12"
            loading="lazy"
          />
          <div className="md:w-1/2 max-w-xl">
            <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
            <p className="text-indigo-600 font-semibold mb-3">
              {project.techStack.join(" • ")}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              {project.desc.map((point, idx) => (
                <li key={idx} className="mb-1">
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Visit Project
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
