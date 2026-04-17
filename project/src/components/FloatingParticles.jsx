import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
    // Generate an array of random particles with complex floating paths
    const particles = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
            const isLarge = Math.random() > 0.8;
            return {
                id: i,
                size: isLarge ? Math.random() * 12 + 8 : Math.random() * 4 + 2, 
                // Start positions
                xStart: Math.random() * 100, 
                yStart: Math.random() * 100,
                // Complex path points for "floating" feel
                xPaths: [
                    `${Math.random() * 30 - 15}vw`, 
                    `${Math.random() * 30 - 15}vw`, 
                    `${Math.random() * 30 - 15}vw`, 
                    '0vw'
                ],
                yPaths: [
                    `${Math.random() * 30 - 15}vh`, 
                    `${Math.random() * 30 - 15}vh`, 
                    `${Math.random() * 30 - 15}vh`, 
                    '0vh'
                ],
                duration: isLarge ? Math.random() * 30 + 40 : Math.random() * 15 + 20, 
                delay: Math.random() * -50,
                glowColor: i % 4 === 0 ? 'rgba(0, 255, 243, 0.4)' : // Hyper Cyan
                           i % 4 === 1 ? 'rgba(157, 0, 255, 0.4)' : // Electric Purple
                           i % 4 === 2 ? 'rgba(255, 0, 135, 0.4)' : // Cyber Pink
                           'rgba(0, 184, 255, 0.3)',               // Deep Neon Blue
                blur: isLarge ? '6px' : '1px',
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.xStart}vw`,
                        top: `${p.yStart}vh`,
                        backgroundColor: p.glowColor,
                        boxShadow: `0 0 15px ${p.glowColor}`,
                        filter: `blur(${p.blur})`,
                    }}
                    animate={{
                        x: p.xPaths,
                        y: p.yPaths,
                        opacity: [0.3, 0.5, 0.4, 0.6, 0.3],
                        scale: [1, 1.3, 0.8, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
