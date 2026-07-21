import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge has to be told about custom scales. Without this it can't
 * tell `text-display-md` (a font size) from `text-foreground` (a color),
 * treats them as the same group, and silently drops the size class.
 */
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'font-size': [{ text: ['display-sm', 'display-md', 'display-lg'] }],
        },
    },
});

/**
 * Utility function for merging Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
