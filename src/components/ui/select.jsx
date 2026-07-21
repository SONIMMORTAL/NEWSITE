import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Select — styled native <select>. Deliberately native rather than a custom
 * listbox: it keeps mobile's platform picker and full keyboard support for free.
 */
const Select = React.forwardRef(({ className, children, ...props }, ref) => (
    <div className="relative">
        <select
            ref={ref}
            className={cn(
                'flex h-11 w-full appearance-none rounded-xl border border-input bg-muted/50 px-3 pr-10 text-sm text-foreground',
                'transition-colors focus-visible:border-ring focus-visible:bg-background focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        >
            {children}
        </select>
        <ChevronDown
            size={16}
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
    </div>
));
Select.displayName = 'Select';

export { Select };
