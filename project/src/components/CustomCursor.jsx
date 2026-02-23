import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 400, mass: 0.2 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleOver = (e) => {
            if (e.target.closest('a, button, [role="button"], .magnetic-wrap')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleOver);
        };
    }, [isVisible, mouseX, mouseY]);

    if (isTouch) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden mix-blend-difference">
            {/* Inner Dot - Instant movement */}
            <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full fixed"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0
                }}
            />

            {/* Outer Circle - Fast spring follower */}
            <motion.div
                className="fixed border-2 border-white rounded-full"
                animate={{
                    width: isHovering ? 80 : 30,
                    height: isHovering ? 80 : 30,
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0
                }}
                style={{
                    translateX: '-50%',
                    translateY: '-50%',
                    x: cursorX,
                    y: cursorY
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
        </div>
    );
};

export default CustomCursor;
