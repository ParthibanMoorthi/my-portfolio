import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-white/60 bg-black/30">
      © {new Date().getFullYear()} Alex — Let’s create something great together!
    </footer>
  );
}
