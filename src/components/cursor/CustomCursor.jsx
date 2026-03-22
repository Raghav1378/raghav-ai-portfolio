import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed left-[calc(${position.x}px-8px)] top-[calc(${position.y}px-8px)] w-16 h-16 pointer-none 
                 bg-electric-blue/20 rounded-full blur-3z z-[9999] 
                 animate-pulse`}
      style={{
        '--bg-color': 'rgba(37, 99, 235, 0.2)',
        'box-shadow': '0 0 15px 5px rgba(37, 99, 235, 0.3)',
        'background-color': 'rgba(37, 99, 235, 0.2)'
      }}
    />
  );
};

export default CustomCursor;
