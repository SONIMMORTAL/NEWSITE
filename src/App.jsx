import React, { useState, useEffect } from 'react';

// Components
import IntroVideo from './IntroVideo';
import AiAssistant from './AiAssistant';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ContactModal from './components/features/ContactModal';
import GetInvolvedModal from './components/features/GetInvolvedModal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import FoodPantryPage from './pages/FoodPantryPage';
import CalendarPage from './pages/CalendarPage';
import ProductsPage from './pages/ProductsPage';
import DonationsPage from './pages/DonationsPage';

const App = () => {
    const [activePage, setActivePage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactSubject, setContactSubject] = useState('Getting Involved');

    const [showGetInvolved, setShowGetInvolved] = useState(false);
    const [involvedType, setInvolvedType] = useState('volunteer');
    const [involvedEvent, setInvolvedEvent] = useState('');

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
            <IntroVideo />

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
            />

            <main className="flex-grow">
                {activePage === 'home' && <HomePage navigate={navigate} />}
                {activePage === 'about' && <AboutPage openGetInvolved={openGetInvolved} />}
                {activePage === 'food-pantry' && <FoodPantryPage />}
                {activePage === 'programs' && <ProgramsPage openContact={openContactModal} />}
                {activePage === 'calendar' && <CalendarPage openGetInvolved={openGetInvolved} />}
                {activePage === 'products' && <ProductsPage />}
                {activePage === 'donations' && <DonationsPage />}
            </main>

            <Footer navigate={navigate} />
            <AiAssistant />
        </div>
    );
};

export default App;
