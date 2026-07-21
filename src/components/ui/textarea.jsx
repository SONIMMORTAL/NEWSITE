import React from 'react';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            'flex min-h-[6rem] w-full resize-none rounded-xl border border-input bg-muted/50 px-3 py-2.5 text-sm text-foreground',
            'placeholder:text-muted-foreground transition-colors',
            'focus-visible:border-ring focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
    />
));
Textarea.displayName = 'Textarea';

export { Textarea };
