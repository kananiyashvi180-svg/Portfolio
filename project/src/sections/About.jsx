import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Code2, Briefcase, Star, Sparkles, Coffee, Rocket, MapPin, Search } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import ScrollReveal from '../components/ScrollReveal';

/* ─── Animated counting number ──────────────────────────────────────────── */
const CountUp = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            setCount(current);
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Bento Card (3D Tilt) ─────────────────────────────────────────────────── */
const BentoCard = ({ children, className = '', glowColor = 'rgba(139,92,246,0.15)' }) => {
    const cardRef = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

    const handleMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rx.set(-py * 15);
        ry.set(px * 15);
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
    };

    const reset = () => { rx.set(0); ry.set(0); };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className={`relative rounded-[2rem] p-8 border border-slate-200 dark:border-primary-500/10 bg-white dark:bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group ${className}`}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mx}px ${my}px, ${glowColor}, transparent 40%)`
                }}
            />
            {children}
        </motion.div>
    );
};

const About = () => {
    const techs = ['React', 'Node.js', 'Typescript', 'MongoDB', 'Next.js', 'Tailwind', 'Python', 'Go', 'Docker', 'AWS', 'Redux', 'Vitest'];

    return (
        <section id="about" className="section-padding bg-slate-50 dark:bg-transparent relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[20%] -right-20 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16">
                    <ScrollReveal>
                        <div className="section-label">Identity</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                            BEYOND THE <br />
                            <span className="gradient-text italic">PIXELS.</span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    {/* Bio Block */}
                    <ScrollReveal className="lg:col-span-4" delay={0.1}>
                        <BentoCard className="h-full min-h-[400px]">
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-4 max-w-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-black shrink-0">YK</div>
                                            <div>
                                                <h3 className="text-2xl font-black">{portfolioData.name}</h3>
                                                <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                                                    <MapPin size={14} className="text-primary-500" /> Gujarat, India
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                            Full-Stack Developer focused on building scalable, high-performance web applications. My approach combines rigorous logic with aesthetic precision, ensuring every line of code serves a purpose.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Engine Room</span>
                                    <div className="flex flex-wrap gap-2">
                                        {techs.map((t, i) => (
                                            <motion.span
                                                key={t}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-300"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </ScrollReveal>

                    {/* Side Activities Block */}
                    <ScrollReveal className="lg:col-span-2" delay={0.2} direction="right">
                        <BentoCard className="h-full bg-primary-500 text-white border-none group" glowColor="rgba(255,255,255,0.2)">
                            <div className="flex flex-col h-full justify-start gap-4 -mt-2">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={32} className="group-hover:rotate-12 transition-transform" />
                                    <h4 className="text-3xl font-black leading-tight italic uppercase tracking-tighter">Side Quests</h4>
                                </div>
                                <ul className="text-primary-100 text-base leading-relaxed font-medium space-y-4 list-disc pl-5 mt-2">
                                    <li>Implementing modern UI/UX design systems</li>
                                    <li>Practicing advanced data structures & algorithms</li>
                                    <li>Exploring performance optimization techniques</li>
                                    <li>Contributing to open-source communities</li>
                                </ul>
                            </div>
                        </BentoCard>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default About;

