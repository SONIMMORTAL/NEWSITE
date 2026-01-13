import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Baby, Briefcase, HandHeart, Sparkles } from 'lucide-react';
import FadeInSection from '../components/ui/FadeInSection';
import GlowingCard from '../components/ui/GlowingCard';
import GradientText from '../components/ui/GradientText';
import AnimatedShinyButton from '../components/ui/AnimatedShinyButton';
import { ASSETS } from '../constants/assets';

const OurWorkPage = ({ navigate, openGetInvolved }) => (
    <div className="pt-20 pb-20">
        {/* Hero Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-20">
            <FadeInSection>
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
                    >
                        <Sparkles size={14} className="text-green-600" />
                        <span className="text-sm text-green-800 font-medium">Our Work</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-display leading-tight">
                        The Three <GradientText gradient="brand">Pillars</GradientText>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        A focused approach to building a stronger community through social services, youth programs, and economic empowerment.
                    </p>
                </div>
            </FadeInSection>
        </section>

        {/* Three Pillars Section */}
        <section className="px-6 bg-gradient-to-b from-white via-slate-50 to-white py-20 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1200px] mx-auto relative">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Pillar 1: Social Services */}
                    <FadeInSection delay={0.1}>
                        <GlowingCard
                            className="group h-full"
                            glowColor="yellow"
                            onClick={() => navigate('food-pantry')}
                        >
                            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src={ASSETS.socialIcon}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.6]"
                                    alt="Social Services"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-green-950/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-yellow-400/30">
                                        <Utensils className="text-yellow-400" size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-display">Social Services</h3>
                                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                                        Combating food insecurity with dignity. Providing fresh produce and essentials to families in need.
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                        Visit Pantry <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </GlowingCard>
                    </FadeInSection>

                    {/* Pillar 2: Youth & Education */}
                    <FadeInSection delay={0.2}>
                        <GlowingCard
                            className="group h-full"
                            glowColor="green"
                            onClick={() => navigate('programs')}
                        >
                            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src={ASSETS.youthIcon}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.6]"
                                    alt="Youth"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-green-950/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-400/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-green-400/30">
                                        <Baby className="text-green-400" size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-display">Youth & Education</h3>
                                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                                        Kids Depo: A safe haven for mentorship, tutoring, and rites of passage curriculums.
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-green-400 font-bold text-sm group-hover:gap-3 transition-all">
                                        See Programs <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </GlowingCard>
                    </FadeInSection>

                    {/* Pillar 3: Economic Development */}
                    <FadeInSection delay={0.3}>
                        <GlowingCard
                            className="group h-full"
                            glowColor="yellow"
                            onClick={() => navigate('programs')}
                        >
                            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src={ASSETS.impactImg}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.6]"
                                    alt="Business"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-green-950/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-yellow-400/30">
                                        <Briefcase className="text-yellow-400" size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-display">Economic Power</h3>
                                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                                        Business Roundtables: Strategy, networking, and advocacy for local entrepreneurs.
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                        Join Roundtable <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </GlowingCard>
                    </FadeInSection>
                </div>
            </div>
        </section>

        {/* Make a Difference Section */}
        <section className="px-6 py-20">
            <div className="max-w-[1200px] mx-auto">
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

                        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 p-6 md:p-12 lg:p-16 items-center">
                            {/* Text Section */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-xs uppercase tracking-widest">
                                    <HandHeart size={14} />
                                    Join the Movement
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-display">
                                    Make a Difference{' '}
                                    <GradientText gradient="accent" className="block">Today</GradientText>
                                </h2>
                                <p className="text-base md:text-lg text-green-100/80 leading-relaxed">
                                    Your support fuels our mission. Whether it's time, resources, or a venue—every contribution helps us build a stronger community together.
                                </p>
                            </div>

                            {/* Action Cards Grid */}
                            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                {[
                                    { label: "Donate to Resource Room", icon: "🏠", type: "donate", desc: "Housing & Pantry items" },
                                    { label: "Host a Safe Event", icon: "🎉", type: "host", desc: "Venues or planning" },
                                    { label: "Community Drives", icon: "🧸", type: "donate", desc: "Food, clothes, toys" },
                                    { label: "Volunteer Counseling", icon: "🤝", type: "volunteer", desc: "Support services" }
                                ].map((action, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => openGetInvolved(action.type)}
                                        className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 md:p-5 text-left transition-all backdrop-blur-sm"
                                        whileHover={{ y: -3, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-start justify-between mb-2 md:mb-3">
                                            <span className="text-2xl md:text-3xl filter drop-shadow-md">{action.icon}</span>
                                            <ArrowRight className="text-white/30 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" size={16} />
                                        </div>
                                        <h4 className="font-bold text-white text-base md:text-lg mb-1">{action.label}</h4>
                                        <p className="text-xs md:text-sm text-green-200/60 font-medium">{action.desc}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    </div>
);

export default OurWorkPage;
