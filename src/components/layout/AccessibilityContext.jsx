import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
    const [theme, setTheme] = useState('default'); // default, high-contrast, grayscale, deuteranopia
    const [fontSize, setFontSize] = useState(1); // 1 = normal, 1.2 = large, 1.4 = extra large
    const [reduceMotion, setReduceMotion] = useState(false);

    // Apply classes to the body element for global styling
    useEffect(() => {
        const body = document.body;

        // Remove all old theme classes
        body.classList.remove(
            'a11y-high-contrast',
            'a11y-grayscale',
            'a11y-deuteranopia',
            'a11y-ocean',
            'a11y-royal',
            'a11y-sunset'
        );

        // Apply new theme class
        if (theme !== 'default') {
            body.classList.add(`a11y-${theme}`);
        }

        // Reduce Motion
        if (reduceMotion) {
            body.classList.add('a11y-reduce-motion');
        } else {
            body.classList.remove('a11y-reduce-motion');
        }

        // Font Size (CSS variable or class)
        document.documentElement.style.setProperty('--a11y-font-scale', fontSize);

    }, [theme, fontSize, reduceMotion]);

    const increaseFont = () => setFontSize(prev => Math.min(prev + 0.2, 1.4));
    const decreaseFont = () => setFontSize(prev => Math.max(prev - 0.2, 1));
    const toggleMotion = () => setReduceMotion(prev => !prev);
    const cycleTheme = () => {
        setTheme(prev => {
            const themes = ['default', 'high-contrast', 'grayscale', 'deuteranopia', 'ocean', 'royal', 'sunset'];
            const nextIndex = (themes.indexOf(prev) + 1) % themes.length;
            return themes[nextIndex];
        });
    };

    const resetA11y = () => {
        setFontSize(1);
        setTheme('default');
        setReduceMotion(false);
    };

    return (
        <AccessibilityContext.Provider value={{
            theme,
            setTheme,
            cycleTheme,
            fontSize,
            reduceMotion,
            increaseFont,
            decreaseFont,
            toggleMotion,
            resetA11y
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => useContext(AccessibilityContext);
