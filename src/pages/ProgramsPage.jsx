import React from 'react';
import { Briefcase, ArrowRight, Users, Trophy, Mail } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';
import { ASSETS } from '../constants/assets';

const ProgramsPage = ({ openContact }) => (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
        <SectionHeader
            pill="Core Departments"
            title="Services designed for real life."
            description="Structured support for every stage of growth, from childhood to entrepreneurship."
            align="center"
        />

        <BentoGrid>
            {/* Business Roundtable - Large Feature Card */}
            <BentoItem span={3} className="relative group overflow-hidden border-0 !p-0">
                <div className="absolute inset-0 bg-green-900 z-0">
                    <img src={ASSETS.impactImg} className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/90 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start md:items-center">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                            <Briefcase size={12} /> Economic Power
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white">Business Roundtable</h3>
                        <p className="text-green-100 text-lg leading-relaxed max-w-xl">
                            Empowering local entrepreneurs through bi-weekly strategy groups. Gain accountability, financial literacy, and marketing tools to scale your business.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {["Peer-to-Peer Accountability", "Sales Funnels", "Financial Planning"].map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white border border-white/10">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col gap-4 min-w-[200px]">
                        <button onClick={() => openContact('Business Roundtable')} className="w-full py-4 bg-yellow-400 text-green-950 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20">
                            Join Roundtable <ArrowRight size={18} />
                        </button>
                        <div className="flex items-center justify-center gap-2 text-green-200/60 text-xs font-medium">
                            <Users size={14} /> Bi-Weekly Sessions
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Kids Depo */}
            <BentoItem span={2} className="group cursor-pointer relative overflow-hidden text-white border-none" onClick={() => openContact('Kids Depo')}>
                <div className="absolute inset-0 bg-blue-900 z-0">
                    <img src={ASSETS.youthImg} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Kids Depo Background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-transparent"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                            <img src={ASSETS.youthIcon} className="w-full h-full object-cover" alt="Youth Icon" />
                        </div>
                        <span className="px-3 py-1 bg-white/20 text-white backdrop-blur-md rounded-lg text-xs font-bold border border-white/10">Ages 5-18</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Kids Depo Services</h3>
                        <p className="text-blue-100/90 mb-6 leading-relaxed max-w-md text-sm">
                            Home of <strong>DreamKids</strong> & <strong>BossyBabies</strong>. Creating rites of passage curriculums for troubled and at-risk youth.
                        </p>
                        <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                            Learn More <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Social Services */}
            <BentoItem className="group cursor-pointer relative overflow-hidden text-white border-none !bg-green-900" onClick={() => openContact('Social Services')}>
                <div className="absolute inset-0 z-0">
                    <img src={ASSETS.volunteerImg} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Social Services Background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 to-green-900/60"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden mb-4 bg-white/10 border border-white/20 shadow-lg">
                        <img src={ASSETS.socialIcon} className="w-full h-full object-cover" alt="Social Icon" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Social Services</h3>
                        <p className="text-green-50/80 text-sm leading-relaxed mb-4">
                            High-Impact Volunteerism. Neighbor to Neighbor counseling and health awareness fairs.
                        </p>
                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-green-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Sports */}
            <BentoItem className="group cursor-pointer relative overflow-hidden text-white border-none !bg-green-900" onClick={() => openContact('Sports & Rec')}>
                <div className="absolute inset-0 z-0">
                    <img src={ASSETS.heroBg} className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" alt="Sports Background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/80 to-green-900/60 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="p-3 bg-white/10 rounded-2xl w-fit mb-4 border border-white/10 backdrop-blur-sm">
                        <Trophy size={24} className="text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-50">Sports & Rec</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                            Engaging the community through safe, fun, and educational sporting events.
                        </p>
                        <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-green-900 transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Join CTA */}
            <BentoItem span={2} className="border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer" onClick={() => openContact('General Inquiry')}>
                <div className="p-4 bg-slate-50 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Mail size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Have Questions?</h3>
                <p className="text-slate-500 text-sm mb-0">Contact us directly to get involved.</p>
            </BentoItem>
        </BentoGrid>
    </div>
);

export default ProgramsPage;
