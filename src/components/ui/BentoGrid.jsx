import React from 'react';

export const BentoGrid = ({ className, children }) => (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] ${className}`}>
        {children}
    </div>
);

export const BentoItem = ({ className, children, span = 1, onClick }) => (
    <div
        onClick={onClick}
        className={`
    relative overflow-hidden rounded-3xl p-6 
    bg-white/90 backdrop-blur-xl border border-white/50 shadow-sm 
    hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
    ${span === 2 ? 'md:col-span-2' : span === 3 ? 'md:col-span-3' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `}>
        {children}
    </div>
);
