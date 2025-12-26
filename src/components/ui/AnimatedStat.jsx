import React from 'react';

const AnimatedStat = ({ value, label, color = "text-yellow-400" }) => (
    <div className="flex flex-col items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-default">
        <span className={`text-3xl font-black ${color} tracking-tight`}>{value}</span>
        <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest mt-1">{label}</span>
    </div>
);

export default AnimatedStat;
