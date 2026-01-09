import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * AnimatedCounter - Number counter with spring physics animation
 * Animates when element comes into view
 */
const AnimatedCounter = ({
    value,
    duration = 2,
    className,
    prefix = '',
    suffix = '',
    decimals = 0,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [displayValue, setDisplayValue] = useState(0);

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 20,
        duration: duration * 1000,
    });

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Number(latest.toFixed(decimals)));
        });
        return unsubscribe;
    }, [springValue, decimals]);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
        }
        return num.toLocaleString();
    };

    return (
        <motion.span
            ref={ref}
            className={cn('tabular-nums', className)}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}
            {formatNumber(displayValue)}
            {suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
