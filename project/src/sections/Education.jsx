import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

const Education = () => {
    return (
        <section id="education" className="py-24 bg-slate-50 dark:bg-transparent relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

                {/* ── Section Header ─────────────────────────────────── */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
                    <ScrollReveal>
                        <div className="section-label">My Journey</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
                            Educational<br />
                            <span className="gradient-text italic">Hub.</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-md lg:max-w-sm">
                            The academic backbone that shaped my thinking and technical toolkit.
                        </p>
                    </ScrollReveal>
                </div>

                {/* ── Rows ───────────────────────────────────────────── */}
                <div className="border-t border-slate-200 dark:border-white/8">
                    {portfolioData.education.map((edu, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} direction="up" className="w-full">
                            <div className="group border-b border-slate-200 dark:border-white/8 py-10 transition-colors duration-300 hover:bg-white/60 dark:hover:bg-white/[0.03] px-2 rounded-xl -mx-2">
                                {/* Row grid: index | period | details */}
                                <div className="grid grid-cols-[30px_1fr] md:grid-cols-[40px_160px_1fr] gap-x-4 sm:gap-x-8 gap-y-4 items-start">

                                    {/* Index number */}
                                    <span className="text-xs font-black text-primary-500/60 tracking-widest pt-1 tabular-nums">
                                        0{i + 1}
                                    </span>

                                    {/* Period + Location (hidden on mobile, shown on md+) */}
                                    <div className="hidden md:flex flex-col gap-2 pt-1">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-primary-500 bg-primary-500/10 px-3 py-1.5 rounded-full w-fit">
                                            <Calendar size={9} />
                                            {edu.period}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            <MapPin size={9} className="text-primary-500/50" /> India
                                        </span>
                                    </div>

                                    {/* Main content */}
                                    <div className="space-y-3">
                                        {/* Mobile: period badge */}
                                        <div className="flex md:hidden mb-1">
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-primary-500 bg-primary-500/10 px-3 py-1.5 rounded-full">
                                                <Calendar size={9} /> {edu.period}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-snug group-hover:text-primary-500 transition-colors duration-300">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">
                                                {edu.institution}
                                            </p>
                                        </div>

                                        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium max-w-xl">
                                            {edu.description || "Focused on mastering advanced algorithmic patterns, complex system architectures, and modern development methodologies."}
                                        </p>

                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-primary-500 transition-all duration-300 pt-1">
                                            <GraduationCap size={12} />
                                            <span>Academic Excellence</span>
                                            <ArrowRight size={11} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Education;
