import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

const skillLogos = {
    "React": "react",
    "JavaScript": "js",
    "HTML/CSS": "html,css",
    "Tailwind CSS": "tailwind",
    "Node.js": "nodejs",
    "Express": "express",
    "MongoDB": "mongo",
    "Git/GitHub": "github,git",
    "VS Code": "vscode",
    "Redux": "redux",
    "Git": "git",
    "Postman": "postman"
};

/* ─── Category Pill ─────────────────────────────────────────────────────── */
const CategoryPill = ({ label, active, onClick, count }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 ${active ? 'text-white shadow-[0_0_20px_rgba(0,243,255,0.4)]' : 'text-slate-300 hover:text-cyan-400 backdrop-blur-md bg-black/40 border border-[#B2A5FF]/30'}`}
    >
        {active && (
            <motion.span
                layoutId="activePill"
                className="absolute inset-0 rounded-full z-0"
                style={{ background: 'linear-gradient(135deg, rgba(188, 19, 254, 0.8), rgba(0, 243, 255, 0.8))' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
        )}
        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
            {label}
            <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-lg font-black transition-colors duration-300 ${active ? 'bg-black/30 text-white' : 'bg-black/60 text-slate-400'}`}>
                {count}
            </span>
        </span>
    </motion.button>
);

/* ─── Skill Grid Card ─────────────────────────────────────────────────────── */
const SkillGridCard = ({ skill, index, onClick }) => {
    const slug = skillLogos[skill.name] || "idea";
    const cardRef = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

    const handleMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rx.set(-py * 25);
        ry.set(px * 25);
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
    };

    const reset = () => { 
        rx.set(0); 
        ry.set(0); 
    };

    const gradientBackground = useMotionTemplate`radial-gradient(400px circle at ${mx}px ${my}px, rgba(0, 243, 255, 0.15), transparent 80%)`;

    return (
        <motion.div
            layoutId={`skill-container-${skill.name}`}
            ref={cardRef}
            onClick={() => onClick(skill)}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            className="relative h-full p-6 sm:p-8 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-[#B2A5FF]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer transition-all duration-150 hover:shadow-[0_20px_40px_rgba(0,243,255,0.15)] flex flex-col items-center justify-center gap-6"
        >
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-0"
                style={{ background: gradientBackground }}
            />

            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-[50ms]" />
            
            <div className="relative z-10 flex flex-col items-center text-center gap-5 w-full pointer-events-none">
                <motion.div
                    layoutId={`skill-icon-${skill.name}`}
                    className="relative w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-white/5 to-black/40 border border-[#B2A5FF]/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_30px_rgba(0,243,255,0.4)] transition-all duration-150 gap-3"
                >
                    <div className="relative z-10 flex items-center justify-center w-full h-full p-2">
                        <img 
                            src={`https://skillicons.dev/icons?i=${slug}&theme=dark`} 
                            alt={`${skill.name} logo`} 
                            className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] opacity-100 transition-all duration-150 max-h-full max-w-full hover:scale-110"
                        />
                    </div>
                </motion.div>

                <div className="flex flex-col gap-1.5 mt-2">
                    <motion.h4 layoutId={`skill-title-${skill.name}`} className="text-[17px] sm:text-[19px] font-black text-[#EAEAEA] tracking-wide group-hover:text-cyan-300 transition-colors duration-150">
                        {skill.name}
                    </motion.h4>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400/50 group-hover:text-cyan-400 transition-colors duration-150">
                        {skill.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Expanded Skill Modal ────────────────────────────────────────────────── */
const ExpandedSkillModal = ({ skill, onClose }) => {
    const slug = skillLogos[skill.name] || "idea";
    
    // Fallback description if one is not provided in portfolioData
    const detailedDescription = skill.description || `Extensive hands-on experience utilizing ${skill.name} to engineer high-performance, scalable solutions within the ${skill.category} stack. Core focus on deep architectural knowledge, optimization, and maintaining clean code practices.`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
                layoutId={`skill-container-${skill.name}`}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative w-full max-w-lg bg-[#0a0a0f] border border-[#B2A5FF]/40 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,243,255,0.15)] p-8 sm:p-12 overflow-hidden z-10 flex flex-col items-center text-center"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-cyan-500 text-slate-400 hover:text-white transition-all z-50 backdrop-blur-md"
                >
                    <X size={20} />
                </button>

                {/* Animated Background Accents */}
                <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />

                <motion.div
                    layoutId={`skill-icon-${skill.name}`}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_15px_30px_rgba(0,0,0,0.5)] mb-8"
                >
                    <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
                        <img 
                            src={`https://skillicons.dev/icons?i=${slug}&theme=dark`} 
                            alt={`${skill.name} logo`} 
                            className="object-contain drop-shadow-[0_0_20px_rgba(0,243,255,0.4)] max-h-full max-w-full"
                        />
                    </div>
                </motion.div>

                <motion.h3 layoutId={`skill-title-${skill.name}`} className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                    {skill.name}
                </motion.h3>
                
                <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.3em] mb-6 drop-shadow-md">
                    {skill.category}
                </p>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.15 }}
                    className="w-full flex-col flex gap-8 items-center"
                >
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md font-medium">
                        {detailedDescription}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

/* ─── Main Skills Component ─────────────────────────────────────────────── */
const Skills = () => {
    const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];
    const [active, setActive] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedSkill) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedSkill]);

    const filtered = useMemo(() => active === 'All'
        ? portfolioData.skills
        : portfolioData.skills.filter(s => s.category === active), [active]);

    return (
        <section id="skills" className="section-padding relative overflow-hidden min-h-screen py-24 bg-transparent">
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
                    <ScrollReveal>
                        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                            TECH <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">STACK.</span>
                        </h2>
                    </ScrollReveal>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {categories.map(cat => (
                            <CategoryPill
                                key={cat}
                                label={cat}
                                active={active === cat}
                                onClick={() => setActive(cat)}
                                count={cat === 'All' ? portfolioData.skills.length : portfolioData.skills.filter(s => s.category === cat).length}
                            />
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 min-h-[500px] content-start">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -40 }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: i * 0.05,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20
                                }}
                                className="h-full relative z-10"
                            >
                                <SkillGridCard 
                                    skill={skill} 
                                    index={i} 
                                    onClick={(s) => setSelectedSkill(s)} 
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal Overlay via AnimatePresence */}
            <AnimatePresence>
                {selectedSkill && (
                    <ExpandedSkillModal 
                        skill={selectedSkill} 
                        onClose={() => setSelectedSkill(null)} 
                    />
                )}
            </AnimatePresence>

        </section>
    );
};

export default Skills;
