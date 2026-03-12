import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
    // Generate an array of random particles with complex floating paths
    const particles = useMemo(() => {
        return Array.from({ length: 120 }).map((_, i) => {
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
                glowColor: i % 4 === 0 ? 'rgba(0, 229, 255, 0.3)' : 
                           i % 4 === 1 ? 'rgba(108, 99, 255, 0.3)' : 
                           i % 4 === 2 ? 'rgba(255, 110, 199, 0.3)' : 
                           'rgba(255, 255, 255, 0.2)',
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
                        opacity: [0.2, 0.7, 0.4, 0.8, 0.2],
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
