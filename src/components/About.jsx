import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaTools,
  FaLaptopCode,
  FaGitAlt,
  FaGithub,
  FaDatabase,
} from "react-icons/fa";

const experiences = [
  {
    id: 1,
    company: "Company Name 1, Location 1",
    role: "Front-End Developer",
    duration: "Oct 2024 – Present",
    details: [
      "Developed responsive websites and web applications using React.js and Tailwind CSS, ensuring optimal performance across devices.",
      "Collaborated with UI/UX teams to translate Figma designs into clean, functional interfaces with React.",
      "Built dynamic modules like Customers, Sales, Tasks, and Reports.",
    ],
  },
  {
    id: 2,
    company: "Company Name 2, Location 2",
    role: "Front-End Developer",
    duration: "Sep 2023 – Sep 2024",
    details: [
      "Customized Tailwind templates and implemented dynamic CRM functionality using React.js.",
      "Built and connected frontend UI to backend APIs for CRM modules.",
      "Gained experience in debugging and troubleshooting UI issues to improve overall functionality and performance.",
    ],
  },
];

const skills = [
  { name: "JavaScript", icon: <FaJs className="text-yellow-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 90 },
  { name: "HTML5", icon: <FaHtml5 className="text-red-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 95 },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 90 },
  { name: "React.js", icon: <FaReact className="text-[#61DBFB] w-12 h-12 sm:w-16 sm:h-16" />, percent: 85 },
  { name: "Tailwind CSS", icon: <FaCss3Alt className="text-teal-400 w-12 h-12 sm:w-16 sm:h-16" />, percent: 80 },
  { name: "Postman", icon: <FaTools className="text-orange-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 80 },
  { name: "VS Code", icon: <FaLaptopCode className="text-blue-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 90 },
  { name: "Git", icon: <FaGitAlt className="text-orange-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 80 },
  { name: "GitHub", icon: <FaGithub className="text-gray-300 w-12 h-12 sm:w-16 sm:h-16" />, percent: 80 },
  { name: "REST APIs", icon: <FaDatabase className="text-yellow-500 w-12 h-12 sm:w-16 sm:h-16" />, percent: 85 },
];

export default function AboutMe() {
  const [activeExp, setActiveExp] = useState(null);

   useEffect(() => {
    if (activeExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeExp]);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-4 sm:px-20 py-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-14 text-center tracking-wide">
        About Me
      </h2>

      {/* Experiences */}
      <div className="mb-14">
        <h3 className="text-xl sm:text-2xl text-white font-bold mb-8 text-center">
          Professional Experience
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              layoutId={`card-${exp.id}`}
              onClick={() => setActiveExp(exp)}
              className="cursor-pointer relative rounded-xl shadow-xl border border-gray-800 overflow-hidden"
              whileHover={{ rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 rounded-3xl pointer-events-none"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex p-4 sm:p-6 flex-col space-y-2 sm:space-y-3 z-10">
                <span className="text-indigo-400 font-semibold text-sm sm:text-base tracking-wide">{exp.company}</span>
                <span className="text-white font-bold text-sm sm:text-base tracking-tight">{exp.role}</span>
                <span className="text-gray-400 text-xs sm:text-sm">{exp.duration}</span>
                <span className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs sm:text-sm font-medium px-2 py-1 rounded-bl-lg shadow-md">
                  {exp.role.split(" ")[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-14">
        <h3 className="text-xl sm:text-2xl text-white font-bold mb-8 text-center">Skills</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-12 justify-items-center">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center cursor-default relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle cx="50%" cy="50%" r="40%" stroke="#374151" strokeWidth="3" fill="none" />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke={`url(#grad-${idx})`}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="251"
                    strokeDashoffset={251}
                    animate={{ strokeDashoffset: 251 - (251 * skill.percent) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="relative z-10 flex items-center justify-center text-center">
                  <div className="text-2xl sm:text-4xl">{skill.icon}</div>
                </div>
              </div>
              <span className="text-xs sm:text-base text-white mt-2 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeExp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-lg" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} />
            <motion.div
              layoutId={`card-${activeExp.id}`}
              className="relative w-full max-w-full sm:max-w-2xl bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
            >
              <div className="relative h-40 sm:h-48 w-full flex-shrink-0">
                <img src="/header-bg.jpg" alt="Modal Header" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-4 sm:px-6">
                  <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-1">{activeExp.company}</h3>
                  <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">{activeExp.role}</h2>
                  <p className="text-xs sm:text-sm mt-1 text-gray-200">{activeExp.duration}</p>
                </div>
                <button
                  onClick={() => setActiveExp(null)}
                  className="absolute top-4 sm:top-5 right-4 sm:right-5 text-gray-400 hover:text-white text-xl sm:text-2xl transition-transform transform hover:scale-125 z-20"
                >
                  <IoClose />
                </button>
              </div>
              <motion.div className="p-4 sm:p-6 overflow-y-auto flex-1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <ul className="space-y-3 sm:space-y-4">
                  {activeExp.details.map((point, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.35 }}
                    >
                      <span className="mt-1 text-indigo-500 flex-shrink-0">
                        <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-gray-300 text-xs sm:text-base leading-relaxed">{point}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
