import React from 'react';
import { ShoppingBag, Sparkles, Plus } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';
import { ASSETS } from '../constants/assets';

const PRODUCTS = [
    {
        id: 'hoodie',
        name: 'Advocate Hoodie',
        description: 'Premium cotton blend',
        price: 45.00,
        image: ASSETS.hoodie
    },
    {
        id: 'community-tee',
        name: 'Community Tee',
        description: '100% Organic Cotton',
        price: 25.00,
        image: ASSETS.shirt1
    },
    {
        id: 'tote',
        name: 'Canvas Tote',
        description: 'Durable & Spacious',
        price: 15.00,
        image: ASSETS.tote1
    },
    {
        id: 'youth-tee',
        name: 'Youth Tee',
        description: 'Future Leader',
        price: 20.00,
        image: ASSETS.model1
    }
];

const ProductsPage = ({ addToCart }) => (
    <div className="pb-20 px-6 max-w-[1200px] mx-auto">
        <SectionHeader
            pill="Store"
            title="Shop & Support"
            description="Support our cause by purchasing official merchandise and memberships. All proceeds go directly to our community programs."
            align="center"
        />
        <BentoGrid>
            {/* Membership is treated as a special product */}
            <BentoItem span={2} className="bg-brand text-white flex flex-col justify-center relative overflow-hidden group min-h-[400px]">
                {/* Background Image */}
                <img loading="lazy" decoding="async" src="/totegreen.webp" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Annual Membership Support" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand/85 mix-blend-multiply transition-opacity duration-300" />

                <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12 z-0">
                    <ShoppingBag size={200} className="text-white mix-blend-overlay" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-brand text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles size={12} /> Premium Member
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Annual Membership</h3>
                        <p className="text-brand-foreground mb-6 max-w-sm">Join the inner circle. Get exclusive updates, voting rights, and priority access to events.</p>
                        <button
                            onClick={() => addToCart({ id: 'membership', name: 'Annual Membership', price: 50.00 })}
                            className="bg-card text-brand px-6 py-3 rounded-xl font-bold hover:bg-primary transition-colors shadow-lg"
                        >
                            Join for $50/yr
                        </button>
                    </div>
                </div>
            </BentoItem>

            {PRODUCTS.map((product) => (
                <BentoItem key={product.id} className="bg-card flex flex-col items-center text-center group">
                    <div className="w-full aspect-square bg-muted rounded-xl mb-4 overflow-hidden relative">
                        <img loading="lazy" decoding="async" src={product.image} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                        <button
                            onClick={() => addToCart(product)}
                            className="absolute bottom-3 right-3 p-2 bg-card rounded-full shadow-md text-brand opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary z-20"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <h3 className="font-bold text-brand text-lg">{product.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between w-full px-2">
                        <span className="font-bold text-brand">${product.price.toFixed(2)}</span>
                    </div>
                </BentoItem>
            ))}
        </BentoGrid>
    </div>
);

export default ProductsPage;
