import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import FadeInSection from '../ui/FadeInSection';
import { PANTRY_LOCATIONS } from '../../data';
import { SITE } from '../../config/site';

/**
 * Service-seeking path. For a community organization this matters as much as
 * the donate CTA — someone who needs food should never have to hunt for it.
 */
const GetHelpBand = () => {
    const openNow = PANTRY_LOCATIONS.filter((p) => p.status === 'Open');

    return (
        <section className="bg-brand px-6 py-16 md:py-20">
            <div className="mx-auto max-w-[1200px]">
                <FadeInSection>
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        <div>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <UtensilsCrossed size={22} />
                            </div>
                            <h2 className="mb-4 font-display text-display-sm font-bold text-white">
                                Need food assistance?
                            </h2>
                            <p className="mb-7 leading-relaxed text-white/70">
                                We track {PANTRY_LOCATIONS.length} partner pantries across Brooklyn with current
                                hours and availability — {openNow.length} are open on a regular weekly schedule.
                                No appointment needed to look.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button asChild size="lg">
                                    <Link to="/food-pantry">
                                        Find a pantry <ArrowRight size={18} />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline-inverse">
                                    <a href={`tel:${SITE.phone}`}>
                                        <Phone size={18} /> Call us
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* A real sample of the pantry list, not decoration */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                            <ul className="divide-y divide-white/10">
                                {PANTRY_LOCATIONS.slice(0, 4).map((pantry) => (
                                    <li key={pantry.name} className="flex items-center justify-between gap-4 p-4">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-white">{pantry.name}</p>
                                            <p className="truncate text-xs text-white/50">{pantry.addr}</p>
                                        </div>
                                        <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                                            {pantry.time.split(',')[0]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/food-pantry"
                                className="block p-4 text-center text-sm font-semibold text-primary transition-colors hover:text-white"
                            >
                                View all {PANTRY_LOCATIONS.length} locations →
                            </Link>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
};

export default GetHelpBand;
