import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse), (hover: none)');
    const checkMobile = () => {
      const isTouch = mediaQuery.matches || window.innerWidth <= 768;
      setIsTouchDevice(isTouch);
      return isTouch;
    };

    const isMobile = checkMobile();
    if (isMobile) return undefined;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed left-[calc(var(--cursor-x)-8px)] top-[calc(var(--cursor-y)-8px)] w-16 h-16 pointer-none rounded-full blur-3xl z-[9999] animate-pulse"
      style={{
        '--cursor-x': `${position.x}px`,
        '--cursor-y': `${position.y}px`,
        '--bg-color': 'rgba(37, 99, 235, 0.2)',
        boxShadow: '0 0 15px 5px rgba(37, 99, 235, 0.3)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
      }}
    />
  );
};

export default CustomCursor;
