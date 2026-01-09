import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * GradientText - Animated gradient text with shimmer effect
 * Inspired by SolaceUI gradient text patterns
 */
const GradientText = ({
    children,
    className,
    gradient = 'accent',
    animate = true,
    as: Component = 'span',
}) => {
    const gradients = {
        accent: 'from-yellow-400 via-amber-300 to-yellow-500',
        brand: 'from-green-400 via-emerald-300 to-green-500',
        sunset: 'from-orange-400 via-pink-500 to-purple-500',
        ocean: 'from-cyan-400 via-blue-500 to-indigo-500',
        royal: 'from-purple-400 via-pink-400 to-violet-500',
    };

    if (!animate) {
        return (
            <Component
                className={cn(
                    'bg-clip-text text-transparent bg-gradient-to-r',
                    gradients[gradient],
                    className
                )}
            >
                {children}
            </Component>
        );
    }

    return (
        <motion.span
            className={cn(
                'bg-clip-text text-transparent bg-gradient-to-r bg-[length:200%_100%]',
                gradients[gradient],
                className
            )}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {children}
        </motion.span>
    );
};

export default GradientText;
