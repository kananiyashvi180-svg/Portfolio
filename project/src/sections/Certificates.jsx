import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Award, Eye, X, Calendar, BadgeCheck } from 'lucide-react';
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
            className="group relative rounded-[2.5rem] bg-white dark:bg-[#25213d] border border-slate-200 dark:border-primary-500/10 shadow-3xl overflow-hidden cursor-pointer"
        >
            {/* Image Preview */}
            <div className="relative aspect-video overflow-hidden">
                <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    animate={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#25213d] via-transparent to-transparent" />

                <div className="absolute top-4 left-4 h-8 px-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                    <BadgeCheck size={12} /> Verified
                </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                    <motion.div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-white/5 text-primary-500 shadow-inner -mt-14 relative z-10"
                        whileHover={{ rotate: 15 }}
                    >
                        <Award size={24} />
                    </motion.div>
                </div>

                <h3 className="text-2xl font-black mb-1 group-hover:text-primary-500 transition-colors uppercase leading-tight">
                    {cert.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    {cert.issuer}
                </p>

                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-6">
                    {cert.description}
                </p>

                <motion.button
                    onClick={() => onOpen(cert)}
                    className="w-full py-4 rounded-2xl border border-slate-200 dark:border-primary-500/10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                    <Eye size={14} /> Full View Details
                </motion.button>
            </div>

            {/* Holographic Glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(400px circle at ${mx}px ${my}px, rgba(139,92,246,0.08), transparent 40%)`
                }}
            />
        </motion.div>
    );
};

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certificates" className="section-padding bg-slate-50 dark:bg-transparent relative overflow-hidden">
            {/* BG Narrative */}
            <div className="absolute top-20 left-[-5%] text-[15vw] font-black text-slate-200 dark:text-white/5 select-none pointer-events-none tracking-tighter uppercase">
                HONORS
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
                    <ScrollReveal>
                        <div className="section-label">Achievements</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-3xl rounded-[3rem] overflow-hidden glass-card bg-white dark:bg-[#1E1F3A] border border-white/20"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-primary-500 hover:text-white transition-all z-20"
                            >
                                <X size={20} />
                            </button>
                            <div className="p-6 sm:p-10">
                                <img src={selectedCert.image} className="w-full h-auto rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-2xl" alt="" />
                                <h3 className="text-2xl sm:text-3xl font-black mb-2 uppercase">{selectedCert.title}</h3>
                                <p className="text-primary-500 font-bold mb-6 tracking-widest">{selectedCert.issuer}</p>
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
