import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Download, Mail, Github, MapPin, GraduationCap, Award, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import jsPDF from 'jspdf';
import ScrollReveal from '../components/ScrollReveal';

/* ── PDF Generator ──────────────────────────────────────────────────────── */
const generateResumePDF = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    const margin = 18;
    const col = W - margin * 2;
    let y = 0;

    // ── Helpers ──────────────────────────────────────────────────────────
    const hex = (h) => {
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return [r, g, b];
    };
    const purple = hex('#6C63FF');
    const dark = hex('#0f0f13');
    const slate = hex('#64748b');
    const light = hex('#f8fafc');

    const setColor = (rgb) => doc.setTextColor(...rgb);
    const setFill = (rgb) => doc.setFillColor(...rgb);
    const setDraw = (rgb) => doc.setDrawColor(...rgb);

    // ── Header band ──────────────────────────────────────────────────────
    setFill(dark);
    doc.rect(0, 0, W, 52, 'F');

    // Accent strip
    setFill(purple);
    doc.rect(0, 52, W, 2.5, 'F');

    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    setColor([255, 255, 255]);
    doc.text(portfolioData.name.toUpperCase(), margin, 22);

    // Roles
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setColor(purple);
    doc.text(portfolioData.roles.join('  ·  '), margin, 30);

    // Contact row
    doc.setFontSize(8);
    setColor([180, 180, 200]);
    const contacts = [
        portfolioData.email,
        'India',
        portfolioData.socials.github.replace('https://', ''),
        portfolioData.socials.linkedin.replace('https://', ''),
    ];
    doc.text(contacts.join('   |   '), margin, 42);

    y = 64;

    // ── Section label helper ──────────────────────────────────────────────
    const sectionTitle = (title) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        setColor(purple);
        doc.text(title.toUpperCase(), margin, y);

        setDraw(purple);
        doc.setLineWidth(0.4);
        doc.line(margin + doc.getTextWidth(title.toUpperCase()) + 3, y - 1, W - margin, y - 1);
        y += 7;
    };

    // ── Row helper (degree or cert row) ──────────────────────────────────
    const entryRow = ({ title, sub, period, desc }) => {
        // Check page overflow
        if (y + 28 > doc.internal.pageSize.getHeight() - 14) {
            doc.addPage();
            y = 20;
        }

        // Period badge
        setFill([240, 235, 255]);
        doc.roundedRect(margin, y - 4, 38, 6.5, 1, 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        setColor(purple);
        doc.text(period, margin + 2, y + 0.8);

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        setColor(dark);
        doc.text(title, margin + 42, y + 1);

        y += 7;

        // Sub (institution / issuer)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        setColor(slate);
        doc.text(sub.toUpperCase(), margin + 42, y);

        y += 5;

        // Description
        if (desc) {
            doc.setFontSize(8.5);
            setColor([90, 100, 120]);
            const lines = doc.splitTextToSize(desc, col - 44);
            doc.text(lines, margin + 42, y);
            y += lines.length * 4.5;
        }

        y += 6; // gap between entries
    };

    // ── Skills section helper ─────────────────────────────────────────────
    const skillsSection = () => {
        sectionTitle('Technical Skills');

        const byCategory = {};
        portfolioData.skills.forEach(s => {
            if (!byCategory[s.category]) byCategory[s.category] = [];
            byCategory[s.category].push(s.name);
        });

        doc.setFontSize(8.5);
        Object.entries(byCategory).forEach(([cat, skills]) => {
            if (y + 8 > doc.internal.pageSize.getHeight() - 14) { doc.addPage(); y = 20; }
            doc.setFont('helvetica', 'bold');
            setColor(dark);
            doc.text(`${cat}:`, margin, y);

            doc.setFont('helvetica', 'normal');
            setColor(slate);
            doc.text(skills.join('  ·  '), margin + 26, y);
            y += 6;
        });

        y += 4;
    };

    // ── Education ─────────────────────────────────────────────────────────
    sectionTitle('Education');
    portfolioData.education.forEach(edu => {
        entryRow({
            title: edu.degree,
            sub: edu.institution,
            period: edu.period,
            desc: edu.description,
        });
    });

    y += 2;

    // ── Skills ────────────────────────────────────────────────────────────
    skillsSection();

    // ── Certificates ──────────────────────────────────────────────────────
    sectionTitle('Certifications & Awards');
    portfolioData.certificates.forEach(cert => {
        entryRow({
            title: cert.title,
            sub: cert.issuer,
            period: cert.date,
            desc: cert.description,
        });
    });

    // ── Footer ────────────────────────────────────────────────────────────
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const ph = doc.internal.pageSize.getHeight();
        setFill([245, 243, 255]);
        doc.rect(0, ph - 10, W, 10, 'F');
        doc.setFontSize(7);
        setColor(slate);
        doc.text(`${portfolioData.name}  ·  Resume`, margin, ph - 3.5);
        doc.text(`Page ${i} / ${pageCount}`, W - margin, ph - 3.5, { align: 'right' });
    }

    doc.save(`${portfolioData.name.replace(' ', '_')}_Resume.pdf`);
};

/* ── Component ──────────────────────────────────────────────────────────── */
const Resume = () => {
    const containerRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

    const handleMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rx.set(-py * 8);
        ry.set(px * 8);
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    const handleLeave = () => {
        setHovered(false);
        rx.set(0);
        ry.set(0);
    };

    const handleDownload = async () => {
        setDownloading(true);
        await new Promise(r => setTimeout(r, 600));

        const link = document.createElement('a');
        link.href = '/Yashvi_Kanani_Resume.png';
        link.download = 'Yashvi_Kanani_Resume.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloading(false);
    };

    return (
        <section id="resume" className="section-padding bg-transparent relative overflow-hidden">
            {/* BG Narrative - Animated floating */}
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-[-5%] text-[15vw] font-black text-slate-200 dark:text-white/5 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap"
            >
                RESUME
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
                    <ScrollReveal>
                        <div className="section-label">Career Archive</div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] sm:leading-[0.85] uppercase tracking-tighter">
                            Curriculum <br />
                            <span className="gradient-text italic">Vitae.</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <p className="text-slate-800 dark:text-slate-200 text-lg font-medium leading-relaxed font-outfit max-w-md lg:max-w-sm">
                            A dual-column interactive timeline showcasing engineering precision and academic background.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="flex flex-col items-center gap-12">
                    {/* 3D Interactive Resume Display with Floating & Glow */}
                    <ScrollReveal direction="scale" delay={0.2}>
                        <motion.div
                            ref={containerRef}
                            onMouseMove={handleMove}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={handleLeave}
                            animate={{
                                y: hovered ? 0 : [-3, 3, -3],
                                boxShadow: hovered
                                    ? "0 0 40px rgba(108, 99, 255, 0.3)"
                                    : "0 0 20px rgba(108, 99, 255, 0.1)"
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                            }}
                            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1500, willChange: 'transform' }}
                            className="relative w-full max-w-4xl rounded-[2.5rem] bg-white dark:bg-[#000000] border border-slate-200 dark:border-primary-500/20 shadow-3xl overflow-hidden group cursor-pointer flex flex-col md:flex-row transition-colors"
                            onClick={handleDownload}
                        >
                            {/* Sidebar Column */}
                            <div className="w-full md:w-[35%] bg-slate-100 dark:bg-black/60 p-8 md:p-10 border-r border-slate-200 dark:border-white/5 flex flex-col gap-10">
                                {/* Profile Photo */}
                                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary-500/20 shadow-xl">
                                    <img src="/profile.jpg" className="w-full h-full object-cover" alt="Profile" />
                                </div>

                                {/* Profile Text */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-4">Profile</h4>
                                    <p className="text-slate-800 dark:text-slate-200 text-xs font-bold leading-relaxed">
                                        {portfolioData.about.summary}
                                    </p>
                                </div>

                                {/* Skills */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-4">Skills</h4>
                                    <ul className="space-y-2">
                                        {portfolioData.skills.slice(0, 6).map((skill, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                                {skill.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Awards */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-4">Awards</h4>
                                    <ul className="space-y-2">
                                        {portfolioData.certificates.slice(0, 3).map((cert, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-800 dark:text-slate-200 text-[10px] font-black uppercase tracking-tight leading-tight">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1 flex-shrink-0" />
                                                {cert.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Main Column */}
                            <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col">
                                {/* Header */}
                                <div className="mb-12">
                                    <h3 className="text-5xl font-black uppercase tracking-tighter mb-2">{portfolioData.name.split(' ')[0]} {portfolioData.name.split(' ')[1]?.charAt(0)}.</h3>
                                    <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em]">Full Stack Developer</div>
                                </div>

                                {/* Projects Section */}
                                <div className="mb-12">
                                    <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary-500 mb-6 border-b border-primary-500/10 pb-2 inline-block">Projects</h4>
                                    <div className="space-y-8">
                                        <div>
                                            <h5 className="text-sm font-black uppercase tracking-tight mb-1">Frontend Project</h5>
                                            <p className="text-xs font-bold italic text-slate-500 mb-2">Click Counter game</p>
                                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                                A simple interactive game where users increase their score by clicking a button as many times as possible within a set time.
                                            </p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-black uppercase tracking-tight mb-1">Backend Project</h5>
                                            <p className="text-xs font-bold italic text-slate-500 mb-2">Github Portfolio Analyzer</p>
                                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                                A smart web tool that analyzes a GitHub profile to generate insights on repositories, languages, activity, and overall developer performance.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Educational History */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary-500 mb-6 border-b border-primary-500/10 pb-2 inline-block">Educational History</h4>
                                    <div className="space-y-8">
                                        {portfolioData.education.slice(0, 2).map((edu, i) => (
                                            <div key={i}>
                                                <h5 className="text-sm font-black uppercase tracking-tight mb-1">{edu.degree}</h5>
                                                <p className="text-xs font-bold italic text-slate-500 mb-2">{edu.institution} {edu.period ? `| ${edu.period}` : ""}</p>
                                                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    {edu.description || "Pursuing advanced studies with a focus on core engineering principles and academic excellence."}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Holographic Glow */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(1000px circle at ${x}px ${y}px, rgba(139,92,246,0.06), transparent 60%)`
                                }}
                            />
                        </motion.div>
                    </ScrollReveal>

                    {/* ── Download Button ── */}
                    <motion.button
                        onClick={handleDownload}
                        disabled={downloading}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group/btn px-12 py-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all disabled:opacity-70"
                    >
                        {downloading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Processing…
                            </>
                        ) : (
                            <>
                                <Download size={20} className="group-hover/btn:translate-y-0.5 transition-transform" />
                                Download Full Resume
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Resume;
