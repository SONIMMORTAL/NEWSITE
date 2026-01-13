import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CreditCard, ShieldCheck, ArrowRight, ShoppingBag, X, Sparkles, Check } from 'lucide-react';
import FadeInSection from '../components/ui/FadeInSection';
import GradientText from '../components/ui/GradientText';
import AnimatedShinyButton from '../components/ui/AnimatedShinyButton';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import CheckoutModal from '../components/features/CheckoutModal';

const DonationsPage = ({ cartTotal = 0, cartItems = [], removeFromCart }) => {
    const [donationAmount, setDonationAmount] = useState('');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(null);

    useEffect(() => {
        if (cartTotal > 0) {
            setDonationAmount(cartTotal.toString());
        }
    }, [cartTotal]);

    const handlePayClick = () => {
        if (!donationAmount || parseFloat(donationAmount) <= 0) return;
        setIsCheckoutOpen(true);
    };

    const handlePresetClick = (amt) => {
        setSelectedPreset(amt);
        setDonationAmount(amt);
    };

    const presets = [
        { amount: '25', label: 'Supporter', impact: 'Feeds a family for 1 week' },
        { amount: '50', label: 'Champion', impact: 'Youth program supplies' },
        { amount: '100', label: 'Hero', impact: 'Full month of services' },
    ];

    return (
        <div className="pt-20 pb-20 px-6 max-w-[900px] mx-auto">
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                total={donationAmount}
            />

            {/* Header */}
            <FadeInSection>
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-500/30"
                    >
                        <Heart size={36} className="text-white fill-white" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
                        Complete Your <GradientText gradient="accent">Contribution</GradientText>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-md mx-auto">
                        Your contribution directly funds our food pantry, youth cohorts, and community workshops.
                    </p>
                </div>
            </FadeInSection>

            {/* Main Card */}
            <FadeInSection delay={0.2}>
                <motion.div
                    className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100"
                    whileHover={{ boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                >
                    {/* Cart Summary */}
                    <AnimatePresence>
                        {cartItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 bg-slate-50 rounded-2xl p-5 border border-slate-100"
                            >
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <ShoppingBag size={16} />
                                    Order Summary
                                </h3>
                                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto custom-scrollbar">
                                    {cartItems.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex justify-between items-center text-sm"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <span className="text-slate-600">{item.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-slate-800">${item.price}</span>
                                                <motion.button
                                                    onClick={() => removeFromCart(idx)}
                                                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <X size={14} />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-200 font-bold text-lg text-slate-900">
                                    <span>Total</span>
                                    <span className="text-green-600">${cartTotal.toFixed(2)}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Preset Amounts */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {presets.map((preset) => (
                            <motion.button
                                key={preset.amount}
                                onClick={() => handlePresetClick(preset.amount)}
                                className={`relative p-5 rounded-2xl border-2 transition-all text-left overflow-hidden ${selectedPreset === preset.amount
                                        ? 'border-yellow-400 bg-yellow-50'
                                        : 'border-slate-200 hover:border-green-300 hover:bg-green-50/50'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {selectedPreset === preset.amount && (
                                    <motion.div
                                        layoutId="selectedIndicator"
                                        className="absolute top-2 right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
                                    >
                                        <Check size={12} className="text-white" />
                                    </motion.div>
                                )}
                                <div className="text-2xl font-bold text-slate-900 mb-1">${preset.amount}</div>
                                <div className="text-xs text-green-600 font-medium mb-1">{preset.label}</div>
                                <div className="text-[10px] text-slate-400">{preset.impact}</div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="space-y-4 mb-8">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">$</span>
                            <input
                                type="number"
                                value={donationAmount}
                                onChange={(e) => {
                                    setDonationAmount(e.target.value);
                                    setSelectedPreset(null);
                                }}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-green-500 text-center text-3xl font-bold text-slate-900 transition-colors"
                            />
                        </div>

                        <AnimatedShinyButton
                            onClick={handlePayClick}
                            variant="primary"
                            className="w-full !py-5 !text-xl !bg-green-600 hover:!bg-green-700"
                        >
                            <CreditCard size={22} />
                            {cartTotal > 0 ? "Complete Purchase" : "Donate Securely"}
                        </AnimatedShinyButton>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                        <ShieldCheck size={16} className="text-green-500" />
                        Secure SSL Payment • Powered by Stripe
                    </div>
                </motion.div>
            </FadeInSection>

            {/* Cash App Section */}
            <FadeInSection delay={0.3}>
                <motion.div
                    className="mt-10 bg-gradient-to-br from-[#00D632]/10 to-[#00D632]/5 border border-[#00D632]/20 rounded-3xl p-8 text-center"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#00D632] to-[#00b82b] rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-[#00D632]/30">
                            <span className="text-white font-bold text-3xl">$</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Pay with Cash App</h2>
                        <p className="text-slate-600 mb-6 max-w-sm">
                            Support us directly with our official Cash App handle
                        </p>

                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <div className="bg-white py-4 px-6 rounded-xl border border-[#00D632]/30 font-mono text-2xl font-bold text-slate-800 flex items-center justify-center gap-2 shadow-lg">
                                <span className="text-[#00D632]">$</span>PassInc5
                            </div>
                            <motion.a
                                href="https://cash.app/$PassInc5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-gradient-to-r from-[#00D632] to-[#00b82b] text-white py-4 rounded-xl font-bold shadow-xl shadow-[#00D632]/30 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0, 214, 50, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Open Cash App <ArrowRight size={18} />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </FadeInSection>
        </div>
    );
};

export default DonationsPage;
