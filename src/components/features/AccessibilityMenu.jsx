import React, { useState } from 'react';
import { Accessibility, Type, Zap, ZapOff, Sun, Moon, RotateCcw, X, Plus, Minus } from 'lucide-react';
import { useAccessibility } from '../layout/AccessibilityContext';

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
        resetA11y
    } = useAccessibility();

    return (
        <div className="fixed bottom-24 right-6 z-[100]">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white"
                    aria-label="Open Accessibility Menu"
                >
                    <Accessibility size={24} />
                </button>
            )}

            {/* Expanded Menu */}
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden w-64 animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="bg-blue-600 p-3 flex justify-between items-center text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <Accessibility size={18} /> Accessibility
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Font Size */}
                        <div>
                            <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Text Size</p>
                            <div className="flex bg-slate-100 rounded-lg p-1">
                                <button onClick={decreaseFont} className="flex-1 py-1 hover:bg-white rounded shadow-sm transition-colors text-sm flex justify-center"><Minus size={16} /></button>
                                <span className="flex-1 text-center font-bold text-slate-700">{Math.round(fontSize * 100)}%</span>
                                <button onClick={increaseFont} className="flex-1 py-1 hover:bg-white rounded shadow-sm transition-colors text-sm flex justify-center"><Plus size={16} /></button>
                            </div>
                        </div>

                        {/* Theme Selection */}
                        <div>
                            <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide flex items-center gap-2">
                                <Sun size={12} /> Color Theme
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {['default', 'high-contrast', 'grayscale', 'ocean', 'royal', 'sunset'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`px-2 py-1.5 rounded-md text-xs font-bold capitalize transition-all border ${theme === t
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                            }`}
                                    >
                                        {t.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reduce Motion */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                {reduceMotion ? <ZapOff size={16} /> : <Zap size={16} />}
                                Animations
                            </span>
                            <button
                                onClick={toggleMotion}
                                className={`w-12 h-6 rounded-full transition-colors relative ${reduceMotion ? 'bg-blue-600' : 'bg-slate-300'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${reduceMotion ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>

                        {/* Reset */}
                        <button
                            onClick={resetA11y}
                            className="w-full mt-2 py-2 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded flex justify-center items-center gap-1 transition-colors"
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
