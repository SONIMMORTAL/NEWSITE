import React from 'react';
import { ArrowRight, ChevronDown, Utensils, Baby, Briefcase, Send } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { ASSETS } from '../constants/assets';

const HomePage = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        {/* Modern Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-start overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={ASSETS.heroBg} alt="Community Impact" className="w-full h-full object-cover brightness-[0.4]" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
                <div className="max-w-xl space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                        Advocating for <span className="text-yellow-400">Unity</span> & <span className="text-yellow-400">Change</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
                        We are dedicated to enriching the lives of our members, their families, and the Brooklyn community through social services, youth programs, and advocacy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => navigate('programs')}
                            className="px-8 py-4 bg-yellow-400 text-green-950 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2"
                        >
                            Our Impact <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate('volunteer')}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-green-950 transition-all flex items-center justify-center gap-2"
                        >
                            Get Involved
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                onClick={() => document.getElementById('our-work').scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce cursor-pointer hover:text-white transition-colors"
            >
                <ChevronDown size={32} />
            </div>
        </section>

        {/* Impact Pillars Section */}
        <section id="our-work" className="py-24 px-6 bg-white relative">
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader pill="Our Work" title="The Three Pillars" description="A focused approach to building a stronger community." align="center" />

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {/* Pillar 1: Social Services */}
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => navigate('food-pantry')}>
                        <div className="aspect-[4/5] relative">
                            <img src={ASSETS.socialIcon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" alt="Social Services" />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <Utensils className="text-yellow-400 mb-4" size={32} />
                                <h3 className="text-2xl font-bold mb-2">Social Services</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">Combating food insecurity with dignity. Providing fresh produce and essentials to families in need.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    Visit Pantry <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2: Youth & Education */}
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => navigate('programs')}>
                        <div className="aspect-[4/5] relative">
                            <img src={ASSETS.youthIcon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" alt="Youth" />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <Baby className="text-yellow-400 mb-4" size={32} />
                                <h3 className="text-2xl font-bold mb-2">Youth & Education</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">Kids Depo: A safe haven for mentorship, tutoring, and rites of passage curriculums.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    See Programs <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3: Economic Development */}
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => navigate('programs')}>
                        <div className="aspect-[4/5] relative">
                            <img src={ASSETS.impactImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" alt="Business" />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <Briefcase className="text-yellow-400 mb-4" size={32} />
                                <h3 className="text-2xl font-bold mb-2">Economic Power</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">Business Roundtables: Strategy, networking, and advocacy for local entrepreneurs.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    Join Roundtable <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Pre-Footer Newsletter CTA */}
        <section className="py-20 px-6 bg-slate-900 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-900/20 z-0"></div>
            <div className="max-w-[800px] mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Get Our Latest Updates</h2>
                <p className="text-slate-400 mb-8">Stay connected with Public Advocate Social Society. Receive news on drives, events, and community stories.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input type="email" placeholder="Email Address" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 transition-colors" />
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <Send size={18} /> Subscribe
                    </button>
                </div>
            </div>
        </section>
    </div>
);

export default HomePage;
