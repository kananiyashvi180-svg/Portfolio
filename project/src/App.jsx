import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Impact from './sections/Impact';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Certificates from './sections/Certificates';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';
import FloatingParticles from './components/FloatingParticles';
import CustomCursor from './components/CustomCursor';
import TouchInteraction from './components/TouchInteraction';
import CinematicLoader from './components/CinematicLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Full cinematic luxury intro
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const path = location.pathname.substring(1);
      if (path && location.state?.preventScroll !== true) {
        setTimeout(() => {
          try {
            scroller.scrollTo(path, {
              duration: 100, // Instant scroll!
              delay: 0,
              smooth: 'linear', // Fastest easing
              offset: -100,
            });
          } catch (e) {
            console.error('Failed to scroll to path:', path);
          }
        }, 100);
      }
    }
  }, [loading, location.pathname, location.state]);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <Helmet>
          <title>Yashvi Kanani | Full Stack Developer Portfolio</title>
          <meta name="description" content="Full Stack Developer specializing in React, Node.js, and modern web applications. Building premium digital experiences with modern technologies." />
          <meta name="keywords" content="Full Stack Developer, React Developer, Portfolio, Web Developer, Yashvi Kanani, MERN Stack" />
          <meta property="og:title" content="Yashvi Kanani Portfolio" />
          <meta property="og:description" content="Full Stack Developer Portfolio - Building premium digital experiences with modern technologies." />
          <meta property="og:url" content="https://yashvi-portfolio-dun.vercel.app/" />
          <meta name="twitter:title" content="Yashvi Kanani Portfolio" />
          <meta name="google-site-verification" content="googlee367cd6bd678976d" />
          <meta name="twitter:description" content="Full Stack Developer Portfolio - Building premium digital experiences." />
        </Helmet>
        {loading ? (
          <CinematicLoader />
        ) : (
            <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full overflow-x-hidden selection:bg-primary-500/30 relative"
          >
            <div className="fixed inset-0 z-0 pointer-events-none">
              <ParticleNetwork />
            </div>
            
            <CustomCursor />
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <TouchInteraction />
              <Navbar />
              <main className="pt-[72px] flex-1">
                <Hero />
                <About />
                <Impact />
                <Skills />
                <Projects />
                <Certificates />
                <Education />
                <Resume />
                <Contact />
              </main>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
