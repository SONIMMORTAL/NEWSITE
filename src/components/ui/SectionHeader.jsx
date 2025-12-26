import React from 'react';

const SectionHeader = ({ pill, title, description, align = "left" }) => (
    <div className={`flex flex-col gap-4 mb-12 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs font-bold uppercase tracking-wider border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            {pill}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight leading-tight">
            {title}
        </h2>
        {description && (
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                {description}
            </p>
        )}
    </div>
);

export default SectionHeader;
