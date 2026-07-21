import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input — token-driven text field. Neutral by default; pass a variant via
 * className overrides where a field sits on a dark surface.
 */
const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
    <input
        ref={ref}
        type={type}
        className={cn(
            'flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground',
            'placeholder:text-muted-foreground shadow-sm transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
    />
));
Input.displayName = 'Input';

export { Input };
