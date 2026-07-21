import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFoundPage = () => (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
            <p className="font-display text-7xl font-bold text-primary">404</p>
            <h1 className="mt-4 font-display text-display-sm font-bold text-white">
                We couldn&apos;t find that page
            </h1>
            <p className="mt-4 text-white/70">
                The page may have moved or no longer exists. Let&apos;s get you back to the community.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                    <Link to="/">
                        <Home size={18} /> Back to Home
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline-inverse">
                    <Link to="/programs">
                        <ArrowLeft size={18} /> Browse Programs
                    </Link>
                </Button>
            </div>
        </div>
    </section>
);

export default NotFoundPage;
