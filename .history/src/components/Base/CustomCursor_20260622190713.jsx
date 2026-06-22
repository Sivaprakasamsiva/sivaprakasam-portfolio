useEffect(() => {
  const cursor = cursorRef.current;
  const content = cursorContentRef.current;
  const dot = cursorDotRef.current;

  if (!cursor || !content || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let x = mouseX;
  let y = mouseY;

  let scale = 1;
  let targetScale = 1;

  let ringScale = 1;
  let targetRingScale = 1;

  const FOLLOW_SPEED = 0.18;
  const SCALE_SPEED = 0.15;

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const enterInteractive = () => {
    targetScale = 1.8;
    targetRingScale = 1.7;
  };

  const leaveInteractive = () => {
    targetScale = 1;
    targetRingScale = 1;
  };

  document.addEventListener("mousemove", handleMouseMove);

  document.addEventListener(
    "mouseover",
    (e) => {
      if (
        e.target.closest(
          "a,button,input,textarea,select,.cursor-hover,.project-card,.bento-card,.glass-panel,.nav-link"
        )
      ) {
        enterInteractive();
      }
    },
    true
  );

  document.addEventListener(
    "mouseout",
    (e) => {
      if (
        e.target.closest(
          "a,button,input,textarea,select,.cursor-hover,.project-card,.bento-card,.glass-panel,.nav-link"
        )
      ) {
        leaveInteractive();
      }
    },
    true
  );

  let raf;

  const update = () => {
    x += (mouseX - x) * FOLLOW_SPEED;
    y += (mouseY - y) * FOLLOW_SPEED;

    scale += (targetScale - scale) * SCALE_SPEED;
    ringScale += (targetRingScale - ringScale) * SCALE_SPEED;

    cursor.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      translate(-50%, -50%)
      scale(${ringScale})
    `;

    content.style.transform = `scale(${scale})`;

    dot.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      translate(-50%, -50%)
    `;

    raf = requestAnimationFrame(update);
  };

  update();

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(raf);
  };
}, []);