import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, ShieldCheck, ArrowRight, ShoppingBag, X } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import CheckoutModal from '../components/features/CheckoutModal';

const DonationsPage = ({ cartTotal = 0, cartItems = [], removeFromCart }) => {
    const [donationAmount, setDonationAmount] = useState('');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Update donation amount when cartTotal changes
    useEffect(() => {
        if (cartTotal > 0) {
            setDonationAmount(cartTotal.toString());
        }
    }, [cartTotal]);

    const handlePayClick = () => {
        if (!donationAmount || parseFloat(donationAmount) <= 0) return;
        setIsCheckoutOpen(true);
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-[800px] mx-auto">
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                total={donationAmount}
            />

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 text-center mb-8">
                {/* ... existing header content ... */}
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart size={32} className="text-yellow-600 fill-current animate-pulse" />
                </div>
                <h1 className="text-4xl font-bold text-green-900 mb-4">Complete Your Contribution</h1>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">
                    Your contribution directly funds our food pantry, youth cohorts, and community workshops.
                </p>

                {/* Cart Summary Section */}
                {cartItems.length > 0 && (
                    <div className="mb-8 bg-slate-50 rounded-xl p-4 border border-slate-100 text-left">
                        <h3 className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                            <ShoppingBag size={16} /> Order Summary
                        </h3>
                        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto custom-scrollbar">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-slate-800">${item.price}</span>
                                        <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-600">
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200 font-bold text-green-900">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                )}


                <div className="grid grid-cols-3 gap-4 mb-8">
                    {['25', '50', '100'].map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setDonationAmount(amt)}
                            className={`py-4 rounded-xl border-2 font-bold text-xl transition-colors ${donationAmount === amt
                                ? 'border-yellow-400 bg-yellow-50 text-green-900'
                                : 'border-green-100 text-green-800 hover:border-green-600 hover:bg-green-50'
                                }`}
                        >
                            ${amt}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 mb-8">
                    <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter Amount"
                        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-green-600 text-center text-lg font-medium"
                    />
                    <button
                        onClick={handlePayClick}
                        className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <CreditCard size={20} /> {cartTotal > 0 ? "Pay Now" : "Donate Securely"}
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={14} /> Secure SSL Payment
                </div>
            </div>

            {/* Cash App Section */}
            <GlassCard className="bg-[#00D632]/5 border-[#00D632]/20 flex flex-col items-center text-center p-8 max-w-md mx-auto w-full mt-8">
                <div className="w-16 h-16 bg-[#00D632] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#00D632]/20">
                    <span className="text-white font-bold text-3xl">$</span>
                </div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">Pay with Cash App</h2>
                <p className="text-slate-600 mb-8 max-w-xs">
                    Support us directly. Send your donation to our official Cash App handle.
                </p>

                <div className="flex flex-col gap-4 w-full">
                    <div className="bg-white py-4 px-6 rounded-xl border border-green-100 font-mono text-2xl font-bold text-slate-800 flex items-center justify-center gap-3 shadow-sm">
                        <span className="text-[#00D632]">$</span>PassInc5
                    </div>
                    <a
                        href="https://cash.app/$PassInc5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#00D632] text-white py-4 rounded-xl font-bold hover:bg-[#00b82b] transition-all shadow-lg shadow-[#00D632]/20 hover:shadow-[#00D632]/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        Open Cash App <ArrowRight size={18} />
                    </a>
                </div>
            </GlassCard>
        </div>
    );
};

export default DonationsPage;
