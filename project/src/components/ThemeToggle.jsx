import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5 group"
            aria-label="Toggle Theme"
        >
            {/* Subtle glow ring on hover */}
            <span className="absolute inset-0 rounded-full border border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-300" />
            
            {/* Icon container with rotation animation */}
            <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-6 h-6"
            >
                {/* Sun Icon */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${isDarkMode ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="4" className="text-amber-400" fill="currentColor" />
                    <path d="M12 2v2" className="text-amber-300" />
                    <path d="M12 20v2" className="text-amber-300" />
                    <path d="m4.93 4.93 1.41 1.41" className="text-amber-300" />
                    <path d="m17.66 17.66 1.41 1.41" className="text-amber-300" />
                    <path d="M2 12h2" className="text-amber-300" />
                    <path d="M20 12h2" className="text-amber-300" />
                    <path d="m6.34 17.66-1.41 1.41" className="text-amber-300" />
                    <path d="m19.07 4.93-1.41 1.41" className="text-amber-300" />
                </svg>

                {/* Moon Icon */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path 
                        d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" 
                        className="text-cyan-400"
                        fill="currentColor"
                        fillOpacity="0.2"
                    />
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" className="text-cyan-300" />
                </svg>
            </motion.div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: isDarkMode
                        ? '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.1)'
                        : '0 0 20px rgba(251, 191, 36, 0.3), inset 0 0 10px rgba(251, 191, 36, 0.1)'
                }}
                transition={{ duration: 0.3 }}
            />
        </button>
    );
};

export default ThemeToggle;
