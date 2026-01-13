import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CalendarPlus, ChevronLeft, ChevronRight, ChevronDown, Smile, Clock, Trash2, Plus, X, Heart, Info,
    Snowflake, HeartHandshake, Flower2, TreeDeciduous, Sun, Palmtree, GraduationCap, Leaf, Sparkles, Gift
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import SpiralBinding from '../components/ui/SpiralBinding';
import CalendarEvent from '../components/features/CalendarEvent';
import CalendarDayCell from '../components/features/CalendarDayCell';
import { PaperTexture } from '../components/ui/TextureOverlay';
import RevealText from '../components/ui/RevealText';
import { MONTHLY_THEMES, CALENDAR_DATA_2026 } from '../data';

// Premium icons for each month - elegant and meaningful
const MONTH_ICONS = {
    0: Snowflake,      // January - Winter/New Beginnings
    1: HeartHandshake, // February - Love/Black History
    2: Flower2,        // March - Spring/Women's History
    3: TreeDeciduous,  // April - Earth/Growth
    4: Flower2,        // May - Flowers/Mothers
    5: Sun,            // June - Summer/Pride
    6: Palmtree,       // July - Summer/Independence
    7: GraduationCap,  // August - Back to School
    8: Leaf,           // September - Fall/Wellness
    9: Sparkles,       // October - Fall/Awareness
    10: Heart,         // November - Thanksgiving/Gratitude
    11: Gift,          // December - Holidays/Giving
};

const generateInitialEvents = () => {
    const events = {};
    Object.entries(CALENDAR_DATA_2026).forEach(([monthIndex, monthEvents]) => {
        monthEvents.forEach(evt => {
            const monthStr = String(parseInt(monthIndex) + 1).padStart(2, '0');
            const dayStr = String(evt.day).padStart(2, '0');
            const dateKey = `2026-${monthStr}-${dayStr}`;

            if (!events[dateKey]) {
                events[dateKey] = [];
            }
            events[dateKey].push({
                title: evt.title,
                time: evt.time,
                type: evt.type || "community",
                location: evt.location || "TBD",
                description: evt.description || "Join us for this community event."
            });
        });
    });
    return events;
};

const CalendarPage = ({ openGetInvolved }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0));
    const [isFlipping, setIsFlipping] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const currentTheme = MONTHLY_THEMES[currentDate.getMonth()];

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const [events, setEvents] = useState(generateInitialEvents());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showTimeline, setShowTimeline] = useState(true);
    const [newEventTitle, setNewEventTitle] = useState("");
    const [newEventTime, setNewEventTime] = useState("");
    const [newEventType, setNewEventType] = useState("community");

    const changeMonth = (direction) => {
        if (isFlipping) return;
        setIsFlipping(true);

        if (direction === 'next') {
            setAnimationClass("origin-top animate-flip-up-out");
        } else {
            setAnimationClass("origin-top animate-flip-down-out");
        }

        setTimeout(() => {
            setCurrentDate(prev => {
                const newDate = new Date(prev);
                newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
                return newDate;
            });

            if (direction === 'next') {
                setAnimationClass("origin-top animate-flip-up-in");
            } else {
                setAnimationClass("origin-top animate-flip-down-in");
            }

            setTimeout(() => {
                setIsFlipping(false);
                setAnimationClass("");
            }, 500);
        }, 400);
    };

    const handlePrevMonth = () => changeMonth('prev');
    const handleNextMonth = () => changeMonth('next');

    const handleDayClick = (day) => {
        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateKey);
        setShowModal(true);
        setShowAddForm(false); // Start with events view, not add form
        setNewEventTitle("");
        setNewEventTime("");
        setNewEventType("community");
    };

    const handleShowAddForm = () => {
        setShowAddForm(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowAddForm(false);
    };

    const handleAddEvent = () => {
        if (!newEventTitle) return;
        const newEvent = { title: newEventTitle, time: newEventTime || "All Day", type: newEventType, location: "TBD", description: "Community submitted event." };
        setEvents(prev => ({
            ...prev,
            [selectedDate]: [...(prev[selectedDate] || []), newEvent]
        }));
        setShowAddForm(false); // Go back to events view after adding
    };

    const handleDeleteEvent = (dateKey, index) => {
        setEvents(prev => {
            const updatedList = [...prev[dateKey]];
            updatedList.splice(index, 1);
            return { ...prev, [dateKey]: updatedList };
        });
    };

    const getMonthlyEvents = () => {
        const currentMonthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
        const currentYearStr = String(currentDate.getFullYear());
        const prefix = `${currentYearStr}-${currentMonthStr}`;
        const keys = Object.keys(events).filter(k => k.startsWith(prefix)).sort();
        return keys.flatMap(key => {
            const day = parseInt(key.split('-')[2]);
            return events[key].map(evt => ({ ...evt, day }));
        });
    };

    const monthlyEventsList = getMonthlyEvents();
    const hasEvents = monthlyEventsList.length > 0;

    // Count total events for this month
    const totalMonthEvents = monthlyEventsList.length;

    const renderCalendarGrid = () => {
        const totalDays = getDaysInMonth(currentDate);
        const startDay = getFirstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(
                <div
                    key={`empty-${i}`}
                    className="aspect-square md:aspect-auto md:h-36 bg-amber-50/30 border border-amber-100 rounded-lg"
                />
            );
        }

        for (let day = 1; day <= totalDays; day++) {
            const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events[dateKey] || [];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <CalendarDayCell
                    key={day}
                    day={day}
                    events={dayEvents}
                    isToday={isToday}
                    currentDate={currentDate}
                    monthName={monthName}
                    onAddEvent={() => handleDayClick(day)}
                    onClick={() => handleDayClick(day)}
                />
            );
        }
        return days;
    };

    const flipStyles = `
    @keyframes flipUpOut {
      0% { transform: rotateX(0deg); opacity: 1; }
      100% { transform: rotateX(90deg); opacity: 0.5; }
    }
    @keyframes flipUpIn {
      0% { transform: rotateX(-90deg); opacity: 0.5; }
      100% { transform: rotateX(0deg); opacity: 1; }
    }
    .animate-flip-up-out { animation: flipUpOut 0.4s ease-in forwards; }
    .animate-flip-up-in { animation: flipUpIn 0.5s ease-out forwards; }
    
    @keyframes flipDownOut {
      0% { transform: rotateX(0deg); opacity: 1; }
      100% { transform: rotateX(-90deg); opacity: 0.5; }
    }
    @keyframes flipDownIn {
      0% { transform: rotateX(90deg); opacity: 0.5; }
      100% { transform: rotateX(0deg); opacity: 1; }
    }
    .animate-flip-down-out { animation: flipDownOut 0.4s ease-in forwards; }
    .animate-flip-down-in { animation: flipDownIn 0.5s ease-out forwards; }

    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.005); }
    }
    .animate-breathe { animation: breathe 4s ease-in-out infinite; }
  `;

    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden">
            {/* Lime Center Glow */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at center, #84cc16, transparent)`,
                }}
            />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
                <style>{flipStyles}</style>

                {/* Animated Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full mb-4"
                    >
                        <span className="text-green-700 text-sm font-semibold tracking-wide">✦ EVENTS</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-green-900 mb-6">
                        <RevealText
                            text="Monthly Activities"
                            stagger="character"
                            duration={0.4}
                            direction="up"
                        />
                    </h1>

                    <p className="text-green-800 text-lg md:text-xl max-w-2xl mx-auto">
                        <RevealText
                            text="Join us for community workshops, drives, and roundtables."
                            stagger="word"
                            duration={0.5}
                            delay={0.3}
                            direction="up"
                        />
                    </p>
                    <p className="text-green-700/70 text-base mt-2">
                        <RevealText
                            text="Click any date to add your own community event proposal or view details."
                            stagger="word"
                            duration={0.4}
                            delay={0.6}
                            direction="up"
                        />
                    </p>
                </div>

                {/* Unified Theme Header with Collapsible Description */}
                <motion.div
                    className="mb-8 rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-r ${currentTheme?.gradient || "from-green-900 to-green-800"} p-6 text-white relative overflow-hidden`}>
                        {/* Subtle texture on header */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }} />
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                            <div className="flex items-center gap-3 md:gap-4">
                                <motion.div
                                    className="p-2 md:p-3 bg-white/15 rounded-lg md:rounded-xl backdrop-blur-sm border border-white/20 shadow-lg flex-shrink-0"
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {(() => {
                                        const MonthIcon = MONTH_ICONS[currentDate.getMonth()] || HeartHandshake;
                                        return <MonthIcon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" strokeWidth={1.5} />;
                                    })()}
                                </motion.div>
                                <div>
                                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">
                                        {monthName} Theme
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black leading-tight">
                                        {currentTheme?.name || "Community"}
                                    </h2>
                                    {currentTheme?.summary && (
                                        <p className="text-sm text-white/80 mt-2 max-w-md leading-relaxed">
                                            {currentTheme.summary}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                {totalMonthEvents > 0 && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                                        <Heart className="w-4 h-4 text-white" />
                                        <span className="text-sm font-bold">
                                            {totalMonthEvents} Event{totalMonthEvents !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                                <button
                                    onClick={() => openGetInvolved('host', `an event in ${monthNames[currentDate.getMonth()]}`)}
                                    className="px-4 py-2 bg-white text-green-800 rounded-xl font-bold text-sm hover:bg-green-50 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <CalendarPlus size={16} /> Host Event
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white/95 p-5">
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                            {currentTheme?.brief || "Join us for community activities this month."}
                        </p>

                        {/* Monthly Observances Pills */}
                        {currentTheme?.monthlyObservances && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {currentTheme.monthlyObservances.slice(0, showFullDescription ? undefined : 4).map((observance, idx) => (
                                    <span
                                        key={idx}
                                        className={`text-xs px-3 py-1.5 rounded-full font-medium border ${currentTheme.accent}`}
                                    >
                                        {observance}
                                    </span>
                                ))}
                                {!showFullDescription && currentTheme.monthlyObservances.length > 4 && (
                                    <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                        +{currentTheme.monthlyObservances.length - 4} more
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Read More Button */}
                        <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            <Info size={14} />
                            {showFullDescription ? 'Show Less' : 'Read More About This Month'}
                            <motion.div
                                animate={{ rotate: showFullDescription ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown size={16} />
                            </motion.div>
                        </button>

                        {/* Full Description - Expandable */}
                        <AnimatePresence>
                            {showFullDescription && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 mt-4 border-t border-slate-100">
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {currentTheme?.full || "Explore the many events and awareness campaigns happening this month."}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <div className="relative pt-8">
                    <SpiralBinding />

                    {/* Paper Base Shadow - gives depth like stacked pages */}
                    <div className="absolute -bottom-2 left-2 right-2 h-4 bg-amber-200/40 rounded-b-xl blur-sm" />
                    <div className="absolute -bottom-1 left-1 right-1 h-2 bg-amber-100/60 rounded-b-lg" />

                    {/* Main Calendar Container with Paper Texture - Now with Breathing Animation */}
                    <motion.div
                        className="relative rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] overflow-hidden animate-breathe"
                        style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
                    >
                        {/* Month Header with Theme Gradient */}
                        <motion.div
                            className={`bg-gradient-to-br ${currentTheme?.gradient || "from-green-900 to-green-800"} transition-all duration-700`}
                            key={currentDate.getMonth()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 z-20 relative text-white">
                                <motion.button
                                    onClick={handlePrevMonth}
                                    className="p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>
                                <div className="text-center">
                                    <motion.h2
                                        className="text-2xl md:text-3xl font-bold drop-shadow-lg tracking-wide"
                                        key={`${monthName}-${year}`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {monthName} {year}
                                    </motion.h2>
                                </div>
                                <motion.button
                                    onClick={handleNextMonth}
                                    className="p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Paper Sheet with Texture */}
                        <div
                            className={`relative transition-all ${animationClass}`}
                            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                        >
                            {/* Paper texture background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50/80 to-orange-50/60" />

                            {/* Enhanced Paper Texture - Multiple Layers */}
                            <PaperTexture />

                            {/* Additional paper grain for realism */}
                            <div
                                className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                                }}
                            />

                            {/* Subtle fold/crease line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />

                            {/* Day Headers */}
                            <div className="relative grid grid-cols-7 text-center py-3 bg-amber-100/60 border-b border-amber-200/80 text-xs font-bold uppercase tracking-wider text-amber-900/70">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="py-1">{day}</div>
                                ))}
                            </div>

                            {/* Calendar Grid with Interactive Cells */}
                            <div className="relative grid grid-cols-7 bg-amber-50/40 gap-1 p-1">
                                {renderCalendarGrid()}
                            </div>

                            {/* Page curl shadow effect - bottom right */}
                            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-amber-200/40 via-transparent to-transparent" />
                            </div>

                            {/* Left edge shadow for book depth */}
                            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-200/30 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* Timeline Visualization - Collapsible Accordion */}
                <div className="max-w-3xl mx-auto text-left relative mt-16">
                    {/* Clickable Header */}
                    <motion.button
                        onClick={() => setShowTimeline(!showTimeline)}
                        className="w-full flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl border border-green-200 shadow-sm transition-all group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className={`p-1.5 md:p-2 rounded-lg bg-gradient-to-br ${currentTheme?.gradient} flex-shrink-0`}>
                                {(() => {
                                    const MonthIcon = MONTH_ICONS[currentDate.getMonth()] || HeartHandshake;
                                    return <MonthIcon className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />;
                                })()}
                            </span>
                            <div className="text-left">
                                <h3 className="text-base md:text-xl font-bold text-green-900">
                                    {monthName} Events Timeline
                                </h3>
                                <p className="text-xs md:text-sm text-green-600">
                                    {hasEvents ? `${monthlyEventsList.length} events this month` : 'No events scheduled'}
                                </p>
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: showTimeline ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="p-2 rounded-full bg-green-200/50 group-hover:bg-green-300/50 transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 text-green-700" />
                        </motion.div>
                    </motion.button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                        {showTimeline && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: 'auto',
                                    opacity: 1,
                                    transition: {
                                        height: { type: 'spring', stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2, delay: 0.1 }
                                    }
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    transition: {
                                        height: { type: 'spring', stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.15 }
                                    }
                                }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 pb-4 relative min-h-[100px]">
                                    {hasEvents ? (
                                        <>
                                            <div className="absolute left-8 top-6 bottom-4 w-0.5 bg-gradient-to-b from-green-400 to-green-100"></div>
                                            {monthlyEventsList.map((event, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <CalendarEvent
                                                        event={event}
                                                        monthName={monthName}
                                                        onHostClick={(title) => openGetInvolved('host', title)}
                                                    />
                                                </motion.div>
                                            ))}
                                        </>
                                    ) : (
                                        <motion.div
                                            className="text-center text-slate-500 py-12"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <Smile size={48} className="mx-auto mb-4 text-slate-300" />
                                            <p className="text-lg font-medium text-green-900">No activities scheduled.</p>
                                            <p className="text-sm">Please check back later or view other months!</p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Add/View Event Modal - Cult-UI Style Expandable */}
                <AnimatePresence mode="wait">
                    {showModal && (
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleCloseModal}
                        >
                            {/* Backdrop with blur */}
                            <motion.div
                                className="absolute inset-0 bg-green-950/50 backdrop-blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* Modal Card */}
                            <motion.div
                                className="relative bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden"
                                initial={{
                                    scale: 0.85,
                                    y: 40,
                                    opacity: 0,
                                    rotateX: 10
                                }}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    opacity: 1,
                                    rotateX: 0
                                }}
                                exit={{
                                    scale: 0.9,
                                    y: 20,
                                    opacity: 0,
                                    transition: { duration: 0.15 }
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 350,
                                    damping: 30,
                                    mass: 0.8
                                }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Green Gradient Header - Premium Feel */}
                                <motion.div
                                    className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 p-5"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.3 }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="text-white">
                                            <motion.div
                                                className="flex items-center gap-2 mb-1"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                                                    {monthName}
                                                </span>
                                            </motion.div>
                                            <motion.h3
                                                className="text-3xl font-black tracking-tight"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {selectedDate?.split('-')[2]}
                                            </motion.h3>
                                            <motion.p
                                                className="text-white/80 text-sm mt-1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.25 }}
                                            >
                                                {events[selectedDate]?.length || 0} event{events[selectedDate]?.length !== 1 ? 's' : ''} scheduled
                                            </motion.p>
                                        </div>
                                        <motion.button
                                            onClick={handleCloseModal}
                                            className="p-2 hover:bg-white/20 rounded-full transition-all"
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <X size={20} className="text-white" />
                                        </motion.button>
                                    </div>
                                </motion.div>

                                <div className="p-6 max-h-[60vh] overflow-y-auto">
                                    {/* STEP 1: Events List View */}
                                    {!showAddForm ? (
                                        <>
                                            {events[selectedDate]?.length > 0 ? (
                                                <div className="space-y-3 mb-6">
                                                    {events[selectedDate].map((evt, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="flex justify-between items-start p-4 bg-slate-50 rounded-xl border border-slate-100 group"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                        >
                                                            <div className="flex-1">
                                                                <div className="font-bold text-green-900">{evt.title}</div>
                                                                <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                                    <Clock size={10} /> {evt.time}
                                                                    <span className="capitalize px-2 py-0.5 bg-slate-200 rounded text-slate-600">
                                                                        {evt.type}
                                                                    </span>
                                                                </div>
                                                                {evt.description && (
                                                                    <div className="text-xs text-slate-400 leading-relaxed mt-2">
                                                                        {evt.description}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteEvent(selectedDate, i)}
                                                                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 mb-6">
                                                    <Smile size={48} className="mx-auto mb-3 text-slate-300" />
                                                    <p className="text-slate-500 font-medium">No events yet</p>
                                                    <p className="text-slate-400 text-sm mt-1">Be the first to add one!</p>
                                                </div>
                                            )}

                                            {/* Add Event Button */}
                                            <button
                                                onClick={handleShowAddForm}
                                                className="w-full py-3 bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                <Plus size={16} /> Request to Host an Event
                                            </button>
                                        </>
                                    ) : (
                                        /* STEP 2: Add Event Form */
                                        <>
                                            <div className="mb-4">
                                                <button
                                                    onClick={() => setShowAddForm(false)}
                                                    className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
                                                >
                                                    ← Back to events
                                                </button>
                                            </div>

                                            <h4 className="text-lg font-bold text-green-900 mb-4">Request Event Space</h4>
                                            <p className="text-sm text-slate-500 mb-4">
                                                Fill out the form below to request this date for your event. Our team will review and approve.
                                            </p>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Event Title</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your event name"
                                                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                                        value={newEventTitle}
                                                        onChange={e => setNewEventTitle(e.target.value)}
                                                    />
                                                </div>

                                                <div className="flex gap-3">
                                                    <div className="flex-1">
                                                        <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Time</label>
                                                        <input
                                                            type="time"
                                                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-green-400"
                                                            value={newEventTime}
                                                            onChange={e => setNewEventTime(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Category</label>
                                                        <select
                                                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-green-400 bg-white"
                                                            value={newEventType}
                                                            onChange={e => setNewEventType(e.target.value)}
                                                        >
                                                            <option value="community">Community</option>
                                                            <option value="business">Business</option>
                                                            <option value="youth">Youth</option>
                                                            <option value="culture">Culture</option>
                                                            <option value="health">Health</option>
                                                            <option value="education">Education</option>
                                                            <option value="environment">Environment</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleAddEvent}
                                                    disabled={!newEventTitle}
                                                    className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={16} /> Submit Request
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CalendarPage;
