import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorContentRef = useRef(null);
  const cursorDotRef = useRef(null);

  // 🎯 ZOOM CONTROL - Adjust these values
  const ZOOM_LEVEL = 1.8;        // How much to zoom (1.0 = no zoom, 2.5 = max)
  const ZOOM_SPEED = 0.08;       // Smoothness (lower = slower/smoother)

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorContent = cursorContentRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorContent || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;
    let currentZoom = 1;
    let targetZoom = 1;

    // Smooth zoom animation
    const smoothZoom = () => {
      // Gradually move currentZoom toward targetZoom
      currentZoom += (targetZoom - currentZoom) * ZOOM_SPEED;
      
      // Apply the zoom with smooth transition
      cursorContent.style.transform = `scale(${currentZoom})`;
      cursorContent.style.transformOrigin = 'center center';
      
      // Continue animation
      requestAnimationFrame(smoothZoom);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => {
      isHovering = true;
      targetZoom = ZOOM_LEVEL;  // Set target to zoom level
      
      // Expand the circle
      cursor.style.width = '80px';
      cursor.style.height = '80px';
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.08)';
      cursor.style.boxShadow = '0 0 50px rgba(10, 116, 218, 0.3), inset 0 0 30px rgba(10, 116, 218, 0.1)';
      cursorDot.style.opacity = '0';
      cursorDot.style.transform = 'scale(0)';
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      targetZoom = 1;  // Set target back to normal
      
      // Shrink the circle
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
      cursor.style.boxShadow = 'none';
      cursorDot.style.opacity = '1';
      cursorDot.style.transform = 'scale(1)';
    };

    const animate = () => {
      // Smooth mouse following
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      const halfWidth = isHovering ? 40 : 24;
      const halfHeight = isHovering ? 40 : 24;
      
      cursor.style.transform = `translate(${cursorX - halfWidth}px, ${cursorY - halfHeight}px)`;
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;

      requestAnimationFrame(animate);
    };

    // Start smooth zoom animation
    smoothZoom();

    document.addEventListener('mousemove', onMouseMove);

    // Target all interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .cursor-hover, input, textarea, select, ' +
      '.glass-panel, .glass-panel-light, .glass-panel-extra-light, ' +
      '.project-card, .bento-card, .nav-link, .social-link, ' +
      '.hero-content, .about-text, .timeline-wrapper'
    );
    
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
      {/* Main Cursor Ring with Magnifying Content */}
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
          willChange: 'transform, width, height',
          transition: 'width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Content inside cursor - THIS ZOOMS SMOOTHLY */}
        <div
          ref={cursorContentRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'scale(1)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          {/* The text/icon that will zoom */}
          <span style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 0 20px rgba(10,116,218,0.5)',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              background: 'rgba(10,116,218,0.15)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(10,116,218,0.2)',
              fontSize: '14px',
              fontWeight: '600',
            }}>
              ✦
            </span>
          </span>
        </div>
      </div>
      
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
          willChange: 'transform, opacity',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
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