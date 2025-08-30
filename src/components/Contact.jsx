import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import emailjs from "emailjs-com";

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);

  const [direction, setDirection] = useState("left");

  useEffect(() => {
    // Fade-in animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
          gsap.to(formRef.current.children, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    gsap.set(headerRef.current, { y: 30, opacity: 0 });
    gsap.set(formRef.current.children, { y: 30, opacity: 0 });
    observer.observe(sectionRef.current);

    // Particle background
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const particles = [];
    const maxParticles = 50; // reduce for performance
    const maxDistance = 120;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 1 + Math.random() * 2;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.4)";
        ctx.fill();
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });

      // Draw lines
      for (let i = 0; i < maxParticles; i++) {
        for (let j = i + 1; j < maxParticles; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.3 * (1 - dist / maxDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", setCanvasSize);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", setCanvasSize); };
  }, []);

  // Button hover animation
  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const fromLeft = mouseX < rect.width / 2;
    const fromTop = mouseY < rect.height / 2;
    let dir;
    if (Math.abs(mouseX - rect.width / 2) > Math.abs(mouseY - rect.height / 2)) dir = fromLeft ? "left" : "right";
    else dir = fromTop ? "top" : "bottom";
    setDirection(dir);
  };

  const getAnimationClasses = (dir) => {
    switch (dir) {
      case "left": return "origin-left scale-x-0 group-hover:scale-x-100";
      case "right": return "origin-right scale-x-0 group-hover:scale-x-100";
      case "top": return "origin-top scale-y-0 group-hover:scale-y-100";
      case "bottom": return "origin-bottom scale-y-0 group-hover:scale-y-100";
      default: return "origin-left scale-x-0 group-hover:scale-x-100";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current, "YOUR_USER_ID")
      .then(() => { alert("Message sent successfully!"); e.target.reset(); },
        (err) => { alert("Failed to send message."); console.error(err.text); }
      );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 py-12 sm:py-20 min-h-screen overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="text-white flex flex-col justify-center space-y-5">
          <span className="text-indigo-400 font-semibold tracking-widest text-xs sm:text-sm select-none">Contact Me</span>
          <h2 ref={headerRef} className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">Get in Touch</h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Let’s create something great together! Drop me a message, and I’ll get back to you within a few days.
          </p>
          <p className="italic text-white/60 text-xs sm:text-sm">
            Or reach me directly at{" "}
            <a href="mailto:hello@example.com" className="underline hover:text-indigo-400 transition">hello@example.com</a>
          </p>
        </div>

        <form ref={formRef} className="space-y-5 sm:space-y-6 flex flex-col justify-center" onSubmit={handleSubmit} noValidate>
          <FloatingInput type="text" id="name" name="name" label="Name" required />
          <FloatingInput type="email" id="email" name="email" label="Email" required />
          <FloatingTextarea id="message" name="message" label="Message" required />
          <button
            ref={buttonRef}
            type="submit"
            onMouseEnter={handleMouseEnter}
            className="group relative w-full py-2 sm:py-3 rounded-md border border-indigo-500 overflow-hidden text-white font-medium text-sm sm:text-base transition-transform active:scale-95 shadow-md"
          >
            <span className={`absolute inset-0 bg-indigo-500 transform transition-transform duration-500 ease-out ${getAnimationClasses(direction)}`} />
            <span className="relative z-10">Send Message</span>
          </button>
        </form>
      </div>
    </section>
  );
}

// Floating Input / Textarea Components remain unchanged
function FloatingInput({ id, label, type = "text", required = false, name }) {
  return (
    <div className="relative">
      <input
        id={id} name={name} type={type} required={required} placeholder={label} autoComplete="off"
        className="peer w-full bg-transparent rounded-md border border-white/20 px-3 sm:px-4 pt-5 pb-2 placeholder-transparent text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
      />
      <label
        htmlFor={id}
        className="absolute left-3 sm:left-4 top-1.5 sm:top-2 text-white/70 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-indigo-400 cursor-text select-none"
      >{label}</label>
    </div>
  );
}
function FloatingTextarea({ id, label, required = false, name }) {
  return (
    <div className="relative">
      <textarea
        id={id} name={name} rows={5} required={required} placeholder={label}
        className="peer w-full bg-transparent rounded-md border border-white/20 px-3 sm:px-4 pt-5 pb-2 placeholder-transparent text-white text-sm sm:text-base resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
      />
      <label
        htmlFor={id}
        className="absolute left-3 sm:left-4 top-1.5 sm:top-2 text-white/70 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-indigo-400 cursor-text select-none"
      >{label}</label>
    </div>
  );
}
