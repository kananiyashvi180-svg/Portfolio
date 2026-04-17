import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Mail, ChevronDown, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import LeetCodeIcon from '../components/LeetCodeIcon';
import YouTubeIcon from '../components/YouTubeIcon';
import { portfolioData } from '../data/portfolio';
import { Link } from 'react-scroll';
import Magnetic from '../components/Magnetic';
import { useNavigate } from 'react-router-dom';

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
                <span className="font-outfit font-bold text-[10px] sm:text-xs uppercase tracking-widest text-slate-200 group-hover:text-primary-500 transition-colors">
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
                        className="overflow-hidden text-[13px] text-slate-300 dark:text-slate-300 pt-2 leading-relaxed"
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
            className="w-11 h-11 flex items-center justify-center border-2 border-white/10 dark:border-[#B2A5FF]/30 rounded text-[#B2A5FF] dark:text-[#B2A5FF] hover:bg-[#B2A5FF]/10 hover:border-[#B2A5FF] transition-all duration-300"
            title={label}
        >
            {children}
        </motion.a>
    </Magnetic>
);

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
const Hero = () => {
    const navigate = useNavigate();

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
        <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">

            {/* Main Layout Grid */}
            <div className="flex-1 flex items-center px-[clamp(1rem,5vw,5rem)] pt-[clamp(6rem,15vh,8rem)] pb-[clamp(3rem,8vh,4rem)] z-20 w-full relative">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.9fr] gap-[clamp(2.5rem,5vw,3rem)] items-center">

                    {/* Left Column - Name & CTA */}
                    <div className="flex flex-col justify-center md:col-span-2 xl:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex self-start mb-6"
                        >
                            <span className="bg-[#111111]/80 backdrop-blur-md text-slate-100 font-outfit font-black text-xs uppercase tracking-[0.3em] px-5 py-2.5 rounded-full shadow-lg border border-[#B2A5FF]/30 flex items-center gap-2">
                                <Sparkles size={14} className="text-[#B2A5FF]" /> Hi, there!
                            </span>
                        </motion.div>

                        <motion.h1 variants={containerVariants} initial="hidden" animate="visible" className="font-outfit font-black text-[clamp(2.5rem,8vw,7rem)] leading-[1.1] sm:leading-[1] uppercase text-white mb-8 tracking-tighter">
                            <motion.span variants={itemVariants} className="block">Yashvi</motion.span>
                            <motion.span variants={itemVariants} className="block gradient-text italic pr-4 sm:pr-8">Kanani</motion.span>
                            <motion.div variants={itemVariants} className="flex items-center gap-[clamp(0.75rem,2vw,1rem)] mt-[clamp(1.5rem,4vw,2rem)]">
                                <span className="block whitespace-nowrap text-[clamp(1.5rem,4vw,2.5rem)] text-slate-400 tracking-normal">Right here</span>
                                <span className="flex-1 h-px sm:h-0.5 bg-primary-500 rounded-full" />
                            </motion.div>
                        </motion.h1>

                        <div className="mt-4 self-start">
                            <Magnetic strength={0.4}>
                                <Link to="projects" smooth offset={-80} onClick={() => navigate('/projects', { state: { preventScroll: true } })}>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#B2A5FF]/30 flex items-center justify-center cursor-pointer text-[#B2A5FF] bg-white/5 backdrop-blur-sm group">
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
                        <div className="relative w-full max-w-xs lg:max-w-sm aspect-[3.5/5] rounded-[2.5rem] overflow-hidden border-2 border-[#B2A5FF]/50 shadow-[0_0_30px_rgba(178,165,255,0.3)] bg-[#0A0A0A] z-10 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(178,165,255,0.5)]">
                            <img src="/profile.jpg" alt={portfolioData.name} className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-[#B2A5FF]/30 rounded-full text-white text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap">
                                <Typewriter words={portfolioData.roles} loop={0} cursor cursorStyle="_" typeSpeed={80} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Socials & Bio */}
                    <motion.div
                        className="flex flex-col justify-between gap-10 md:col-span-1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/90">connectivity</span>
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
                            <p className="text-base text-white/90 leading-relaxed font-medium">
                                {portfolioData.about.summary}
                            </p>
                        </div>

                        <Magnetic strength={0.3}>
                            <Link to="resume" smooth offset={-80} onClick={() => navigate('/resume', { state: { preventScroll: true } })}>
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
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <div className="w-px h-16 bg-gradient-to-b from-primary-500 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
