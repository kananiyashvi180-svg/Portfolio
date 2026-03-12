import React from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, Twitter, ChevronUp, Heart, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { motion } from 'framer-motion';
import YouTubeIcon from './YouTubeIcon';
import Magnetic from './Magnetic';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socials = [
        { Icon: Github, href: portfolioData.socials.github, color: '#6C63FF', label: 'GitHub' },
        { Icon: Linkedin, href: portfolioData.socials.linkedin, color: '#00E5FF', label: 'LinkedIn' },
        { Icon: Twitter, href: '#', color: '#FF6EC7', label: 'Twitter' },
        { Icon: YouTubeIcon, href: portfolioData.socials.youtube, color: '#FF0000', label: 'YouTube' },
        { Icon: Mail, href: portfolioData.socials.email, color: '#6C63FF', label: 'Email' },
    ];

    const links = [
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Education', to: 'education' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 50%, rgba(56,189,248,0.04) 100%)' }}>
            {/* Top gradient line */}
            <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6C63FF, #00E5FF, #FF6EC7, transparent)' }} />

            <div className="bg-transparent pt-20 pb-10 px-6">
                {/* Glow blobs */}
                <div className="absolute -top-32 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />
                <div className="absolute -bottom-16 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)' }} />

                <div className="max-w-7xl mx-auto relative">
                    {/* ── Top CTA ────────────────────────────────────────────────────── */}
                    <motion.div
                        className="glass-card rounded-[2.5rem] p-8 sm:p-10 md:p-14 mb-16 text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #6C63FF, #00E5FF, #FF6EC7)' }} />

                        <span className="text-sm uppercase tracking-widest text-primary-500 font-bold block mb-3">Open for Collaboration</span>
                        <h3 className="text-3xl md:text-4xl font-black mb-4">
                            Let's build something <span className="gradient-text">amazing</span> together
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                            I'm currently available for freelance projects and full-time opportunities.
                        </p>

                        <Magnetic strength={0.2}>
                            <motion.a
                                href={`mailto:${portfolioData.email}?subject=${encodeURIComponent("Project Collaboration")}&body=${encodeURIComponent("Hi Yashvi,\n\nI'd love to discuss a potential project or collaboration with you!")}`}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-base relative z-10 cursor-pointer"
                                style={{ background: 'linear-gradient(135deg, #6C63FF, #00E5FF)' }}
                                whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(139,92,246,0.4)' }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Mail size={18} /> Get In Touch
                            </motion.a>
                        </Magnetic>
                    </motion.div>

                    {/* ── Links row ───────────────────────────────────────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        {/* Brand */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black font-outfit" style={{ background: 'linear-gradient(135deg, #6C63FF, #00E5FF)' }}>
                                    YK
                                </div>
                                <span className="text-xl font-black font-outfit gradient-text">Yashvi Kanani</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                                Crafting modern, beautiful digital experiences with passion and precision.
                            </p>
                        </motion.div>

                        {/* Quick links */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-slate-400">Quick Links</h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            smooth
                                            className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-px bg-primary-500 group-hover:w-4 transition-all duration-300 inline-block" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Social + Scroll-to-top */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-slate-400">Connect</h3>
                            <div className="flex gap-2.5 mb-8 flex-wrap">
                                {socials.map(({ Icon, href, color, label }, i) => (
                                    <motion.a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={label}
                                        whileHover={{ y: -5, scale: 1.12, boxShadow: `0 12px 24px ${color}33` }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 glass-card rounded-xl flex items-center justify-center transition-colors"
                                        style={{ color }}
                                    >
                                        <Icon size={17} />
                                    </motion.a>
                                ))}
                            </div>

                            <Link to="home" smooth>
                                <motion.div
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer"
                                    style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6EC7)' }}
                                    whileHover={{ scale: 1.06, boxShadow: '0 12px 28px rgba(139,92,246,0.35)' }}
                                    whileTap={{ scale: 0.96 }}
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <ChevronUp size={16} /> Back to Top
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Bottom ──────────────────────────────────────────────────────── */}
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <p>© {currentYear} {portfolioData.name}. All rights reserved.</p>
                        <p className="flex items-center gap-1.5">
                            Built with
                            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                <Heart size={12} className="fill-red-500 text-red-500" />
                            </motion.span>
                            using React & Tailwind CSS
                        </p>
                        <div className="flex gap-5">
                            <a href="#" className="hover:text-primary-500 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-primary-500 transition-colors">Terms</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
