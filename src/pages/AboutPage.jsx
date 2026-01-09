import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, ShieldCheck, HandHeart, ArrowRight, Users, Award, Heart } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FadeInSection from '../components/ui/FadeInSection';
import GlowingCard from '../components/ui/GlowingCard';
import GradientText from '../components/ui/GradientText';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { ASSETS } from '../constants/assets';

const AboutPage = ({ openGetInvolved }) => {
    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto space-y-20">
            {/* Hero Section */}
            <FadeInSection>
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-green-800 font-medium">Our Identity</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-display leading-tight">
                        Building <GradientText gradient="brand">Bridges</GradientText>, Not Walls.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        Every member of Public Advocate is dedicated and passionate about enriching the lives of our members, their families, and the communities we represent.
                    </p>
                </div>
            </FadeInSection>

            {/* Impact Numbers */}
            <FadeInSection delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: 44, suffix: '+', label: 'Years Active', icon: Award },
                        { value: 15000, suffix: '+', label: 'Lives Touched', icon: Heart },
                        { value: 200, suffix: '+', label: 'Volunteers', icon: Users },
                        { value: 50, suffix: '+', label: 'Programs Run', icon: Target },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="relative text-center p-6 rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </FadeInSection>

            {/* Bento Grid: Mission & Pledge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Col 1: Our Mission */}
                <FadeInSection variant="left" className="md:col-span-7">
                    <GlowingCard className="h-full" glowColor="green">
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl h-full flex flex-col justify-center p-8 md:p-10 relative overflow-hidden border border-green-100 shadow-xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-yellow-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-60" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <Target size={24} className="text-green-600" />
                                    </div>
                                    <h3 className="font-bold text-2xl text-slate-900 font-display">Our Mission</h3>
                                </div>
                                <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                                    To enlighten ourselves, alongside our youth & the community. By volunteering, servicing and providing programs such as:
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Information Resource Room",
                                        "Food, Clothes, Books & Toy Drives",
                                        "Safe, Fun & Educational Events",
                                        "Health Awareness Fairs & Fundraisers",
                                        "Abuse Prevention & Counseling"
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-center gap-3 text-slate-700 font-medium bg-gradient-to-r from-green-50 to-white p-3 rounded-xl border border-green-100"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </GlowingCard>
                </FadeInSection>

                {/* Col 2: Our Pledge */}
                <FadeInSection variant="right" delay={0.2} className="md:col-span-5">
                    <GlowingCard className="h-full min-h-[450px]" glowColor="yellow">
                        <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={ASSETS.volunteerImg}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                alt="Pledge"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/50 to-transparent" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="mb-auto pt-4">
                                    <div className="w-16 h-16 rounded-2xl bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center border border-yellow-400/30">
                                        <ShieldCheck size={32} className="text-yellow-400" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold mb-4 font-display">Our Pledge</h3>
                                <p className="text-green-50/90 text-lg leading-relaxed italic border-l-4 border-yellow-400 pl-5 backdrop-blur-sm bg-black/10 rounded-r-lg py-3 pr-4">
                                    "We believe supporting the community as a whole provides opportunities to build a stronger relationship that can strengthen us all."
                                </p>
                            </div>
                        </div>
                    </GlowingCard>
                </FadeInSection>
            </div>

            {/* Full Width Banner: Get Involved */}
            <FadeInSection variant="scale">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-slate-950 isolate">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <img src={ASSETS.communityImg} className="w-full h-full object-cover opacity-20" alt="Background" />
                        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/95 to-green-900/80" />
                        {/* Gradient orbs */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-5 gap-12 p-8 md:p-12 lg:p-16 items-center">
                        {/* Text Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-xs uppercase tracking-widest">
                                <HandHeart size={14} />
                                Join the Movement
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-display">
                                Make a Difference{' '}
                                <GradientText gradient="accent" className="block">Today</GradientText>
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
                                <motion.button
                                    key={i}
                                    onClick={() => openGetInvolved(action.type)}
                                    className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 text-left transition-all backdrop-blur-sm"
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-3xl filter drop-shadow-md">{action.icon}</span>
                                        <ArrowRight className="text-white/30 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" size={18} />
                                    </div>
                                    <h4 className="font-bold text-white text-lg mb-1">{action.label}</h4>
                                    <p className="text-sm text-green-200/60 font-medium">{action.desc}</p>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </div>
    );
};

export default AboutPage;
