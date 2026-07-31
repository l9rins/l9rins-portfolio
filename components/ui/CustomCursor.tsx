"use client";

import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const trail = useRef<{ x: number; y: number }[]>(
        Array(8).fill(null).map(() => ({ x: 0, y: 0 }))
    );
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        trail.current.forEach(point => {
            point.x = window.innerWidth / 2;
            point.y = window.innerHeight / 2;
        });

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            let leadX = mouse.current.x;
            let leadY = mouse.current.y;

            trail.current.forEach((point) => {
                const ease = 0.85;
                point.x += (leadX - point.x) * ease;
                point.y += (leadY - point.y) * ease;
                leadX = point.x;
                leadY = point.y;
            });

            ctx.beginPath();
            ctx.moveTo(trail.current[0].x, trail.current[0].y);

            for (let i = 0; i < trail.current.length - 1; i++) {
                const xc = (trail.current[i].x + trail.current[i + 1].x) / 2;
                const yc = (trail.current[i].y + trail.current[i + 1].y) / 2;
                ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
            }

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{ mixBlendMode: 'difference' }}
        />
    );
};
