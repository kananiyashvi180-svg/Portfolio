import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle2, ArrowUpRight } from 'lucide-react';

/* ─── Modern Info Card ─────────────────────────────────────────────────── */
const InfoCard = ({ label, subLabel, value, icon: Icon, href }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block p-6 sm:p-8 rounded-[2rem] bg-black/40 border border-[#B2A5FF]/10 hover:border-[#B2A5FF]/40 transition-all group relative overflow-hidden"
        whileHover={{ y: -5, scale: 1.02 }}
    >
        <div className="flex justify-between items-start relative z-10">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={14} className="text-[#B2A5FF]/60" />}
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B2A5FF]/60">{label}</span>
                </div>
                {subLabel && (
                    <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{subLabel}</span>
                )}
                <p className="text-sm sm:text-lg font-black text-white tracking-tight">{value}</p>
            </div>
            <ArrowUpRight size={18} className="text-[#B2A5FF]/40 group-hover:text-[#B2A5FF] transition-colors" />
        </div>
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B2A5FF]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#B2A5FF]/10 transition-colors" />
    </motion.a>
);

/* ─── Futuristic Input ─────────────────────────────────────────────────── */
const FuturisticInput = ({ label, placeholder, value, onChange, type = "text", textarea = false }) => (
    <div className="relative group w-full">
        <div className={`w-full ${textarea ? 'min-h-[160px]' : 'h-24 sm:h-28'} rounded-[2rem] sm:rounded-[2.5rem] bg-black/40 border border-[#B2A5FF]/10 focus-within:border-[#B2A5FF]/50 transition-all overflow-hidden flex flex-col justify-center px-8 sm:px-12`}>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[#B2A5FF]/60 mb-2">{label}</span>
            {textarea ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={3}
                    className="w-full bg-transparent border-none outline-none text-white text-base sm:text-lg font-bold placeholder:text-slate-700 resize-none pt-1"
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent border-none outline-none text-white text-base sm:text-lg font-bold placeholder:text-slate-700"
                />
            )}
        </div>
        {/* Focus Glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#B2A5FF] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-center" />
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("https://formsubmit.co/ajax/yashvi.kanani.cg@gmail.com", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ ...formData, _subject: `Project Inquiry from ${formData.name}` })
            });
            if (response.ok) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-transparent relative overflow-hidden py-32">
            {/* Background Decorative Text */}
            <div className="absolute top-20 right-[-5%] text-[18vw] font-black text-white/5 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap z-0">
                CONTACT
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* ── Left Side ─────────────────────────────────────────────────── */}
                    <div className="space-y-16">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-8 bg-[#B2A5FF]/40" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#B2A5FF]">Availability: Open</span>
                            </div>
                            <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] xl:text-7xl font-black leading-[0.9] text-white tracking-tighter uppercase">
                                LET'S START <br />
                                <span className="gradient-text italic">SOMETHING.</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6 w-full lg:max-w-md">
                            <InfoCard 
                                label="Official Registry"
                                value="yashvi.kanani.cg@gmail.com"
                                href="mailto:yashvi.kanani.cg@gmail.com"
                            />
                            <InfoCard 
                                label="Voice Portal"
                                subLabel="Direct Line"
                                value="+91 91064 54707"
                                icon={Phone}
                                href="tel:+919106454707"
                            />
                            <InfoCard 
                                label="Physical Node"
                                subLabel="Deployment Zone"
                                value="Gujarat, India"
                                icon={MapPin}
                                href="#"
                            />
                        </div>
                    </div>

                    {/* ── Right Side: Form ────────────────────────────────────────────── */}
                    <div className="relative w-full">
                        <div className="bg-black/20 backdrop-blur-3xl border border-[#B2A5FF]/10 p-8 sm:p-10 rounded-[3rem] shadow-2xl relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-12">
                                <FuturisticInput 
                                    label="Full Name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                                <FuturisticInput 
                                    label="Email Address"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <FuturisticInput 
                                    label="Project Brief"
                                    textarea
                                    placeholder="Briefly describe your vision..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-24 sm:h-28 rounded-full bg-gradient-to-r from-[#B2A5FF] to-[#6C63FF] text-white font-black text-sm sm:text-lg uppercase tracking-[0.5em] flex items-center justify-center gap-6 group relative overflow-hidden shadow-[0_20px_50px_rgba(178,165,255,0.3)] transition-all"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {isSubmitting ? (
                                            <motion.div key="l" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : isSuccess ? (
                                            <motion.div key="s" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} className="flex items-center gap-2">Success <CheckCircle2 size={16} /></motion.div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                Transmit Message
                                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>
                        </div>
                        {/* Shadow decoration */}
                        <div className="absolute -bottom-10 -right-10 text-[15rem] font-black text-white/5 select-none pointer-events-none z-0">01</div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
