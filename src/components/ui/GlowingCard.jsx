import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * GlowingCard - Premium card with 3D tilt and glow border effect
 * Inspired by Eldora UI / Fancy Components patterns
 */
const GlowingCard = ({
    children,
    className,
    glowColor = 'yellow',
    intensity = 'medium',
    tilt = true,
    onClick,
    ...props
}) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const glowColors = {
        yellow: 'rgba(250, 204, 21, 0.4)',
        green: 'rgba(34, 197, 94, 0.4)',
        blue: 'rgba(59, 130, 246, 0.4)',
        purple: 'rgba(168, 85, 247, 0.4)',
        white: 'rgba(255, 255, 255, 0.3)',
    };

    const intensities = {
        low: 20,
        medium: 30,
        high: 50,
    };

    const handleMouseMove = (e) => {
        if (!tilt || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation (max 10 degrees)
        const rotX = (mouseY / (rect.height / 2)) * -8;
        const rotY = (mouseX / (rect.width / 2)) * 8;

        setRotateX(rotX);
        setRotateY(rotY);

        // Calculate mouse position for glow effect
        const percentX = ((e.clientX - rect.left) / rect.width) * 100;
        const percentY = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x: percentX, y: percentY });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setMousePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
            }}
            className={cn(
                'relative overflow-hidden rounded-3xl transition-transform duration-200 ease-out',
                onClick && 'cursor-pointer',
                className
            )}
            {...props}
        >
            {/* Glow border effect */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColors[glowColor]}, transparent 50%)`,
                    boxShadow: `0 0 ${intensities[intensity]}px ${glowColors[glowColor]}`,
                }}
            />

            {/* Border gradient */}
            <div
                className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-white/5 pointer-events-none"
                style={{ transform: 'translateZ(1px)' }}
            />

            {/* Content */}
            <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
};

export default GlowingCard;
