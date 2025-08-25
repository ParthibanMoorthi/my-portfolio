import React from 'react';

export default function NavLink({ to, children, className = '' }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector(to);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  );
}
