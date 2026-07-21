import React, { useState, useEffect, useId } from 'react';
import { Mail, Send } from 'lucide-react';
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
import { Select } from '../ui/select';
import { SITE } from '../../config/site';

const SUBJECTS = [
    'Getting Involved',
    'Business Roundtable',
    'Kids Depo Programs',
    'Donation Inquiry',
    'Other',
];

const ContactModal = ({ isOpen, onClose, initialSubject = 'Getting Involved' }) => {
    const id = useId();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: initialSubject,
        message: '',
    });

    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({ ...prev, subject: initialSubject }));
        }
    }, [isOpen, initialSubject]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
            formData.subject
        )}&body=${encodeURIComponent(body)}`;
        onClose();
    };

    const set = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                        <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                        <DialogTitle>Get Involved</DialogTitle>
                        <DialogDescription>Send us a message</DialogDescription>
                    </div>
                </DialogHeader>

                <DialogBody>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor={`${id}-name`}>Your Name</Label>
                            <Input
                                id={`${id}-name`}
                                required
                                autoComplete="name"
                                className="bg-muted/50"
                                value={formData.name}
                                onChange={set('name')}
                            />
                        </div>

                        <div>
                            <Label htmlFor={`${id}-email`}>Email Address</Label>
                            <Input
                                id={`${id}-email`}
                                type="email"
                                required
                                autoComplete="email"
                                className="bg-muted/50"
                                value={formData.email}
                                onChange={set('email')}
                            />
                        </div>

                        <div>
                            <Label htmlFor={`${id}-subject`}>Subject</Label>
                            <Select id={`${id}-subject`} value={formData.subject} onChange={set('subject')}>
                                {SUBJECTS.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor={`${id}-message`}>Message</Label>
                            <Textarea
                                id={`${id}-message`}
                                required
                                rows={4}
                                value={formData.message}
                                onChange={set('message')}
                            />
                        </div>

                        <Button type="submit" variant="brand" size="lg" className="w-full">
                            <Send size={18} /> Send Message
                        </Button>

                        <p className="text-center text-[11px] text-muted-foreground">
                            This will open your default email client to send the message.
                        </p>
                    </form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
};

export default ContactModal;
