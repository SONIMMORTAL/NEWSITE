import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, X, Loader2, CreditCard } from 'lucide-react';

// Using a public test key for demonstration (safe to expose, cannot charge real money)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = ({ total, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // 1. Create a Payment Method (this tokenizes the card securely)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Simulate backend processing delay
            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 1500);
        }
    };

    if (success) {
        return (
            <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in">
                    <Lock size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">Secure Payment Successful!</h2>
                <p className="text-slate-600 mb-8">Thank you for your generous support.</p>
                <button onClick={onClose} className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition-colors">
                    Close
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <Lock className="text-yellow-600 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-yellow-800">
                    Your payment information is encrypted and processed securely by Stripe. We do not store your card details.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                    <input type="text" placeholder="Jane Doe" required className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input type="email" placeholder="jane@example.com" required className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Card Details</label>
                    <div className="p-4 border border-slate-200 rounded-lg focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 bg-white">
                        <CardElement options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#9e2146' },
                            },
                        }} />
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><CreditCard size={20} /> Pay ${total}</>}
            </button>
        </form>
    );
};

const CheckoutModal = ({ isOpen, onClose, total }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-green-950/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-green-900 p-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <Lock size={18} className="text-yellow-400" /> Secure Checkout
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm total={total} onClose={onClose} />
                    </Elements>
                </div>
                <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        Powered by <span className="font-bold text-slate-500">Stripe</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
