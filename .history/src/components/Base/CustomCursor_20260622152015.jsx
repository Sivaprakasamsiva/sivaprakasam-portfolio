import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => {
      isHovering = true;
      cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1.8)`;
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.15)';
      cursor.style.boxShadow = '0 0 30px rgba(10, 116, 218, 0.3)';
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1)`;
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
      cursor.style.boxShadow = 'none';
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (!isHovering) {
        cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1)`;
      } else {
        cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1.8)`;
      }
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);

    const links = document.querySelectorAll('a, button, .cursor-hover, input, textarea, select');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    animate();

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
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-12 h-12 rounded-full border-2 transition-all duration-75 ease-out hidden lg:block"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'rgba(10, 116, 218, 0.05)',
          backdropFilter: 'blur(4px)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          willChange: 'transform',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-accent hidden lg:block"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'transform 0.05s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;