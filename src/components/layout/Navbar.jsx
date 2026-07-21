import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
    { label: 'Home', to: '/' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'Programs', to: '/programs' },
    { label: 'Food Pantry', to: '/food-pantry' },
    { label: 'Products', to: '/products' },
    { label: 'Calendar', to: '/calendar' },
];

const Navbar = ({ isMenuOpen, setIsMenuOpen, scrolled, cartCount }) => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={cn(
                    'fixed top-0 z-50 w-full transition-all duration-500',
                    scrolled || !isHome
                        ? 'border-b border-white/10 bg-brand/90 py-2 shadow-2xl backdrop-blur-2xl'
                        : 'bg-transparent py-4 md:py-6'
                )}
            >
                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
                    <Link to="/" className="group flex items-center gap-4" aria-label="Public Advocate — home">
                        <img
                            src={ASSETS.logo}
                            className="h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105 md:h-28"
                            alt="Public Advocate Social Society"
                            width={400}
                            height={370}
                            fetchPriority="high"
                            decoding="async"
                        />
                    </Link>

                    {/* Desktop pill navigation */}
                    <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1.5 shadow-xl backdrop-blur-2xl md:flex">
                        {NAV_ITEMS.map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    cn(
                                        'relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300',
                                        isActive ? 'text-primary-foreground' : 'text-white/80 hover:text-white'
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.span
                                                layoutId="activeTab"
                                                className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/30"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/donations"
                            className="relative rounded-full p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-primary"
                            aria-label={`Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
                        >
                            <ShoppingBag size={22} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand bg-red-500 text-[10px] font-bold text-white"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        <Link
                            to="/donations"
                            className="hidden items-center gap-2 rounded-full border border-primary/50 bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95 md:flex"
                        >
                            <Sparkles size={16} />
                            Donate
                        </Link>

                        <button
                            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-brand/98 backdrop-blur-2xl"
                    >
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
                        </div>

                        {NAV_ITEMS.map(({ label, to }, i) => (
                            <motion.div
                                key={to}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <NavLink
                                    to={to}
                                    end={to === '/'}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            'relative py-2 text-3xl font-bold tracking-wide transition-colors',
                                            isActive ? 'text-primary' : 'text-white hover:text-primary'
                                        )
                                    }
                                >
                                    {label}
                                </NavLink>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link
                                to="/donations"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-6 flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30"
                            >
                                <Sparkles size={20} />
                                Donate Now
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
