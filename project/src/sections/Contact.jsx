import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Send, CheckCircle2, Github, Linkedin, Mail, Twitter, MessageCircle, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import Magnetic from '../components/Magnetic';
import YouTubeIcon from '../components/YouTubeIcon';
import ScrollReveal from '../components/ScrollReveal';


/* ─── Floating Label Input ───────────────────────────────────────────────── */
const FloatingInput = ({ label, type = 'text', placeholder, value, onChange, required, as: Tag = 'input', rows }) => {
    const [focused, setFocused] = useState(false);
    const active = focused || value.length > 0;

    return (
        <div className="relative group w-full overflow-hidden">
            <Tag
                required={required}
                type={type}
                placeholder={active ? placeholder : ''}
                value={value}
                onChange={onChange}
                rows={rows}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="peer w-full px-6 sm:px-8 pt-9 pb-4 rounded-[1.5rem] sm:rounded-[2rem] bg-white dark:bg-white/[0.03] border-2 border-slate-200 dark:border-white/20 outline-none transition-all resize-none text-slate-900 dark:text-white focus:bg-white dark:focus:bg-white/[0.08] focus:border-primary-500 dark:focus:border-primary-500 shadow-sm focus:shadow-2xl focus:shadow-primary-500/20 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base"
            />
            <motion.label
                initial={false}
                animate={{
                    top: active ? '14px' : '50%',
                    fontSize: active ? '10px' : '13px',
                    color: focused ? '#6C63FF' : active ? '#ffffff' : '#cbd5e1',
                    y: active ? 0 : '-50%',
                }}
                transition={{ duration: 0.3, ease: 'backOut' }}
                className="absolute left-6 sm:left-8 font-black uppercase tracking-[0.2em] sm:tracking-widest pointer-events-none transition-colors whitespace-nowrap"
            >
                {label}
            </motion.label>
        </div>
    );
};

/* ─── Contact info tile ──────────────────────────────────────────────────── */
const InfoTile = ({ icon, label, secondaryLabel, value, href, delay }) => {
    const isExternal = href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel'));

    return (
        <motion.a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="block p-5 sm:p-6 rounded-[2rem] bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 hover:border-primary-500/30 transition-all group relative overflow-hidden shadow-2xl shadow-black/5 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, type: 'spring', stiffness: 50 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-3 mb-3">
                {icon && <div className="text-primary-500 group-hover:scale-110 transition-transform">{React.cloneElement(icon, { size: 16 })}</div>}
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 group-hover:text-primary-500 transition-colors">{label}</span>
            </div>

            {secondaryLabel && (
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{secondaryLabel}</p>
            )}

            <p className="font-black text-lg sm:text-xl text-slate-800 dark:text-white group-hover:text-primary-400 transition-colors leading-tight truncate">
                {value}
            </p>

            {href && (
                <ArrowUpRight size={18} className="absolute top-6 right-6 text-slate-300 dark:text-slate-700 group-hover:text-primary-500 transition-colors" />
            )}
        </motion.a>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const email = "yashvi.kanani.cg@gmail.com";
            const subject = encodeURIComponent(`New Portfolio Contact from ${formData.name}`);
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);

            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const socials = [
        { Icon: Github, href: portfolioData.socials.github, color: '#6C63FF', label: 'GitHub' },
        { Icon: Linkedin, href: portfolioData.socials.linkedin, color: '#00E5FF', label: 'LinkedIn' },
        { Icon: Twitter, href: portfolioData.socials.twitter, color: '#FF6EC7', label: 'Twitter' },
        { Icon: YouTubeIcon, href: portfolioData.socials.youtube, color: '#FF0000', label: 'YouTube' },
        { Icon: Mail, href: portfolioData.socials.email, color: '#6C63FF', label: 'Email' },
    ];

    return (
        <section id="contact" ref={containerRef} className="section-padding bg-slate-50 dark:bg-transparent relative overflow-hidden transition-colors duration-500">
            {/* Background Text Parallax */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute top-0 right-0 text-[20vw] font-black text-slate-200 dark:text-white/5 select-none pointer-events-none"
            >
                CONTACT
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

                    {/* ── Left: Copy & Contact Cards ──────────────────────────────────── */}
                    <div className="space-y-12 lg:space-y-16">
                        <ScrollReveal>
                            <div className="section-label">Availability: Open</div>
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.9] sm:leading-[0.85]">
                                LET'S START <br />
                                <span className="gradient-text italic">SOMETHING.</span>
                            </h2>
                        </ScrollReveal>

                        <div className="flex flex-col gap-6">
                            <InfoTile
                                label="Official Registry"
                                value="yashvi.kanani.cg@gmail.com"
                                href={`mailto:${portfolioData.email}`}
                                delay={0.1}
                            />
                            <InfoTile
                                icon={<Phone />}
                                label="Voice Portal"
                                secondaryLabel="Direct Line"
                                value={portfolioData.socials.phone}
                                href={`tel:${portfolioData.socials.phone}`}
                                delay={0.2}
                            />
                            <InfoTile
                                icon={<MapPin />}
                                label="Physical Node"
                                secondaryLabel="Deployment Zone"
                                value="Gujarat, India"
                                delay={0.3}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-8">
                            {socials.map((s, i) => (
                                <Magnetic key={i} strength={0.2}>
                                    <motion.a
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-[#25213d] border border-slate-200 dark:border-primary-500/10 flex items-center justify-center text-slate-900 dark:text-white shadow-xl shadow-black/5 hover:bg-slate-900 hover:text-white dark:hover:bg-primary-500 transition-all duration-300"
                                    >
                                        <s.Icon size={22} />
                                    </motion.a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Form ──────────────────────────────────────────────────── */}
                    <ScrollReveal direction="scale" delay={0.2} className="relative lg:pt-24">
                        <div className="relative bg-white dark:bg-slate-900/50 p-6 sm:p-10 md:p-14 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-3xl backdrop-blur-xl">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-8">
                                    <FloatingInput
                                        label="Full Name"
                                        placeholder="Your name here..."
                                        value={formData.name}
                                        required
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <FloatingInput
                                        label="Email Address"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        required
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <FloatingInput
                                        label="Project Brief"
                                        as="textarea"
                                        rows={4}
                                        placeholder="What's on your mind?"
                                        value={formData.message}
                                        required
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Magnetic strength={0.15}>
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-20 rounded-[2rem] bg-slate-900 dark:bg-gradient-to-r dark:from-primary-600 dark:to-primary-500 text-white font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 group overflow-hidden relative shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-shadow"
                                    >
                                        <AnimatePresence mode="wait">
                                            {isSubmitting ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"
                                                />
                                            ) : isSuccess ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    Sent Successfully <CheckCircle2 size={10} />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="default"
                                                    initial={{ y: 0 }}
                                                    className="flex items-center gap-4"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    Transmit Message <Send size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </Magnetic>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
