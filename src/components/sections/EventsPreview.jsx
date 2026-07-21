import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import SectionHeading from '../ui/section-heading';
import FadeInSection from '../ui/FadeInSection';
import { getUpcomingEvents, getCurrentTheme } from '../../lib/events';

const EventsPreview = () => {
    const events = useMemo(() => getUpcomingEvents(4), []);
    const theme = useMemo(() => getCurrentTheme(), []);

    if (!events.length) return null;

    return (
        <section className="bg-background px-6 py-16 md:py-24">
            <div className="mx-auto max-w-[1200px]">
                <FadeInSection>
                    <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <SectionHeading
                            align="left"
                            eyebrow={`${theme.monthName} — ${theme.name}`}
                            title="What's coming up"
                            description={theme.brief}
                        />
                        <Button asChild variant="outline" className="shrink-0">
                            <Link to="/calendar">
                                Full calendar <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                </FadeInSection>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {events.map((event, i) => (
                        <FadeInSection key={`${event.monthIndex}-${event.day}-${event.title}`} delay={i * 0.07}>
                            <Card className="flex h-full flex-col p-5 transition-shadow duration-200 hover:shadow-lg">
                                {/* Date chip */}
                                <div className="mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-brand text-brand-foreground">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                        {event.monthShort}
                                    </span>
                                    <span className="font-display text-xl font-bold leading-none">{event.day}</span>
                                </div>

                                <h3 className="mb-3 font-display text-base font-semibold leading-snug text-foreground">
                                    {event.title}
                                </h3>

                                <dl className="mt-auto space-y-1.5 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={13} className="shrink-0 text-primary" />
                                        <dd>{event.time}</dd>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={13} className="shrink-0 text-primary" />
                                        <dd className="truncate">{event.location}</dd>
                                    </div>
                                </dl>
                            </Card>
                        </FadeInSection>
                    ))}
                </div>

                <FadeInSection delay={0.25}>
                    <Link
                        to="/calendar"
                        className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                        <CalendarDays size={16} className="text-primary" />
                        Hosting something? Propose a community event on our calendar.
                    </Link>
                </FadeInSection>
            </div>
        </section>
    );
};

export default EventsPreview;
