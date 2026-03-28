import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

const skillLogos = {
    "React": ["react"],
    "JavaScript": ["javascript"],
    "HTML/CSS": ["html5", "css3"],
    "Tailwind CSS": ["tailwindcss"],
    "Node.js": ["nodedotjs"],
    "Express": ["express"],
    "MongoDB": ["mongodb"],
    "Git/GitHub": ["github"],
    "VS Code": ["visualstudiocode"],
    "Redux": ["redux"],
    "Git": ["git"],
    "Postman": ["postman"]
};

/* ─── Category Pill ─────────────────────────────────────────────────────── */
const CategoryPill = ({ label, active, onClick, count }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className={`relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${active ? 'text-white shadow-[0_0_20px_rgba(0,243,255,0.4)]' : 'text-slate-400 hover:text-cyan-400 backdrop-blur-md bg-white/5 border border-white/5'}`}
    >
        {active && (
            <motion.span
                layoutId="activePill"
                className="absolute inset-0 rounded-full z-0"
                style={{ background: 'linear-gradient(135deg, #bc13fe, #00f3ff)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
        )}
        <span className="relative z-10 flex items-center gap-3">
            {label}
            <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${active ? 'bg-black/30 text-white' : 'bg-black/60 text-slate-400'}`}>
                {count}
            </span>
        </span>
    </motion.button>
);

/* ─── Skill Card ─────────────────────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
    const slugs = skillLogos[skill.name] || ["code"];
    const cardRef = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

    const handleMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rx.set(-py * 20);
        ry.set(px * 20);
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
    };

    const reset = () => { 
        rx.set(0); 
        ry.set(0); 
    };

    const gradientBackground = useMotionTemplate`radial-gradient(350px circle at ${mx}px ${my}px, rgba(0, 243, 255, 0.15), transparent 80%)`;

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className="relative h-full p-6 sm:p-8 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,243,255,0.2)] flex flex-col items-center justify-center gap-6"
        >
            {/* Holographic Mouse Tracking Flash */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{ background: gradientBackground }}
            />

            {/* Glowing Border Accents */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center text-center gap-5 w-full">
                
                {/* 3D Glassmorphic Icon Container */}
                <motion.div
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300 gap-3 overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 4 : -4 }}
                >
                    {/* Inner glowing aura */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl z-0" />

                    <div className="relative z-10 flex items-center justify-center gap-3 w-full h-full px-4">
                        {slugs.map((slug) => (
                            <img 
                                key={slug}
                                src={`https://cdn.simpleicons.org/${slug}/white`} 
                                alt={`${slug} logo`} 
                                className={`object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all duration-300 ${slugs.length > 1 ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'}`}
                            />
                        ))}
                    </div>
                </motion.div>

                <div>
                    <h4 className="text-[17px] sm:text-lg font-black text-[#EAEAEA] drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide mb-1 transition-colors duration-300 group-hover:text-white">{skill.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400/70 group-hover:text-cyan-300 transition-colors duration-300">{skill.category}</span>
                </div>
            </div>

            {/* Interactive Corner Accent */}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-2xl group-hover:scale-[3] transition-transform duration-700 pointer-events-none" />
        </motion.div>
    );
};

const Skills = () => {
    const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];
    const [active, setActive] = useState('All');

    const filtered = active === 'All'
        ? portfolioData.skills
        : portfolioData.skills.filter(s => s.category === active);

    return (
        <section id="skills" className="section-padding bg-transparent relative overflow-hidden min-h-screen py-24">
            
            {/* Global Dark Overlays */}
            <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.85)_100%)] z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <ScrollReveal>
                        <div className="section-label mb-4 inline-flex px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                            <span className="text-xs uppercase tracking-widest font-bold text-white drop-shadow-md">Capabilities</span>
                        </div>
                        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                            Tech <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#bc13fe] italic drop-shadow-[0_0_30px_rgba(0,243,255,0.4)]">Stack.</span>
                        </h2>
                    </ScrollReveal>

                    <div className="flex flex-wrap gap-2.5">
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

                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(1rem,2vw,1.5rem)]">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((skill, i) => (
                            <ScrollReveal key={skill.name} direction="up" delay={i * 0.05} className="h-full">
                                <SkillCard skill={skill} index={i} />
                            </ScrollReveal>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
