import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Mail, ChevronDown, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import LeetCodeIcon from '../components/LeetCodeIcon';
import YouTubeIcon from '../components/YouTubeIcon';
import { portfolioData } from '../data/portfolio';
import { Link } from 'react-scroll';
import Magnetic from '../components/Magnetic';

/* ─── Skill Accordion ────────────────────────────────────────────────────── */
const skills = [
    {
        title: 'Frontend Development',
        detail: 'Building modern, responsive UIs with React, HTML/CSS, and Tailwind. Focused on performance and clean code.',
    },
    {
        title: 'MERN Stack & Backend',
        detail: 'Node.js, Express, and MongoDB to craft scalable APIs and full-stack applications from scratch.',
    },
    {
        title: 'UI/UX & Design',
        detail: 'Designing sleek interfaces with attention to typography, color theory, and user-centric interactions.',
    },
];

const SkillItem = ({ title, detail, index }) => {
    const [open, setOpen] = useState(index === 1);
    return (
        <div
            className="border-b border-primary-500/20 dark:border-primary-400/20 py-4 cursor-pointer group"
            onClick={() => setOpen(o => !o)}
        >
            <div className="flex items-center justify-between">
                <span className="font-outfit font-bold text-[10px] sm:text-xs uppercase tracking-widest text-slate-800 dark:text-slate-100 group-hover:text-primary-500 transition-colors">
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-primary-500 dark:text-primary-400"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.p
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed"
                    >
                        {detail}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Social Badge ───────────────────────────────────────────────────────── */
const SocialBadge = ({ href, label, children }) => (
    <Magnetic strength={0.2}>
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center border-2 border-slate-800 dark:border-primary-400/50 rounded text-slate-800 dark:text-primary-300 hover:bg-primary-500/10 transition-all duration-200"
            title={label}
        >
            {children}
        </motion.a>
    </Magnetic>
);

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const springX = useSpring(tiltX, { stiffness: 200, damping: 15 });
    const springY = useSpring(tiltY, { stiffness: 200, damping: 15 });

    const handleCardMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        tiltX.set(py * -20);
        tiltY.set(px * 20);
    };
    const resetCardTilt = () => { tiltX.set(0); tiltY.set(0); };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 12 }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-[#1E1F3A]">
            {/* Background Decorations */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #6C63FF 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
                }}
            />

            <motion.div
                className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }}
                animate={{ x: [0, mousePos.x * 0.5], y: [0, mousePos.y * 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main Layout Grid */}
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-24 pb-12 z-20">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.9fr] gap-10 xl:gap-12 items-center">

                    {/* Left Column - Name & CTA */}
                    <div className="flex flex-col justify-center md:col-span-2 xl:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex self-start mb-6"
                        >
                            <span className="bg-white/80 dark:bg-[#2A2C5B]/80 backdrop-blur-md text-slate-900 dark:text-slate-100 font-outfit font-black text-xs uppercase tracking-[0.3em] px-5 py-2.5 rounded-full shadow-lg border border-primary-500/20 flex items-center gap-2">
                                <Sparkles size={14} className="text-primary-500" /> Hi, there!
                            </span>
                        </motion.div>

                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="font-outfit font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] sm:leading-[0.85] uppercase text-slate-900 dark:text-white mb-8 tracking-tighter">
                            <motion.span variants={itemVariants} className="block">Yashvi</motion.span>
                            <motion.span variants={itemVariants} className="block gradient-text italic">Kanani</motion.span>
                            <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
                                <span className="block whitespace-nowrap text-2xl sm:text-3xl lg:text-4xl text-slate-500 dark:text-slate-400">Right here</span>
                                <span className="flex-1 h-px sm:h-0.5 bg-primary-500 rounded-full" />
                            </motion.div>
                        </motion.div>

                        <div className="mt-4 self-start">
                            <Magnetic strength={0.4}>
                                <Link to="projects" smooth offset={-80}>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-800 dark:border-primary-400/40 flex items-center justify-center cursor-pointer text-slate-800 dark:text-primary-300 bg-white/5 backdrop-blur-sm group">
                                        <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 group-hover:rotate-45 transition-transform duration-300" />
                                    </motion.div>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Center Column - Profile Image */}
                    <motion.div
                        className="relative flex items-end justify-center perspective-[1000px] md:col-span-1"
                        style={{ rotateX: springX, rotateY: springY, willChange: 'transform' }}
                        onMouseMove={handleCardMove}
                        onMouseLeave={resetCardTilt}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="relative w-full max-w-xs lg:max-w-sm aspect-[3.5/5] rounded-[2.5rem] overflow-hidden border-2 border-primary-500/25 shadow-2xl bg-slate-100 dark:bg-[#2A2C5B] z-10">
                            <img src="/profile.jpg" alt={portfolioData.name} className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <motion.div
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Typewriter words={portfolioData.roles} loop={0} cursor cursorStyle="_" typeSpeed={80} />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Socials & Bio */}
                    <motion.div
                        className="flex flex-col justify-between gap-10 md:col-span-1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">connectivity</span>
                            <div className="flex items-center gap-3">
                                <SocialBadge href={portfolioData.socials.github} label="GitHub"><Github size={16} /></SocialBadge>
                                <SocialBadge href={portfolioData.socials.linkedin} label="LinkedIn"><Linkedin size={16} /></SocialBadge>
                                <SocialBadge href={portfolioData.socials.leetcode} label="LeetCode"><LeetCodeIcon size={16} /></SocialBadge>
                                <SocialBadge href={portfolioData.socials.youtube} label="YouTube"><YouTubeIcon size={16} /></SocialBadge>
                                <SocialBadge href={portfolioData.socials.email} label="Email"><Mail size={16} /></SocialBadge>
                            </div>
                        </div>

                        <div className="relative">
                            <span className="absolute -top-6 -left-4 text-6xl text-primary-500/10 font-serif">"</span>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {portfolioData.about.summary}
                            </p>
                        </div>

                        <Magnetic strength={0.3}>
                            <Link to="resume" smooth offset={-80}>
                                <motion.div
                                    className="group relative px-8 py-4 bg-primary-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden shadow-2xl shadow-primary-500/40 inline-flex items-center gap-2 cursor-pointer"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">Secure Resume <Download size={16} /></span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            </Link>
                        </Magnetic>

                        <div className="space-y-1">
                            {skills.map((s, i) => <SkillItem key={i} {...s} index={i} />)}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="w-px h-16 bg-gradient-to-b from-primary-500 to-transparent relative">
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_10px_#6C63FF]"
                        animate={{ top: ['0%', '100%'], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
