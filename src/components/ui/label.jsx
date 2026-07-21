import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Label — always pair with an input `id` via htmlFor. The old modals rendered
 * bare <label> elements with no association, so screen readers announced the
 * fields unlabelled.
 */
const Label = React.forwardRef(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            'mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground',
            className
        )}
        {...props}
    />
));
Label.displayName = 'Label';

export { Label };
