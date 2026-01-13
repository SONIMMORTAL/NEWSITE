import React from 'react';
import { motion } from 'framer-motion';

const SpiralBinding = () => (
    <div className="absolute -top-3 left-0 right-0 h-8 flex justify-evenly items-end z-20 px-8 md:px-12">
        {Array.from({ length: 11 }).map((_, i) => (
            <motion.div
                key={i}
                className="relative"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
            >
                {/* Elegant brass/gold binding clip */}
                <div className="relative w-6 h-8 flex flex-col items-center">
                    {/* Top cap - polished gold */}
                    <div className="w-5 h-2 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 rounded-t-full shadow-md relative overflow-hidden">
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </div>

                    {/* Main clip body - brushed gold */}
                    <div className="w-4 h-5 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 rounded-b-sm shadow-lg relative overflow-hidden">
                        {/* Vertical shine line */}
                        <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-200/60 via-white/30 to-yellow-200/40" />
                        {/* Center emboss line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-px bg-amber-700/30" />
                        {/* Right shadow */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-amber-700/40 to-transparent" />
                    </div>

                    {/* Bottom shadow on paper */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-amber-900/20 rounded-full blur-[2px]" />
                </div>
            </motion.div>
        ))}
    </div>
);

export default SpiralBinding;
