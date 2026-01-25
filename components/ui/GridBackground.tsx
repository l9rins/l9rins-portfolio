import React from 'react';

interface GridBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ children, className = '' }) => {
    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Subtle Grid Pattern with Radial Fade */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                }}
            />

            {/* Content wrapper */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
