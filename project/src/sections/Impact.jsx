import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

// Official High-Quality Brand SVG Logomarks
const OfficialLeetCodeIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
);

const OfficialGitHubIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

const OfficialFigmaIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
    </svg>
);

const OfficialReactIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const ImpactCard = ({ icon, stat, text }) => (
    <div className="relative group p-[1px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,243,255,0.2)]">
        {/* Animated Gradient Border (Base Layer) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent group-hover:from-cyan-400/50 group-hover:via-purple-500/50 group-hover:to-transparent opacity-80 transition-colors duration-500 z-0" />
        
        {/* Dark Glassmorphism Card Body */}
        <div className="relative h-full flex flex-row items-center gap-6 p-6 sm:p-8 md:p-10 rounded-[2.5rem] bg-black/60 backdrop-blur-2xl border border-white/5 group-hover:bg-black/40 transition-all duration-500 z-10 overflow-hidden">
            
            {/* Subtle soft internal glow blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-[60px] group-hover:bg-cyan-400/30 transition-colors duration-500 z-0 pointer-events-none" />
            
            {/* Neumorphic 3D Icon Container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 
                            bg-gradient-to-br from-white/10 to-white/5 
                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_20px_rgba(0,0,0,0.6)] 
                            group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_30px_rgba(0,243,255,0.5)]
                            group-hover:scale-105 transition-all duration-300 z-10 border border-white/10 overflow-hidden 
                            text-[#EAEAEA] group-hover:text-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent mix-blend-overlay z-0" />
                <div className="relative z-10 drop-shadow-[0_0_12px_rgba(0,243,255,0.6)] flex items-center justify-center">
                    {icon}
                </div>
            </div>

            <div className="flex flex-col z-10 gap-1 sm:gap-2 justify-center">
                {/* Highlighted Stat / Number */}
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#bc13fe] to-[#ff007f] tracking-tight drop-shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300">
                    {stat}
                </span>
                {/* Supporting Text */}
                <p className="text-sm sm:text-[15px] md:text-base font-semibold text-[#EAEAEA] drop-shadow-[0_2px_4px_rgba(0,0,0,1)] opacity-80 leading-snug tracking-wide">
                    {text}
                </p>
            </div>
        </div>
    </div>
);

const Impact = () => {
    return (
        <section id="impact" className="section-padding relative overflow-hidden group/section min-h-screen flex items-center">
            
            {/* Soft Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="flex flex-col mb-16 md:mb-20">
                    <ScrollReveal>
                        <div className="section-label mb-4 inline-flex px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(108,99,255,0.2)]">
                            <span className="text-xs uppercase tracking-widest font-bold text-white drop-shadow-md">Milestones</span>
                        </div>
                        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                            Making an <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary-500 italic drop-shadow-[0_0_30px_rgba(0,243,255,0.4)]">
                                Impact.
                            </span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <ScrollReveal direction="scale" delay={0.1}>
                        <ImpactCard
                            icon={<OfficialLeetCodeIcon size={36} />}
                            stat="100+"
                            text="Leetcode problems solved"
                        />
                    </ScrollReveal>
                    <ScrollReveal direction="scale" delay={0.2}>
                        <ImpactCard
                            icon={<OfficialFigmaIcon size={36} />}
                            stat="10+"
                            text="Figma UI/UX concepts built"
                        />
                    </ScrollReveal>
                    <ScrollReveal direction="scale" delay={0.3}>
                        <ImpactCard
                            icon={<OfficialReactIcon size={36} />}
                            stat="30%"
                            text="App component optimization"
                        />
                    </ScrollReveal>
                    <ScrollReveal direction="scale" delay={0.4}>
                        <ImpactCard
                            icon={<OfficialGitHubIcon size={36} />}
                            stat="10+"
                            text="GitHub repository contributions"
                        />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Impact;
