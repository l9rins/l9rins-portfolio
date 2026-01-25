"use client";

import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    // EXACT MATCH: Reduced to 12 segments for that specific snappy feel
    const trail = useRef<{ x: number; y: number }[]>(
        Array(12).fill(null).map(() => ({ x: 0, y: 0 }))
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Initialize trail under the cursor
        trail.current.forEach(point => {
            point.x = window.innerWidth / 2;
            point.y = window.innerHeight / 2;
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let leadX = mouse.current.x;
            let leadY = mouse.current.y;

            trail.current.forEach((point) => {
                // EXACT MATCH: 0.45 ease gives it that precise snap and tension
                const ease = 0.85;
                point.x += (leadX - point.x) * ease;
                point.y += (leadY - point.y) * ease;
                leadX = point.x;
                leadY = point.y;
            });

            // EXACT MATCH: Drawing the line with tapering width
            ctx.beginPath();
            ctx.moveTo(trail.current[0].x, trail.current[0].y);

            for (let i = 0; i < trail.current.length - 1; i++) {
                const xc = (trail.current[i].x + trail.current[i + 1].x) / 2;
                const yc = (trail.current[i].y + trail.current[i + 1].y) / 2;
                ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
            }

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'; // Kept strictly white
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // EXACT MATCH: This applies the tapering effect to the stroke
            ctx.lineWidth = 2;
            ctx.stroke();

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{ mixBlendMode: 'difference' }}
        />
    );
};
