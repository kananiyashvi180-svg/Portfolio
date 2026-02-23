// ScrollReveal.jsx — High-performance section entrance animation
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Wraps content and reveals it with a snappy, premium transition.
 * @param {string} direction - 'up' | 'down' | 'left' | 'right' | 'scale'
 * @param {number} delay     - stagger delay in seconds
 */
const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '', cascade = false }) => {
    const offsets = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        scale: { scale: 0.9, y: 0, x: 0 },
    };

    const isScale = direction === 'scale';

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...offsets[direction],
                ...(isScale ? {} : { scale: 0.98 })
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
            }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 25,
                mass: 0.5,
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;

