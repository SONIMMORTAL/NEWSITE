import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Phone, Mail, ExternalLink, Heart } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

const Footer = ({ navigate }) => {
    const quickLinks = [
        { label: 'Home', page: 'home' },
        { label: 'About Us', page: 'about' },
        { label: 'Payments & Donations', page: 'donations' },
        { label: 'Products', page: 'products' },
        { label: 'Monthly Calendar', page: 'calendar' },
        { label: 'Food Pantry', page: 'food-pantry' },
    ];

    const socialLinks = [
        { icon: '𝕏', label: 'Twitter' },
        { icon: 'f', label: 'Facebook' },
        { icon: 'in', label: 'Instagram' },
    ];

    return (
        <footer className="relative bg-slate-950 text-slate-300 pt-20 pb-8 px-6 overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Main Grid */}
                <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <motion.div
                            className="flex items-center gap-3 mb-6 group cursor-pointer"
                            onClick={() => navigate('home')}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={ASSETS.logo}
                                alt="Public Advocate"
                                className="h-14 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-white leading-tight">Public</span>
                                <span className="font-bold text-lg text-white leading-tight">Advocate</span>
                            </div>
                        </motion.div>

                        <p className="text-sm leading-relaxed mb-6 text-slate-400">
                            Enriching the lives of our members, their families, and the communities we represent in Brooklyn.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-6">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-white/5 hover:bg-yellow-500 border border-white/10 hover:border-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-slate-400 hover:text-slate-900 transition-all duration-300"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={12} />
                            Est. 1980
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <motion.button
                                        onClick={() => navigate(link.page)}
                                        className="group flex items-center gap-2 text-sm text-slate-400 hover:text-yellow-400 transition-colors"
                                        whileHover={{ x: 3 }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-yellow-400 transition-colors" />
                                        {link.label}
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-sm">
                                <MapPin size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                                <span className="text-slate-400">P.O Box 340491, Jamaica Queens 11434</span>
                            </li>
                            <li className="flex gap-3 text-sm">
                                <Phone size={18} className="text-yellow-500 shrink-0" />
                                <a href="tel:+17186128948" className="text-slate-400 hover:text-yellow-400 transition-colors">
                                    +1 718 612 8948
                                </a>
                            </li>
                            <li className="flex gap-3 text-sm">
                                <Mail size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                                <a href="mailto:Publicadvocatessocialsociety@gmail.com" className="text-slate-400 hover:text-yellow-400 transition-colors break-all">
                                    Publicadvocatessocialsociety@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Mini */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Stay Updated</h4>
                        <p className="text-sm text-slate-400 mb-4">
                            Get community news and event updates.
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Public Advocate Social Society. All Rights Reserved.
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-500" /> in Brooklyn
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
