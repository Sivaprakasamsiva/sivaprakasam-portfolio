import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const lensRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const lens = lensRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !lens || !cursorDot) return;

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
      // Lens effect - circle gets bigger with zoomed content
      cursor.style.width = '120px';
      cursor.style.height = '120px';
      cursor.style.borderColor = '#0A74DA';
      cursor.style.background = 'rgba(10, 116, 218, 0.06)';
      cursor.style.boxShadow = '0 0 60px rgba(10, 116, 218, 0.25), inset 0 0 40px rgba(10, 116, 218, 0.08)';
      // Zoom the lens content
      lens.style.transform = 'scale(1.6)';
      cursorDot.style.opacity = '0';
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      cursor.style.background = 'rgba(10, 116, 218, 0.05)';
      cursor.style.boxShadow = 'none';
      lens.style.transform = 'scale(1)';
      cursorDot.style.opacity = '1';
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      const halfWidth = isHovering ? 60 : 24;
      const halfHeight = isHovering ? 60 : 24;
      
      cursor.style.transform = `translate(${cursorX - halfWidth}px, ${cursorY - halfHeight}px)`;
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);

    const hoverTargets = document.querySelectorAll(
      'a, button, .cursor-hover, input, textarea, select, ' +
      '.glass-panel, .glass-panel-light, .project-card, .bento-card'
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
      {/* Main Cursor with Lens */}
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
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Lens Content - Zooms inside the circle */}
        <div
          ref={lensRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            transform: 'scale(1)',
            transformOrigin: 'center center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: '300',
            letterSpacing: '2px',
          }}
        >
          <span style={{
            background: 'rgba(10,116,218,0.15)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(10,116,218,0.2)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
          }}>
            ✦
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
          transition: 'opacity 0.3s ease',
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