import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
      cursor.style.transform = `translate(${clientX - 24}px, ${clientY - 24}px)`;
      cursorDot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
    };

    const onMouseEnterLink = () => {
      cursor.style.transform = cursor.style.transform + ' scale(1.8)';
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.15)';
    };

    const onMouseLeaveLink = () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(1.8)', '');
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
    };

    document.addEventListener('mousemove', onMouseMove);

    const links = document.querySelectorAll('a, button, .cursor-hover, input, textarea, select');
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
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-12 h-12 rounded-full border-2 transition-all duration-150 ease-out hidden lg:block"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'rgba(10, 116, 218, 0.05)',
          backdropFilter: 'blur(4px)',
          mixBlendMode: 'difference',
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-accent hidden lg:block"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.08s ease-out',
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
};

export default CustomCursor;