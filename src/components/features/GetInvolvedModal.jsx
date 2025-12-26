import React, { useState, useEffect } from 'react';
import { HandHeart, X, ArrowRight } from 'lucide-react';

const GetInvolvedModal = ({ isOpen, onClose, initialType = 'volunteer', initialEvent = '' }) => {
    const [type, setType] = useState(initialType);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        venueType: 'onsite',
        address: '',
        date: '',
        resources: {
            housing: false,
            pantry: false,
            books: false,
            toys: false,
            clothes: false
        },
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            setType(initialType);
            setFormData(prev => ({ ...prev, message: initialEvent ? `I'm interested in hosting/supporting: ${initialEvent}` : '' }));
        }
    }, [isOpen, initialType, initialEvent]);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        if (name.startsWith('resource_')) {
            const resourceName = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                resources: { ...prev.resources, [resourceName]: checked }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Get Involved: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        let body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0A%0D%0AInvolvement Type: ${type}%0D%0A`;

        if (type === 'host') {
            body += `Venue: ${formData.venueType === 'onsite' ? 'I have a venue' : 'I need a venue'}%0D%0A`;
            if (formData.venueType === 'onsite') body += `Venue Address: ${formData.address}%0D%0A`;
            body += `Preferred Date/Time: ${formData.date}%0D%0A`;
        } else if (type === 'donate') {
            const resources = Object.entries(formData.resources)
                .filter(([_, checked]) => checked)
                .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                .join(', ');
            body += `Resources Offering: ${resources}%0D%0A`;
        }

        body += `Message: ${formData.message}`;
        window.location.href = `mailto:publicadvocatessocialsociety@gmail.com?subject=${subject}&body=${body}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-green-900 p-6 flex justify-between items-center text-white">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <HandHeart className="text-yellow-400" /> Get Involved
                    </h3>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                            {['volunteer', 'donate', 'host'].map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setType(t)}
                                    className={`py-2 px-4 rounded-lg text-sm font-bold capitalize transition-all ${type === t ? 'bg-white shadow-sm text-green-800' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {t === 'host' ? 'Host Event' : t}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600 uppercase">Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500" placeholder="Your Name" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600 uppercase">Phone</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500" placeholder="(555) 555-5555" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase">Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500" placeholder="you@example.com" />
                        </div>

                        {type === 'host' && (
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4 animate-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-blue-800 uppercase">Venue Details</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="venueType" value="onsite" checked={formData.venueType === 'onsite'} onChange={handleChange} className="text-green-600 focus:ring-green-500" />
                                            I have a venue
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="venueType" value="needs" checked={formData.venueType === 'needs'} onChange={handleChange} className="text-green-600 focus:ring-green-500" />
                                            Active Search
                                        </label>
                                    </div>
                                </div>
                                {formData.venueType === 'onsite' && (
                                    <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Venue Address..." />
                                )}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-blue-800 uppercase">Preferred Date & Time</label>
                                    <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                        )}

                        {type === 'donate' && (
                            <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 space-y-3 animate-in slide-in-from-top-2">
                                <label className="text-xs font-bold text-yellow-800 uppercase block mb-2">I can donate:</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['housing', 'pantry', 'books', 'toys', 'clothes'].map(r => (
                                        <label key={r} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-yellow-100/50 p-1.5 rounded transition-colors">
                                            <input type="checkbox" name={`resource_${r}`} checked={formData.resources[r]} onChange={handleChange} className="rounded text-yellow-600 focus:ring-yellow-500" />
                                            {r.charAt(0).toUpperCase() + r.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase">Additional Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-green-500 h-24 resize-none" placeholder="Tell us more about how you'd like to help..." />
                        </div>

                        <button type="submit" className="w-full bg-green-900 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            Send Inquiry <ArrowRight size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GetInvolvedModal;
