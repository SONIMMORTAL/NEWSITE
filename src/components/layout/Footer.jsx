import React from 'react';
import { Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

const Footer = ({ navigate }) => (
    <footer className="bg-green-950 text-green-100 py-16 px-6 border-t border-green-900">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                    <img src={ASSETS.logo} alt="Public Advocate" className="h-16 w-auto brightness-0 invert opacity-90 transition-transform hover:scale-105" />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-white leading-none">Public</span>
                        <span className="font-bold text-lg text-white leading-none">Advocate</span>
                    </div>
                </div>
                <p className="text-sm leading-relaxed mb-6 opacity-80">
                    Enriching the lives of our members, their families, and the communities we represent in Brooklyn.
                </p>
                <div className="flex gap-3 mb-6">
                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 bg-white/5 rounded-full hover:bg-yellow-500 hover:text-green-900 transition-colors cursor-pointer flex items-center justify-center text-xs">SOC</div>)}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={10} /> Established 2012
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Quick Links</h4>
                <ul className="space-y-3 text-sm opacity-80">
                    <li><button onClick={() => navigate('home')} className="hover:text-yellow-400 transition-colors">Home</button></li>
                    <li><button onClick={() => navigate('about')} className="hover:text-yellow-400 transition-colors">About Us</button></li>
                    <li><button onClick={() => navigate('donations')} className="hover:text-yellow-400 transition-colors">Payments & Donations</button></li>
                    <li><button onClick={() => navigate('products')} className="hover:text-yellow-400 transition-colors">Products</button></li>
                    <li><button onClick={() => navigate('calendar')} className="hover:text-yellow-400 transition-colors">Monthly Activities Calendar</button></li>
                    <li><button onClick={() => navigate('food-pantry')} className="hover:text-yellow-400 transition-colors">Food Pantry</button></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Contact</h4>
                <ul className="space-y-3 text-sm opacity-80">
                    <li className="flex gap-3"><MapPin size={16} className="text-yellow-500" /> P.O Box 340491, Jamaica Queens 11434</li>
                    <li className="flex gap-3"><Phone size={16} className="text-yellow-500" /> +1 718 612 8948</li>
                    <li className="flex gap-3"><Mail size={16} className="text-yellow-500" /> Publicadvocatessocialsociety@gmail.com</li>
                </ul>
            </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-green-900 text-center text-xs opacity-60">
            <p>© {new Date().getFullYear()} Public Advocate Social Society. All Rights Reserved.</p>
        </div>
    </footer>
);

export default Footer;
