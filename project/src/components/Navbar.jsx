import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

import ykLogo from '../assets/Yashvi-logo.jpeg';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Certificates', to: 'certificates' },
    { name: 'Education', to: 'education' },
    { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-[72px] w-full flex items-center transition-all duration-500 fixed top-0 left-0 right-0 z-[100] 
                bg-gradient-to-b from-black/80 to-black/60 
                backdrop-blur-xl border-b 
                ${isScrolled 
                    ? 'border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.1)]' 
                    : 'border-white/5'}`}
        >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-full gap-6 relative z-10">
                
                {/* Logo - Left Side completely redesigned with CSS */}
                <Link to="home" smooth className="cursor-pointer shrink-0" onClick={() => navigate('/home', { state: { preventScroll: true } })}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative w-12 h-12 flex items-center justify-center group"
                    >
                        {/* 1) Dynamic Neon Glow (Bloom) behind the logo */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500 blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full" />
                        <div className="absolute inset-2 bg-gradient-to-r from-cyan-400 to-purple-400 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

                        {/* 2) Outer Container isolates the screen blending */}
                        <div 
                            className="relative w-full h-full bg-black flex items-center justify-center z-10"
                            style={{ mixBlendMode: 'screen' }}
                        >
                            {/* The Original Logo - Grayscale and boosted to create a crisp mask */}
                            <img
                                src={ykLogo}
                                alt="YK Logo"
                                className="w-full h-full object-contain scale-[1.1] filter grayscale contrast-[1.2] brightness-[1.1]"
                            />
                            
                            {/* Colorizing Gradient using Multiply. This colors ONLY the light parts of the logo! */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-purple-500 to-blue-600 mix-blend-multiply pointer-events-none" />
                        </div>
                    </motion.div>
                </Link>

                {/* Desktop Nav - Center */}
                <div className="hidden xl:flex items-center gap-1 h-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            smooth
                            spy
                            offset={-90}
                            onSetActive={() => {
                                setActiveSection(link.to);
                                if (location.pathname !== `/${link.to}`) {
                                    navigate(`/${link.to}`, { replace: true, state: { preventScroll: true } });
                                }
                            }}
                            onClick={() => navigate(`/${link.to}`, { state: { preventScroll: true } })}
                            activeClass="active-nav-link"
                            className="relative px-5 py-2.5 text-base font-medium text-slate-400 hover:text-white cursor-pointer transition-all duration-300 rounded-lg group"
                        >
                            <span className="relative z-10 transition-all duration-300 group-hover:text-cyan-300">
                                {link.name}
                            </span>
                            
                            {/* Hover glow effect */}
                            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
                            
                            {/* Active underline indicator */}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-4/5 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        </Link>
                    ))}
                </div>

                {/* Desktop Controls - Right Side */}
                <div className="hidden xl:flex items-center gap-6 shrink-0">
                    <a href="/Yashvi_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        <motion.button
                            aria-label="View Resume"
                            className="relative px-6 py-2.5 rounded-full text-base font-semibold text-white overflow-hidden group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {/* Gradient background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 transition-all duration-300 group-hover:from-blue-500 group-hover:via-cyan-400 group-hover:to-cyan-300" />
                            
                            {/* Glow effect on hover */}
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/50 via-cyan-400/50 to-cyan-300/50 blur-xl" />
                            
                            {/* Subtle border */}
                            <span className="absolute inset-0 rounded-full border border-white/20" />
                            
                            {/* Button text */}
                            <span className="relative z-10 tracking-wide">
                                Resume
                            </span>
                        </motion.button>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="xl:hidden flex items-center gap-4">
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={isMobileMenuOpen ? 'x' : 'menu'} 
                                initial={{ rotate: -90, opacity: 0 }} 
                                animate={{ rotate: 0, opacity: 1 }} 
                                exit={{ rotate: 90, opacity: 0 }} 
                                transition={{ duration: 0.15 }}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute top-[72px] left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-cyan-500/20 overflow-hidden xl:hidden shadow-2xl"
                        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(6,182,212,0.1)' }}
                    >
                        <div className="flex flex-col gap-1 p-4">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={link.to}
                                        smooth
                                        spy
                                        offset={-80}
                                        onSetActive={() => {
                                            setActiveSection(link.to);
                                            if (location.pathname !== `/${link.to}`) {
                                                navigate(`/${link.to}`, { replace: true, state: { preventScroll: true } });
                                            }
                                        }}
                                        activeClass="!text-cyan-400 !bg-cyan-500/10"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            navigate(`/${link.to}`, { state: { preventScroll: true } });
                                        }}
                                        className="block px-6 py-4 rounded-xl text-lg font-medium text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-cyan-500/20"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="mt-4 px-4"
                            >
                                <a href="/Yashvi_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button
                                        className="w-full px-6 py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:via-cyan-400 hover:to-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                    >
                                        Resume
                                    </button>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
