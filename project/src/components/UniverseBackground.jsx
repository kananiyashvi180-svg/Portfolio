import React, { useMemo, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import LiquidEngine from './LiquidEngine';

/**
 * NebulaBackground component
 * Creates an ultra-dense, "thick fog" universe background by layering 
 * high-frequency fractal noise with vibrant cosmic colors + Interactive Liquid Physics.
 */
const UniverseBackground = () => {
    const { scrollYProgress } = useScroll();

    // Smooth interaction physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    // Smooth interaction physics - much snappier now
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const yScroll = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#01010c]">
            {/* ── INTERACTIVE LIQUID ENGINE (SIGNATURE EFFECT) ── */}
            <LiquidEngine />

            {/* ── HIGH-DENSITY FOG FILTERS ── */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="fractalFog">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" seed="2" />
                    <feDisplacementMap in="SourceGraphic" scale="100" />
                </filter>
                <filter id="denseMist">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.2  0 0 0 0 0.6  0 0 0 1 0" />
                </filter>
            </svg>

            {/* ── LAYER 1: DEEP DENSE MIST (Base Texture) ── */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                    filter: 'url(#denseMist) blur(40px)',
                    willChange: 'transform'
                }}
            />

            {/* ── LAYER 2: INTERACTIVE FOG CLOUDS ── */}
            <motion.div
                style={{ y: yScroll }}
                className="absolute inset-x-0 h-[150vh]"
            >
                <div
                    className="absolute inset-[-30%] opacity-70 mix-blend-screen"
                    style={{
                        filter: 'url(#fractalFog) blur(60px)',
                        willChange: 'transform'
                    }}
                >
                    {/* Large Primary Cloud Masses */}
                    <motion.div
                        style={{
                            x: useTransform(springX, [-0.5, 0.5], [-80, 80]),
                            y: useTransform(springY, [-0.5, 0.5], [-80, 80]),
                        }}
                        className="absolute top-[10%] left-[10%] w-[120vw] h-[120vw] rounded-full bg-blue-900/60"
                    />
                    <motion.div
                        style={{
                            x: useTransform(springX, [-0.5, 0.5], [100, -100]),
                            y: useTransform(springY, [-0.5, 0.5], [100, -100]),
                        }}
                        className="absolute bottom-[20%] right-[10%] w-[100vw] h-[100vw] rounded-full bg-purple-900/50"
                    />
                    <div className="absolute top-[40%] right-[20%] w-[80vw] h-[80vw] rounded-full bg-blue-800/40" />
                </div>

                {/* LAYER 3: HIGH-CONTRAST "SILK" WISPS (Fog Trails) */}
                <motion.div
                    className="absolute inset-0 z-10 opacity-60 mix-blend-color-dodge"
                    style={{
                        x: useTransform(springX, [-0.5, 0.5], [-180, 180]),
                        y: useTransform(springY, [-0.5, 0.5], [-180, 180]),
                    }}
                >
                    <div className="absolute top-[20%] left-[15%] w-[50vw] h-[50vw] bg-sky-500/30 blur-[130px] rounded-full" />
                    <div className="absolute bottom-[30%] right-[20%] w-[60vw] h-[60vw] bg-indigo-500/20 blur-[150px] rounded-full" />
                </motion.div>
            </motion.div>

            {/* ── LAYER 4: CRYSTALLINE STAR FIELD (DENSE & TWINKLING) ── */}
            <motion.div
                style={{
                    y: useTransform(scrollYProgress, [0, 1], [0, -600]),
                    willChange: 'transform'
                }}
                className="absolute inset-0 h-[150vh] opacity-100 mix-blend-screen"
            >
                {Array.from({ length: 80 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + (i % 5),
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.1
                        }}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: 1 + (i % 2),
                            height: 1 + (i % 2),
                            top: `${(i * 13) % 100}%`,
                            left: `${(i * 17) % 100}%`,
                            boxShadow: i % 10 === 0 ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
                            willChange: 'opacity'
                        }}
                    />
                ))}
            </motion.div>

            {/* ── FINAL NOISE POLISH & VIGNETTE ── */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#01010c] opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01010c]/40 via-transparent to-transparent opacity-60" />
        </div>
    );
};

export default UniverseBackground;
