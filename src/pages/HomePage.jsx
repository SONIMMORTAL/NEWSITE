import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Send, Users, Heart, Calendar, Target, CheckCircle2, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import GradientText from '../components/ui/GradientText';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import FadeInSection from '../components/ui/FadeInSection';
import Spotlight from '../components/ui/Spotlight';
import ProgramsPreview from '../components/sections/ProgramsPreview';
import EventsPreview from '../components/sections/EventsPreview';
import GetHelpBand from '../components/sections/GetHelpBand';
import DonateCta from '../components/sections/DonateCta';
import { ASSETS } from '../constants/assets';

const STATS = [
    { value: 44, suffix: '+', label: 'Years Active', icon: Calendar },
    { value: 15000, suffix: '+', label: 'Lives Touched', icon: Heart },
    { value: 200, suffix: '+', label: 'Volunteers', icon: Users },
    { value: 50, suffix: '+', label: 'Programs Run', icon: Target },
];

const MISSION_ITEMS = [
    'Information Resource Room',
    'Food, Clothes, Books & Toy Drives',
    'Safe, Fun & Educational Events',
    'Health Awareness Fairs & Fundraisers',
];

const HomePage = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        // TODO(phase-2): wire to the newsletter endpoint. For now, acknowledge.
        setSubscribed(true);
        setEmail('');
    };

    return (
        <div className="animate-in fade-in duration-700">
            {/* ---------- Hero ---------- */}
            {/* pt offsets the fixed navbar so the centered content is optically
                centered in the *visible* area, not the full section box. */}
            <section className="relative flex min-h-[600px] items-center overflow-hidden bg-brand pt-24 md:min-h-[720px] md:pt-28">
                {/* Photography as the star, graded rather than crushed */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={ASSETS.heroBg}
                        alt=""
                        aria-hidden
                        width={1920}
                        height={815}
                        fetchPriority="high"
                        decoding="async"
                        className="h-full w-full scale-105 object-cover brightness-[0.42]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/70 to-brand/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-transparent to-transparent" />
                </div>

                {/* One signature light source — the only decorative effect in the hero */}
                <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="hsl(48 96% 53% / 0.14)" />

                <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
                    <motion.div
                        className="max-w-2xl space-y-7"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <h1 className="font-display text-display-lg font-bold text-white">
                            Advocating for{' '}
                            <GradientText gradient="accent" className="block md:inline">Unity</GradientText>
                            {' '}&{' '}
                            <GradientText gradient="accent">Change</GradientText>
                        </h1>

                        <p className="max-w-xl text-lg font-light leading-relaxed text-white/80">
                            We are dedicated to enriching the lives of our members, their families, and the
                            Brooklyn community through social services, youth programs, and advocacy.
                        </p>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            <Button size="lg" shine onClick={() => navigate('our-work')}>
                                Our Impact <ArrowRight />
                            </Button>
                            <Button size="lg" variant="outline-inverse" onClick={() => navigate('programs')}>
                                Get Involved
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.button
                    type="button"
                    onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/50 transition-colors hover:text-white md:bottom-10"
                    aria-label="Scroll to content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ opacity: { delay: 0.9 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <ChevronDown size={24} />
                    </div>
                </motion.button>
            </section>

            {/* ---------- About + Impact ---------- */}
            <section id="about-section" className="bg-background px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1200px]">
                    <FadeInSection>
                        <div className="mx-auto mb-14 max-w-3xl text-center">
                            <h2 className="mb-5 font-display text-display-md font-bold text-foreground">
                                Building <GradientText gradient="brand">Bridges</GradientText>, Not Walls.
                            </h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                Every member of Public Advocate is dedicated and passionate about enriching the
                                lives of our members, their families, and the communities we represent.
                            </p>
                        </div>
                    </FadeInSection>

                    <FadeInSection delay={0.15}>
                        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                            {STATS.map((stat) => (
                                <Card
                                    key={stat.label}
                                    className="p-6 text-center transition-transform duration-200 hover:-translate-y-1"
                                >
                                    <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                                    <div className="mb-1 font-display text-3xl font-bold text-brand md:text-4xl">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                </Card>
                            ))}
                        </div>
                    </FadeInSection>

                    <FadeInSection delay={0.2}>
                        <Card className="relative overflow-hidden p-6 md:p-10">
                            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                            <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
                                <div>
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                                            <Target size={20} className="text-brand" />
                                        </div>
                                        <h3 className="font-display text-2xl font-semibold text-foreground">Our Mission</h3>
                                    </div>
                                    <p className="mb-6 leading-relaxed text-muted-foreground">
                                        To enlighten ourselves, alongside our youth &amp; the community. By volunteering,
                                        servicing and providing programs such as:
                                    </p>
                                    <ul className="grid gap-3">
                                        {MISSION_ITEMS.map((item, i) => (
                                            <motion.li
                                                key={item}
                                                className="flex items-center gap-3 rounded-xl border bg-secondary/40 p-3 text-sm font-medium text-secondary-foreground"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.08 }}
                                            >
                                                <CheckCircle2 size={16} className="shrink-0 text-primary" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="hidden md:block">
                                    <img
                                        src={ASSETS.volunteerImg}
                                        alt="Public Advocate volunteers serving the community"
                                        className="h-64 w-full rounded-2xl object-cover shadow-lg"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </Card>
                    </FadeInSection>
                </div>
            </section>

            {/* ---------- Programs ---------- */}
            <ProgramsPreview />

            {/* ---------- Get help (service-seeking path) ---------- */}
            <GetHelpBand />

            {/* ---------- Upcoming events ---------- */}
            <EventsPreview />

            {/* ---------- Primary conversion ---------- */}
            <DonateCta />

            {/* ---------- Newsletter ---------- */}
            <section className="relative overflow-hidden bg-brand px-6 py-16 md:py-24">
                <div className="absolute -right-40 -top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

                <FadeInSection>
                    <div className="relative z-10 mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
                        <h2 className="mb-4 font-display text-display-sm font-bold text-white">
                            Get Our <GradientText gradient="accent">Latest Updates</GradientText>
                        </h2>
                        <p className="mb-8 text-white/70">
                            Stay connected with Public Advocate Social Society. Receive news on drives, events,
                            and community stories.
                        </p>

                        {subscribed ? (
                            <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-4 text-primary">
                                <Check size={18} /> Thanks for subscribing — we&rsquo;ll be in touch.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    aria-label="Email address"
                                    className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary"
                                />
                                <Button type="submit" size="lg" className="shrink-0">
                                    <Send size={18} /> Subscribe
                                </Button>
                            </form>
                        )}
                    </div>
                </FadeInSection>
            </section>
        </div>
    );
};

export default HomePage;
