import React from 'react';
import { motion } from 'framer-motion';

const GlassButton = ({ children, href, className = '', primary = false, ...props }) => {
  const baseClasses = `inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-hover ${className}`;
  const primaryClasses = primary
    ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20'
    : 'glass-panel text-white hover:bg-white/5';

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${primaryClasses}`}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export default GlassButton;