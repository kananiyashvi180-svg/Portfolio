import React, { useEffect, useRef } from 'react';

/**
 * MarbleLiquidEngine
 * Recreates the "Marbled Sea Foam" aesthetic from the user's reference.
 * Uses tiered particle systems (Deep Blue, Gold, White Foam) with a high-viscosity goo filter.
 */
const LiquidEngine = () => {
    const canvasRef = useRef(null);
    const blobs = useRef([]);
    const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class MarbleBlob {
            constructor(type) {
                this.type = type; // 'deep', 'gold', 'foam'
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;

                // Aesthetic profiles based on image
                if (this.type === 'deep') {
                    this.radius = Math.random() * 150 + 100;
                    this.color = `rgba(10, 25, 47, ${Math.random() * 0.4 + 0.3})`; // Navy
                    this.speedMult = 0.4;
                } else if (this.type === 'gold') {
                    this.radius = Math.random() * 80 + 40;
                    this.color = `rgba(184, 134, 11, ${Math.random() * 0.3 + 0.2})`; // Dark Gold
                    this.speedMult = 0.7;
                } else {
                    this.radius = Math.random() * 40 + 20;
                    this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.4})`; // Foam White
                    this.speedMult = 1.2;
                }

                this.vx = (Math.random() * 2 - 1) * this.speedMult;
                this.vy = (Math.random() * 2 - 1) * this.speedMult;
                this.friction = 0.96;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Infinite wrapping for "flow" feel
                if (this.x < -this.radius) this.x = canvas.width + this.radius;
                if (this.x > canvas.width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = canvas.height + this.radius;
                if (this.y > canvas.height + this.radius) this.y = -this.radius;

                // Interaction
                const dx = mouse.current.x - this.x;
                const dy = mouse.current.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactRange = 300;

                if (dist < interactRange) {
                    const angle = Math.atan2(dy, dx);
                    const force = (interactRange - dist) / interactRange;

                    // Push away with "swirly" vortex physics
                    this.vx -= Math.cos(angle + 0.5) * force * 2;
                    this.vy -= Math.sin(angle + 0.5) * force * 2;
                }

                this.vx *= this.friction;
                this.vy *= this.friction;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initBlobs = () => {
            const layers = [
                { type: 'deep', count: 12 },
                { type: 'gold', count: 15 },
                { type: 'foam', count: 20 }
            ];

            const newBlobs = [];
            layers.forEach(layer => {
                for (let i = 0; i < layer.count; i++) {
                    newBlobs.push(new MarbleBlob(layer.type));
                }
            });
            blobs.current = newBlobs;
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Grouping by type is constant, so we can just iterate.
            // Using a single loop to update and draw
            blobs.current.forEach(blob => {
                blob.update();
                blob.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        initBlobs();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    filter: 'url(#marble-goo) contrast(150%) brightness(120%)',
                    willChange: 'filter'
                }}
            />
            {/* SVG Filter for "Marble Foam" Gooiness */}
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-0 h-0 invisible">
                <defs>
                    <filter id="marble-goo">
                        {/* Lower stdDeviation and numOctaves for speed */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -20" result="goo" />
                        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
                        <feDisplacementMap in="goo" in2="noise" scale="25" result="textured" />
                        <feComposite in="SourceGraphic" in2="textured" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default LiquidEngine;
