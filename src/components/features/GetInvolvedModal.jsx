import React, { useState, useEffect, useId } from 'react';
import { HandHeart, ArrowRight } from 'lucide-react';
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
import { Textarea } from '../ui/textarea';
import { cn } from '../../lib/utils';
import { SITE } from '../../config/site';

const TYPES = [
    { key: 'volunteer', label: 'Volunteer' },
    { key: 'donate', label: 'Donate' },
    { key: 'host', label: 'Host Event' },
];

const RESOURCES = ['housing', 'pantry', 'books', 'toys', 'clothes'];

const GetInvolvedModal = ({ isOpen, onClose, initialType = 'volunteer', initialEvent = '' }) => {
    const id = useId();
    const [type, setType] = useState(initialType);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        venueType: 'onsite',
        address: '',
        date: '',
        resources: { housing: false, pantry: false, books: false, toys: false, clothes: false },
        message: '',
    });

    useEffect(() => {
        if (isOpen) {
            setType(initialType);
            setFormData((prev) => ({
                ...prev,
                message: initialEvent ? `I'm interested in hosting/supporting: ${initialEvent}` : '',
            }));
        }
    }, [isOpen, initialType, initialEvent]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name.startsWith('resource_')) {
            const resourceName = name.split('_')[1];
            setFormData((prev) => ({
                ...prev,
                resources: { ...prev.resources, [resourceName]: checked },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Get Involved: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        const lines = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Phone: ${formData.phone}`,
            '',
            `Involvement Type: ${type}`,
        ];

        if (type === 'host') {
            lines.push(`Venue: ${formData.venueType === 'onsite' ? 'I have a venue' : 'I need a venue'}`);
            if (formData.venueType === 'onsite') lines.push(`Venue Address: ${formData.address}`);
            lines.push(`Preferred Date/Time: ${formData.date}`);
        } else if (type === 'donate') {
            const resources = Object.entries(formData.resources)
                .filter(([, checked]) => checked)
                .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                .join(', ');
            lines.push(`Resources Offering: ${resources}`);
        }

        lines.push(`Message: ${formData.message}`);

        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(lines.join('\n'))}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                        <HandHeart size={20} className="text-primary" />
                    </div>
                    <div>
                        <DialogTitle>Get Involved</DialogTitle>
                        <DialogDescription>Volunteer, donate, or host an event</DialogDescription>
                    </div>
                </DialogHeader>

                <DialogBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Involvement type switcher */}
                        <div
                            role="tablist"
                            aria-label="Type of involvement"
                            className="mb-6 grid grid-cols-3 gap-1 rounded-xl bg-muted p-1"
                        >
                            {TYPES.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={type === t.key}
                                    onClick={() => setType(t.key)}
                                    className={cn(
                                        'rounded-lg px-3 py-2 text-sm font-bold transition-all',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                        type === t.key
                                            ? 'bg-card text-brand shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor={`${id}-name`}>Name</Label>
                                <Input
                                    id={`${id}-name`}
                                    required
                                    name="name"
                                    autoComplete="name"
                                    className="bg-muted/50"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`${id}-phone`}>Phone</Label>
                                <Input
                                    id={`${id}-phone`}
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    className="bg-muted/50"
                                    placeholder="(555) 555-5555"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor={`${id}-email`}>Email</Label>
                            <Input
                                id={`${id}-email`}
                                required
                                type="email"
                                name="email"
                                autoComplete="email"
                                className="bg-muted/50"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {type === 'host' && (
                            <fieldset className="space-y-4 rounded-xl border border-border bg-secondary/40 p-4">
                                <legend className="px-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                                    Venue Details
                                </legend>

                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { value: 'onsite', label: 'I have a venue' },
                                        { value: 'needs', label: 'Active search' },
                                    ].map((opt) => (
                                        <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="venueType"
                                                value={opt.value}
                                                checked={formData.venueType === opt.value}
                                                onChange={handleChange}
                                                className="accent-primary"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>

                                {formData.venueType === 'onsite' && (
                                    <div>
                                        <Label htmlFor={`${id}-address`}>Venue Address</Label>
                                        <Input
                                            id={`${id}-address`}
                                            name="address"
                                            placeholder="Venue address…"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor={`${id}-date`}>Preferred Date &amp; Time</Label>
                                    <Input
                                        id={`${id}-date`}
                                        type="datetime-local"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </fieldset>
                        )}

                        {type === 'donate' && (
                            <fieldset className="rounded-xl border border-primary/30 bg-primary/10 p-4">
                                <legend className="px-1 text-xs font-bold uppercase tracking-wider text-foreground">
                                    I can donate
                                </legend>
                                <div className="mt-2 grid grid-cols-2 gap-1">
                                    {RESOURCES.map((r) => (
                                        <label
                                            key={r}
                                            className="flex cursor-pointer items-center gap-2 rounded p-1.5 text-sm capitalize text-foreground transition-colors hover:bg-primary/10"
                                        >
                                            <input
                                                type="checkbox"
                                                name={`resource_${r}`}
                                                checked={formData.resources[r]}
                                                onChange={handleChange}
                                                className="accent-primary"
                                            />
                                            {r}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        )}

                        <div>
                            <Label htmlFor={`${id}-message`}>Additional Message</Label>
                            <Textarea
                                id={`${id}-message`}
                                name="message"
                                placeholder="Tell us more about how you'd like to help…"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <Button type="submit" variant="brand" size="lg" className="w-full">
                            Send Inquiry <ArrowRight size={18} />
                        </Button>
                    </form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
};

export default GetInvolvedModal;
