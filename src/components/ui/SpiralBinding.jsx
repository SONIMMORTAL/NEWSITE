import React from 'react';

const SpiralBinding = () => (
    <div className="absolute -top-4 left-0 right-0 h-8 flex justify-evenly items-end z-20 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-8 bg-gradient-to-b from-gray-400 via-gray-100 to-gray-400 rounded-full shadow-md border border-gray-400 transform -rotate-3" />
        ))}
    </div>
);

export default SpiralBinding;
