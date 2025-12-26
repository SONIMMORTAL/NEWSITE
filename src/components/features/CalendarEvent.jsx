import React from 'react';
import { MapPin, HandHeart } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const CalendarEvent = ({ event, monthName, onHostClick }) => (
    <div className="relative pl-24 pb-12 last:pb-0">
        <div className="absolute left-0 w-16 text-right font-bold text-slate-400 pt-1">
            {monthName.substring(0, 3).toUpperCase()} {event.day}
        </div>
        <div className={`absolute left-[29px] w-4 h-4 rounded-full border-4 border-white shadow-sm ${event.type === 'community' ? 'bg-green-600' : 'bg-yellow-500'}`}></div>
        <GlassCard className="p-6 border border-green-100 group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-green-900 text-lg">{event.title}</h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-green-50 text-green-700">{event.time}</span>
            </div>
            <p className="text-slate-600 text-sm mb-3 flex items-center gap-2"><MapPin size={14} className="text-yellow-600" /> {event.location}</p>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{event.description}</p>
            <div className="flex justify-between items-center mt-4 border-t border-slate-100 pt-3">
                <span className="text-[10px] uppercase font-bold text-green-800 bg-green-100 px-2 py-1 rounded">
                    {event.type}
                </span>
                <button
                    onClick={() => onHostClick(event.title)}
                    className="text-xs font-bold text-slate-400 hover:text-green-700 flex items-center gap-1 transition-colors"
                >
                    <HandHeart size={14} /> Host/Support this Event
                </button>
            </div>
        </GlassCard>
    </div>
);

export default CalendarEvent;
