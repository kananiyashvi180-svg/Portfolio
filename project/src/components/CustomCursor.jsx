import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for the outer circle
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') ||
        target.tagName.toLowerCase() === 'button';
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Small Dot (follows cursor exactly) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full z-[999] pointer-events-none"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />

      {/* Outer Ring (smooth following) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary-500/50 rounded-full z-[998] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(108, 99, 255, 0.1)' : 'rgba(0,0,0,0)',
        }}
      />
      
      {/* Light Blur around cursor for visibility on black bg */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full z-[997] pointer-events-none"
        animate={{
          x: mousePos.x - 64,
          y: mousePos.y - 64,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  );
};

export default CustomCursor;
