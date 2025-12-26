import React, { useState } from 'react';
import { Sparkles, CalendarPlus, ChevronLeft, ChevronRight, Smile, Clock, Trash2, Plus, X } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import SpiralBinding from '../components/ui/SpiralBinding';
import CalendarEvent from '../components/features/CalendarEvent';
import { MONTHLY_THEMES, CALENDAR_DATA_2026 } from '../data';

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

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const [events, setEvents] = useState(generateInitialEvents());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
        setNewEventTitle("");
        setNewEventTime("");
        setNewEventType("community");
    };

    const handleAddEvent = () => {
        if (!newEventTitle) return;
        const newEvent = { title: newEventTitle, time: newEventTime || "All Day", type: newEventType, location: "TBD" };
        setEvents(prev => ({
            ...prev,
            [selectedDate]: [...(prev[selectedDate] || []), newEvent]
        }));
        setShowModal(false);
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

    const renderCalendarGrid = () => {
        const totalDays = getDaysInMonth(currentDate);
        const startDay = getFirstDayOfMonth(currentDate);
        const days = [];
        const currentTheme = MONTHLY_THEMES[currentDate.getMonth()];

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-28 md:h-36 bg-slate-50/30 border border-slate-100/50"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events[dateKey] || [];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
            const hasEvents = dayEvents.length > 0;

            days.push(
                <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`
                        h-28 md:h-36 border p-2 relative transition-all cursor-pointer group flex flex-col
                        ${isToday ? 'bg-yellow-50 border-yellow-300 shadow-md ring-1 ring-yellow-200' : ''}
                        ${hasEvents ? `${currentTheme?.highlight || 'bg-green-50/50'} border-green-200 hover:shadow-lg hover:-translate-y-1` : 'bg-white/80 border-slate-100 hover:bg-white'}
                    `}
                >
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-yellow-400 text-green-900 shadow-sm' : hasEvents ? 'bg-white text-green-800 shadow-sm border border-green-100' : 'text-slate-400'}`}>
                            {day}
                        </span>
                        {hasEvents && (
                            <div className="hidden group-hover:block animate-in fade-in zoom-in">
                                <Plus size={14} className="text-green-600 bg-white rounded-full shadow-sm" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1 relative z-10">
                        {/* Mobile Indicator (Dots) */}
                        <div className="flex md:hidden flex-wrap gap-1 mt-1">
                            {dayEvents.slice(0, 4).map((evt, idx) => (
                                <div key={idx} className={`
                                    w-1.5 h-1.5 rounded-full
                                    ${evt.type === 'business' ? 'bg-amber-500' :
                                        evt.type === 'youth' ? 'bg-emerald-500' :
                                            evt.type === 'culture' ? 'bg-purple-500' :
                                                'bg-sky-500'}
                                `} />
                            ))}
                            {dayEvents.length > 4 && <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />}
                        </div>

                        {/* Desktop Pills */}
                        <div className="hidden md:block space-y-1">
                            {dayEvents.map((evt, idx) => (
                                <div key={idx} className={`
                                    text-[10px] px-2 py-1 rounded-md font-bold truncate shadow-sm border
                                    ${evt.type === 'business' ? 'bg-amber-100 text-amber-900 border-amber-200' :
                                        evt.type === 'youth' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                                            evt.type === 'culture' ? 'bg-purple-100 text-purple-900 border-purple-200' :
                                                'bg-sky-100 text-sky-900 border-sky-200'}
                                `}>
                                    {evt.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
  `;

    return (
        <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
            <style>{flipStyles}</style>
            <SectionHeader
                pill="Events"
                title="Monthly Activities"
                description="Join us for community workshops, drives, and roundtables. Click any date to add your own community event proposal or view details."
                align="center"
            />

            {/* Theme Header */}
            <div className={`mb-8 p-1 rounded-2xl bg-gradient-to-r from-slate-100 to-white border border-white/40 shadow-sm relative overflow-hidden group`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${MONTHLY_THEMES[currentDate.getMonth()]?.gradient || "from-green-900 to-green-800"} opacity-15`} />
                <div className="relative px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm transform group-hover:rotate-12 transition-transform">
                            <Sparkles size={24} className="text-yellow-500" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Theme</div>
                            <div className="text-xl md:text-2xl font-black text-green-900 leading-none">
                                {MONTHLY_THEMES[currentDate.getMonth()]?.name || "Community"}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => openGetInvolved('host', `an event in ${monthNames[currentDate.getMonth()]}`)}
                        className="w-full md:w-auto px-6 py-3 bg-white border-2 border-green-100 text-green-800 rounded-xl font-bold text-sm hover:bg-green-50 hover:border-green-300 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                        <CalendarPlus size={16} /> Host Your Own Event
                    </button>
                </div>
            </div>

            <div className="relative pt-6">
                <SpiralBinding />

                <div
                    className={`backdrop-blur-xl border-t border-white/20 rounded-b-3xl rounded-t-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden bg-gradient-to-br ${MONTHLY_THEMES[currentDate.getMonth()]?.gradient || "from-green-900 to-green-800"} transition-all duration-700`}
                    style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
                >
                    <div className="flex items-center justify-between p-6 border-b border-white/10 z-20 relative text-white">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ChevronLeft />
                        </button>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold transition-all duration-300 drop-shadow-md">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                        </div>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ChevronRight />
                        </button>
                    </div>

                    <div
                        className={`transition-all ${animationClass}`}
                        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                    >
                        <div className="grid grid-cols-7 text-center py-3 bg-black/10 border-b border-white/5 text-xs font-bold uppercase tracking-wider text-white/70">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 bg-white/5">
                            {renderCalendarGrid()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Visualization */}
            <div className="max-w-3xl mx-auto text-left relative min-h-[200px] mt-16">
                {hasEvents ? (
                    <>
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                        {monthlyEventsList.map((event, index) => (
                            <CalendarEvent
                                key={index}
                                event={event}
                                monthName={monthName}
                                onHostClick={(title) => openGetInvolved('host', title)}
                            />
                        ))}
                    </>
                ) : (
                    <div className="text-center text-slate-500 py-12">
                        <Smile size={48} className="mx-auto mb-4 text-slate-300" />
                        <p className="text-lg font-medium text-green-900">No activities scheduled.</p>
                        <p className="text-sm">Please check back later or view other months!</p>
                    </div>
                )}
            </div>

            {/* Add/View Event Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-green-950/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-green-800 p-4 flex justify-between items-center text-white">
                            <h3 className="font-bold">Events for {selectedDate}</h3>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <div className="p-6">
                            {events[selectedDate]?.length > 0 && (
                                <div className="mb-6 space-y-2">
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Scheduled</h4>
                                    {events[selectedDate].map((evt, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                                            <div>
                                                <div className="font-bold text-green-900 text-sm">{evt.title}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                                                    <Clock size={10} /> {evt.time}
                                                    <span className="capitalize">• {evt.type}</span>
                                                </div>
                                                <div className="text-xs text-slate-400 leading-snug">{evt.description}</div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteEvent(selectedDate, i)}
                                                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Add New Event</h4>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-yellow-400"
                                    value={newEventTitle}
                                    onChange={e => setNewEventTitle(e.target.value)}
                                />
                                <div className="flex gap-3">
                                    <input
                                        type="time"
                                        className="flex-1 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-yellow-400"
                                        value={newEventTime}
                                        onChange={e => setNewEventTime(e.target.value)}
                                    />
                                    <select
                                        className="flex-1 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-yellow-400 bg-white"
                                        value={newEventType}
                                        onChange={e => setNewEventType(e.target.value)}
                                    >
                                        <option value="community">Community</option>
                                        <option value="business">Business</option>
                                        <option value="youth">Youth</option>
                                        <option value="culture">Culture</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleAddEvent}
                                    disabled={!newEventTitle}
                                    className="w-full bg-green-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                                >
                                    <Plus size={16} /> Add to Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
