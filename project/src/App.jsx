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
import ParticleNetwork from './components/ParticleNetwork';
import FloatingParticles from './components/FloatingParticles';
import CustomCursor from './components/CustomCursor';
import TouchInteraction from './components/TouchInteraction';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
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
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-4"
          >
            <h2 className="text-xl font-bold font-outfit gradient-text">Yashvi Kanani</h2>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-primary-500/30 relative"
          >
            <div className="fixed inset-0 z-0 pointer-events-none">
              <ParticleNetwork />
              <FloatingParticles />
            </div>
            
            <CustomCursor />
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <TouchInteraction />
              <Navbar />
              <main className="pt-[76px] flex-1">
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
