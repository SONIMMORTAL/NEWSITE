import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Users, Trophy, Mail, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FadeInSection from '../components/ui/FadeInSection';
import GlowingCard from '../components/ui/GlowingCard';
import GradientText from '../components/ui/GradientText';
import AnimatedShinyButton from '../components/ui/AnimatedShinyButton';
import { ASSETS } from '../constants/assets';

const ProgramsPage = ({ openContact }) => (
    <div className="pt-20 pb-20 px-6 max-w-[1200px] mx-auto">
        <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
                >
                    <Sparkles size={14} className="text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Core Departments</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-display">
                    Services Designed for <GradientText gradient="brand">Real Life</GradientText>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Structured support for every stage of growth, from childhood to entrepreneurship.
                </p>
            </div>
        </FadeInSection>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Business Roundtable - Full Width Feature */}
            <FadeInSection className="md:col-span-3">
                <GlowingCard glowColor="yellow" className="group">
                    <div className="relative rounded-3xl overflow-hidden bg-green-900">
                        {/* Background */}
                        <div className="absolute inset-0">
                            <img
                                src={ASSETS.impactImg}
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 scale-105 group-hover:scale-100"
                                alt="Business"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/90 to-transparent" />
                        </div>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start md:items-center">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                                    <Briefcase size={14} />
                                    Economic Power
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold text-white font-display">
                                    Business Roundtable
                                </h3>
                                <p className="text-green-100/90 text-lg leading-relaxed max-w-xl">
                                    Empowering local entrepreneurs through bi-weekly strategy groups. Gain accountability, financial literacy, and marketing tools to scale your business.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {["Peer-to-Peer Accountability", "Sales Funnels", "Financial Planning"].map((tag, i) => (
                                        <motion.span
                                            key={i}
                                            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-medium text-white border border-white/10"
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex flex-col gap-4 min-w-[220px]">
                                <AnimatedShinyButton
                                    onClick={() => openContact('Business Roundtable')}
                                    variant="primary"
                                >
                                    Join Roundtable <ArrowRight size={18} />
                                </AnimatedShinyButton>
                                <div className="flex items-center justify-center gap-2 text-green-200/60 text-xs font-medium">
                                    <Users size={14} />
                                    Bi-Weekly Sessions
                                </div>
                            </div>
                        </div>
                    </div>
                </GlowingCard>
            </FadeInSection>

            {/* Kids Depo */}
            <FadeInSection delay={0.1} className="md:col-span-2">
                <GlowingCard glowColor="blue" onClick={() => openContact('Kids Depo')} className="h-full group cursor-pointer">
                    <div className="relative h-full min-h-[320px] rounded-3xl overflow-hidden bg-blue-900">
                        <div className="absolute inset-0">
                            <img
                                src={ASSETS.youthImg}
                                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                                alt="Kids Depo"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-transparent" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between p-8">
                            <div className="flex justify-between items-start">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                                    <img src={ASSETS.youthIcon} className="w-full h-full object-cover" alt="Youth Icon" />
                                </div>
                                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                                    Ages 5-18
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 font-display">Kids Depo Services</h3>
                                <p className="text-blue-100/90 mb-4 leading-relaxed text-sm max-w-md">
                                    Home of <strong>DreamKids</strong> & <strong>BossyBabies</strong>. Creating rites of passage curriculums for troubled and at-risk youth.
                                </p>

                                <div onClick={(e) => e.stopPropagation()} className="relative z-20 mb-4">
                                    <a
                                        href="https://citypopfundraising.com/collections/citypop-snacks?bg_ref=GiNqP3t7tU"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-5 py-2.5 bg-yellow-400 text-blue-900 rounded-xl font-bold hover:bg-yellow-300 transition-colors shadow-lg text-sm"
                                    >
                                        Support Our Fundraiser
                                    </a>
                                </div>

                                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    Learn More <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </GlowingCard>
            </FadeInSection>

            {/* Social Services */}
            <FadeInSection delay={0.2}>
                <GlowingCard glowColor="green" onClick={() => openContact('Social Services')} className="h-full group cursor-pointer">
                    <div className="relative h-full min-h-[320px] rounded-3xl overflow-hidden bg-green-900">
                        <div className="absolute inset-0">
                            <img
                                src={ASSETS.volunteerImg}
                                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                                alt="Social Services"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 to-green-900/60" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between p-6">
                            <div className="h-14 w-14 rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-lg">
                                <img src={ASSETS.socialIcon} className="w-full h-full object-cover" alt="Social Icon" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 font-display">Social Services</h3>
                                <p className="text-green-50/80 text-sm leading-relaxed mb-4">
                                    High-Impact Volunteerism. Neighbor to Neighbor counseling and health awareness fairs.
                                </p>
                                <motion.div
                                    className="w-10 h-10 rounded-full bg-yellow-400 text-green-900 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <ArrowRight size={16} />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </GlowingCard>
            </FadeInSection>

            {/* Sports & Rec */}
            <FadeInSection delay={0.3}>
                <GlowingCard glowColor="yellow" onClick={() => openContact('Sports & Rec')} className="h-full group cursor-pointer">
                    <div className="relative h-full min-h-[280px] rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-900 to-green-900">
                        <div className="absolute inset-0">
                            <img
                                src={ASSETS.heroBg}
                                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                                alt="Sports"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/80 to-green-900/60 mix-blend-multiply" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between p-6">
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl w-fit border border-white/10">
                                <Trophy size={24} className="text-yellow-400" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-yellow-50 mb-2 font-display">Sports & Rec</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    Engaging the community through safe, fun, and educational sporting events.
                                </p>
                                <motion.div
                                    className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-green-900 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <ArrowRight size={16} />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </GlowingCard>
            </FadeInSection>

            {/* Contact CTA */}
            <FadeInSection delay={0.4} className="md:col-span-2">
                <motion.div
                    onClick={() => openContact('General Inquiry')}
                    className="h-full min-h-[200px] border-2 border-dashed border-slate-200 hover:border-green-400 rounded-3xl flex flex-col items-center justify-center text-center p-8 cursor-pointer bg-white hover:bg-green-50/50 transition-all"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="p-4 bg-slate-100 rounded-2xl mb-4">
                        <Mail size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Have Questions?</h3>
                    <p className="text-slate-500 text-sm">Contact us directly to get involved.</p>
                </motion.div>
            </FadeInSection>
        </div>
    </div>
);

export default ProgramsPage;
