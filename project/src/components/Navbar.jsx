import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Education', to: 'education' },
    { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

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
            className={`h-[76px] w-full flex items-center transition-all duration-500 fixed top-0 left-0 right-0 z-[100] bg-white/40 dark:bg-[#1E1F3A]/40 backdrop-blur-[15px] border-b ${isScrolled ? 'border-primary-500/30 dark:border-primary-500/50' : 'border-white/20 dark:border-white/10'}`}
            style={{
                boxShadow: isScrolled
                    ? '0 10px 40px rgba(0,0,0,0.1), 0 0 20px rgba(0,229,255,0.1), 0 0 20px rgba(108,99,255,0.1)'
                    : 'none'
            }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 xl:px-12 flex justify-between items-center h-full gap-4">
                {/* Logo */}
                <Link to="home" smooth className="cursor-pointer shrink-0">
                    <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.04 }}>
                        <motion.div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black font-outfit shadow-md shadow-primary-500/30"
                            style={{ background: 'linear-gradient(135deg, #6C63FF, #00E5FF)' }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            YK
                        </motion.div>
                        <span className="text-xl font-black font-outfit gradient-text tracking-tight hidden xl:block">
                            Yashvi.
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-0.5 h-full overflow-hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            smooth
                            spy
                            offset={-100}
                            onSetActive={() => setActiveSection(link.to)}
                            activeClass="active-nav-link"
                            className="relative px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-[#00E5FF] cursor-pointer transition-colors hover:bg-white/10 dark:hover:bg-black/10 rounded-full group mx-0.5 flex items-center justify-center h-[40px] whitespace-nowrap"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6C63FF] group-hover:to-[#00E5FF]">
                                {link.name}
                            </span>
                            <span className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] group-hover:w-[calc(100%-1.5rem)] transition-all duration-300 opacity-0 group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>

                {/* Gradient Pill CTA (Desktop only) */}
                <div className="hidden xl:block shrink-0">
                    <Link to="contact" smooth offset={-100}>
                        <motion.button
                            className="px-5 py-2 rounded-full text-xs font-black text-white shadow-lg tracking-wide border border-white/20 whitespace-nowrap"
                            style={{ background: 'linear-gradient(135deg, #6C63FF, #00E5FF)' }}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(108,99,255,0.4), 0 0 20px rgba(0,229,255,0.4)' }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Let's Work Together
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="xl:hidden flex items-center gap-3">
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div key={isMobileMenuOpen ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute top-[76px] left-0 w-full bg-white/80 dark:bg-[#1E1F3A]/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/10 overflow-hidden xl:hidden shadow-2xl p-4"
                        style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                    >
                        <div className="flex flex-col gap-2">
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
                                        offset={-70}
                                        activeClass="!text-primary-500 !bg-primary-500/10 !border-primary-500/20"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-6 py-4 rounded-2xl text-base font-black text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-primary-500/20"
                                    >
                                        <span className="bg-clip-text">
                                            {link.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="mt-4"
                            >
                                <Link to="contact" smooth offset={-100} onClick={() => setIsMobileMenuOpen(false)}>
                                    <button
                                        className="w-full px-6 py-4 rounded-2xl text-base font-black text-white shadow-lg tracking-wide border border-white/20"
                                        style={{ background: 'linear-gradient(135deg, #6C63FF, #00E5FF)' }}
                                    >
                                        Let's Work Together
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
