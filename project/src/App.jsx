import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import UniverseBackground from './components/UniverseBackground';

const App = () => {
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold font-outfit gradient-text">Yashvi Kanani</h2>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-[#E2E8F0] selection:bg-primary-500/30"
          >
            <UniverseBackground />
            <CustomCursor />
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-sky-400 to-pink-500 z-[100] origin-left"
              style={{ scaleX }}
            />
            <Navbar />
            <main className="pt-[76px]">
              <Hero />
              <About />
              <Impact />
              <Skills />
              <Projects />
              <Education />
              <Certificates />
              <Resume />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
