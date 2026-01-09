import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Send, Users, Heart, Calendar, Baby, Target, CheckCircle2 } from 'lucide-react';
import AnimatedShinyButton from '../components/ui/AnimatedShinyButton';
import GradientText from '../components/ui/GradientText';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import FadeInSection from '../components/ui/FadeInSection';
import Spotlight from '../components/ui/Spotlight';
import { ASSETS } from '../constants/assets';

const HomePage = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        {/* Premium Hero Section with Spotlight */}
        <section className="relative h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-start overflow-hidden bg-slate-950">
            {/* Background Image with enhanced overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={ASSETS.heroBg}
                    alt="Community Impact"
                    className="w-full h-full object-cover brightness-[0.3] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-950/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Spotlight Effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="rgba(250, 204, 21, 0.15)"
            />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
                <motion.div
                    className="max-w-2xl space-y-6 md:space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs md:text-sm text-white/80 font-medium">Serving Brooklyn Since 1980</span>
                    </motion.div>

                    {/* Main Headline with Gradient */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight font-display">
                        Advocating for{' '}
                        <GradientText gradient="accent" className="block md:inline">
                            Unity
                        </GradientText>
                        {' '}&{' '}
                        <GradientText gradient="accent">
                            Change
                        </GradientText>
                    </h1>

                    <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                        We are dedicated to enriching the lives of our members, their families, and the Brooklyn community through social services, youth programs, and advocacy.
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <AnimatedShinyButton
                            onClick={() => navigate('our-work')}
                            variant="primary"
                        >
                            Our Impact <ArrowRight size={20} />
                        </AnimatedShinyButton>

                        <AnimatedShinyButton
                            onClick={() => navigate('programs')}
                            variant="outline"
                        >
                            Get Involved
                        </AnimatedShinyButton>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1 },
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
                <div className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown size={24} />
                </div>
            </motion.div>
        </section>

        {/* About Section - Building Bridges */}
        <section id="about-section" className="py-16 md:py-24 px-6 bg-white relative">
            <div className="max-w-[1200px] mx-auto">
                <FadeInSection>
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 font-display">
                            Building <GradientText gradient="brand">Bridges</GradientText>, Not Walls.
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                            Every member of Public Advocate is dedicated and passionate about enriching the lives of our members, their families, and the communities we represent.
                        </p>
                    </div>
                </FadeInSection>

                {/* Impact Stats */}
                <FadeInSection delay={0.2}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                        {[
                            { value: 44, suffix: '+', label: 'Years Active', icon: Calendar },
                            { value: 15000, suffix: '+', label: 'Lives Touched', icon: Heart },
                            { value: 200, suffix: '+', label: 'Volunteers', icon: Users },
                            { value: 50, suffix: '+', label: 'Programs Run', icon: Target },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-lg border border-slate-100"
                                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            >
                                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-2 md:mb-3" />
                                <div className="text-2xl md:text-4xl font-bold text-green-950 mb-1 md:mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-slate-600 text-xs md:text-sm font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeInSection>

                {/* Mission Statement */}
                <FadeInSection delay={0.3}>
                    <div className="bg-white rounded-3xl border border-green-100 shadow-xl p-6 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-green-100 to-yellow-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-60" />
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-4 md:mb-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <Target size={20} className="text-green-600" />
                                    </div>
                                    <h3 className="font-bold text-xl md:text-2xl text-slate-900 font-display">Our Mission</h3>
                                </div>
                                <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
                                    To enlighten ourselves, alongside our youth & the community. By volunteering, servicing and providing programs such as:
                                </p>
                                <div className="grid grid-cols-1 gap-2 md:gap-3">
                                    {[
                                        "Information Resource Room",
                                        "Food, Clothes, Books & Toy Drives",
                                        "Safe, Fun & Educational Events",
                                        "Health Awareness Fairs & Fundraisers",
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-center gap-3 text-slate-700 font-medium bg-gradient-to-r from-green-50 to-white p-2 md:p-3 rounded-xl border border-green-100"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                                            <span className="text-xs md:text-sm">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <img
                                    src={ASSETS.volunteerImg}
                                    alt="Our Mission"
                                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>

        {/* Pre-Footer Newsletter CTA with Glass Effect */}
        <section className="py-16 md:py-24 px-6 bg-slate-950 relative overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-green-600/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-yellow-500/20 rounded-full blur-3xl" />
            </div>

            <FadeInSection>
                <div className="max-w-[800px] mx-auto text-center relative z-10">
                    <motion.div
                        className="glass p-8 md:p-12 rounded-3xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-display">
                            Get Our <GradientText gradient="accent">Latest Updates</GradientText>
                        </h2>
                        <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-lg">
                            Stay connected with Public Advocate Social Society. Receive news on drives, events, and community stories.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 md:px-5 py-3 md:py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400/50 focus:bg-white/15 transition-all text-sm md:text-base"
                            />
                            <AnimatedShinyButton variant="primary" className="shrink-0">
                                <Send size={18} /> Subscribe
                            </AnimatedShinyButton>
                        </div>
                    </motion.div>
                </div>
            </FadeInSection>
        </section>
    </div>
);

export default HomePage;
