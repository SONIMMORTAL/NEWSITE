import React, { useId, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, Loader2, CreditCard, AlertTriangle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogBody,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// Stripe's shared publishable TEST key. It cannot move real money, and there
// is no backend endpoint that confirms a PaymentIntent — see TEST_MODE below.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

/**
 * No server-side charge exists yet: the form tokenizes the card and then
 * simulates success on a timer. Until a real PaymentIntent endpoint is wired
 * up, the UI must not claim money changed hands.
 */
const TEST_MODE = true;

const CheckoutForm = ({ total, onClose }) => {
    const id = useId();
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

        const { error: stripeError } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        // TODO: POST the payment method to a server endpoint that creates and
        // confirms a PaymentIntent, then flip TEST_MODE off.
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 1500);
    };

    if (success) {
        return (
            <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                    <AlertTriangle size={36} className="text-brand" />
                </div>
                <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
                    Card details verified
                </h2>
                <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
                    This checkout is running in test mode — <strong>no payment was taken</strong> and
                    your card has not been charged. Please use the donation options on the Donate page
                    to give for real.
                </p>
                <Button onClick={onClose} variant="brand" size="lg">
                    Close
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {TEST_MODE && (
                <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                    <AlertTriangle className="mt-0.5 shrink-0 text-destructive" size={18} />
                    <p className="text-xs text-foreground">
                        <strong>Test mode.</strong> This form does not process real payments and no
                        money will be taken. Card details are tokenized by Stripe only.
                    </p>
                </div>
            )}

            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4">
                <Lock className="mt-0.5 shrink-0 text-brand" size={18} />
                <p className="text-xs text-muted-foreground">
                    Card information is encrypted and handled directly by Stripe. We never see or
                    store your card details.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor={`${id}-name`}>Full Name</Label>
                    <Input id={`${id}-name`} required autoComplete="name" placeholder="Jane Doe" />
                </div>
                <div>
                    <Label htmlFor={`${id}-email`}>Email Address</Label>
                    <Input
                        id={`${id}-email`}
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@example.com"
                    />
                </div>
                <div>
                    <Label htmlFor={`${id}-card`}>Card Details</Label>
                    <div
                        id={`${id}-card`}
                        className="rounded-xl border border-input bg-background p-4 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#0f2a1d',
                                        '::placeholder': { color: '#8a9a91' },
                                    },
                                    invalid: { color: '#c81e1e' },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {error && (
                <p
                    role="alert"
                    className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm font-medium text-destructive"
                >
                    {error}
                </p>
            )}

            <Button type="submit" variant="brand" size="lg" className="w-full" disabled={!stripe || loading}>
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        <CreditCard size={20} /> {TEST_MODE ? `Verify card ($${total})` : `Pay $${total}`}
                    </>
                )}
            </Button>
        </form>
    );
};

const CheckoutModal = ({ isOpen, onClose, total }) => (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                    <Lock size={18} className="text-primary" />
                </div>
                <div>
                    <DialogTitle>Secure Checkout</DialogTitle>
                    <DialogDescription>{TEST_MODE ? 'Test mode — no charge' : 'Powered by Stripe'}</DialogDescription>
                </div>
            </DialogHeader>

            <DialogBody>
                <Elements stripe={stripePromise}>
                    <CheckoutForm total={total} onClose={onClose} />
                </Elements>

                <p className="mt-6 border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
                    Powered by <span className="font-bold text-foreground">Stripe</span>
                </p>
            </DialogBody>
        </DialogContent>
    </Dialog>
);

export default CheckoutModal;
