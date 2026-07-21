import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShieldCheck, ArrowRight, ShoppingBag, X, Sparkles, Check } from 'lucide-react';
import FadeInSection from '../components/ui/FadeInSection';
import GradientText from '../components/ui/GradientText';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { PAYMENTS, cashAppUrl, payPalUrl } from '../config/site';

const DonationsPage = ({ cartTotal = 0, cartItems = [], removeFromCart }) => {
    const [donationAmount, setDonationAmount] = useState('');
    const [selectedPreset, setSelectedPreset] = useState(null);

    useEffect(() => {
        if (cartTotal > 0) {
            setDonationAmount(cartTotal.toString());
        }
    }, [cartTotal]);

    // Only a positive number is a usable amount to hand to a payment app.
    const parsed = parseFloat(donationAmount);
    const amount = Number.isFinite(parsed) && parsed > 0 ? String(parsed) : '';

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
        <div className="pb-20 px-6 max-w-[900px] mx-auto">
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
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
                        Complete Your <GradientText gradient="accent">Contribution</GradientText>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Your contribution directly funds our food pantry, youth cohorts, and community workshops.
                    </p>
                </div>
            </FadeInSection>

            {/* Main Card */}
            <FadeInSection delay={0.2}>
                <motion.div
                    className="bg-card p-8 md:p-10 rounded-3xl shadow-2xl border border-border"
                    whileHover={{ boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                >
                    {/* Cart Summary */}
                    <AnimatePresence>
                        {cartItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 bg-muted rounded-2xl p-5 border border-border"
                            >
                                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
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
                                            <span className="text-muted-foreground">{item.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-foreground">${item.price}</span>
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
                                <div className="flex justify-between items-center pt-4 border-t border-border font-bold text-lg text-foreground">
                                    <span>Total</span>
                                    <span className="text-brand">${cartTotal.toFixed(2)}</span>
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
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary hover:bg-secondary/50'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {selectedPreset === preset.amount && (
                                    <motion.div
                                        layoutId="selectedIndicator"
                                        className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                                    >
                                        <Check size={12} className="text-white" />
                                    </motion.div>
                                )}
                                <div className="text-2xl font-bold text-foreground mb-1">${preset.amount}</div>
                                <div className="text-xs text-brand font-medium mb-1">{preset.label}</div>
                                <div className="text-[10px] text-slate-400">{preset.impact}</div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="space-y-4 mb-8">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">$</span>
                            <input
                                type="number"
                                value={donationAmount}
                                onChange={(e) => {
                                    setDonationAmount(e.target.value);
                                    setSelectedPreset(null);
                                }}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-5 rounded-2xl border-2 border-border bg-muted/40 focus:outline-none focus:border-primary focus:bg-background text-center text-3xl font-bold text-foreground placeholder:text-muted-foreground transition-colors"
                            />
                        </div>

                        {/* Real payment paths. The chosen amount is carried into
                            the app so the donor doesn't have to retype it. */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <a
                                href={cashAppUrl(amount)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => !amount && e.preventDefault()}
                                aria-disabled={!amount}
                                className={`flex items-center justify-center gap-2 rounded-xl bg-[#00D632] py-4 font-bold text-white shadow-lg transition-transform ${
                                    amount ? 'hover:scale-[1.02]' : 'pointer-events-none opacity-50'
                                }`}
                            >
                                Cash App{amount ? ` $${amount}` : ''} <ArrowRight size={18} />
                            </a>

                            {PAYMENTS.payPalHandle ? (
                                <a
                                    href={payPalUrl(amount)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => !amount && e.preventDefault()}
                                    aria-disabled={!amount}
                                    className={`flex items-center justify-center gap-2 rounded-xl bg-[#003087] py-4 font-bold text-white shadow-lg transition-transform ${
                                        amount ? 'hover:scale-[1.02]' : 'pointer-events-none opacity-50'
                                    }`}
                                >
                                    PayPal{amount ? ` $${amount}` : ''} <ArrowRight size={18} />
                                </a>
                            ) : (
                                <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-4 text-sm text-muted-foreground">
                                    PayPal coming soon
                                </div>
                            )}
                        </div>

                        {!amount && (
                            <p className="text-center text-sm text-muted-foreground">
                                Choose an amount above to continue.
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                        <ShieldCheck size={16} className="shrink-0 text-brand" />
                        Payments are handled securely in the Cash App
                        {PAYMENTS.payPalHandle ? ' or PayPal app' : ''} — we never see your card details.
                    </div>
                </motion.div>
            </FadeInSection>

            {/* No local QR image on purpose: cash.app/$handle already shows a
                scannable code, and a copy stored here would silently go stale
                (and misroute money) if the handle ever changed. */}
            <FadeInSection delay={0.3}>
                <div className="mt-10 rounded-3xl border border-[#00D632]/20 bg-[#00D632]/5 p-8 text-center">
                    <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
                        Prefer to send it yourself?
                    </h2>
                    <p className="mx-auto mb-6 max-w-sm text-muted-foreground">
                        Open our Cash App handle to pay on your phone, or scan the code shown there.
                    </p>
                    <a
                        href={cashAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#00D632]/30 bg-card px-6 py-4 font-mono text-2xl font-bold text-foreground shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        <span className="text-[#00D632]">$</span>
                        {PAYMENTS.cashAppHandle}
                    </a>
                </div>
            </FadeInSection>
        </div>
    );
};

export default DonationsPage;
