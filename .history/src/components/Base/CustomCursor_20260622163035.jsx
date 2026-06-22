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
    let isVisible = true;

    // Check if cursor should be visible (only on desktop)
    const checkVisibility = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop && isVisible) {
        isVisible = false;
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
      } else if (isDesktop && !isVisible) {
        isVisible = true;
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
      }
    };

    // Initial check
    checkVisibility();

    // Handle resize
    window.addEventListener('resize', checkVisibility);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => {
      isHovering = true;
      // Apply zoom with proper transform
      const currentTransform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1.8)`;
      cursor.style.transform = currentTransform;
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.15)';
      cursor.style.boxShadow = '0 0 40px rgba(10, 116, 218, 0.3), inset 0 0 20px rgba(10, 116, 218, 0.1)';
      // Dot disappears on zoom
      cursorDot.style.opacity = '0';
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(0)`;
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      // Reset to normal
      const currentTransform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1)`;
      cursor.style.transform = currentTransform;
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
      cursor.style.boxShadow = 'none';
      // Dot reappears
      cursorDot.style.opacity = '1';
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
    };

    // Animation loop
    const animate = () => {
      // Smooth follow
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      // Apply transforms based on hover state
      if (isHovering) {
        cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1.8)`;
        cursor.style.borderColor = '#0A74DA';
        cursor.style.background = 'rgba(10, 116, 218, 0.15)';
        cursor.style.boxShadow = '0 0 40px rgba(10, 116, 218, 0.3), inset 0 0 20px rgba(10, 116, 218, 0.1)';
        cursorDot.style.opacity = '0';
        cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(0)`;
      } else {
        cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px) scale(1)`;
        cursor.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        cursor.style.background = 'rgba(10, 116, 218, 0.05)';
        cursor.style.boxShadow = 'none';
        cursorDot.style.opacity = '1';
        cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
      }

      requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);

    // Target all interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .cursor-hover, input, textarea, select, ' +
      '.glass-panel, .glass-panel-light, .glass-panel-extra-light, ' +
      '.project-card, .bento-card, .nav-link, .social-link'
    );
    
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    // Start animation
    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkVisibility);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor Ring */}
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
          transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
          pointerEvents: 'none',
          top: 0,
          left: 0,
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
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          pointerEvents: 'none',
          boxShadow: '0 0 12px rgba(10, 116, 218, 0.4)',
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;