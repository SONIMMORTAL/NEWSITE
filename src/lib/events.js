import { CALENDAR_DATA_2026, MONTHLY_THEMES } from '../data';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Event types that reflect the organization's actual mission. The calendar
 * also carries generic novelty observances (Rubber Duckie Day, International
 * Beer Day) which are fine in the full calendar but shouldn't be what a
 * first-time visitor sees featured on the homepage.
 */
const PRIORITY_TYPES = ['community', 'youth', 'health', 'education', 'environment'];

/**
 * Returns the next `limit` events starting from today, rolling into
 * following months when the current month runs out. Mission-relevant types
 * are preferred; anything else backfills only if there aren't enough.
 */
export const getUpcomingEvents = (limit = 4, today = new Date()) => {
    const startMonth = today.getMonth();
    const startDay = today.getDate();
    const preferred = [];
    const fallback = [];

    for (let offset = 0; offset < 12; offset += 1) {
        const monthIndex = (startMonth + offset) % 12;
        const events = CALENDAR_DATA_2026[monthIndex] || [];
        const eligible = offset === 0 ? events.filter((e) => e.day >= startDay) : events;

        for (const event of eligible) {
            const decorated = {
                ...event,
                monthIndex,
                monthName: MONTH_NAMES[monthIndex],
                monthShort: MONTH_NAMES[monthIndex].slice(0, 3),
            };
            if (PRIORITY_TYPES.includes(event.type)) preferred.push(decorated);
            else fallback.push(decorated);
        }

        if (preferred.length >= limit) break;
    }

    return [...preferred, ...fallback].slice(0, limit);
};

/** The theme block for the current month, used to frame the events preview. */
export const getCurrentTheme = (today = new Date()) => {
    const monthIndex = today.getMonth();
    return {
        ...MONTHLY_THEMES[monthIndex],
        monthIndex,
        monthName: MONTH_NAMES[monthIndex],
    };
};
