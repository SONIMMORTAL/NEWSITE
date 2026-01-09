import React from 'react';

const SpiralBinding = () => (
    <div className="absolute -top-5 left-0 right-0 h-10 flex justify-evenly items-end z-20 px-6 md:px-10">
        {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="relative">
                {/* Ring hole in paper */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-slate-700 rounded-t-full opacity-40" />
                {/* Metal Ring - more realistic with gradient and shine */}
                <div className="relative w-4 h-10 flex flex-col">
                    {/* Ring body */}
                    <div className="w-4 h-full bg-gradient-to-r from-zinc-400 via-zinc-200 via-50% to-zinc-400 rounded-full shadow-lg border border-zinc-500/50 relative overflow-hidden">
                        {/* Shine highlight */}
                        <div className="absolute left-0.5 top-1 bottom-1 w-1 bg-gradient-to-b from-white/60 via-white/20 to-white/40 rounded-full" />
                        {/* Shadow on right */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/20 rounded-r-full" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default SpiralBinding;
