import React, { useState } from 'react';
import { Accessibility, Zap, ZapOff, Sun, Moon, Contrast, RotateCcw, X, Plus, Minus } from 'lucide-react';
import { useAccessibility } from '../layout/AccessibilityContext';
import { cn } from '../../lib/utils';

const THEME_OPTIONS = [
    { key: 'light', label: 'Light', Icon: Sun },
    { key: 'dark', label: 'Dark', Icon: Moon },
    { key: 'high-contrast', label: 'Contrast', Icon: Contrast },
];

const AccessibilityMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        theme,
        setTheme,
        fontSize,
        increaseFont,
        decreaseFont,
        reduceMotion,
        toggleMotion,
        resetA11y,
    } = useAccessibility();

    return (
        <div className="fixed bottom-24 right-6 z-[100]">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-foreground/20 bg-brand text-brand-foreground shadow-2xl transition-transform hover:scale-110"
                    aria-label="Open accessibility menu"
                >
                    <Accessibility size={24} />
                </button>
            )}

            {isOpen && (
                <div
                    role="dialog"
                    aria-label="Accessibility settings"
                    className="w-64 overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-right-10 duration-300"
                >
                    <div className="flex items-center justify-between bg-brand p-3 text-brand-foreground">
                        <h3 className="flex items-center gap-2 font-bold">
                            <Accessibility size={18} /> Accessibility
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded p-1 transition-colors hover:bg-white/10"
                            aria-label="Close accessibility menu"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-4 p-4">
                        {/* Text size */}
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                Text Size
                            </p>
                            <div className="flex items-center rounded-lg bg-muted p-1">
                                <button
                                    onClick={decreaseFont}
                                    className="flex flex-1 justify-center rounded py-1 transition-colors hover:bg-card"
                                    aria-label="Decrease text size"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="flex-1 text-center text-sm font-bold text-foreground">
                                    {Math.round(fontSize * 100)}%
                                </span>
                                <button
                                    onClick={increaseFont}
                                    className="flex flex-1 justify-center rounded py-1 transition-colors hover:bg-card"
                                    aria-label="Increase text size"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Appearance */}
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                Appearance
                            </p>
                            <div
                                role="radiogroup"
                                aria-label="Appearance"
                                className="grid grid-cols-3 gap-2"
                            >
                                {THEME_OPTIONS.map(({ key, label, Icon }) => (
                                    <button
                                        key={key}
                                        role="radio"
                                        aria-checked={theme === key}
                                        onClick={() => setTheme(key)}
                                        className={cn(
                                            'flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-[11px] font-bold transition-all',
                                            theme === key
                                                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                                : 'border-border bg-muted/50 text-muted-foreground hover:bg-muted'
                                        )}
                                    >
                                        <Icon size={15} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Motion */}
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                {reduceMotion ? <ZapOff size={16} /> : <Zap size={16} />}
                                Animations
                            </span>
                            <button
                                onClick={toggleMotion}
                                role="switch"
                                aria-checked={reduceMotion}
                                aria-label="Reduce motion"
                                className={cn(
                                    'relative h-6 w-12 rounded-full transition-colors',
                                    reduceMotion ? 'bg-primary' : 'bg-muted-foreground/40'
                                )}
                            >
                                <span
                                    className={cn(
                                        'absolute top-1 h-4 w-4 rounded-full bg-card shadow transition-all',
                                        reduceMotion ? 'left-7' : 'left-1'
                                    )}
                                />
                            </button>
                        </div>

                        <button
                            onClick={resetA11y}
                            className="mt-2 flex w-full items-center justify-center gap-1 rounded py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <RotateCcw size={12} /> Reset Settings
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilityMenu;
