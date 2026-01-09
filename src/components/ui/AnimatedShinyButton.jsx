import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * AnimatedShinyButton - Premium button with shimmer effect
 * Inspired by SolaceUI/Eldora UI patterns
 */
const AnimatedShinyButton = ({
    children,
    className,
    onClick,
    variant = 'primary',
    size = 'default',
    disabled = false,
    ...props
}) => {
    const variants = {
        primary: 'bg-yellow-400 text-green-950 hover:bg-yellow-300',
        secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
        outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-950',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        default: 'px-8 py-4 text-lg',
        lg: 'px-10 py-5 text-xl',
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'relative overflow-hidden rounded-full font-bold transition-all duration-300 shadow-xl',
                'flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...props}
        >
            {/* Shimmer effect overlay */}
            <motion.span
                className="absolute inset-0 overflow-hidden rounded-full"
                initial={false}
            >
                <motion.span
                    className="absolute inset-0 -translate-x-full"
                    animate={{
                        translateX: ['−100%', '100%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'linear',
                    }}
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                />
            </motion.span>

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Glow effect */}
            <motion.span
                className="absolute inset-0 rounded-full opacity-0"
                whileHover={{ opacity: 1 }}
                style={{
                    boxShadow: variant === 'primary'
                        ? '0 0 30px rgba(250, 204, 21, 0.6)'
                        : '0 0 20px rgba(255, 255, 255, 0.2)',
                }}
            />
        </motion.button>
    );
};

export default AnimatedShinyButton;
