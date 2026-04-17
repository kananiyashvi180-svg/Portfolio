import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Figma, Layout, X, Star } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

const scrollbarCSS = `
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 243, 255, 0.2); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 243, 255, 0.5); }
`;

/* ─── Full-Stack Hero Card (Responsive Mockup Style) ───────────────────────── */
const FullStackHeroCard = ({ item }) => {
    return (
        <ScrollReveal direction="scale">
            <motion.div
                whileHover={{ y: -5 }}
                className="relative w-full rounded-[2.5rem] bg-slate-900 border border-white/10 overflow-hidden shadow-2xl group"
            >
                {/* Human-Centric Background (The Picture with People) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
                        alt="Medical Background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#02040f] via-[#02040f]/90 to-transparent" />
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row min-h-[500px] relative z-10">
                    {/* Left side: Project Info */}
                    <div className="w-full lg:w-2/5 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                                <Star size={12} fill="currentColor" /> Featured Full-Stack
                            </span>
                        </div>

                        <h3 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
                            {item.title}
                        </h3>

                        <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-md drop-shadow-md">
                            {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-10">
                            {item.tech.map((t, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-[10px] text-slate-300 font-bold uppercase tracking-widest backdrop-blur-sm">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 sm:gap-4 mt-auto">
                            <a href={item.live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(0,243,255,0.3)] hover:scale-105 transition-all">
                                <ExternalLink size={14} /> Live Demo
                            </a>
                            <a href={item.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-md transition-all">
                                <Github size={14} /> GitHub
                            </a>
                        </div>
                    </div>

                    {/* Right side: Modern Project Mockup */}
                    <div className="w-full lg:w-3/5 relative min-h-[250px] sm:min-h-[300px] lg:min-h-[500px] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden bg-transparent">
                        <div className="relative w-full max-w-[700px] group/mockup">
                            {/* Browser/Window Frame */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transform-gpu rotate-0 sm:rotate-1 group-hover/mockup:rotate-0 transition-all duration-700">
                                <div className="h-7 bg-[#1a1c23] flex items-center gap-2 px-4 border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="mx-auto bg-white/5 px-3 py-1 rounded text-[9px] text-white/40 font-medium tracking-tight">
                                        project-preview.app
                                    </div>
                                </div>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-auto object-cover opacity-90 group-hover/mockup:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </ScrollReveal>
    );
};

/* ─── Grid Item (Collapsed State) ────────────────────────────────────────── */
const ProjectGridCard = ({ item, id, type, onClick }) => {
    return (
        <motion.div
            layoutId={`card-container-${id}`}
            onClick={() => onClick(item, id, type)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full h-[320px] sm:h-[360px] rounded-[2rem] bg-slate-900/40 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer shadow-lg group"
        >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-150 group-hover:opacity-80" />
            
            <motion.div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem]">
                <motion.img 
                    layoutId={`card-image-${id}`}
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover origin-center transition-transform duration-150 group-hover:scale-105"
                />
            </motion.div>
            
            <div className="absolute inset-0 z-20 p-5 sm:p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2 max-w-[75%]">
                        {(type === 'project' || type === 'clone' ? item.tech.slice(0, 2) : [item.category]).map((t, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-full bg-black/50 text-white border border-white/10 backdrop-blur-md group-hover:bg-cyan-500 group-hover:border-cyan-400 shadow-xl transition-all duration-150">
                        {type === 'project' || type === 'clone' ? <ArrowUpRight size={16} /> : <Figma size={16} />}
                    </div>
                </div>

                <div>
                    <motion.h3 layoutId={`card-title-${id}`} className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                        {item.title}
                    </motion.h3>
                    <p className="text-cyan-400 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2rem] sm:tracking-[0.2em] drop-shadow-md flex items-center gap-2 opacity-100 sm:opacity-0 sm:-translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-150 mb-4 sm:mb-3">
                        Details <span className="w-8 sm:w-12 h-px bg-cyan-400/50 block"></span>
                    </p>
                    
                    {/* Quick-access links: Always visible or partially visible on mobile */}
                    {(type === 'project' || type === 'clone') && (
                        <div className="flex flex-wrap gap-2 opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-200 pointer-events-auto">
                            {item.live && (
                                <a
                                    href={item.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/90 sm:bg-cyan-500/90 hover:bg-cyan-400 text-white text-[9px] font-black uppercase tracking-widest shadow-lg transition-all duration-150"
                                >
                                    <ExternalLink size={10} /> Live
                                </a>
                            )}
                            {item.github && (
                                <a
                                    href={item.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md transition-all duration-150"
                                >
                                    <Github size={10} /> Code
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Expanded Modal State ─────────────────────────────────────────────── */
const ExpandedModal = ({ data, onClose }) => {
    const { item, id, type } = data;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
                layoutId={`card-container-${id}`}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 dark:bg-[#0a0a0f] dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
                style={{ maxHeight: '92vh' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 hover:bg-cyan-500 text-white border border-white/10 hover:border-cyan-400 backdrop-blur-md transition-all z-50 shadow-xl"
                >
                    <X size={18} />
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-[220px] sm:h-[300px] md:h-auto relative shrink-0 overflow-hidden">
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
                <div className="w-full md:w-1/2 flex flex-col flex-grow relative bg-slate-900 dark:bg-[#0a0a0f] z-20 min-h-0">
                    <div className="p-6 sm:p-8 md:p-10 flex-col flex h-full overflow-y-auto custom-scrollbar">
                        <motion.h3 layoutId={`card-title-${id}`} className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 sm:mb-6">
                            {item.title}
                        </motion.h3>

                        <div className="mb-6 space-y-4">
                            <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-cyan-400 mb-4 flex items-center gap-3">
                                Technology Stack <span className="flex-1 h-px bg-cyan-400/20"></span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(type === 'project' || type === 'clone' ? item.tech : [item.category]).map((t, i) => (
                                    <span key={i} className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[9px] sm:text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Push actions to bottom */}
                        <div className="mt-auto pt-6 flex gap-3 sm:gap-4 shrink-0 border-t border-white/5">
                            {type === 'project' || type === 'clone' ? (
                                <>
                                    <a href={item.live} target="_blank" rel="noreferrer" className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center gap-2 font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-lg transition-all">
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                    <a href={item.github} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all">
                                        <Github size={18} />
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a href={item.figma} target="_blank" rel="noreferrer" className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white flex items-center justify-center gap-2 font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-lg transition-all">
                                        <Layout size={16} /> View Design
                                    </a>
                                    <a href={item.figma} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all">
                                        <Figma size={18} />
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
        { key: 'fullstack', title: 'Full-Stack Featured' },
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
                            
                            {key === 'fullstack' ? (
                                <div className="w-full">
                                    {items.map((item, i) => (
                                        <FullStackHeroCard key={i} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                    {items.map((item, i) => {
                                        const typeStr = key === 'uiux' ? 'uiux' : key === 'projects' ? 'project' : 'clone';
                                        const id = `${key}-${i}`;
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
                            )}
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
