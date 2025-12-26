import React from 'react';

const GlassCard = ({ children, className = "", hoverEffect = true, onClick }) => (
    <div
        onClick={onClick}
        className={`
    glass-panel rounded-2xl p-6 
    ${hoverEffect ? 'glass-card-hover' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `}>
        {children}
    </div>
);

export default GlassCard;
