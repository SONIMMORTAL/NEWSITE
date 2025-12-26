import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
            <div className="bg-white border-l-4 border-green-600 rounded-lg shadow-2xl p-4 flex items-center gap-3 pr-10 relative">
                <CheckCircle2 className="text-green-600" size={24} />
                <div>
                    <h4 className="font-bold text-green-900 text-sm">Success</h4>
                    <p className="text-slate-600 text-xs">{message}</p>
                </div>
                <button onClick={onClose} className="absolute top-2 right-2 text-slate-300 hover:text-slate-500">
                    <X size={14} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
