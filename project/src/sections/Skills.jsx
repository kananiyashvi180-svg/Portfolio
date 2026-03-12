import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import * as LucideIcons from 'lucide-react';
import Magnetic from '../components/Magnetic';
import ScrollReveal from '../components/ScrollReveal';

/* ─── Category Pill ─────────────────────────────────────────────────────── */
const CategoryPill = ({ label, active, onClick, count }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className={`relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${active ? 'text-white shadow-xl shadow-primary-500/20' : 'text-slate-500 dark:text-slate-400 hover:text-primary-500'}`}
    >
        {active && (
            <motion.span
                layoutId="activePill"
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00E5FF)', zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
        )}
        <span className="relative z-10 flex items-center gap-3">
            {label}
            <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-black/60 text-slate-400'}`}>
                {count}
            </span>
        </span>
    </motion.button>
);

/* ─── Skill Card ─────────────────────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
    const IconComponent = LucideIcons[skill.icon] || LucideIcons.Code;
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

    const reset = () => { rx.set(0); ry.set(0); };

    return (
        <motion.div
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="relative p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-black/60 backdrop-blur-xl border border-slate-200 dark:border-primary-500/30 shadow-3xl shadow-black/5 overflow-hidden group cursor-pointer"
        >
            {/* Holographic Flash */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(400px circle at ${mx}px ${my}px, rgba(139,92,246,0.1), transparent 40%)`
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-black/60 text-primary-500 shadow-inner"
                    whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>

                <div>
                    <h4 className="text-lg font-black mb-1">{skill.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{skill.category}</span>
                </div>
            </div>

            {/* Interactive Corner Accent */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary-500/10 rounded-full blur-xl group-hover:scale-[3] transition-transform duration-700" />
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
        <section id="skills" className="section-padding bg-transparent relative overflow-hidden">
            {/* Animated Grid Lines */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(139,92,246,1) 1.5px, transparent 1.5px)',
                    backgroundSize: '100px 100px',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
                    <ScrollReveal>
                        <div className="section-label">Capabilities</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
                            Tech <br />
                            <span className="gradient-text italic">Stack.</span>
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

                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((skill, i) => (
                            <ScrollReveal key={skill.name} direction="scale" delay={i * 0.05} className="h-full">
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
