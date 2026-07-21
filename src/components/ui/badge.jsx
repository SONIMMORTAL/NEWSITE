import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground',
                secondary: 'border-transparent bg-secondary text-secondary-foreground',
                brand: 'border-transparent bg-brand text-brand-foreground',
                outline: 'border-border text-foreground',
                // Subtle glass chip for use over dark photography (the hero badge).
                glass: 'border-white/20 bg-white/10 text-white backdrop-blur-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const Badge = ({ className, variant, ...props }) => (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };
