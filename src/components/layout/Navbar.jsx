import React from 'react';
import { Menu, X } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

const Navbar = ({ activePage, navigate, isMenuOpen, setIsMenuOpen, scrolled }) => (
    <>
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || activePage !== 'home' ? 'bg-green-950/95 backdrop-blur-xl py-2 shadow-2xl border-b border-white/10' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('home')}>
                    <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 ease-out">
                        <img src={ASSETS.logo} className="h-20 md:h-28 w-auto object-contain drop-shadow-md" alt="Public Advocate Logo" />
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1 bg-black/20 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-lg">
                    {['home', 'about', 'programs', 'food-pantry', 'products', 'calendar'].map((page) => (
                        <button
                            key={page}
                            onClick={() => navigate(page)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activePage === page
                                ? 'bg-yellow-400 text-green-950 shadow-lg scale-105'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('donations')}
                        className="hidden md:flex bg-yellow-400 text-green-950 px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-lg shadow-yellow-400/20"
                    >
                        Donate
                    </button>
                    <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="fixed inset-0 bg-green-950/98 backdrop-blur-xl z-40 flex flex-col items-center justify-start pt-32 gap-6 animate-in slide-in-from-top-10 duration-500">
                {['Home', 'About', 'Programs', 'Food Pantry', 'Products', 'Calendar'].map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            setIsMenuOpen(false);
                            navigate(item.toLowerCase().replace(' ', '-'));
                        }}
                        className="text-3xl font-black text-white hover:text-yellow-400 transition-colors tracking-wide drop-shadow-lg"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.8)' }}
                    >
                        {item}
                    </button>
                ))}
                <button
                    onClick={() => {
                        setIsMenuOpen(false);
                        navigate('donations');
                    }}
                    className="bg-yellow-400 text-green-950 px-8 py-3 rounded-full font-bold text-lg shadow-xl mt-4 hover:scale-105 transition-transform border-2 border-green-900/10"
                >
                    Donate Now
                </button>
            </div>
        )}
    </>
);

export default Navbar;
