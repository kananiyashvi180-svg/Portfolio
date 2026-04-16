import React, { useRef, useEffect } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Direct DOM manipulation on mouse move completely bypasses React's render cycle.
    // Zero-lag tracking logic. The tip is meticulously calibrated to (30, 30)
    const onMouseMove = (e) => {
      cursor.style.transform = `translate3d(${e.clientX - 30}px, ${e.clientY - 30}px, 0)`;
    };

    const updateHoverState = (target) => {
      const clickable = target.closest('a, button, input, textarea, select, .cursor-pointer');
      if (clickable) {
        cursor.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
      }
    };

    const onMouseOver = (e) => updateHoverState(e.target);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    document.body.classList.add('hide-native-cursor');
    
    const style = document.createElement('style');
    style.innerHTML = `
      .hide-native-cursor, .hide-native-cursor * { cursor: none !important; }
      
      .stunning-cursor {
        pointer-events: none;
        z-index: 99999;
        position: fixed;
        top: 0;
        left: 0;
        will-change: transform;
      }
      
      .stunning-cursor svg {
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease;
      }
      
      .stunning-cursor.cursor-hover svg {
        transform: scale(1.15);
        filter: brightness(1.3);
      }

      /* Ultra-smooth endless rotation matching the AI sci-fi spec */
      @keyframes spinCW {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes spinCCW {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }

      .spin-cw {
        /* Faster inner geometric network */
        animation: spinCW 6s linear infinite;
        transform-origin: 35px 40px;
      }

      .spin-ccw {
        /* Sweeping outer orbital track */
        animation: spinCCW 10s linear infinite;
        transform-origin: 35px 40px;
      }

      .spin-pointer {
        /* Slowly rotates the primary arrow pointer perfectly along its sharp tip */
        animation: spinCW 6s linear infinite;
        transform-origin: 30px 30px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('hide-native-cursor');
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div ref={cursorRef} className="stunning-cursor">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            {/* Soft Outer Bloom Lighting (Motion Blur Proxy) */}
            <filter id="bloom" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="1.2"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            {/* Intense Central Sharp Glow */}
            <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="1.8"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* --- LAYER 1: OUTER ROTATING AI NETWORK (Counter-Clockwise) --- */}
        <g className="spin-ccw" style={{ transformOrigin: '35px 40px' }} filter="url(#bloom)">
            {/* Dashed Orbital Tracks */}
            <circle cx="35" cy="40" r="28" fill="none" stroke="#bc13fe" strokeWidth="0.8" strokeDasharray="3 10" opacity="0.6"/>
            <circle cx="35" cy="40" r="32" fill="none" stroke="#0047ff" strokeWidth="0.5" strokeDasharray="30 15 5 15" opacity="0.4"/>
            
            {/* Glowing Orbital Arc Segments */}
            {/* Top Right Arc */}
            <path d="M 35 12 A 28 28 0 0 1 63 40" fill="none" stroke="#00f3ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            {/* Bottom Left Arc */}
            <path d="M 35 68 A 28 28 0 0 1 7 40" fill="none" stroke="#00f3ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            
            {/* High-Contrast Data Nodes */}
            <circle cx="35" cy="12" r="2.5" fill="#ffffff" />
            <circle cx="63" cy="40" r="1.5" fill="#bc13fe" />
            <circle cx="35" cy="68" r="2.5" fill="#ffffff" />
            <circle cx="7" cy="40" r="1.5" fill="#bc13fe" />
        </g>

        {/* --- LAYER 2: INNER ROTATING GEOMETRIC PATTERN (Clockwise) --- */}
        <g className="spin-cw" style={{ transformOrigin: '35px 40px' }} filter="url(#bloom)">
            {/* Finely connected glowing geometric hexagram */}
            <path d="M 35 20 L 52 50 L 18 50 Z" fill="none" stroke="#00f3ff" strokeWidth="0.8" opacity="0.6" />
            <path d="M 52 30 L 35 60 L 18 30 Z" fill="none" stroke="#bc13fe" strokeWidth="0.8" opacity="0.6" />

            {/* Glowing Structural Nodes */}
            <circle cx="35" cy="20" r="2" fill="#00f3ff" />
            <circle cx="52" cy="50" r="2" fill="#00f3ff" />
            <circle cx="18" cy="50" r="2" fill="#00f3ff" />
            
            <circle cx="52" cy="30" r="1.5" fill="#bc13fe" />
            <circle cx="35" cy="60" r="1.5" fill="#bc13fe" />
            <circle cx="18" cy="30" r="1.5" fill="#bc13fe" />

            {/* Ultra-thin interlacing inner structural border */}
            <polygon points="35,20 52,30 52,50 35,60 18,50 18,30" fill="none" stroke="#0047ff" strokeWidth="0.5" opacity="0.8"/>
            
            {/* Stabilizing inner tracking ring */}
            <circle cx="35" cy="40" r="8" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.7"/>
        </g>

        {/* --- LAYER 3: THE MINIMALIST CYBERPUNK POINTER --- */}
        <g filter="url(#coreGlow)">
            {/* Modern sci-fi crystalline shard pointer (sharp & minimized) */}
            {/* Precisely calibrated so the topmost sharp pixel sits at (30,30) */}
            <path 
                d="M 30 30 L 30 46 L 33 42 L 37 49 L 40 47 L 36 40 L 41 39 Z" 
                fill="#ffffff" 
                stroke="#00f3ff"
                strokeWidth="0.8"
            />
        </g>
      </svg>
    </div>
  );
};

export default CustomCursor;
