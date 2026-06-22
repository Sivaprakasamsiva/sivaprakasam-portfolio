import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorContentRef = useRef(null);
  const cursorDotRef = useRef(null);

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

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => {
      isHovering = true;
      // Magnifying glass effect - zoom content INSIDE the circle
      cursorContent.style.transform = 'scale(2)';
      cursorContent.style.transformOrigin = 'center center';
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.08)';
      cursor.style.boxShadow = '0 0 50px rgba(10, 116, 218, 0.3), inset 0 0 30px rgba(10, 116, 218, 0.1)';
      cursor.style.width = '80px';
      cursor.style.height = '80px';
      cursorDot.style.opacity = '0';
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      cursorContent.style.transform = 'scale(1)';
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
      cursor.style.boxShadow = 'none';
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursorDot.style.opacity = '1';
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      const halfWidth = isHovering ? 40 : 24;
      const halfHeight = isHovering ? 40 : 24;
      
      cursor.style.transform = `translate(${cursorX - halfWidth}px, ${cursorY - halfHeight}px)`;
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;

      // Update content position to follow cursor
      cursorContent.style.transform = isHovering ? 'scale(1.8)' : 'scale(1)';

      requestAnimationFrame(animate);
    };

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
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Content inside cursor - this zooms */}
        <div
          ref={cursorContentRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.25s ease',
            transform: 'scale(1)',
            transformOrigin: 'center center',
          }}
        >
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: 'rgba(255,255,255,0.8)',
            textShadow: '0 0 20px rgba(10,116,218,0.5)',
            letterSpacing: '1px',
          }}>
            
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
          willChange: 'transform',
          transition: 'opacity 0.25s ease',
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