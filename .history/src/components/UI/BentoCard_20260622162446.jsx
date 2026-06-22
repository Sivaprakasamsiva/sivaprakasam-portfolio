import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BentoCard = ({ title, items, className = '' }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`glass-panel-light p-6 rounded-2xl relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(10, 116, 218, 0.25), transparent 60%)`,
        }}
      />
      
      <h4 className="text-lg font-semibold text-white mb-4 relative z-10 drop-shadow-md">{title}</h4>
      <div className="flex flex-wrap gap-2 relative z-10">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-full text-sm text-gray-200 hover:border-accent/50 transition-colors drop-shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default BentoCard;