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
        let exclusionZones = [];

        // Premium Configuration (Initial)
        const config = {
            particleCount: 220, 
            minDistance: 160, 
            mouseRadius: 280,
            pulseFrequency: 0.0008,
            colors: {
                cyan: [0, 255, 243], // Hyper Cyan
                pink: [255, 0, 135], // Cyber Pink
                purple: [157, 0, 255]  // Electric Purple
            }
        };

        const mouse = { x: null, y: null };
        const colorKeys = Object.keys(config.colors);

        const updateExclusionZones = () => {
            const elements = document.querySelectorAll('h1, h2, h3, h4, .gradient-text, p, button, a, .glass-card, .project-card, .education-card, .social-badge');
            const zones = [];
            const padding = 15; // Tighter padding for more background activity
            
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    zones.push({
                        x1: rect.left - padding,
                        y1: rect.top - padding,
                        x2: rect.right + padding,
                        y2: rect.bottom + padding
                    });
                }
            });
            exclusionZones = zones;
        };

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            const isMobile = w < 768;
            const isLaptop = w > 1200;
            
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            
            // Dynamic Config based on screen size
            if (isLaptop) {
                config.pulseFrequency = 0.003; 
                config.minDistance = 200;
            } else if (isMobile) {
                config.pulseFrequency = 0.004; // Increased for mobile blink
                config.minDistance = 140;
            } else {
                config.pulseFrequency = 0.002;
                config.minDistance = 170;
            }

            const density = (w * h) / (isLaptop ? 15000 : 20000);
            let finalCount = Math.min(Math.max(density, 40), isLaptop ? 160 : 100);
            
            if (isMobile) {
                finalCount = Math.min(finalCount, 40); 
            }
            
            init(finalCount);
            updateExclusionZones();
        };

        class Particle {
            constructor(id) {
                this.id = id;
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.z = 0.2 + Math.random() * 1.8; // Depth range 0.2 to 2.0
                this.baseSize = 0.4 + (this.z * 2.2); // Size varies significantly with depth
                this.size = this.baseSize;
                
                const speed = 0.04 + (this.z * 0.08);
                this.angle = Math.random() * Math.PI * 2;
                this.baseVx = Math.cos(this.angle) * speed;
                this.baseVy = Math.sin(this.angle) * speed;
                
                this.wavePhaseX = Math.random() * Math.PI * 2;
                this.wavePhaseY = Math.random() * Math.PI * 2;
                this.waveSpeedX = 0.002 + (Math.random() * 0.003);
                this.waveSpeedY = 0.002 + (Math.random() * 0.003);

                this.isOrbiter = Math.random() > 0.8; 
                this.orbitAngle = Math.random() * Math.PI * 2;
                this.orbitSpeed = 0.005 + Math.random() * 0.01;

                const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                this.rgb = config.colors[colorKey];
                this.baseOpacity = 0.25 + (this.z * 0.45);
                this.energyPulse = 0;
            }

            update() {
                const isMobile = window.innerWidth < 768;
                
                if (Math.random() < config.pulseFrequency) {
                    this.energyPulse = isMobile ? 0.8 : 0.6; // Stronger blink on mobile
                }

                if (this.energyPulse > 0) {
                    this.energyPulse -= 0.004; // Slower decay for smoother transition
                }

                this.wavePhaseX += this.waveSpeedX;
                this.wavePhaseY += this.waveSpeedY;
                
                let currentVx = this.baseVx + (Math.sin(this.wavePhaseX) * 0.05);
                let currentVy = this.baseVy + (Math.cos(this.wavePhaseY) * 0.05);

                if (!isMobile && mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < config.mouseRadius) {
                        const force = (config.mouseRadius - dist) / config.mouseRadius;
                        if (dist > config.mouseRadius * 0.3) {
                            currentVx += dx * force * 0.0008 * this.z;
                            currentVy += dy * force * 0.0008 * this.z;
                        } else {
                            currentVx -= dx * force * 0.0015 * this.z;
                            currentVy -= dy * force * 0.0015 * this.z;
                        }
                    }
                }

                if (this.isOrbiter && this.z > 0.6 && !isMobile) {
                    this.orbitAngle += this.orbitSpeed;
                    currentVx += Math.cos(this.orbitAngle) * 0.3;
                    currentVy += Math.sin(this.orbitAngle) * 0.3;
                }

                this.x += currentVx;
                this.y += currentVy;

                // Subtle orbital drift for more 3D volume
                this.orbitAngle += 0.001 * (this.z + 0.5);
                const orbitR = 2 * this.z;
                
                // 3D Parallax Tilt Effect (Stronger)
                const tiltIntensity = isMobile ? 60 : 100;
                const tiltX = (mouse.x !== null ? (mouse.x - w / 2) / w : 0) * tiltIntensity * (this.z - 1);
                const tiltY = (mouse.y !== null ? (mouse.y - h / 2) / h : 0) * tiltIntensity * (this.z - 1);
                
                this.renderX = this.x + tiltX + Math.cos(this.orbitAngle) * orbitR;
                this.renderY = this.y + tiltY + Math.sin(this.orbitAngle) * orbitR;

                const margin = 100;
                if (this.x < -margin) this.x = w + margin;
                if (this.x > w + margin) this.x = -margin;
                if (this.y < -margin) this.y = h + margin;
                if (this.y > h + margin) this.y = -margin;
                
                this.size = this.baseSize * (1 + this.energyPulse * 1.2);
            }

            draw() {
                let visibilityMult = 1;

                // Moderate visibility reduction for readability
                for (let i = 0; i < exclusionZones.length; i++) {
                    const zone = exclusionZones[i];
                    if (this.x > zone.x1 && this.x < zone.x2 && this.y > zone.y1 && this.y < zone.y2) {
                        visibilityMult = 0.6; // Only 40% reduction, not removing
                        break;
                    }
                }

                const currentOpacity = (this.baseOpacity + (this.energyPulse * 0.5)) * visibilityMult;
                if (currentOpacity < 0.01) return;

                const rgbString = this.rgb.join(',');

                // Volumetric Core Node (Radial Gradient)
                const grad = ctx.createRadialGradient(
                    this.renderX - this.size * 0.3, this.renderY - this.size * 0.3, 0,
                    this.renderX, this.renderY, this.size
                );
                grad.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.9})`);
                grad.addColorStop(0.3, `rgba(${rgbString}, ${currentOpacity})`);
                grad.addColorStop(1, `rgba(${rgbString}, 0)`);

                ctx.beginPath();
                ctx.arc(this.renderX, this.renderY, this.size, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Advanced Glowing Halo
                ctx.beginPath();
                ctx.arc(this.renderX, this.renderY, this.size * (4 + this.energyPulse * 4), 0, Math.PI * 2);
                const haloGrad = ctx.createRadialGradient(
                    this.renderX, this.renderY, 0,
                    this.renderX, this.renderY, this.size * (4 + this.energyPulse * 4)
                );
                haloGrad.addColorStop(0, `rgba(${rgbString}, ${currentOpacity * 0.2})`);
                haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = haloGrad;
                ctx.fill();
            }
        }

        const init = (count) => {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(i));
            }
        };

        const drawConnections = () => {
            const isMobile = window.innerWidth < 768;
            
            ctx.lineCap = 'round';
            for (let i = 0; i < particles.length; i++) {
                const step = isMobile ? 3 : 1; // Slightly more lines on mobile for perspective richness
                for (let j = i + step; j < particles.length; j += step) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    
                    const dx = p1.renderX - p2.renderX;
                    const dy = p1.renderY - p2.renderY;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = isMobile ? config.minDistance * 0.8 : config.minDistance;
                    const minSq = maxDist * maxDist;

                    if (distSq < minSq) {
                        const dist = Math.sqrt(distSq);
                        let proximity = 1 - (dist / maxDist);
                        
                        const zDiff = Math.abs(p1.z - p2.z);
                        if (zDiff > 0.45) continue; 

                        // Moderate Line Exclusion
                        let lineVisibleMult = 1;
                        const midX = (p1.x + p2.x) / 2;
                        const midY = (p1.y + p2.y) / 2;
                        
                        for (let k = 0; k < exclusionZones.length; k++) {
                            const zone = exclusionZones[k];
                            if (midX > zone.x1 && midX < zone.x2 && midY > zone.y1 && midY < zone.y2) {
                                lineVisibleMult = 0.4; // Slightly more visible even behind text
                                break;
                            }
                        }

                        let mouseSurge = 0;
                        if (!isMobile && mouse.x !== null) {
                            const mDist = Math.sqrt((mouse.x - midX)**2 + (mouse.y - midY)**2);
                            if (mDist < config.mouseRadius) {
                                mouseSurge = Math.pow((config.mouseRadius - mDist) / config.mouseRadius, 2);
                            }
                        }

                        const lineEnergy = Math.max(p1.energyPulse, p2.energyPulse);
                        const baseOpp = 0.35 * proximity * (1 - zDiff); // DARKER: Increased from 0.2
                        const finalOpp = (baseOpp + (mouseSurge * 0.3) + (lineEnergy * 0.3)) * lineVisibleMult;
                        
                        if (finalOpp > 0.01) {
                            ctx.beginPath();
                            if (!isMobile) {
                                const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                                grad.addColorStop(0, `rgba(${p1.rgb.join(',')}, ${finalOpp})`);
                                grad.addColorStop(1, `rgba(${p2.rgb.join(',')}, ${finalOpp})`);
                                ctx.strokeStyle = grad;
                                ctx.lineWidth = 0.8 + (mouseSurge * 2.5) + (lineEnergy * 1.5); // THICKER

                                const perpX = -dy / dist;
                                const perpY = dx / dist;
                                const curveOffset = Math.sin((time * 0.3) + (i * j * 0.1)) * (dist * 0.1); 
                                const cx = midX + (perpX * curveOffset);
                                const cy = midY + (perpY * curveOffset);
                                ctx.moveTo(p1.renderX, p1.renderY);
                                ctx.quadraticCurveTo(cx, cy, p2.renderX, p2.renderY);
                            } else {
                                ctx.strokeStyle = `rgba(${p1.rgb.join(',')}, ${finalOpp * 0.7})`;
                                ctx.lineWidth = 0.6; // THICKER on mobile too
                                ctx.moveTo(p1.renderX, p1.renderY);
                                ctx.lineTo(p2.renderX, p2.renderY);
                            }
                            ctx.stroke();

                            // Travelling Energy Spark
                            if (finalOpp > 0.2) {
                                const sparkPos = (time * (0.5 + p1.z * 0.5) + (i * j)) % 1;
                                const sx = p1.renderX + (p2.renderX - p1.renderX) * sparkPos;
                                const sy = p1.renderY + (p2.renderY - p1.renderY) * sparkPos;
                                
                                ctx.beginPath();
                                ctx.arc(sx, sy, 1.5 * (1 + lineEnergy), 0, Math.PI * 2);
                                ctx.fillStyle = `rgba(255, 255, 255, ${finalOpp})`;
                                ctx.fill();
                            }
                        }
                    }
                }
            }
        };

        const drawBackgroundLayer = (isDark) => {
            const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
            if (isDark) {
                bgGradient.addColorStop(0, '#000000');
                bgGradient.addColorStop(0.5, '#020617');
                bgGradient.addColorStop(1, '#0c041a');
            } else {
                bgGradient.addColorStop(0, '#ffffff');
                bgGradient.addColorStop(1, '#f8fafc');
            }
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, w, h);
        };

        const animate = () => {
            time += 0.012; // Slowed down for luxury feel
            const isDark = document.documentElement.classList.contains('dark');
            
            ctx.globalCompositeOperation = 'source-over';
            drawBackgroundLayer(isDark);

            ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
            
            drawConnections();
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const onMove = (e) => {
            if (window.innerWidth < 768) return;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const onDeviceMove = (e) => {
            if (window.innerWidth >= 768) return;
            // Map device tilt to virtual mouse coords for 3D parallax
            // e.gamma is left/right (-90 to 90), e.beta is front/back (-180 to 180)
            const tiltX = (e.gamma || 0) * 10;
            const tiltY = ((e.beta || 0) - 45) * 10; // Adjusted for typical viewing angle
            
            mouse.x = (w / 2) + tiltX;
            mouse.y = (h / 2) + tiltY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);
        window.addEventListener('deviceorientation', onDeviceMove);
        window.addEventListener('scroll', updateExclusionZones);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
            window.removeEventListener('deviceorientation', onDeviceMove);
            window.removeEventListener('scroll', updateExclusionZones);
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
