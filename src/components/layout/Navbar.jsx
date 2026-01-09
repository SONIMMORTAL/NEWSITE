import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { cn } from '../../lib/utils';

const Navbar = ({ activePage, navigate, isMenuOpen, setIsMenuOpen, scrolled, cartCount }) => {
    const navItems = ['home', 'our-work', 'programs', 'food-pantry', 'products', 'calendar'];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={cn(
                    'fixed top-0 w-full z-50 transition-all duration-500',
                    scrolled || activePage !== 'home'
                        ? 'bg-green-950/90 backdrop-blur-2xl py-2 shadow-2xl border-b border-white/10'
                        : 'bg-transparent py-4 md:py-6'
                )}
            >
                <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-4 cursor-pointer group"
                        onClick={() => navigate('home')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative">
                            <img
                                src={ASSETS.logo}
                                className="h-20 md:h-28 w-auto object-contain drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                                alt="Public Advocate Logo"
                            />
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-yellow-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                        </div>
                    </motion.div>

                    {/* Desktop Menu - Pill Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-black/30 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-xl">
                        {navItems.map((page, i) => (
                            <motion.button
                                key={page}
                                onClick={() => navigate(page)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    'relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                                    activePage === page
                                        ? 'text-green-950'
                                        : 'text-white/80 hover:text-white'
                                )}
                            >
                                {/* Active indicator background */}
                                {activePage === page && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/30"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {page === 'our-work' ? 'Our Work' : page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Cart Indicator */}
                        <motion.button
                            onClick={() => navigate('donations')}
                            className="relative p-2.5 text-white/80 hover:text-yellow-400 transition-colors rounded-full hover:bg-white/10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingBag size={22} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-green-950"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Donate Button - Desktop */}
                        <motion.button
                            onClick={() => navigate('donations')}
                            className="hidden md:flex items-center gap-2 bg-yellow-400 text-green-950 px-7 py-3 rounded-full font-bold text-sm shadow-xl shadow-yellow-400/30 border border-yellow-300/50"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Sparkles size={16} />
                            Donate
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className="md:hidden text-white p-2 rounded-full bg-white/10 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-green-950/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-4"
                    >
                        {/* Decorative gradient */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl" />
                        </div>

                        {['Home', 'Our Work', 'Programs', 'Food Pantry', 'Products', 'Calendar'].map((item, i) => (
                            <motion.button
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const pageName = item === 'Our Work' ? 'our-work' : item.toLowerCase().replace(' ', '-');
                                    navigate(pageName);
                                }}
                                className="relative text-3xl font-bold text-white hover:text-yellow-400 transition-colors tracking-wide py-2"
                            >
                                {item}
                            </motion.button>
                        ))}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={() => {
                                setIsMenuOpen(false);
                                navigate('donations');
                            }}
                            className="mt-6 bg-yellow-400 text-green-950 px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-yellow-400/30 flex items-center gap-2"
                        >
                            <Sparkles size={20} />
                            Donate Now
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
