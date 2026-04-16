import React, { useRef, useEffect } from 'react';

const ParticleNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let w, h;
        const dpr = window.devicePixelRatio || 1;
        let time = 0;

        // Premium Configuration
        const config = {
            particleCount: 150, // Dense enough but optimized
            minDistance: 130, // Max distance for connection
            mouseRadius: 250,
            pulseFrequency: 0.005, // How often rare energy pulses happen
            colors: {
                cyan: [0, 243, 255],
                purple: [188, 19, 254],
                blue: [0, 112, 255]
            }
        };

        const mouse = { x: null, y: null };
        const colorKeys = Object.keys(config.colors);

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            
            // Re-calc density based on screen size
            const density = (w * h) / 20000;
            const finalCount = Math.min(Math.max(density, 50), 80);
            init(finalCount);
        };

        class Particle {
            constructor(id) {
                this.id = id;
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                
                // Parallax depth (0 to 1) 
                // 1 = front (fast, big), 0 = back (slow, small)
                this.z = Math.random();
                
                // Base properties influenced by depth
                this.baseSize = 0.5 + (this.z * 3);
                this.size = this.baseSize;
                
                // Gentle organic drift velocities
                const speed = 0.05 + (this.z * 0.1);
                this.angle = Math.random() * Math.PI * 2;
                this.baseVx = Math.cos(this.angle) * speed;
                this.baseVy = Math.sin(this.angle) * speed;
                
                // Wave movement state
                this.wavePhaseX = Math.random() * Math.PI * 2;
                this.wavePhaseY = Math.random() * Math.PI * 2;
                this.waveSpeedX = 0.005 + (Math.random() * 0.005);
                this.waveSpeedY = 0.005 + (Math.random() * 0.005);

                // Orbital mechanics
                this.isOrbiter = Math.random() > 0.85; // 15% are orbiters
                this.orbitAngle = Math.random() * Math.PI * 2;
                this.orbitSpeed = 0.01 + Math.random() * 0.02;

                // Visuals
                const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                this.rgb = config.colors[colorKey];
                this.baseOpacity = 0.3 + (this.z * 0.5);
                
                // Rare Energy Pulse State
                this.energyPulse = 0;
            }

            update(particles) {
                // Occasional random energy pulse
                if (Math.random() < config.pulseFrequency) {
                    this.energyPulse = 1.0;
                }

                // Decay energy pulse gracefully
                if (this.energyPulse > 0) {
                    this.energyPulse -= 0.01;
                }

                // Organic wave drifting
                this.wavePhaseX += this.waveSpeedX;
                this.wavePhaseY += this.waveSpeedY;
                
                let currentVx = this.baseVx + (Math.sin(this.wavePhaseX) * 0.1);
                let currentVy = this.baseVy + (Math.cos(this.wavePhaseY) * 0.1);

                // Mouse Interaction: Gentle repulse & attract
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < config.mouseRadius) {
                        const force = (config.mouseRadius - dist) / config.mouseRadius;
                        // Outer edge attracts, inner repulses slightly to create a physical displacement field
                        if (dist > config.mouseRadius * 0.3) {
                            currentVx += dx * force * 0.001 * this.z;
                            currentVy += dy * force * 0.001 * this.z;
                        } else {
                            currentVx -= dx * force * 0.002 * this.z;
                            currentVy -= dy * force * 0.002 * this.z;
                        }
                    }
                }

                // If this is an orbiter, find nearest particle and orbit it slightly
                if (this.isOrbiter && this.z > 0.5) {
                    this.orbitAngle += this.orbitSpeed;
                    const ox = Math.cos(this.orbitAngle) * 0.5;
                    const oy = Math.sin(this.orbitAngle) * 0.5;
                    currentVx += ox;
                    currentVy += oy;
                }

                this.x += currentVx;
                this.y += currentVy;

                // Wrap-around boundaries (soft edge return)
                const margin = 100;
                if (this.x < -margin) this.x = w + margin;
                if (this.x > w + margin) this.x = -margin;
                if (this.y < -margin) this.y = h + margin;
                if (this.y > h + margin) this.y = -margin;
                
                // Pulse modifies size
                this.size = this.baseSize * (1 + this.energyPulse * 1.5);
            }

            draw() {
                const currentOpacity = this.baseOpacity + (this.energyPulse * 0.5);
                const rgbString = this.rgb.join(',');

                // Core Node
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgbString}, ${currentOpacity})`;
                ctx.fill();

                // Subtle Glowing Halo
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgbString}, ${currentOpacity * 0.15})`;
                ctx.fill();

                // Energy Flare if pulsing
                if (this.energyPulse > 0.1) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.energyPulse * 0.2})`;
                    ctx.fill();
                }
            }
        }

        const init = (count) => {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(i));
            }
        };

        const drawConnections = () => {
            ctx.lineCap = 'round';
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;
                    const minSq = config.minDistance * config.minDistance;

                    if (distSq < minSq) {
                        const dist = Math.sqrt(distSq);
                        let proximity = 1 - (dist / config.minDistance);
                        
                        // Z-depth awareness - only connect nodes loosely on the same depth layer
                        const zDiff = Math.abs(p1.z - p2.z);
                        if (zDiff > 0.4) continue; 

                        // Mouse brighten effect
                        let mouseSurge = 0;
                        if (mouse.x !== null) {
                            const mx = (p1.x + p2.x) / 2;
                            const my = (p1.y + p2.y) / 2;
                            const mDist = Math.sqrt((mouse.x - mx)**2 + (mouse.y - my)**2);
                            if (mDist < config.mouseRadius) {
                                mouseSurge = Math.pow((config.mouseRadius - mDist) / config.mouseRadius, 2);
                            }
                        }

                        // Shared energy pulses flash the connecting line
                        const lineEnergy = Math.max(p1.energyPulse, p2.energyPulse);
                        
                        // Formulate colors & opacity
                        const baseOpp = 0.25 * proximity * (1 - zDiff);
                        const finalOpp = baseOpp + (mouseSurge * 0.3) + (lineEnergy * 0.4);
                        
                        // Use gradient line to smoothly blend between particle colors
                        if (finalOpp > 0.02) {
                            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                            grad.addColorStop(0, `rgba(${p1.rgb.join(',')}, ${finalOpp})`);
                            grad.addColorStop(1, `rgba(${p2.rgb.join(',')}, ${finalOpp})`);
                            
                            ctx.beginPath();
                            ctx.strokeStyle = grad;
                            ctx.lineWidth = 0.8 + (mouseSurge * 2) + (lineEnergy * 1.5);
                            
                            // Draw an elastic, curved neural bezier path instead of a straight line
                            // Control point offset by perpendicular angle & time
                            const mx = (p1.x + p2.x) / 2;
                            const my = (p1.y + p2.y) / 2;
                            const perpX = -dy / dist;
                            const perpY = dx / dist;
                            
                            // Slower oscillation for elegant organic curves
                            const curveOffset = Math.sin((time * 0.5) + (i * j * 0.1)) * (dist * 0.15); 
                            const cx = mx + (perpX * curveOffset);
                            const cy = my + (perpY * curveOffset);
                            
                            ctx.moveTo(p1.x, p1.y);
                            ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
                            ctx.stroke();

                            // Temporary polygon formations (triangles) logic injection
                            // Drawing rare geometric web patches if extremely close
                            if (proximity > 0.8 && Math.random() > 0.98) {
                                ctx.fillStyle = `rgba(${p1.rgb.join(',')}, ${finalOpp * 0.15})`;
                                ctx.fill(); 
                            }
                        }
                    }
                }
            }
        };

        const drawBackgroundLayer = (isDark) => {
            // Elegant linear gradient background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
            if (isDark) {
                bgGradient.addColorStop(0, '#000000'); // Deep Black 
                bgGradient.addColorStop(0.5, '#020617'); // Dark Slate/Navy
                bgGradient.addColorStop(1, '#110524'); // Subtle deep purple glow at bottom
            } else {
                bgGradient.addColorStop(0, '#ffffff');
                bgGradient.addColorStop(1, '#f1f5f9');
            }
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, w, h);
        };

        const animate = () => {
            time += 0.02;
            const isDark = document.documentElement.classList.contains('dark');
            
            ctx.globalCompositeOperation = 'source-over';
            drawBackgroundLayer(isDark);

            // Screen/Lighter blending mode for neon digital universe feel
            ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
            
            // Render lines first so nodes sit on top
            drawConnections();
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(particles);
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const onMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="particle-network-creative"
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ position: 'fixed', zIndex: 0 }}
        />
    );
};

export default ParticleNetwork;
