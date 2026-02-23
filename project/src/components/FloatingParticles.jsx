/**
 * FloatingParticles.jsx
 * ─────────────────────
 * Reusable floating particle cloud.
 *
 * Props:
 *   count   – number of particles (default 15)
 *   colors  – array of rgba strings to pick from
 *   minSize – minimum particle px size (default 4)
 *   maxSize – maximum particle px size (default 10)
 *
 * Usage:
 *   <FloatingParticles count={12} colors={["rgba(14,165,233,0.6)", "rgba(99,102,241,0.5)"]} />
 *
 * The parent section MUST have `position: relative` and `overflow: hidden`.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({
    count = 15,
    colors = [
        'rgba(14,165,233,0.55)',   // sky-blue
        'rgba(99,102,241,0.55)',   // indigo
        'rgba(236,72,153,0.45)',   // pink
    ],
    minSize = 4,
    maxSize = 10,
}) => {
    /* Generate stable (deterministic) particle configs so React doesn't
       re-create them on every render but they still feel "random". */
    const particles = useMemo(() => (
        Array.from({ length: count }, (_, i) => {
            const size = minSize + ((i * 7 + 3) % (maxSize - minSize + 1));
            return {
                id: i,
                width: size,
                height: size,
                top: `${(i * 13 + 5) % 95}%`,
                left: `${(i * 17 + 9) % 95}%`,
                background: colors[i % colors.length],
                duration: 3.5 + (i % 5),
                delay: (i * 0.4) % 3.5,
                // give each particle a unique travel path
                yRange: [0, -(20 + (i % 20)), 0],
                xRange: [0, (i % 2 === 0 ? 1 : -1) * (8 + (i % 12)), (i % 2 === 0 ? -1 : 1) * 6, 0],
            };
        })
    ), [count, colors, minSize, maxSize]);

    return (
        <>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: p.width,
                        height: p.height,
                        top: p.top,
                        left: p.left,
                        background: p.background,
                        boxShadow: `0 0 ${p.width * 2}px ${p.background}`,
                    }}
                    animate={{
                        y: p.yRange,
                        x: p.xRange,
                        opacity: [0.35, 0.85, 0.35],
                        scale: [1, 1.35, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </>
    );
};

export default FloatingParticles;
