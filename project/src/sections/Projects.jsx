import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Figma, Layout, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

const scrollbarCSS = `
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 243, 255, 0.2); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 243, 255, 0.5); }
`;

/* ─── Grid Item (Collapsed State) ────────────────────────────────────────── */
const ProjectGridCard = ({ item, id, type, onClick }) => {
    return (
        <motion.div
            layoutId={`card-container-${id}`}
            onClick={() => onClick(item, id, type)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full h-[360px] rounded-[2rem] bg-slate-900/40 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer shadow-lg group"
        >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-150 group-hover:opacity-80" />
            
            <motion.div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem]">
                <motion.img 
                    layoutId={`card-image-${id}`}
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover origin-center transition-transform duration-150 group-hover:scale-105"
                />
            </motion.div>
            
            <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2 max-w-[70%]">
                        {(type === 'project' || type === 'clone' ? item.tech.slice(0, 3) : [item.category]).map((t, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="p-3 rounded-full bg-black/50 text-white border border-white/10 backdrop-blur-md group-hover:bg-cyan-500 group-hover:border-cyan-400 shadow-xl transition-all duration-150">
                        {type === 'project' || type === 'clone' ? <ArrowUpRight size={18} /> : <Figma size={18} />}
                    </div>
                </div>

                <div>
                    <motion.h3 layoutId={`card-title-${id}`} className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                        {item.title}
                    </motion.h3>
                    <p className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.2em] drop-shadow-md flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
                        Click to view details <span className="w-12 h-px bg-cyan-400/50 block"></span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Expanded Modal State ─────────────────────────────────────────────── */
const ExpandedModal = ({ data, onClose }) => {
    const { item, id, type } = data;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
                layoutId={`card-container-${id}`}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 dark:bg-[#0a0a0f] dark:border-white/10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
                style={{ maxHeight: '90vh' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-black/50 hover:bg-cyan-500 text-white border border-white/10 hover:border-cyan-400 backdrop-blur-md transition-all z-50 shadow-lg"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image (Fix to fit inside modal) */}
                <div className="w-full md:w-1/2 h-[300px] md:h-auto relative shrink-0 overflow-hidden">
                    <motion.img
                        layoutId={`card-image-${id}`}
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#0a0a0f] to-transparent md:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900 dark:to-[#0a0a0f] hidden md:block" />
                </div>

                {/* Right Side: Scrollable Content */}
                <div className="w-full md:w-1/2 flex flex-col flex-grow relative bg-slate-900 dark:bg-[#0a0a0f] z-20">
                    <div className="p-6 sm:p-8 md:p-10 flex-col flex h-full overflow-y-auto custom-scrollbar">
                        <motion.h3 layoutId={`card-title-${id}`} className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                            {item.title}
                        </motion.h3>

                        <div className="mb-6 space-y-4">
                            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400 mb-4 flex items-center gap-3">
                                Technology Stack <span className="flex-1 h-px bg-cyan-400/20"></span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(type === 'project' || type === 'clone' ? item.tech : [item.category]).map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-300 font-bold uppercase tracking-widest shadow-inner">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Push actions to bottom */}
                        <div className="mt-auto pt-6 flex gap-4 shrink-0 border-t border-white/5">
                            {type === 'project' || type === 'clone' ? (
                                <>
                                    <a href={item.live} target="_blank" rel="noreferrer" className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all">
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                    <a href={item.github} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all shadow-md">
                                        <Github size={22} />
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a href={item.figma} target="_blank" rel="noreferrer" className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                                        <Layout size={18} /> View Design
                                    </a>
                                    <a href={item.figma} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all shadow-md">
                                        <Figma size={22} />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ─── Main Projects Component ────────────────────────────────────────────── */
const Projects = () => {
    const [selectedData, setSelectedData] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedData) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedData]);

    const handleCardClick = (item, id, type) => {
        setSelectedData({ item, id, type });
    };

    const handleClose = () => {
        setSelectedData(null);
    };

    const orderedSections = [
        { key: 'uiux', title: 'UI/UX Design Layer' },
        { key: 'projects', title: 'Frontend Layer' },
        { key: 'clones', title: 'Clone Lab' }
    ];

    return (
        <section id="projects" className="section-padding bg-transparent relative min-h-screen py-24">
            <style>{scrollbarCSS}</style>
            
            <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

            <div className="absolute top-20 right-[-5%] text-[15vw] font-black text-slate-200 dark:text-white/5 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap z-0">
                EXHIBIT
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
                    <ScrollReveal>
                        <div className="section-label">Projects</div>
                        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                            FEATURED <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] italic">PROJECTS.</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed font-outfit max-w-md lg:max-w-sm">
                            Click on any project to dive deep into the architecture, design layers, and technical stack.
                        </p>
                    </ScrollReveal>
                </div>

                {orderedSections.map(({ key, title }) => {
                    const items = portfolioData[key];
                    if (!items || items.length === 0) return null;
                    
                    return (
                        <div key={key} className="mb-32 last:mb-12">
                            <div className="flex items-center gap-6 mb-12 opacity-80 hover:opacity-100 transition-opacity">
                                <div className="h-px bg-gradient-to-r from-transparent to-slate-300 dark:to-white/20 flex-1" />
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-cyan-500 drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                                    {title}
                                </h3>
                                <div className="h-px bg-gradient-to-l from-transparent to-slate-300 dark:to-white/20 flex-1" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                {items.map((item, i) => {
                                    const typeStr = key === 'uiux' ? 'uiux' : key === 'projects' ? 'project' : 'clone';
                                    const id = `${key}-${i}`;
                                    // Make sure we only render the grid item if it's not currently open as a modal!
                                    // Wait, Framer Motion handles it if layoutId acts as the single source.
                                    // Actually, it's safer to always render the grid card, but framer-motion will visually hide it.
                                    return (
                                        <ScrollReveal key={i} direction="scale" delay={i * 0.1}>
                                            <ProjectGridCard 
                                                item={item} 
                                                id={id} 
                                                type={typeStr} 
                                                onClick={handleCardClick} 
                                            />
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Render the Modal Overlay via AnimatePresence */}
            <AnimatePresence>
                {selectedData && (
                    <ExpandedModal 
                        data={selectedData} 
                        onClose={handleClose} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
