import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Baby, Heart, Trophy, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import SectionHeading from '../ui/section-heading';
import FadeInSection from '../ui/FadeInSection';
import { SOCIAL_SERVICES } from '../../data';

// Icon + destination per service key, keeping copy sourced from data.js.
const SERVICE_META = {
    youth: { icon: Baby, to: '/programs' },
    social: { icon: Heart, to: '/programs' },
    business: { icon: Briefcase, to: '/programs' },
    sports: { icon: Trophy, to: '/programs' },
};

const ORDER = ['youth', 'social', 'business', 'sports'];

const ProgramsPreview = () => (
    <section className="bg-muted/40 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
            <FadeInSection>
                <SectionHeading
                    eyebrow="What We Do"
                    title="Programs built around the community"
                    description="From rites-of-passage curriculums for at-risk youth to strategy groups for local entrepreneurs, our programs meet neighbors where they are."
                    className="mx-auto mb-14"
                />
            </FadeInSection>

            <div className="grid gap-6 md:grid-cols-2">
                {ORDER.map((key, i) => {
                    const service = SOCIAL_SERVICES[key];
                    const meta = SERVICE_META[key];
                    if (!service || !meta) return null;
                    const Icon = meta.icon;

                    return (
                        <FadeInSection key={key} delay={i * 0.08}>
                            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
                                <Card className="group flex h-full flex-col p-7 transition-shadow duration-200 hover:shadow-lg">
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-brand transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                                        {service.title}
                                    </h3>
                                    <p className="mb-5 flex-1 leading-relaxed text-muted-foreground">
                                        {service.description}
                                    </p>

                                    {service.tags && (
                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        to={meta.to}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-primary"
                                    >
                                        Learn more
                                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </Card>
                            </motion.div>
                        </FadeInSection>
                    );
                })}
            </div>

            <FadeInSection delay={0.2}>
                <div className="mt-12 text-center">
                    <Button asChild size="lg" variant="brand">
                        <Link to="/programs">
                            See all programs <ArrowRight size={18} />
                        </Link>
                    </Button>
                </div>
            </FadeInSection>
        </div>
    </section>
);

export default ProgramsPreview;
