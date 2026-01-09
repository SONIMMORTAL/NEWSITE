import React, { useState, useEffect } from 'react';

// Components
import IntroVideo from './IntroVideo';
import AiAssistant from './AiAssistant';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ContactModal from './components/features/ContactModal';
import GetInvolvedModal from './components/features/GetInvolvedModal';
import Toast from './components/ui/Toast';

// Pages
import HomePage from './pages/HomePage';
import OurWorkPage from './pages/OurWorkPage';
import ProgramsPage from './pages/ProgramsPage';
import FoodPantryPage from './pages/FoodPantryPage';
import CalendarPage from './pages/CalendarPage';
import ProductsPage from './pages/ProductsPage';
import DonationsPage from './pages/DonationsPage';

import { AccessibilityProvider, useAccessibility } from './components/layout/AccessibilityContext';
import AccessibilityMenu from './components/features/AccessibilityMenu';

const AppContent = () => {
    const { theme } = useAccessibility();
    const [activePage, setActivePage] = useState('home');
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

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
        setToastMessage(`Added ${product.name} to your cart.`);
        setShowToast(true);
    };

    const removeFromCart = (index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = (page) => {
        setActivePage(page);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    const openContactModal = (subject = '') => {
        setContactSubject(subject);
        setShowContactModal(true);
    };

    const openGetInvolved = (type = 'volunteer', event = '') => {
        setInvolvedType(type);
        setInvolvedEvent(event || '');
        setShowGetInvolved(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200 selection:text-green-900">
            {theme === 'grayscale' && (
                <div className="fixed inset-0 pointer-events-none z-[90] backdrop-grayscale bg-white/0 transition-all duration-300" />
            )}

            <IntroVideo />

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

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
                activePage={activePage}
                navigate={navigate}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                scrolled={scrolled}
                cartCount={cartItems.length}
            />

            <main className="flex-grow">
                {activePage === 'home' && <HomePage navigate={navigate} />}
                {activePage === 'our-work' && <OurWorkPage navigate={navigate} openGetInvolved={openGetInvolved} />}
                {activePage === 'food-pantry' && <FoodPantryPage />}
                {activePage === 'programs' && <ProgramsPage openContact={openContactModal} />}
                {activePage === 'calendar' && <CalendarPage openGetInvolved={openGetInvolved} />}
                {activePage === 'products' && <ProductsPage addToCart={addToCart} />}
                {activePage === 'donations' && <DonationsPage cartTotal={cartTotal} cartItems={cartItems} removeFromCart={removeFromCart} />}
            </main>

            <Footer navigate={navigate} />
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
