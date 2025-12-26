import React from 'react';
import { Target, CheckCircle2, ShieldCheck, HandHeart, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import { ASSETS } from '../constants/assets';

const AboutPage = ({ openGetInvolved }) => {
    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto space-y-16">
            <SectionHeader
                pill="Our Identity"
                title="Building Bridges, not Walls."
                description="Every member of Public Advocate is dedicated and passionate about enriching the lives of our members, their families, and the communities we represent. In helping build bridges between community residents, leaders, and businesses, we strengthen us all."
                align="center"
            />

            {/* Bento Grid: Mission & Pledge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Col 1: Our Mission (Span 7 - Wider text area) */}
                <GlassCard className="md:col-span-7 h-full bg-white/80 border-green-100 flex flex-col justify-center p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                    <div className="relative z-10">
                        <h3 className="font-black text-3xl text-green-900 mb-6 flex items-center gap-3">
                            <Target size={32} className="text-yellow-600" /> Our Mission
                        </h3>
                        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                            To enlighten ourselves, alongside our youth & the community. By volunteering, servicing and providing programs such as:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Information Resource Room",
                                "Food, Clothes, Books & Toy Drives",
                                "Safe, Fun & Educational Events",
                                "Health Awareness Fairs & Fundraisers",
                                "Abuse Prevention & Counseling"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold bg-white/50 p-2 rounded-lg border border-green-50 shadow-sm">
                                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </GlassCard>

                {/* Col 2: Our Pledge (Span 5 - Visual Focus) */}
                <div className="md:col-span-5 relative group h-full min-h-[450px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                    <img src={ASSETS.volunteerImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Pledge" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/40 to-transparent mix-blend-multiply opacity-90" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <div className="mb-auto pt-4">
                            <ShieldCheck size={56} className="text-yellow-400 drop-shadow-lg" />
                        </div>
                        <h3 className="text-3xl font-black mb-6 leading-tight">Our Pledge</h3>
                        <p className="text-green-50 text-xl leading-relaxed italic font-serif border-l-4 border-yellow-400 pl-6 backdrop-blur-sm">
                            "We believe supporting the community as a whole provides opportunities to build a stronger relationship that can strengthen us all."
                        </p>
                    </div>
                </div>
            </div>

            {/* Full Width Banner: Get Involved */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-green-950 isolate">
                {/* Background Decoration */}
                <div className="absolute inset-0">
                    <img src={ASSETS.communityImg} className="w-full h-full object-cover opacity-20" alt="Background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/95 to-green-900/80" />
                </div>

                <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-5 gap-12 p-8 md:p-12 lg:p-16 items-center">
                    {/* Text Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-xs uppercase tracking-widest">
                            <HandHeart size={14} /> Join the Movement
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Make a Difference <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">Today</span>
                        </h2>
                        <p className="text-lg text-green-100/80 leading-relaxed">
                            Your support fuels our mission. Whether it's time, resources, or a venue—every contribution helps us build a stronger community together.
                        </p>
                    </div>

                    {/* Action Cards Grid */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Donate to Resource Room", icon: "🏠", type: "donate", desc: "Housing & Pantry items" },
                            { label: "Host a Safe Event", icon: "🎉", type: "host", desc: "Venues or planning" },
                            { label: "Community Drives", icon: "🧸", type: "donate", desc: "Food, clothes, toys" },
                            { label: "Volunteer Counseling", icon: "🤝", type: "volunteer", desc: "Support services" }
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => openGetInvolved(action.type)}
                                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 text-left transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-3xl filter drop-shadow-md">{action.icon}</span>
                                    <ArrowRight className="text-white/40 group-hover:text-yellow-400 transition-colors" size={20} />
                                </div>
                                <h4 className="font-bold text-white text-lg mb-1">{action.label}</h4>
                                <p className="text-sm text-green-200/60 font-medium">{action.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
