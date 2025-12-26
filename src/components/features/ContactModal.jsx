import React, { useState, useEffect } from 'react';
import { Mail, X, Send } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, initialSubject = 'Getting Involved' }) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: initialSubject, message: '' });

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, subject: initialSubject }));
        }
    }, [isOpen, initialSubject]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:publicadvocatessocialsociety@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-green-950/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-green-100">
                <div className="bg-green-900 p-6 flex justify-between items-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/10" />
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                            <Mail size={20} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">Get Involved</h3>
                            <p className="text-green-100 text-xs">Send us a message</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Your Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Subject</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            >
                                <option>Getting Involved</option>
                                <option>Business Roundtable</option>
                                <option>Kids Depo Programs</option>
                                <option>Donation Inquiry</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Message</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all resize-none"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-base hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <Send size={18} /> Send Message
                    </button>
                    <p className="text-center text-[10px] text-slate-400">
                        This will open your default email client to send the message.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
