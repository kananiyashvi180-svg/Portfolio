import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Custom cursor spotlight that follows the mouse with a spring delay.
 * Renders only on desktop.
 */
const CursorGlow = () => {
    const { isDarkMode } = useTheme();
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const sx = useSpring(x, { stiffness: 120, damping: 24 });
    const sy = useSpring(y, { stiffness: 120, damping: 24 });

    useEffect(() => {
        const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    // Color based on theme
    const glowColor = isDarkMode ? 'rgba(14,165,233,0.12)' : 'rgba(99,102,241,0.08)';

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
            style={{
                x: sx,
                y: sy,
                translateX: '-50%',
                translateY: '-50%',
                width: 380,
                height: 380,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
                filter: 'blur(20px)',
            }}
        />
    );
};

export default CursorGlow;
