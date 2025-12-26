import React from 'react';
import { Heart, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const DonationsPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-[800px] mx-auto">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-yellow-600 fill-current animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-green-900 mb-4">Make a Donation</h1>
            <p className="text-slate-500 mb-10 max-w-md mx-auto">
                Your contribution directly funds our food pantry, youth cohorts, and community workshops.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {['$25', '$50', '$100'].map((amt) => (
                    <button key={amt} className="py-4 rounded-xl border-2 border-green-100 font-bold text-xl text-green-800 hover:border-green-600 hover:bg-green-50 transition-colors">
                        {amt}
                    </button>
                ))}
            </div>

            <div className="space-y-4 mb-8">
                <input type="number" placeholder="Enter Custom Amount" className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-green-600 text-center text-lg font-medium" />
                <button className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <CreditCard size={20} /> Donate Securely
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

export default DonationsPage;
