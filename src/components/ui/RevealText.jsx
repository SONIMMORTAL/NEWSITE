import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({
    text,
    className = '',
    direction = 'up', // 'up', 'down', 'left', 'right'
    stagger = 'character', // 'character' or 'word'
    delay = 0,
    duration = 0.5,
    as: Component = 'span',
}) => {
    // Split text into words or characters based on stagger type
    const items = stagger === 'word'
        ? text.split(' ').map((word, i) => ({ text: word + (i < text.split(' ').length - 1 ? '\u00A0' : ''), key: i }))
        : text.split('').map((char, i) => ({ text: char === ' ' ? '\u00A0' : char, key: i }));

    // Direction-based animation variants
    const getVariants = () => {
        const distance = 20;
        const directions = {
            up: { y: distance },
            down: { y: -distance },
            left: { x: distance },
            right: { x: -distance },
        };

        return {
            hidden: {
                opacity: 0,
                ...directions[direction],
            },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
            },
        };
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger === 'word' ? 0.1 : 0.03,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = {
        hidden: getVariants().hidden,
        visible: {
            ...getVariants().visible,
            transition: {
                duration: duration,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.span
            className={`inline-flex flex-wrap ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            {items.map(({ text: itemText, key }) => (
                <motion.span
                    key={key}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {itemText}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Preset variants for common use cases
export const RevealHeading = ({ children, className = '', ...props }) => (
    <RevealText
        text={children}
        stagger="word"
        duration={0.6}
        className={`text-4xl md:text-5xl font-black ${className}`}
        {...props}
    />
);

export const RevealSubheading = ({ children, className = '', delay = 0.2, ...props }) => (
    <RevealText
        text={children}
        stagger="word"
        duration={0.5}
        delay={delay}
        className={`text-lg md:text-xl ${className}`}
        {...props}
    />
);

export default RevealText;
