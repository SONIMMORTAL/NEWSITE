import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Components
import IntroVideo from './IntroVideo';
import AiAssistant from './AiAssistant';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ContactModal from './components/features/ContactModal';
import GetInvolvedModal from './components/features/GetInvolvedModal';
import Toast from './components/ui/Toast';
import Seo from './components/seo/Seo';
import NotFoundPage from './pages/NotFoundPage';

import { ROUTES } from './config/routes';
import { PAGE_PATHS, organizationJsonLd } from './config/site';
import { cn } from './lib/utils';
import { AccessibilityProvider } from './components/layout/AccessibilityContext';
import AccessibilityMenu from './components/features/AccessibilityMenu';

/** Restores scroll to the top on route change (browser back/forward keeps its own position). */
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

/** Lightweight placeholder shown while a route chunk loads. */
const RouteFallback = () => (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
            role="status"
            aria-label="Loading page"
        />
    </div>
);

const AppContent = () => {
    const location = useLocation();
    const routerNavigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactSubject, setContactSubject] = useState('Getting Involved');

    const [showGetInvolved, setShowGetInvolved] = useState(false);
    const [involvedType, setInvolvedType] = useState('volunteer');
    const [involvedEvent, setInvolvedEvent] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const addToCart = useCallback((product) => {
        setCartItems((prev) => [...prev, product]);
        setToastMessage(`Added ${product.name} to your cart.`);
        setShowToast(true);
    }, []);

    const removeFromCart = useCallback((index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Accepts legacy page keys ('our-work') as well as real paths, so existing
    // in-page CTAs keep working while the URL becomes the source of truth.
    const navigate = useCallback(
        (pageOrPath) => {
            setIsMenuOpen(false);
            routerNavigate(PAGE_PATHS[pageOrPath] ?? pageOrPath);
        },
        [routerNavigate]
    );

    const openContactModal = useCallback((subject = '') => {
        setContactSubject(subject);
        setShowContactModal(true);
    }, []);

    const openGetInvolved = useCallback((type = 'volunteer', event = '') => {
        setInvolvedType(type);
        setInvolvedEvent(event || '');
        setShowGetInvolved(true);
    }, []);

    const ctx = useMemo(
        () => ({
            navigate,
            openContact: openContactModal,
            openGetInvolved,
            addToCart,
            removeFromCart,
            cartItems,
            cartTotal,
        }),
        [navigate, openContactModal, openGetInvolved, addToCart, removeFromCart, cartItems, cartTotal]
    );

    const activeRoute = ROUTES.find((r) => r.path === location.pathname);
    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30 selection:text-brand">
            <Seo
                title={activeRoute ? activeRoute.title : 'Page Not Found'}
                description={activeRoute?.description}
                jsonLd={organizationJsonLd(window.location.origin)}
            />
            <ScrollToTop />

            <IntroVideo />

            <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

            <AccessibilityMenu />

            <ContactModal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
                initialSubject={contactSubject}
            />
            <GetInvolvedModal
                isOpen={showGetInvolved}
                onClose={() => setShowGetInvolved(false)}
                initialType={involvedType}
                initialEvent={involvedEvent}
            />

            <Navbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                scrolled={scrolled}
                cartCount={cartItems.length}
            />

            {/* The navbar is fixed and ~96px tall on mobile / ~129px on desktop.
                Offset the content once here instead of per page; the home hero
                is full-bleed by design and sits under the transparent bar. */}
            <main className={cn('flex-grow', !isHome && 'pt-28 md:pt-36')}>
                <Suspense fallback={<RouteFallback />}>
                    <Routes>
                        {ROUTES.map(({ path, Component, props }) => (
                            <Route key={path} path={path} element={<Component {...props(ctx)} />} />
                        ))}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>

            <Footer />
            <AiAssistant />
        </div>
    );
};

const App = () => (
    <AccessibilityProvider>
        <AppContent />
    </AccessibilityProvider>
);

export default App;
