import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Zap, Github } from 'lucide-react';
import LeetCodeIcon from '../components/LeetCodeIcon'; // Assuming there's a Leetcode icon or we can use Code2
import ScrollReveal from '../components/ScrollReveal';

const ImpactCard = ({ icon, text, highlight }) => (
    <div className="flex items-center gap-6 p-6 md:p-8 rounded-[2rem] bg-white dark:bg-black/60 border border-slate-200 dark:border-primary-500/30 shadow-xl shadow-black/5 group hover:-translate-y-2 transition-transform duration-300">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-primary-50 dark:bg-primary-500/10 text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
            {icon}
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
            {text.split(highlight).map((part, i, arr) => (
                <span key={i}>
                    {part}
                    {i !== arr.length - 1 && <span className="font-black text-primary-500">{highlight}</span>}
                </span>
            ))}
        </p>
    </div>
);

const Impact = () => {
    return (
        <section id="impact" className="section-padding bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16">
                    <ScrollReveal>
                        <div className="section-label">Milestones</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
                            Making an <br />
                            <span className="gradient-text italic">Impact.</span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScrollReveal direction="scale" delay={0.1}>
                        <ImpactCard
                            icon={<LeetCodeIcon size={28} />}
                            text="100+ Leetcode problems solved"
                            highlight="100+"
                        />
                    </ScrollReveal>
                    <ScrollReveal direction="scale" delay={0.2}>
                        <ImpactCard
                            icon={<Cpu size={28} />}
                            text="Built 10+ experimental UI concepts"
                            highlight="10+"
                        />
                    </ScrollReveal>
                    <ScrollReveal direction="scale" delay={0.3}>
                        <ImpactCard
                            icon={<Zap size={28} />}
                            text="Optimized apps for 30% performance improvement"
                            highlight="30%"
                        />
                    </ScrollReveal>
                    <ScrollReveal direction="scale" delay={0.4}>
                        <ImpactCard
                            icon={<Github size={28} />}
                            text="Contributed to 10+ GitHub repositories"
                            highlight="10+"
                        />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Impact;
