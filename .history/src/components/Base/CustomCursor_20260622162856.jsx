import React, { useEffect, useRef } from 'react';

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
      // Scale up - ZOOM effect (no blur)
      cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1.8)`;
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.12)';
      cursor.style.boxShadow = '0 0 30px rgba(10, 116, 218, 0.25)';
      // Dot disappears on hover
      cursorDot.style.opacity = '0';
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(0)`;
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      // Scale back to normal
      cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1)`;
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
      cursor.style.boxShadow = 'none';
      // Dot reappears
      cursorDot.style.opacity = '1';
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
    };

    // Animation loop - smooth following
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      
      if (!isHovering) {
        cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1)`;
        cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
        cursorDot.style.opacity = '1';
      } else {
        cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1.8)`;
        cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(0)`;
        cursorDot.style.opacity = '0';
      }
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);

    // Target elements for hover effect
    const hoverTargets = document.querySelectorAll('a, button, .cursor-hover, input, textarea, select, .glass-panel, .glass-panel-light, .project-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor Ring - ZOOM effect, NO blur */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.35)',
          background: 'rgba(10, 116, 218, 0.05)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
          pointerEvents: 'none',
        }}
      />
      
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#0A74DA',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
          boxShadow: '0 0 12px rgba(10, 116, 218, 0.4)',
        }}
      />
    </>
  );
};

export default CustomCursor;