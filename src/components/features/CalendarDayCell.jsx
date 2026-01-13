import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    GraduationCap,
    Palette,
    Users,
    Briefcase,
    Leaf,
    Baby,
    Home,
    Plus
} from 'lucide-react';

// Icon mapping for event types
const EVENT_TYPE_CONFIG = {
    health: { icon: Heart, color: 'text-red-500', bg: 'bg-red-100', border: 'border-red-200' },
    education: { icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
    culture: { icon: Palette, color: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-200' },
    community: { icon: Users, color: 'text-green-500', bg: 'bg-green-100', border: 'border-green-200' },
    business: { icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    environment: { icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' },
    youth: { icon: Baby, color: 'text-teal-500', bg: 'bg-teal-100', border: 'border-teal-200' },
    family: { icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
};

const EventTypeIcon = ({ type, size = 14, showBg = true }) => {
    const config = EVENT_TYPE_CONFIG[type] || EVENT_TYPE_CONFIG.community;
    const IconComponent = config.icon;

    if (showBg) {
        return (
            <div className={`p-1 rounded-full ${config.bg} ${config.border} border`}>
                <IconComponent size={size} className={config.color} />
            </div>
        );
    }

    return <IconComponent size={size} className={config.color} />;
};

const CalendarDayCell = ({
    day,
    events = [],
    isToday = false,
    onClick
}) => {
    const hasEvents = events.length > 0;

    // Get unique event types for this day
    const eventTypes = [...new Set(events.map(e => e.type))];

    return (
        <motion.div
            onClick={() => onClick?.(day)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
                aspect-square md:aspect-auto md:h-36 border p-1.5 md:p-2 relative
                transition-all cursor-pointer group flex flex-col rounded-lg
                ${isToday
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-400 shadow-lg ring-2 ring-yellow-300'
                    : hasEvents
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 hover:shadow-lg hover:border-green-400'
                        : 'bg-amber-50/50 border-amber-100 hover:bg-white/80'
                }
            `}
        >
            {/* Pulse Animation for Days with Events */}
            {hasEvents && (
                <motion.div
                    className="absolute inset-0 rounded-lg bg-green-400/10"
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Day Number and Event Count */}
            <div className="flex justify-between items-start mb-1 relative z-10">
                <motion.span
                    className={`
                        text-xs md:text-sm font-bold w-6 h-6 md:w-7 md:h-7
                        flex items-center justify-center rounded-full
                        ${isToday
                            ? 'bg-red-500 text-white shadow-md ring-2 ring-red-200'
                            : hasEvents
                                ? 'bg-green-600 text-white shadow-sm'
                                : 'text-amber-800/70'
                        }
                    `}
                    style={{ fontFamily: 'Georgia, serif' }}
                    whileHover={{ scale: 1.1 }}
                >
                    {day}
                </motion.span>

                {/* Event Count Badge */}
                {events.length > 1 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-600 text-white rounded-full">
                        {events.length}
                    </span>
                )}
            </div>

            {/* Event Type Icons (Mobile: Small dots, Desktop: Icons) */}
            <div className="flex-1 overflow-hidden relative z-10">
                {/* Mobile: Colored Dots */}
                <div className="flex md:hidden flex-wrap gap-1 mt-1">
                    {eventTypes.slice(0, 4).map((type, idx) => {
                        const config = EVENT_TYPE_CONFIG[type] || EVENT_TYPE_CONFIG.community;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`w-2 h-2 rounded-full ${config.bg} border ${config.border}`}
                            />
                        );
                    })}
                    {eventTypes.length > 4 && (
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                </div>

                {/* Desktop: Event Pills with Icons */}
                <div className="hidden md:block space-y-1">
                    {events.slice(0, 3).map((event, idx) => {
                        const config = EVENT_TYPE_CONFIG[event.type] || EVENT_TYPE_CONFIG.community;
                        const IconComponent = config.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`
                                    text-[10px] px-2 py-1 rounded-md font-bold truncate
                                    shadow-sm border flex items-center gap-1
                                    ${config.bg} ${config.border}
                                `}
                            >
                                <IconComponent size={10} className={config.color} />
                                <span className="truncate text-slate-700">{event.title}</span>
                            </motion.div>
                        );
                    })}
                    {events.length > 3 && (
                        <div className="text-[10px] text-slate-500 font-medium pl-1">
                            +{events.length - 3} more
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Indicator */}
            <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                    className="p-1 bg-green-600 rounded-full text-white"
                    whileHover={{ scale: 1.1 }}
                >
                    <Plus size={12} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export { CalendarDayCell, EventTypeIcon, EVENT_TYPE_CONFIG };
export default CalendarDayCell;
