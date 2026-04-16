import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Award, Eye, X, Calendar, BadgeCheck, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

/* ─── Certificate Card ─────────────────────────────────────────────────── */
const CertificateCard = ({ cert, onOpen, index }) => {
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
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="group relative rounded-3xl bg-white/90 dark:bg-black/60 backdrop-blur-lg border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl dark:hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] flex flex-col h-full"
        >
            {/* Image Preview */}
            <div className="relative aspect-video overflow-hidden">
                <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 h-8 px-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                    <BadgeCheck size={12} /> Verified
                </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-7 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-4">
                    <motion.div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-black/40 text-primary-500 shadow-inner -mt-14 relative z-10 border border-slate-200 dark:border-white/10 backdrop-blur-md"
                        whileHover={{ rotate: 15 }}
                    >
                        <Award size={24} />
                    </motion.div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors uppercase leading-tight">
                    {cert.title}
                </h3>
                <p className="text-slate-600 dark:text-[#B0B0B0] font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    {cert.issuer}
                </p>

                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-4 flex-grow">
                    {cert.description}
                </p>

                <div className="flex items-center gap-2 mb-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <Calendar size={12} /> {cert.date}
                </div>

                <motion.button
                    onClick={() => onOpen(cert)}
                    className="mt-auto w-full py-4 rounded-2xl border border-slate-300 dark:border-white/20 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                    <Eye size={16} /> Full View Details
                </motion.button>
            </div>

            {/* Holographic Glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
                style={{
                    background: `radial-gradient(400px circle at ${mx}px ${my}px, rgba(139,92,246,0.15), transparent 40%)`
                }}
            />
        </motion.div>
    );
};

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certificates" className="section-padding bg-transparent relative overflow-hidden">
            {/* Soft Background Dimming Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

            {/* BG Narrative */}
            <div className="absolute top-20 left-[-5%] text-[15vw] font-black text-slate-200 dark:text-white/5 select-none pointer-events-none tracking-tighter uppercase z-0">
                HONORS
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
                    <ScrollReveal>
                        <div className="section-label">Achievements</div>
                        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
                            Awards & <br />
                            <span className="gradient-text italic">Certifs.</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed font-outfit max-w-md lg:max-w-sm">
                            Validation of specialized knowledge and continuous professional development in emerging technologies.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(1.5rem,4vw,2.5rem)]">
                    {portfolioData.certificates.map((cert, index) => (
                        <ScrollReveal key={index} direction="scale" delay={index * 0.1} className="h-full">
                            <CertificateCard cert={cert} index={index} onOpen={setSelectedCert} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(1rem,4vw,2rem)]">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-3xl rounded-[3rem] overflow-hidden glass-card bg-white dark:bg-[#000000] border border-white/20"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-100 dark:bg-black/60 hover:bg-primary-500 hover:text-white transition-all z-20"
                            >
                                <X size={20} />
                            </button>
                            <div className="p-[clamp(1.5rem,5vw,2.5rem)]">
                                <img src={selectedCert.image} className="w-full h-auto rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-2xl" alt="" />
                                <h3 className="text-[clamp(1.5rem,4vw,2rem)] font-black mb-2 uppercase">{selectedCert.title}</h3>
                                <p className="text-primary-500 font-bold mb-6 tracking-widest">{selectedCert.issuer}</p>
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        <Calendar size={14} className="text-primary-500" /> {selectedCert.date}
                                    </div>
                                    {selectedCert.link && (
                                        <a 
                                            href={selectedCert.link} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:scale-105 transition-all"
                                        >
                                            <ExternalLink size={14} /> Verify Online
                                        </a>
                                    )}
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{selectedCert.description}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
