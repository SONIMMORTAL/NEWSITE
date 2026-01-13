import React from 'react';

const texturePatterns = {
    paperGrain: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,

    noise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,

    linen: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(0, 0, 0, 0.03) 1px,
        rgba(0, 0, 0, 0.03) 2px
    ),
    repeating-linear-gradient(
        90deg,
        transparent,
        transparent 1px,
        rgba(0, 0, 0, 0.03) 1px,
        rgba(0, 0, 0, 0.03) 2px
    )`,

    canvas: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='m0 0h3v3h-3zm3 3h3v3h-3z'/%3E%3C/g%3E%3C/svg%3E")`,

    fiber: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fiber'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02 0.5' numOctaves='2' result='turbulence'/%3E%3CfeDisplacementMap xChannelSelector='R' yChannelSelector='G' scale='3' in='SourceGraphic' in2='turbulence'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fiber)' fill='%23D4C4A8' opacity='0.1'/%3E%3C/svg%3E")`,
};

const TextureOverlay = ({
    texture = 'paperGrain',
    opacity = 0.08,
    className = '',
    blend = 'multiply'
}) => {
    const pattern = texturePatterns[texture] || texturePatterns.paperGrain;

    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: pattern,
                opacity: opacity,
                mixBlendMode: blend,
            }}
            aria-hidden="true"
        />
    );
};

// Premium paper texture with multiple layers for realism
export const PaperTexture = ({ className = '' }) => (
    <>
        {/* Base grain */}
        <TextureOverlay texture="paperGrain" opacity={0.06} className={className} />
        {/* Subtle fiber overlay */}
        <TextureOverlay texture="linen" opacity={0.04} blend="overlay" className={className} />
        {/* Warm color filter */}
        <div
            className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-50/20 via-transparent to-orange-50/10 ${className}`}
            aria-hidden="true"
        />
    </>
);

export default TextureOverlay;
