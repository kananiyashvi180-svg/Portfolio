import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Figma, Layout } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import Magnetic from '../components/Magnetic';
import ScrollReveal from '../components/ScrollReveal';

/* ─── 3D Hover Card (Shared Physics) ─────────────────────────────────────── */
const ExhibitCard = ({ item, index, type = 'project' }) => {
    const cardRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const mx = useMotionValue(200);
    const my = useMotionValue(240);

    const rx = useSpring(useTransform(my, [0, 480], [10, -10]), { stiffness: 200, damping: 15 });
    const ry = useSpring(useTransform(mx, [0, 400], [-10, 10]), { stiffness: 200, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        mx.set(200);
        my.set(240);
    };

    const handleCardClick = (e) => {
        // Prevent double opening if they clicked the button directly
        if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) return;
        const url = type === 'project' ? item.live : item.figma;
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={handleCardClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: 'transform' }}
            className="group relative h-[500px] sm:h-[520px] rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-black/60 backdrop-blur-xl border border-slate-200 dark:border-primary-500/30 shadow-3xl shadow-black/5 overflow-hidden cursor-pointer"
        >
            {/* Holographic Overlay */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at ${mx}px ${my}px, rgba(139,92,246,0.15), transparent 60%)`
                }}
            />

            {/* Image Wrap */}
            <div className="relative h-1/2 overflow-hidden">
                <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    animate={{ scale: hovered ? 1.05 : 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#07051a] via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {type === 'project' ? (
                        item.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-white">
                                {t}
                            </span>
                        ))
                    ) : (
                        <span className="px-3 py-1 rounded-lg bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-[10px] font-black uppercase tracking-widest text-white">
                            {item.category}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 h-1/2 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl sm:text-3xl font-black leading-tight group-hover:text-primary-500 transition-colors">
                        {item.title.split(' ').length <= 3 ? (
                            item.title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))
                        ) : (
                            <span className="block line-clamp-2">{item.title}</span>
                        )}
                    </h3>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/60 text-primary-500">
                        {type === 'project' ? <ArrowUpRight size={24} /> : <Figma size={24} />}
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-3 mb-6">
                    {item.description}
                </p>

                <div className="mt-auto flex gap-4">
                    {type === 'project' ? (
                        <>
                            <Magnetic strength={0.25}>
                                <a href={item.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-[#111111] flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                                    <Github size={20} />
                                </a>
                            </Magnetic>
                            <Magnetic strength={0.25}>
                                <a href={item.live} target="_blank" rel="noreferrer" className="flex-1 h-12 rounded-2xl border border-slate-200 dark:border-primary-500/20 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            </Magnetic>
                        </>
                    ) : (
                        <>
                            <Magnetic strength={0.25}>
                                <a href={item.figma} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-black/60 flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300">
                                    <Figma size={20} />
                                </a>
                            </Magnetic>
                            <Magnetic strength={0.25}>
                                <a href={item.figma} target="_blank" rel="noreferrer" className="flex-1 h-12 rounded-2xl bg-slate-900 dark:bg-[#111111] flex items-center justify-center gap-3 text-white hover:bg-[#F24E1E] transition-colors font-black text-xs uppercase tracking-widest">
                                    <Layout size={18} /> View Project
                                </a>
                            </Magnetic>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Clone Card (Compact) ───────────────────────────────────────────────── */
const CloneCard = ({ item, index }) => {
    const cardRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const mx = useMotionValue(200);
    const my = useMotionValue(150);
    const rx = useSpring(useTransform(my, [0, 300], [8, -8]), { stiffness: 200, damping: 15 });
    const ry = useSpring(useTransform(mx, [0, 400], [-8, 8]), { stiffness: 200, damping: 15 });

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={(e) => { const r = cardRef.current.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); setHovered(true); }}
            onMouseLeave={() => { setHovered(false); mx.set(200); my.set(150); }}
            style={{ willChange: 'transform' }}
            className="group relative rounded-[2rem] bg-white dark:bg-black/60 border border-slate-200 dark:border-primary-500/30 shadow-xl overflow-hidden cursor-pointer"
        >
            {/* Glow overlay */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at ${mx}px ${my}px, rgba(139,92,246,0.12), transparent 60%)` }}
            />

            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <motion.img
                    src={item.image} alt={item.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                    animate={{ scale: hovered ? 1.05 : 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#07051a] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                    {item.tech.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-white">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-black mb-2 group-hover:text-primary-500 transition-colors uppercase tracking-tight">
                    {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-5">
                    {item.description}
                </p>
                <div className="flex gap-3">
                    <Magnetic strength={0.2}>
                        <a href={item.github} target="_blank" rel="noreferrer"
                            className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-[#111111] flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                            <Github size={16} />
                        </a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                        <a href={item.live} target="_blank" rel="noreferrer"
                            className="flex-1 h-10 rounded-xl border border-slate-200 dark:border-primary-500/20 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <ExternalLink size={13} /> Live Demo
                        </a>
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="section-padding bg-transparent relative overflow-hidden">
            {/* Background Narrative */}
            <div className="absolute top-20 right-[-5%] text-[15vw] font-black text-slate-200 dark:text-white/5 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap">
                EXHIBIT
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
                    <ScrollReveal>
                        <div className="section-label">Projects</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
                            Creative <br />
                            <span className="gradient-text italic">Exhibit.</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed font-outfit max-w-md lg:max-w-sm">
                            Merging high-fidelity user experiences with robust technical implementations. A dual-threat display of design and logic.
                        </p>
                    </ScrollReveal>
                </div>


                {/* ── UI/UX Figma Designs ────────────────────────────────────────── */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">UI/UX Design Layer</h3>
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {portfolioData.uiux.map((item, i) => (
                            <ScrollReveal key={item.title} direction="scale" delay={i * 0.1} className="h-full">
                                <ExhibitCard item={item} index={i} type="uiux" />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* ── Development Projects ────────────────────────────────────────── */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Frontend Layer</h3>
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {portfolioData.projects.map((item, i) => (
                            <ScrollReveal key={item.title} direction="scale" delay={i * 0.1} className="h-full">
                                <ExhibitCard item={item} index={i} type="project" />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* ── Clone Lab ────────────────────────────────────────────────────── */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Clone Lab</h3>
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                    </div>
                    <p className="text-center text-slate-400 dark:text-slate-500 text-sm font-medium mb-12">
                        Pixel-perfect replicas of popular platforms — built to sharpen UI skills and master layout precision.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {portfolioData.clones.map((item, i) => (
                            <ScrollReveal key={item.title} direction="scale" delay={i * 0.1} className="h-full">
                                <CloneCard item={item} index={i} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;

