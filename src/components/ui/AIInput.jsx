import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, Command } from 'lucide-react';
import { cn } from '../../lib/utils';

const AIInput = ({
    value,
    onChange,
    onSubmit,
    loading = false,
    placeholder = "Ask something...",
    className
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={cn("relative group w-full", className)}>
            {/* Glow Effect */}
            <div className={cn(
                "absolute -inset-0.5 bg-gradient-to-r from-green-300 via-yellow-200 to-green-300 rounded-3xl opacity-20 blur transition-opacity duration-500",
                isFocused ? "opacity-70" : "group-hover:opacity-40"
            )} />

            {/* Input Container */}
            <div className={cn(
                "relative flex items-end gap-2 p-3 bg-white rounded-3xl border transition-all duration-200 shadow-sm",
                isFocused ? "border-green-300 ring-4 ring-green-500/10" : "border-slate-200"
            )}>
                {/* Prefix Icon/Badge */}
                <div className="pb-2 pl-1 hidden sm:block">
                    <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-50 to-green-100 border border-green-200 text-green-600 transition-transform duration-300",
                        loading && "animate-spin"
                    )}>
                        <Sparkles size={16} />
                    </div>
                </div>

                {/* Text Area */}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    rows={1}
                    className="w-full min-h-[50px] max-h-[200px] py-3 px-2 bg-transparent border-0 focus:ring-0 text-slate-800 placeholder:text-slate-400 resize-none text-base leading-relaxed scrollbar-hide"
                    style={{ maxHeight: '200px' }}
                />

                {/* Submit Button */}
                <motion.button
                    onClick={onSubmit}
                    disabled={!value.trim() || loading}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 mb-1 mr-1",
                        value.trim() && !loading
                            ? "bg-black text-white hover:bg-slate-800 shadow-md transform hover:-translate-y-0.5"
                            : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    )}
                >
                    {loading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Sparkles size={18} />
                        </motion.div>
                    ) : (
                        <ArrowUp size={20} strokeWidth={2.5} />
                    )}
                </motion.button>
            </div>

            {/* Optional Hint/Command Text */}
            <div className="absolute right-4 -bottom-6 text-[10px] text-slate-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Press</span>
                <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500">Enter</kbd>
                <span>to send</span>
            </div>
        </div>
    );
};

export default AIInput;
