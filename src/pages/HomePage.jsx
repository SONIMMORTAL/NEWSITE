import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Send, Users, Heart, Calendar, Baby, Target, CheckCircle2, MapPin, Coffee, Leaf } from 'lucide-react';
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
                onClick={() => document.getElementById('featured-event').scrollIntoView({ behavior: 'smooth' })}
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

        {/* Featured Event Section */}
        <section id="featured-event" className="py-16 md:py-24 px-6 bg-green-50 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 opacity-[0.03] pointer-events-none transform rotate-12">
                <Leaf size={600} className="text-green-900" />
            </div>
            <div className="absolute -bottom-20 -left-20 opacity-[0.03] pointer-events-none transform -rotate-12">
                <Leaf size={500} className="text-green-900" />
            </div>
            
            <div className="max-w-[1000px] mx-auto relative z-10">
                <FadeInSection>
                    <div className="text-center mb-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 font-bold tracking-wider uppercase text-xs mb-4 border border-green-200 shadow-sm">Upcoming Event</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-green-950 font-display mb-4">
                            COMMUNITY <GradientText gradient="brand">SOCIAL MEETING</GradientText>
                        </h2>
                        <p className="text-lg md:text-xl text-green-800/80 max-w-2xl mx-auto italic font-medium">
                            "Come connect, chat and be part of a stronger community. Everyone is welcome!"
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-4 border-white outline outline-1 outline-green-100 relative">
                        {/* Decorative corner leaves */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center opacity-50"><Leaf className="text-green-600" size={20} /></div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center opacity-50"><Leaf className="text-green-600" size={20} /></div>

                        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                            {/* Date/Time */}
                            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-600 shadow-inner">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="font-bold text-2xl text-green-900 mb-1">Thursday,<br/>May 14th</h3>
                                <div className="w-12 h-0.5 bg-green-200 my-3"></div>
                                <p className="text-green-700 font-black text-lg tracking-widest uppercase">6 PM SHARP</p>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 shadow-sm border border-green-50">
                                    <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center text-white">
                                        <MapPin size={24} />
                                    </div>
                                </div>
                                <div className="mt-8 w-full">
                                    <a 
                                        href="https://www.google.com/maps/dir/?api=1&destination=535+Utica+Ave,+Brooklyn,+NY"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-2xl text-green-900 mb-1 hover:text-green-700 hover:underline transition-colors block"
                                    >
                                        535 Utica Ave
                                    </a>
                                    <p className="text-green-600 text-sm font-medium italic mb-3">Corner of Rutland & Utica</p>
                                    <div className="w-12 h-0.5 bg-green-200 my-3 mx-auto"></div>
                                    <p className="text-green-800 font-bold">
                                        Location: <a 
                                            href="https://www.eventective.com/brooklyn-ny/qsc-event-space-791677.html" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-green-900 hover:text-green-700 hover:underline transition-colors"
                                        >
                                            QSC Event Space
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-600 shadow-inner">
                                    <Users size={32} />
                                </div>
                                <h3 className="font-bold text-xl text-green-900 mb-2 italic">Good People</h3>
                                <p className="text-green-800 font-medium mb-1">Great Conversations</p>
                                <div className="flex items-center justify-center w-full my-2">
                                    <Heart size={16} fill="currentColor" className="text-green-500" />
                                </div>
                                <p className="text-green-800 font-bold">Stronger Community</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="text-center bg-gradient-to-r from-green-100 via-green-50 to-green-100 py-4 px-6 rounded-xl border border-green-200 flex flex-col sm:flex-row items-center justify-center gap-3 w-full md:w-auto">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Coffee size={20} className="text-green-600" />
                                </div>
                                <p className="text-green-900 font-bold text-lg tracking-wide">Lite snacks will be available</p>
                            </div>
                            
                            <a 
                                href="mailto:Publicadvocatessocialsociety@gmail.com?subject=RSVP%20for%20Community%20Social%20Meeting&body=Hi%2C%0A%0AI%20would%20like%20to%20RSVP%20for%20the%20Community%20Social%20Meeting%20on%20Thursday%2C%20May%2014th.%0A%0AName%3A%0APhone%3A%0A%0AThank%20you!"
                                className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
                            >
                                <Send size={20} /> RSVP Now
                            </a>
                        </div>
                    </div>
                </FadeInSection>
            </div>
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
