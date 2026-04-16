import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CinematicLoader = () => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const name = "Yashvi Kanani";
    const letters = name.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Slower letter slide
                delayChildren: 0.2
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, scale: 1.5, filter: 'blur(20px)', y: 40 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)',
            y: 0,
            transition: { duration: 2.0, type: "spring", stiffness: 35, damping: 20 }
        }
    };

    return (
        <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-[#02040f]"
        >
            {/* Ambient Background Depth */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[150vw] sm:w-[60vw] h-[150vw] sm:h-[60vw] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[120px] mix-blend-screen -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[150vw] sm:w-[60vw] h-[150vw] sm:h-[60vw] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[120px] mix-blend-screen translate-y-1/2" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                {/* Advanced Light Sweep Text Container */}
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    className="flex flex-wrap justify-center text-[clamp(2.5rem,8vw,8rem)] sm:text-[clamp(3.5rem,10vw,8rem)] font-normal tracking-wide relative overflow-hidden px-4 sm:px-10 py-4 text-center leading-tight"
                    style={{ fontFamily: "'Shrikhand', cursive" }}
                >
                    {letters.map((char, index) => (
                        <motion.span 
                            key={index} 
                            variants={letterVariants}
                            className={`inline-block ${char === " " ? "w-2 sm:w-4 md:w-8" : ""} bg-clip-text text-transparent bg-gradient-to-r from-[#bc13fe] via-[#d946ef] to-[#3b82f6] relative z-10`}
                            style={{
                                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                                textShadow: "0 0 40px rgba(188, 19, 254, 0.4)"
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}

                    {/* Premium Light Sweep Shimmer Effect */}
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "200%" }}
                        transition={{ duration: 3.5, ease: "easeInOut", delay: 1.0 }}
                        className="absolute top-0 w-[40%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-60 skew-x-[-25deg] z-20 mix-blend-overlay"
                    />
                </motion.h1>

                {/* Subtitle / Expansion Phase */}
                <motion.div
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2.0, delay: 1.5, ease: "easeOut" }}
                    className="mt-4 sm:mt-8 flex flex-col items-center gap-4"
                >
                    <div className="w-[80vw] sm:w-[300px] md:w-[400px] h-px bg-transparent flex justify-center">
                        <motion.div 
                            initial={{ width: "0%" }} 
                            animate={{ width: "100%" }} 
                            transition={{ duration: 2.0, delay: 1.8, ease: "easeOut" }} 
                            className="h-full bg-gradient-to-r from-transparent via-[#bc13fe] to-transparent shadow-[0_0_15px_rgba(188,19,254,0.8)]"
                        />
                    </div>
                    
                    <motion.p
                        initial={{ letterSpacing: '0.1em' }}
                        animate={{ letterSpacing: '0.4em' }}
                        transition={{ duration: 2.5, delay: 1.8, ease: "easeOut" }}
                        className="text-[10px] sm:text-[14px] md:text-base font-black text-[#d946ef]/80 uppercase select-none font-outfit text-center px-4"
                    >
                        Full-Stack Developer
                    </motion.p>
                </motion.div>
            </div>
            
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />
        </motion.div>
    );
};

export default CinematicLoader;
