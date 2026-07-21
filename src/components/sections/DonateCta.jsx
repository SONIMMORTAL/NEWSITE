import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import FadeInSection from '../ui/FadeInSection';

/**
 * Primary conversion band. Deliberately the loudest surface on the page —
 * full gold, so it reads as the single most important action.
 */
const DonateCta = () => (
    <section className="bg-primary px-6 py-16 md:py-20">
        <FadeInSection>
            <div className="mx-auto max-w-[900px] text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
                    <Heart size={26} className="text-primary-foreground" />
                </div>

                <h2 className="mb-5 font-display text-display-md font-bold text-primary-foreground">
                    Your support keeps the doors open
                </h2>
                <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                    Every contribution funds food assistance, youth programs, and advocacy for Brooklyn
                    families. Give once, give monthly, or shop the store — it all goes back into the community.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Button asChild size="lg" variant="brand" shine={false}>
                        <Link to="/donations">
                            Donate now <ArrowRight size={18} />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                        <Link to="/products">
                            <ShoppingBag size={18} /> Shop the store
                        </Link>
                    </Button>
                </div>
            </div>
        </FadeInSection>
    </section>
);

export default DonateCta;
