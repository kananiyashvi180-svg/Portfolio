import React, { useRef, useEffect } from 'react';

const ParticleNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on base canvas
        let animationFrameId;

        // Configuration Arrays (RGB strings for high-performance rgba() injections)
        const colorStrings = [
            '0, 243, 255',   // Cyan
            '188, 19, 254',  // Purple
            '255, 0, 127',   // Pink
            '125, 42, 232',  // Deep Purple
            '0, 71, 255',    // Blue
            '255, 0, 212'    // Neon Pink
        ];

        let particles = [];
        let particleCount = 100;
        let baseConnectionDistance = 150;
        const mouseRadius = 200;
        
        let mouse = { x: null, y: null };
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Dense network: 1 particle per 6000px^2 area (approx 345 on 1080p, 50-70 on mobile)
            const area = canvas.width * canvas.height;
            particleCount = Math.floor(area / 6000);
            particleCount = Math.min(Math.max(particleCount, 40), 450); // Hard cap for extreme resolutions
            
            if (canvas.width < 768) {
                baseConnectionDistance = 90; // tighter on mobile
            } else {
                baseConnectionDistance = 140; // Desktop
            }
            
            init();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                
                // 3D Parallax Layering: 
                // 0 = Background (small, blur, slow, low opacity)
                // 1 = Midground (medium, normal speed)
                // 2 = Foreground (large, fast, glow, high opacity)
                const layerRand = Math.random();
                if (layerRand < 0.5) this.layer = 0; // 50% in back
                else if (layerRand < 0.85) this.layer = 1; // 35% in mid
                else this.layer = 2; // 15% in front
                
                switch (this.layer) {
                    case 0:
                        this.size = Math.random() * 0.8 + 0.5;
                        this.parallax = 0.3;
                        this.opacityMultiplier = 0.25;
                        break;
                    case 1:
                        this.size = Math.random() * 1.5 + 1;
                        this.parallax = 0.7;
                        this.opacityMultiplier = 0.6;
                        break;
                    case 2:
                        this.size = Math.random() * 2 + 2;
                        this.parallax = 1.3;
                        this.opacityMultiplier = 1.0;
                        break;
                    default:
                        this.size = 1;
                        this.parallax = 1;
                        this.opacityMultiplier = 1;
                }
                
                const speed = (Math.random() * 0.2 + 0.05) * this.parallax; 
                const angle = Math.random() * Math.PI * 2;
                
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                
                this.baseVx = this.vx;
                this.baseVy = this.vy;
                
                this.colorString = colorStrings[Math.floor(Math.random() * colorStrings.length)];
                
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.01 + Math.random() * 0.02;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Infinite wrap-around bounds for continuous visual flow
                if (this.x < -20) this.x = canvas.width + 20;
                if (this.x > canvas.width + 20) this.x = -20;
                if (this.y < -20) this.y = canvas.height + 20;
                if (this.y > canvas.height + 20) this.y = -20;

                // Mouse interaction - gentle push
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distSq = dx * dx + dy * dy;
                    const mouseRadiusSq = mouseRadius * mouseRadius;
                    
                    if (distSq < mouseRadiusSq) {
                        const distance = Math.sqrt(distSq);
                        const force = (mouseRadius - distance) / mouseRadius; // 0 to 1
                        const angle = Math.atan2(dy, dx);
                        
                        // Push away relative to parallax layer (foreground moves more)
                        const repelX = Math.cos(angle) * force * 1.5 * this.parallax;
                        const repelY = Math.sin(angle) * force * 1.5 * this.parallax;
                        
                        this.vx -= repelX * 0.03;
                        this.vy -= repelY * 0.03;
                    }
                }
                
                // Elastic return to base speed
                this.vx += (this.baseVx - this.vx) * 0.03;
                this.vy += (this.baseVy - this.vy) * 0.03;

                // Update node pulsing
                this.pulsePhase += this.pulseSpeed;
            }

            draw() {
                // Organic pulse size mapping
                const currentSize = this.size + Math.sin(this.pulsePhase) * 0.3 * this.size;
                const opacity = (0.5 + Math.sin(this.pulsePhase) * 0.5) * this.opacityMultiplier;
                
                // High-performance double-fill glow instead of shadowBlur (maintains 60fps at high density)
                if (this.layer > 0) { // Mid and Foreground get glow
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, currentSize * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${this.colorString}, ${opacity * 0.25})`;
                    ctx.fill();
                }
                
                // Draw Solid Core
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.1, currentSize), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.colorString}, ${opacity})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            ctx.lineCap = 'round';
            const mouseRadiusSq = mouseRadius * mouseRadius;

            // Heavily optimized O(n^2) loop using distSq short-circuits
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    
                    // Layer restriction: Only connect adjacent or same layers to enforce 3D Depth
                    if (Math.abs(p1.layer - p2.layer) > 1) continue;

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;
                    
                    // Dynamic distance based on layers - foreground connects further out
                    let maxDist = baseConnectionDistance;
                    if (p1.layer === 0 && p2.layer === 0) maxDist *= 0.7; // Tighter mesh in background
                    else if (p1.layer === 2 || p2.layer === 2) maxDist *= 1.25; // Wider mesh in foreground
                    
                    const maxDistSq = maxDist * maxDist;

                    if (distSq < maxDistSq) {
                        const distance = Math.sqrt(distSq);
                        const distanceRatio = 1 - (distance / maxDist);
                        
                        // Check distance to mouse to surge brightness across the neural net
                        let mouseBonus = 0;
                        if (mouse.x !== null && mouse.y !== null) {
                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;
                            const mouseDistSq = (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2;
                            if (mouseDistSq < mouseRadiusSq) {
                                mouseBonus = 1 - (Math.sqrt(mouseDistSq) / mouseRadius);
                            }
                        }

                        // Layer rules apply to line opacity
                        const maxLayerOpacity = Math.max(p1.opacityMultiplier, p2.opacityMultiplier);
                        const opacity = (distanceRatio * 0.35 + mouseBonus * 0.65) * maxLayerOpacity;
                        
                        if (opacity > 0.02) { 
                            ctx.beginPath();
                            // For massive density, sharing a single color per line is drastically faster than gradients
                            ctx.strokeStyle = `rgba(${p1.colorString}, ${opacity})`;
                            ctx.lineWidth = (distanceRatio * 1.5 + mouseBonus * 2) * maxLayerOpacity + 0.1;
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };
        
        // Huge subtle ambient fog nebulas
        const drawNebulas = () => {
            const nebulas = [
                { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: canvas.width * 0.5, color: 'rgba(125, 42, 232, 0.04)' },
                { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: canvas.width * 0.6, color: 'rgba(0, 243, 255, 0.04)' },
                { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: canvas.width * 0.7, color: 'rgba(255, 0, 127, 0.03)' }
            ];
            
            nebulas.forEach(n => {
                const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
                gradient.addColorStop(0, n.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
        };

        const animate = () => {
            // Base clears to pure jet black
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            drawNebulas();

            // Set to "lighter" blend mode! Overlapping lines/dots physically brighten to glowing white
            ctx.globalCompositeOperation = 'lighter';
            
            drawConnections(); // draw mesh connecting web first
            particles.forEach(p => p.draw()); // draw luminous nodes on top
            particles.forEach(p => p.update()); // step physics

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };
        
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };
        
        const handleTouchEnd = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ display: 'block' }}
        />
    );
};

export default ParticleNetwork;

