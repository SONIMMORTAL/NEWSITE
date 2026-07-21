import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Button — the single button primitive for the app.
 *
 * Variants map to the design tokens, so the same component covers the gold
 * Donate CTA (`default`), deep-green brand actions (`brand`), and the quieter
 * outline/ghost/link roles. The old AnimatedShinyButton's shimmer is now an
 * opt-in `shine` prop instead of a separate component — used sparingly.
 */
const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold ' +
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
        'focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] ' +
        'disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
                brand: 'bg-brand text-brand-foreground shadow-sm hover:bg-brand/90',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
                'outline-inverse': 'border border-white/40 bg-transparent text-white hover:bg-white/10',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline rounded-none',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            },
            size: {
                sm: 'h-9 px-4 text-sm [&_svg]:size-4',
                default: 'h-11 px-6 text-sm [&_svg]:size-4',
                lg: 'h-12 px-8 text-base [&_svg]:size-5',
                icon: 'h-11 w-11 [&_svg]:size-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, shine = false, asChild = false, children, ...props }, ref) => {
        // asChild renders the child element (e.g. a router <Link>) with button
        // styling, so navigation stays a real anchor for crawlers and middle-click.
        const Comp = asChild ? Slot : 'button';
        // Slot accepts exactly one child, so the shimmer overlay is only
        // rendered in the plain-button case.
        const showShine = shine && !asChild;

        return (
            <Comp
                ref={ref}
                className={cn(
                    buttonVariants({ variant, size }),
                    showShine && 'group relative overflow-hidden',
                    className
                )}
                {...props}
            >
                {asChild ? (
                    children
                ) : (
                    <>
                        {showShine && (
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden"
                            />
                        )}
                        {children}
                    </>
                )}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
