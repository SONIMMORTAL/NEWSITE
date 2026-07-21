import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext();

/**
 * Three real modes, replacing the six decorative colour themes that used to be
 * implemented as ~180 lines of `!important` overrides. Because every component
 * now reads semantic tokens, a mode is just a class on <html>:
 *   light → (no class)   dark → .dark   high-contrast → .hc
 */
export const THEMES = ['light', 'dark', 'high-contrast'];

const THEME_CLASS = { light: null, dark: 'dark', 'high-contrast': 'hc' };

const STORAGE_KEY = 'pass:a11y';

const readStored = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
};

const systemPrefersDark = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const systemPrefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const AccessibilityProvider = ({ children }) => {
    const stored = typeof window !== 'undefined' ? readStored() : {};

    // Honour the OS preference on first visit; the stored choice wins after that.
    const [theme, setTheme] = useState(
        () => stored.theme || (systemPrefersDark() ? 'dark' : 'light')
    );
    const [fontSize, setFontSize] = useState(() => stored.fontSize || 1);
    const [reduceMotion, setReduceMotion] = useState(
        () => stored.reduceMotion ?? systemPrefersReducedMotion()
    );

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('dark', 'hc');
        const cls = THEME_CLASS[theme];
        if (cls) root.classList.add(cls);

        document.body.classList.toggle('a11y-reduce-motion', reduceMotion);
        root.style.setProperty('--a11y-font-scale', fontSize);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, fontSize, reduceMotion }));
        } catch {
            /* storage blocked — settings simply won't persist */
        }
    }, [theme, fontSize, reduceMotion]);

    const increaseFont = useCallback(() => setFontSize((p) => Math.min(+(p + 0.1).toFixed(2), 1.5)), []);
    const decreaseFont = useCallback(() => setFontSize((p) => Math.max(+(p - 0.1).toFixed(2), 0.9)), []);
    const toggleMotion = useCallback(() => setReduceMotion((p) => !p), []);

    const cycleTheme = useCallback(
        () => setTheme((prev) => THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length]),
        []
    );

    const resetA11y = useCallback(() => {
        setFontSize(1);
        setTheme(systemPrefersDark() ? 'dark' : 'light');
        setReduceMotion(systemPrefersReducedMotion());
    }, []);

    return (
        <AccessibilityContext.Provider
            value={{
                theme,
                setTheme,
                cycleTheme,
                fontSize,
                reduceMotion,
                increaseFont,
                decreaseFont,
                toggleMotion,
                resetA11y,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => useContext(AccessibilityContext);
