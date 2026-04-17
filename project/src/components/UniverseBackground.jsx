import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const UniverseBackground = () => {
    // Generate static stars for background
    const stars = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.7 + 0.3,
            duration: Math.random() * 4 + 3,
        }));
    }, []);

    // Floating light orbs/nebulae that drift slowly
    const driftOrbs = useMemo(() => {
        return [
            { color: 'rgba(157, 0, 255, 0.15)', size: '50vw', x: '10%', y: '20%', duration: 40 }, // Purple
            { color: 'rgba(0, 255, 243, 0.12)', size: '60vw', x: '80%', y: '70%', duration: 55 }, // Cyan
            { color: 'rgba(255, 0, 135, 0.1)', size: '45vw', x: '40%', y: '50%', duration: 45 },  // Pink
            { color: 'rgba(0, 184, 255, 0.08)', size: '40vw', x: '50%', y: '10%', duration: 50 }, // Blue
        ];
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
            {/* Drifting Nebula Orbs */}
            {driftOrbs.map((orb, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full blur-[120px]"
                    style={{
                        backgroundColor: orb.color,
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                    }}
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -40, 60, 0],
                        scale: [1, 1.2, 0.9, 1.1, 1],
                        opacity: [0.4, 0.5, 0.45, 0.55, 0.4],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Twinkling Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white blur-[0.5px]"
                    style={{
                        width: star.size,
                        height: star.size,
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                    }}
                    animate={{
                        opacity: [star.opacity, star.opacity * 0.5, star.opacity],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
};

export default UniverseBackground;
