import React from 'react';
import { cn } from '../../lib/utils';

/**
 * SectionHeading — token-driven section intro (eyebrow + title + description).
 * `tone="inverse"` styles it for placement on dark brand surfaces.
 */
const SectionHeading = ({ eyebrow, title, description, align = 'center', tone = 'default', className }) => {
    const inverse = tone === 'inverse';

    return (
        <div
            className={cn(
                'flex flex-col gap-4',
                align === 'center' ? 'items-center text-center' : 'items-start text-left',
                className
            )}
        >
            {eyebrow && (
                <span
                    className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider',
                        inverse
                            ? 'border-white/20 bg-white/10 text-white/80'
                            : 'border-border bg-secondary text-secondary-foreground'
                    )}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {eyebrow}
                </span>
            )}

            <h2
                className={cn(
                    'font-display text-display-md font-bold tracking-tight',
                    inverse ? 'text-white' : 'text-foreground'
                )}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={cn(
                        'max-w-2xl text-lg leading-relaxed',
                        inverse ? 'text-white/70' : 'text-muted-foreground'
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
