import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      cursorDot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
    };

    const onMouseEnterLink = () => {
      cursor.style.transform = cursor.style.transform + ' scale(1.5)';
      cursor.style.borderColor = '#0A74DA';
    };

    const onMouseLeaveLink = () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    };

    document.addEventListener('mousemove', onMouseMove);

    const links = document.querySelectorAll('a, button, .cursor-hover');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-10 h-10 rounded-full border-2 border-white/30 transition-all duration-150 ease-out hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'rgba(10, 116, 218, 0.05)',
          backdropFilter: 'blur(2px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-accent hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.08s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;