import React, { useState, useEffect } from 'react';
import {
    Heart,
    Calendar as CalendarIcon,
    Users,
    Menu,
    X,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Utensils,
    ChevronRight,
    TrendingUp,
    ShieldCheck,
    Baby,
    Briefcase,
    BookOpen,
    ShoppingBag,
    CreditCard,
    Clock,
    Activity,
    Trophy,
    HandHeart,
    Smile,
    ChevronLeft,
    CheckCircle2,
    Lightbulb,
    Target,
    Sparkles,
    Loader2,
    PenTool,
    ChevronDown,
    ChevronUp,
    Plus,
    CalendarPlus,
    Trash2,
    Send,
    Newspaper,
    Leaf,
    Globe,
    Flag, // Added for the Pledge icon match
    QrCode // Added for Cash App
} from 'lucide-react';

const apiKey = ""; // API Key injected at runtime

// --- Helper: Gemini API Call ---
const callGemini = async (prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    const fetchWithRetry = async (attempt = 0) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (e) {
            if (attempt < 5) {
                await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
                return fetchWithRetry(attempt + 1);
            }
            throw e;
        }
    };

    try {
        return await fetchWithRetry();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting right now. Please try again later.";
    }
};

// --- Assets ---
const ASSETS = {
    logo: "https://devtestserver.com/publicadvocate/wp-content/uploads/2025/10/Group-24.png",
    heroBg: "/landing.jpg",
    youthImg: "/youthserv.jpg",
    impactImg: "/highimpact.jpg",
    volunteerImg: "/highimpact.jpg",
    foodPantryImg: "/totegreen.jpg",
    communityImg: "https://devtestserver.com/publicadvocate/wp-content/uploads/2025/10/Mozambique_community-volunteers_RS65529.jpg",
    hoodie: "/hoodie.jpg",
    shirt1: "/shirt1.jpg",
    shirt2: "/shirt2.jpg",
    shirt3: "/shirt3.jpg",
    shirt4: "/shirt4.jpg",
    model1: "/model1.jpg",
    tote1: "/totebag.jpg",
    tote2: "/totegreen.jpg",
    socialIcon: "/social.jpg",
    youthIcon: "/youthserv.jpg"
};

// --- Modern UI Components ---

const GlassCard = ({ children, className = "", hoverEffect = true, onClick }) => (
    <div
        onClick={onClick}
        className={`
    glass-panel rounded-2xl p-6 
    ${hoverEffect ? 'glass-card-hover' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `}>
        {children}
    </div>
);

const BentoGrid = ({ className, children }) => (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] ${className}`}>
        {children}
    </div>
);

const BentoItem = ({ className, children, span = 1, onClick }) => (
    <div
        onClick={onClick}
        className={`
    relative overflow-hidden rounded-3xl p-6 
    bg-white/90 backdrop-blur-xl border border-white/50 shadow-sm 
    hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
    ${span === 2 ? 'md:col-span-2' : span === 3 ? 'md:col-span-3' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `}>
        {children}
    </div>
);

const SectionHeader = ({ pill, title, description, align = "left" }) => (
    <div className={`flex flex-col gap-4 mb-12 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs font-bold uppercase tracking-wider border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            {pill}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight leading-tight">
            {title}
        </h2>
        {description && (
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                {description}
            </p>
        )}
    </div>
);

const AnimatedStat = ({ value, label, color = "text-yellow-400" }) => (
    <div className="flex flex-col items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-default">
        <span className={`text-3xl font-black ${color} tracking-tight`}>{value}</span>
        <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest mt-1">{label}</span>
    </div>
);

const NewsCard = ({ title, date, tag, image }) => (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-green-100 shadow-sm hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
        <div className="h-48 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide text-green-800 shadow-sm">
                {tag}
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="text-xs text-green-600/70 mb-2 font-medium uppercase tracking-wider">{date}</div>
            <h4 className="font-bold text-green-900 text-lg leading-snug group-hover:text-yellow-600 transition-colors mb-4">{title}</h4>
            <div className="mt-auto flex items-center text-xs font-bold text-yellow-600 uppercase tracking-wide group/btn">
                Read Article <ArrowRight size={14} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
            </div>
        </div>
    </div>

);

const GetInvolvedModal = ({ isOpen, onClose, initialType = 'volunteer', initialEvent = '' }) => {
    const [type, setType] = useState(initialType);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        venueType: 'onsite',
        address: '',
        date: '',
        resources: {
            housing: false,
            pantry: false,
            books: false,
            toys: false,
            clothes: false
        },
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            setType(initialType);
            setFormData(prev => ({ ...prev, message: initialEvent ? `I'm interested in hosting/supporting: ${initialEvent}` : '' }));
        }
    }, [isOpen, initialType, initialEvent]);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        if (name.startsWith('resource_')) {
            const resourceName = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                resources: { ...prev.resources, [resourceName]: checked }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Get Involved: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        let body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0A%0D%0AInvolvement Type: ${type}%0D%0A`;

        if (type === 'host') {
            body += `Venue: ${formData.venueType === 'onsite' ? 'I have a venue' : 'I need a venue'}%0D%0A`;
            if (formData.venueType === 'onsite') body += `Venue Address: ${formData.address}%0D%0A`;
            body += `Preferred Date/Time: ${formData.date}%0D%0A`;
        } else if (type === 'donate') {
            const resources = Object.entries(formData.resources)
                .filter(([_, checked]) => checked)
                .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                .join(', ');
            body += `Resources Offering: ${resources}%0D%0A`;
        }

        body += `Message: ${formData.message}`;
        window.location.href = `mailto:publicadvocatessocialsociety@gmail.com?subject=${subject}&body=${body}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-green-900 p-6 flex justify-between items-center text-white">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <HandHeart className="text-yellow-400" /> Get Involved
                    </h3>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                            {['volunteer', 'donate', 'host'].map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setType(t)}
                                    className={`py-2 px-4 rounded-lg text-sm font-bold capitalize transition-all ${type === t ? 'bg-white shadow-sm text-green-800' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {t === 'host' ? 'Host Event' : t}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600 uppercase">Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500" placeholder="Your Name" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600 uppercase">Phone</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500" placeholder="(555) 555-5555" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase">Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500" placeholder="you@example.com" />
                        </div>

                        {type === 'host' && (
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4 animate-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-blue-800 uppercase">Venue Details</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="venueType" value="onsite" checked={formData.venueType === 'onsite'} onChange={handleChange} className="text-green-600 focus:ring-green-500" />
                                            I have a venue
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="venueType" value="needs" checked={formData.venueType === 'needs'} onChange={handleChange} className="text-green-600 focus:ring-green-500" />
                                            Active Search
                                        </label>
                                    </div>
                                </div>
                                {formData.venueType === 'onsite' && (
                                    <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Venue Address..." />
                                )}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-blue-800 uppercase">Preferred Date & Time</label>
                                    <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                        )}

                        {type === 'donate' && (
                            <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 space-y-3 animate-in slide-in-from-top-2">
                                <label className="text-xs font-bold text-yellow-800 uppercase block mb-2">I can donate:</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['housing', 'pantry', 'books', 'toys', 'clothes'].map(r => (
                                        <label key={r} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-yellow-100/50 p-1.5 rounded transition-colors">
                                            <input type="checkbox" name={`resource_${r}`} checked={formData.resources[r]} onChange={handleChange} className="rounded text-yellow-600 focus:ring-yellow-500" />
                                            {r.charAt(0).toUpperCase() + r.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase">Additional Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-green-500 h-24 resize-none" placeholder="Tell us more about how you'd like to help..." />
                        </div>

                        <button type="submit" className="w-full bg-green-900 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            Send Inquiry <ArrowRight size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Calendar Data & Logic ---
const CALENDAR_DATA_2026 = {
    // September 2025
    8: [
        { day: 1, title: "Back to Wellness Campaign", location: "Global", time: "All Day", type: "health", description: "Month-long focus on wellness, preparedness, and back-to-school energy." },
        { day: 5, title: "Intl Day of Charity", location: "Global", time: "All Day", type: "community", description: "Highlight charitable work, donation drives, and partner nonprofits." },
        { day: 8, title: "Intl Literacy Day", location: "Local Library", time: "All Day", type: "education", description: "Promote reading, education access, and learning resources." },
        { day: 10, title: "Suicide Prevention Day", location: "Global", time: "All Day", type: "health", description: "Mental health awareness, helplines, and destigmatizing outreach." },
        { day: 21, title: "Intl Day of Peace", location: "Global", time: "All Day", type: "community", description: "Content focusing on conflict resolution, community peace, and nonviolence." }
    ],
    // October 2025
    9: [
        { day: 1, title: "Health & Safety Campaign", location: "Global", time: "All Day", type: "health", description: "Month-long blend of breast cancer awareness, safety education, and appreciation." },
        { day: 5, title: "World Teachers' Day", location: "Global", time: "All Day", type: "education", description: "Spotlight educators, mentors, and teaching programs." },
        { day: 10, title: "World Mental Health Day", location: "Global", time: "All Day", type: "health", description: "Mental health check-ins, coping tools, and support resources." },
        { day: 16, title: "World Food Day", location: "Pantry", time: "All Day", type: "community", description: "Food security, nutrition, and community meals content." },
        { day: 17, title: "End Poverty Day", location: "Global", time: "All Day", type: "community", description: "Campaigns around anti-poverty work, policy, and lived experience voices." }
    ],
    // November 2025
    10: [
        { day: 1, title: "Gratitude & Giving Campaign", location: "Global", time: "All Day", type: "community", description: "Focus on gratitude, caregivers, and building toward Giving Tuesday." },
        { day: 13, title: "World Kindness Day", location: "Global", time: "All Day", type: "community", description: "Random acts of kindness, community shoutouts, and positivity." },
        { day: 14, title: "World Diabetes Day", location: "Global", time: "All Day", type: "health", description: "Education on diabetes prevention, treatment, and lived stories." },
        { day: 20, title: "World Children's Day", location: "Kids Depo", time: "All Day", type: "youth", description: "Focus on children's rights, safety, and education." },
        { day: 25, title: "Giving Season Kickoff", location: "Global", time: "All Day", type: "business", description: "Kickoff for end-of-year fundraising and gratitude posts." }
    ],
    // December 2025
    11: [
        { day: 1, title: "Holiday Reflection Campaign", location: "Global", time: "All Day", type: "community", description: "Wrap the year with reflection content and gratitude." },
        { day: 1, title: "World AIDS Day", location: "Global", time: "All Day", type: "health", description: "HIV/AIDS awareness, history, and access to treatment resources." },
        { day: 10, title: "Human Rights Day", location: "Global", time: "All Day", type: "community", description: "Content around human rights, justice work, and advocacy." },
        { day: 25, title: "Christmas", location: "Global", time: "All Day", type: "culture", description: "Seasonal message, holiday gratitude, and family/community themes." },
        { day: 26, title: "Kwanzaa Begins", location: "Global", time: "All Day", type: "culture", description: "Celebrate Kwanzaa principles and cultural heritage." }
    ],
    // January 2026
    0: [
        { day: 1, title: "Fresh Start Campaign", location: "Global", time: "All Day", type: "health", description: "New year focus on physical health, mental wellness, and planning." },
        { day: 1, title: "New Year's Day", location: "Global", time: "All Day", type: "culture", description: "New year message, vision setting, and announcements." },
        { day: 17, title: "World Religion Day", location: "Global", time: "All Day", type: "culture", description: "Interfaith understanding, respect, and dialogue." },
        { day: 18, title: "MLK Day of Service", location: "Community Center", time: "10:00 AM", type: "community", description: "Service projects inspired by MLK's legacy." },
        { day: 28, title: "Data Privacy Day", location: "Online", time: "All Day", type: "business", description: "Digital privacy tips, cybersecurity hygiene, and policy education." }
    ],
    // February 2026
    1: [
        { day: 1, title: "Heart Health & Black History", location: "Global", time: "All Day", type: "culture", description: "Blend Black History Month storytelling with heart health content." },
        { day: 4, title: "World Cancer Day", location: "Global", time: "All Day", type: "health", description: "Cancer awareness, prevention, and survivorship stories." },
        { day: 9, title: "Safer Internet Day", location: "Online", time: "All Day", type: "youth", description: "Online safety, digital literacy, and cyberbullying prevention." },
        { day: 20, title: "Social Justice Day", location: "City Hall", time: "11:00 AM", type: "community", description: "Highlight structural inequities, activism, and policy work." },
        { day: 28, title: "Rare Disease Day", location: "Global", time: "All Day", type: "health", description: "Spotlight rare disease communities and research." }
    ],
    // March 2026
    2: [
        { day: 1, title: "Nutrition & Women's History", location: "Global", time: "All Day", type: "health", description: "Tie together Nutrition Month and Women's History Month." },
        { day: 3, title: "World Wildlife Day", location: "Global", time: "All Day", type: "environment", description: "Biodiversity, conservation, and wildlife protection messages." },
        { day: 8, title: "Intl Women's Day", location: "Community Center", time: "2:00 PM", type: "community", description: "Celebrate women leaders, history, and current work." },
        { day: 22, title: "World Water Day", location: "Global", time: "All Day", type: "environment", description: "Clean water access, climate impacts, and infrastructure." },
        { day: 27, title: "Earth Hour", location: "Global", time: "8:30 PM", type: "environment", description: "Lights-off symbolic action and environmental education." }
    ],
    // April 2026
    3: [
        { day: 1, title: "Earth & Volunteerism", location: "Global", time: "All Day", type: "environment", description: "Blend Earth Month, stress awareness, and volunteer appreciation." },
        { day: 2, title: "Autism Awareness Day", location: "Global", time: "All Day", type: "health", description: "Autism acceptance, support, and neurodiversity education." },
        { day: 7, title: "World Health Day", location: "Global", time: "All Day", type: "health", description: "Global health challenges and local resource promotion." },
        { day: 22, title: "Earth Day", location: "Community Garden", time: "10:00 AM", type: "environment", description: "Cleanups, climate awareness, and sustainability actions." },
        { day: 23, title: "World Book Day", location: "Local Library", time: "All Day", type: "education", description: "Reading drives, book lists, and literacy partners." }
    ],
    // May 2026
    4: [
        { day: 1, title: "Nurses & Mental Health", location: "Global", time: "All Day", type: "health", description: "Honor nurses while pushing mental health and fitness content." },
        { day: 3, title: "Press Freedom Day", location: "Global", time: "All Day", type: "culture", description: "Free press, information access, and media literacy." },
        { day: 8, title: "World Fair Trade Day", location: "Global", time: "All Day", type: "business", description: "Ethical sourcing, fair wages, and global trade justice." },
        { day: 17, title: "IDAHOBIT", location: "Global", time: "All Day", type: "community", description: "LGBTQ+ inclusion, rights, and anti-violence work." },
        { day: 22, title: "Biological Diversity Day", location: "Global", time: "All Day", type: "environment", description: "Ecosystems, endangered species, and biodiversity education." }
    ],
    // June 2026
    5: [
        { day: 1, title: "Pride & Outdoors", location: "Global", time: "All Day", type: "culture", description: "Blend Pride Month content with outdoor recreation and safety." },
        { day: 5, title: "World Environment Day", location: "Global", time: "All Day", type: "environment", description: "Environmental action, cleanups, and climate focus." },
        { day: 8, title: "World Oceans Day", location: "Global", time: "All Day", type: "environment", description: "Ocean health, plastic pollution, and coastal communities." },
        { day: 20, title: "World Refugee Day", location: "Global", time: "All Day", type: "community", description: "Stories, rights, and support for displaced people." },
        { day: 26, title: "Gay Pride Day", location: "Global", time: "All Day", type: "culture", description: "Celebrate LGBTQ+ communities and Pride events." }
    ],
    // July 2026
    6: [
        { day: 1, title: "Summer Fun & Families", location: "Global", time: "All Day", type: "family", description: "Picnics, reunions, family wellness, and outdoor safety." },
        { day: 11, title: "World Population Day", location: "Global", time: "All Day", type: "community", description: "Population growth, resources, and planning content." },
        { day: 28, title: "World Hepatitis Day", location: "Global", time: "All Day", type: "health", description: "Hepatitis prevention, testing, and treatment awareness." },
        { day: 29, title: "Intl Tiger Day", location: "Global", time: "All Day", type: "environment", description: "Wildlife conservation and big cat protection." },
        { day: 30, title: "End Human Trafficking", location: "Global", time: "All Day", type: "community", description: "Anti-trafficking education, survivor support, and policy work." }
    ],
    // August 2026
    7: [
        { day: 1, title: "Back-to-School Campaign", location: "Global", time: "All Day", type: "family", description: "Prepare families for school return: vaccines, vision checks, supplies." },
        { day: 10, title: "World Lion Day", location: "Global", time: "All Day", type: "environment", description: "Lion conservation and wildlife awareness content." },
        { day: 12, title: "Intl Youth Day", location: "Kids Depo", time: "2:00 PM", type: "youth", description: "Youth leadership, education, and empowerment stories." },
        { day: 17, title: "National Nonprofit Day", location: "Global", time: "All Day", type: "business", description: "Highlight nonprofit partners, impact stats, and supporter appreciation." },
        { day: 19, title: "World Humanitarian Day", location: "Global", time: "All Day", type: "community", description: "Honor humanitarian workers and crisis response efforts." }
    ]
};

const MONTHLY_THEMES = {
    0: { name: "New Year, New Beginnings", gradient: "from-blue-900 via-sky-800 to-indigo-900", accent: "bg-blue-100 text-blue-800 border-blue-200", highlight: "bg-blue-50/80" },
    1: { name: "Heart Health & Black History", gradient: "from-red-950 via-red-800 to-orange-900", accent: "bg-red-100 text-red-800 border-red-200", highlight: "bg-red-50/80" },
    2: { name: "Nutrition & Social Work", gradient: "from-emerald-900 via-green-800 to-teal-900", accent: "bg-emerald-100 text-emerald-800 border-emerald-200", highlight: "bg-emerald-50/80" },
    3: { name: "Earth & Volunteerism", gradient: "from-green-900 via-lime-800 to-emerald-950", accent: "bg-lime-100 text-lime-800 border-lime-200", highlight: "bg-lime-50/80" },
    4: { name: "Mental Health & Fitness", gradient: "from-teal-900 via-cyan-800 to-blue-950", accent: "bg-cyan-100 text-cyan-800 border-cyan-200", highlight: "bg-cyan-50/80" },
    5: { name: "Safety & Outdoors", gradient: "from-orange-800 via-amber-700 to-yellow-900", accent: "bg-orange-100 text-orange-800 border-orange-200", highlight: "bg-orange-50/80" },
    6: { name: "Social Wellness & Family", gradient: "from-indigo-900 via-violet-800 to-purple-900", accent: "bg-indigo-100 text-indigo-800 border-indigo-200", highlight: "bg-indigo-50/80" },
    7: { name: "Back to School & Immunization", gradient: "from-yellow-800 via-amber-700 to-orange-900", accent: "bg-yellow-100 text-yellow-800 border-yellow-200", highlight: "bg-yellow-50/80" },
    8: { name: "Recovery & Preparedness", gradient: "from-slate-900 via-zinc-800 to-neutral-900", accent: "bg-slate-100 text-slate-800 border-slate-200", highlight: "bg-slate-50/80" },
    9: { name: "Breast Cancer Awareness", gradient: "from-pink-900 via-rose-800 to-fuchsia-900", accent: "bg-pink-100 text-pink-800 border-pink-200", highlight: "bg-pink-50/80" },
    10: { name: "Diabetes & Gratitude", gradient: "from-purple-900 via-fuchsia-900 to-indigo-950", accent: "bg-purple-100 text-purple-800 border-purple-200", highlight: "bg-purple-50/80" },
    11: { name: "Giving & Human Rights", gradient: "from-red-900 via-green-900 to-slate-900", accent: "bg-red-100 text-red-800 border-red-200", highlight: "bg-red-50/80" }
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

// --- Reusable Components ---
const SpiralBinding = () => (
    <div className="absolute -top-4 left-0 right-0 h-8 flex justify-evenly items-end z-20 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-8 bg-gradient-to-b from-gray-400 via-gray-100 to-gray-400 rounded-full shadow-md border border-gray-400 transform -rotate-3" />
        ))}
    </div>
);

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

// --- Pages ---

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

const ContactModal = ({ isOpen, onClose, initialSubject = 'Getting Involved' }) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: initialSubject, message: '' });

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, subject: initialSubject }));
        }
    }, [isOpen, initialSubject]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:publicadvocatessocialsociety@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-green-950/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-green-100">
                <div className="bg-green-900 p-6 flex justify-between items-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/10" />
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                            <Mail size={20} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">Get Involved</h3>
                            <p className="text-green-100 text-xs">Send us a message</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Your Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Subject</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            >
                                <option>Getting Involved</option>
                                <option>Business Roundtable</option>
                                <option>Kids Depo Programs</option>
                                <option>Donation Inquiry</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Message</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all resize-none"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-base hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <Send size={18} /> Send Message
                    </button>
                    <p className="text-center text-[10px] text-slate-400">
                        This will open your default email client to send the message.
                    </p>
                </form>
            </div>
        </div>
    );
};

const ProgramsPage = ({ openContact }) => (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
        <SectionHeader
            pill="Core Departments"
            title="Services designed for real life."
            description="Structured support for every stage of growth, from childhood to entrepreneurship."
            align="center"
        />

        <BentoGrid>
            {/* Business Roundtable - Large Feature Card */}
            <BentoItem span={3} className="relative group overflow-hidden border-0 !p-0">
                <div className="absolute inset-0 bg-green-900 z-0">
                    <img src={ASSETS.impactImg} className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/90 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start md:items-center">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                            <Briefcase size={12} /> Economic Power
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white">Business Roundtable</h3>
                        <p className="text-green-100 text-lg leading-relaxed max-w-xl">
                            Empowering local entrepreneurs through bi-weekly strategy groups. Gain accountability, financial literacy, and marketing tools to scale your business.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {["Peer-to-Peer Accountability", "Sales Funnels", "Financial Planning"].map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white border border-white/10">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col gap-4 min-w-[200px]">
                        <button onClick={() => openContact('Business Roundtable')} className="w-full py-4 bg-yellow-400 text-green-950 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20">
                            Join Roundtable <ArrowRight size={18} />
                        </button>
                        <div className="flex items-center justify-center gap-2 text-green-200/60 text-xs font-medium">
                            <Users size={14} /> Bi-Weekly Sessions
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Kids Depo */}
            <BentoItem span={2} className="group cursor-pointer relative overflow-hidden text-white border-none" onClick={() => openContact('Kids Depo')}>
                <div className="absolute inset-0 bg-blue-900 z-0">
                    <img src={ASSETS.youthImg} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Kids Depo Background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-transparent"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                            <img src={ASSETS.youthIcon} className="w-full h-full object-cover" alt="Youth Icon" />
                        </div>
                        <span className="px-3 py-1 bg-white/20 text-white backdrop-blur-md rounded-lg text-xs font-bold border border-white/10">Ages 5-18</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Kids Depo Services</h3>
                        <p className="text-blue-100/90 mb-6 leading-relaxed max-w-md text-sm">
                            Home of <strong>DreamKids</strong> & <strong>BossyBabies</strong>. Creating rites of passage curriculums for troubled and at-risk youth.
                        </p>
                        <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                            Learn More <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Social Services */}
            <BentoItem className="group cursor-pointer relative overflow-hidden text-white border-none !bg-green-900" onClick={() => openContact('Social Services')}>
                <div className="absolute inset-0 z-0">
                    <img src={ASSETS.volunteerImg} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Social Services Background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 to-green-900/60"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden mb-4 bg-white/10 border border-white/20 shadow-lg">
                        <img src={ASSETS.socialIcon} className="w-full h-full object-cover" alt="Social Icon" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Social Services</h3>
                        <p className="text-green-50/80 text-sm leading-relaxed mb-4">
                            High-Impact Volunteerism. Neighbor to Neighbor counseling and health awareness fairs.
                        </p>
                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-green-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Sports */}
            <BentoItem className="group cursor-pointer relative overflow-hidden text-white border-none !bg-green-900" onClick={() => openContact('Sports & Rec')}>
                <div className="absolute inset-0 z-0">
                    <img src={ASSETS.heroBg} className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" alt="Sports Background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/80 to-green-900/60 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="p-3 bg-white/10 rounded-2xl w-fit mb-4 border border-white/10 backdrop-blur-sm">
                        <Trophy size={24} className="text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-50">Sports & Rec</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                            Engaging the community through safe, fun, and educational sporting events.
                        </p>
                        <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-green-900 transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </BentoItem>

            {/* Join CTA */}
            <BentoItem span={2} className="border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer" onClick={() => openContact('General Inquiry')}>
                <div className="p-4 bg-slate-50 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Mail size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Have Questions?</h3>
                <p className="text-slate-500 text-sm mb-0">Contact us directly to get involved.</p>
            </BentoItem>
        </BentoGrid>
    </div>
);

const ProductsPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <SectionHeader
            pill="Store"
            title="Shop & Support"
            description="Support our cause by purchasing official merchandise and memberships. All proceeds go directly to our community programs."
            align="center"
        />
        <BentoGrid>
            <BentoItem span={2} className="bg-green-900 text-white flex flex-col justify-center relative overflow-hidden group min-h-[400px]">
                {/* Background Image */}
                <img src="/totegreen.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Annual Membership Support" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-green-950/85 mix-blend-multiply transition-opacity duration-300" />

                {/* Decorative Icon (Optional - keeping subtle) */}
                <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12 z-0">
                    <ShoppingBag size={200} className="text-white mix-blend-overlay" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-green-900 text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles size={12} /> Premium Member
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Annual Membership</h3>
                        <p className="text-green-100 mb-6 max-w-sm">Join the inner circle. Get exclusive updates, voting rights, and priority access to events.</p>
                        <button className="bg-white text-green-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg">
                            Join for $50/yr
                        </button>
                    </div>
                </div>
            </BentoItem>

            <BentoItem className="bg-white flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src={ASSETS.hoodie} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                    <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-green-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-50"><Plus size={16} /></button>
                </div>
                <h3 className="font-bold text-green-900 text-lg">Advocate Hoodie</h3>
                <p className="text-slate-500 text-xs mb-3">Premium cotton blend</p>
                <div className="mt-auto flex items-center justify-between w-full px-2">
                    <span className="font-bold text-green-700">$45.00</span>
                </div>
            </BentoItem>

            <BentoItem className="bg-white flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src={ASSETS.shirt1} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                    <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-green-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-50"><Plus size={16} /></button>
                </div>
                <h3 className="font-bold text-green-900 text-lg">Community Tee</h3>
                <p className="text-slate-500 text-xs mb-3">100% Organic Cotton</p>
                <div className="mt-auto flex items-center justify-between w-full px-2">
                    <span className="font-bold text-green-700">$25.00</span>
                </div>
            </BentoItem>

            <BentoItem className="bg-white flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src={ASSETS.tote1} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                    <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-green-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-50"><Plus size={16} /></button>
                </div>
                <h3 className="font-bold text-green-900 text-lg">Canvas Tote</h3>
                <p className="text-slate-500 text-xs mb-3">Durable & Spacious</p>
                <div className="mt-auto flex items-center justify-between w-full px-2">
                    <span className="font-bold text-green-700">$15.00</span>
                </div>
            </BentoItem>

            <BentoItem className="bg-white flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src={ASSETS.model1} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-green-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-50"><Plus size={16} /></button>
                </div>
                <h3 className="font-bold text-green-900 text-lg">Youth Tee</h3>
                <p className="text-slate-500 text-xs mb-3">Future Leader</p>
                <div className="mt-auto flex items-center justify-between w-full px-2">
                    <span className="font-bold text-green-700">$20.00</span>
                </div>
            </BentoItem>
        </BentoGrid>
    </div>
);

const DonationsPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-[800px] mx-auto">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-yellow-600 fill-current animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-green-900 mb-4">Make a Donation</h1>
            <p className="text-slate-500 mb-10 max-w-md mx-auto">
                Your contribution directly funds our food pantry, youth cohorts, and community workshops.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {['$25', '$50', '$100'].map((amt) => (
                    <button key={amt} className="py-4 rounded-xl border-2 border-green-100 font-bold text-xl text-green-800 hover:border-green-600 hover:bg-green-50 transition-colors">
                        {amt}
                    </button>
                ))}
            </div>

            <div className="space-y-4 mb-8">
                <input type="number" placeholder="Enter Custom Amount" className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-green-600 text-center text-lg font-medium" />
                <button className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <CreditCard size={20} /> Donate Securely
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} /> Secure SSL Payment
            </div>
        </div>

        {/* Cash App Section */}
        <GlassCard className="bg-[#00D632]/5 border-[#00D632]/20 flex flex-col items-center text-center p-8 max-w-md mx-auto w-full mt-8">
            <div className="w-16 h-16 bg-[#00D632] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#00D632]/20">
                <span className="text-white font-bold text-3xl">$</span>
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">Pay with Cash App</h2>
            <p className="text-slate-600 mb-8 max-w-xs">
                Support us directly. Send your donation to our official Cash App handle.
            </p>

            <div className="flex flex-col gap-4 w-full">
                <div className="bg-white py-4 px-6 rounded-xl border border-green-100 font-mono text-2xl font-bold text-slate-800 flex items-center justify-center gap-3 shadow-sm">
                    <span className="text-[#00D632]">$</span>PassInc5
                </div>
                <a
                    href="https://cash.app/$PassInc5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00D632] text-white py-4 rounded-xl font-bold hover:bg-[#00b82b] transition-all shadow-lg shadow-[#00D632]/20 hover:shadow-[#00D632]/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    Open Cash App <ArrowRight size={18} />
                </a>
            </div>
        </GlassCard>
    </div>
);

const AboutPage = ({ openGetInvolved }) => {
    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto space-y-16">
            <SectionHeader
                pill="Our Identity"
                title="Building Bridges, not Walls."
                description="Every member of Public Advocate is dedicated and passionate about enriching the lives of our members, their families, and the communities we represent. In helping build bridges between community residents, leaders, and businesses, we strengthen us all."
                align="center"
            />

            {/* Bento Grid: Mission & Pledge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Col 1: Our Mission (Span 7 - Wider text area) */}
                <GlassCard className="md:col-span-7 h-full bg-white/80 border-green-100 flex flex-col justify-center p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                    <div className="relative z-10">
                        <h3 className="font-black text-3xl text-green-900 mb-6 flex items-center gap-3">
                            <Target size={32} className="text-yellow-600" /> Our Mission
                        </h3>
                        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                            To enlighten ourselves, alongside our youth & the community. By volunteering, servicing and providing programs such as:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Information Resource Room",
                                "Food, Clothes, Books & Toy Drives",
                                "Safe, Fun & Educational Events",
                                "Health Awareness Fairs & Fundraisers",
                                "Abuse Prevention & Counseling"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold bg-white/50 p-2 rounded-lg border border-green-50 shadow-sm">
                                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </GlassCard>

                {/* Col 2: Our Pledge (Span 5 - Visual Focus) */}
                <div className="md:col-span-5 relative group h-full min-h-[450px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                    <img src={ASSETS.volunteerImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Pledge" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/40 to-transparent mix-blend-multiply opacity-90" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <div className="mb-auto pt-4">
                            <ShieldCheck size={56} className="text-yellow-400 drop-shadow-lg" />
                        </div>
                        <h3 className="text-3xl font-black mb-6 leading-tight">Our Pledge</h3>
                        <p className="text-green-50 text-xl leading-relaxed italic font-serif border-l-4 border-yellow-400 pl-6 backdrop-blur-sm">
                            "We believe supporting the community as a whole provides opportunities to build a stronger relationship that can strengthen us all."
                        </p>
                    </div>
                </div>
            </div>

            {/* Full Width Banner: Get Involved */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-green-950 isolate">
                {/* Background Decoration */}
                <div className="absolute inset-0">
                    <img src={ASSETS.communityImg} className="w-full h-full object-cover opacity-20" alt="Background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/95 to-green-900/80" />
                </div>

                <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-5 gap-12 p-8 md:p-12 lg:p-16 items-center">
                    {/* Text Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-xs uppercase tracking-widest">
                            <HandHeart size={14} /> Join the Movement
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Make a Difference <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">Today</span>
                        </h2>
                        <p className="text-lg text-green-100/80 leading-relaxed">
                            Your support fuels our mission. Whether it's time, resources, or a venue—every contribution helps us build a stronger community together.
                        </p>
                    </div>

                    {/* Action Cards Grid */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Donate to Resource Room", icon: "🏠", type: "donate", desc: "Housing & Pantry items" },
                            { label: "Host a Safe Event", icon: "🎉", type: "host", desc: "Venues or planning" },
                            { label: "Community Drives", icon: "🧸", type: "donate", desc: "Food, clothes, toys" },
                            { label: "Volunteer Counseling", icon: "🤝", type: "volunteer", desc: "Support services" }
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => openGetInvolved(action.type)}
                                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 text-left transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-3xl filter drop-shadow-md">{action.icon}</span>
                                    <ArrowRight className="text-white/40 group-hover:text-yellow-400 transition-colors" size={20} />
                                </div>
                                <h4 className="font-bold text-white text-lg mb-1">{action.label}</h4>
                                <p className="text-sm text-green-200/60 font-medium">{action.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FoodPantryPage = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateRecipe = async () => {
        if (!ingredients.trim()) return;
        setLoading(true);
        const prompt = `You are a helpful chef for a community food pantry. The user has these ingredients: "${ingredients}". Suggest a simple, nutritious, and tasty recipe.`;
        const result = await callGemini(prompt);
        setRecipe(result);
        setLoading(false);
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
            <SectionHeader
                pill="Community Resources"
                title="Food Pantry Network"
                description="Access vital food distribution resources in Brooklyn. We are here to support our neighbors."
            />

            <div className="mb-10 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl flex gap-4 items-start">
                <div className="p-2 bg-red-100 rounded-full text-red-600 shrink-0">
                    <Newspaper size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-red-800 mb-1">Community Notice</h3>
                    <p className="text-red-700/80 text-sm leading-relaxed">
                        Due to potential changes in federal benefits (SNAP), we want to ensure everyone has information about food assistance options.
                        Below are links to city-wide resources to help lessen any impact on our families.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-10">
                <div className="space-y-4">
                    {[
                        { name: "St. John's Bread and Life", addr: "795 Lexington Ave", time: "Mon-Fri, 8AM-1PM", status: "Open" },
                        { name: "Food Bank For NYC (Campaign Against Hunger)", addr: "2010 Fulton St.", time: "Mon-Fri, 9:30AM-5:30PM", status: "Open" },
                        { name: "Greenpoint Reformed Church", addr: "136 Milton St.", time: "Thu, 4PM-7PM", status: "Limited" },
                        { name: "Neighbors Together", addr: "2094 Fulton St.", time: "Mon-Fri, 12-3PM (Hot Lunch)", status: "Open" },
                        { name: "Reaching Out Community Services", addr: "7708 New Utrecht Ave", time: "Mon-Fri, 10AM-5PM", status: "Open" },
                        { name: "Masbia of Flatbush", addr: "1372 Coney Island Ave", time: "Sun-Thu, Dinners Only", status: "Call Ahead" },
                        { name: "Trinity Human Services", addr: "153 A Johnson Ave.", time: "Tue-Fri, 9-12 & 1-4", status: "Closed" },
                        { name: "CAMBA Beyond Hunger", addr: "21 Snyder Avenue", time: "Call (718) 282-3082", status: "Call Ahead" },
                        { name: "CHiPS (Park Slope)", addr: "200 4th Avenue", time: "Thu & Sat, 11:30AM-1PM", status: "Limited" }
                    ].map((pantry, i) => (
                        <GlassCard key={i} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white border-green-100">
                            <div>
                                <h4 className="text-xl font-bold text-green-900">{pantry.name}</h4>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-yellow-600" /> {pantry.addr}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-yellow-600" /> {pantry.time}</span>
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${pantry.status === 'Open' ? 'bg-green-100 text-green-700' :
                                pantry.status === 'Closed' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                {pantry.status}
                            </span>
                        </GlassCard>
                    ))}
                </div>

                <div className="sticky top-32 self-start">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-[2px] rounded-2xl shadow-xl">
                        <div className="bg-white rounded-[14px] overflow-hidden">
                            <div className="bg-yellow-50 p-6 border-b border-yellow-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-yellow-500 text-white rounded-lg shadow-md">
                                        <Utensils size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-green-900">Pantry Chef AI</h3>
                                </div>
                                <p className="text-sm text-green-800/70 leading-snug">
                                    Got ingredients but no recipe? Let AI help you cook a meal.
                                </p>
                            </div>
                            <div className="p-6 space-y-4">
                                <textarea
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                    placeholder="e.g. Rice, Beans, Canned Tomatoes..."
                                    className="w-full bg-slate-50 border border-green-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24 resize-none transition-all"
                                />
                                <button
                                    onClick={handleGenerateRecipe}
                                    disabled={loading || !ingredients}
                                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Recipe"}
                                </button>
                            </div>
                            {recipe && (
                                <div className="px-6 pb-6 animate-in slide-in-from-top-2">
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-slate-700 max-h-60 overflow-y-auto custom-scrollbar">
                                        {recipe}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        {/* Modern Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-start overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={ASSETS.heroBg} alt="Community Impact" className="w-full h-full object-cover brightness-[0.4]" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
                <div className="max-w-xl space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                        Advocating for <span className="text-yellow-400">Unity</span> & <span className="text-yellow-400">Change</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
                        We are dedicated to enriching the lives of our members, their families, and the Brooklyn community through social services, youth programs, and advocacy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => navigate('programs')}
                            className="px-8 py-4 bg-yellow-400 text-green-950 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2"
                        >
                            Our Impact <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate('volunteer')}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-green-950 transition-all flex items-center justify-center gap-2"
                        >
                            Get Involved
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                onClick={() => document.getElementById('our-work').scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce cursor-pointer hover:text-white transition-colors"
            >
                <ChevronDown size={32} />
            </div>
        </section>

        {/* Impact Pillars Section */}
        <section id="our-work" className="py-24 px-6 bg-white relative">
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader pill="Our Work" title="The Three Pillars" description="A focused approach to building a stronger community." align="center" />

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {/* Pillar 1: Social Services */}
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => navigate('food-pantry')}>
                        <div className="aspect-[4/5] relative">
                            <img src={ASSETS.socialIcon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" alt="Social Services" />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <Utensils className="text-yellow-400 mb-4" size={32} />
                                <h3 className="text-2xl font-bold mb-2">Social Services</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">Combating food insecurity with dignity. Providing fresh produce and essentials to families in need.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    Visit Pantry <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2: Youth & Education */}
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => navigate('programs')}>
                        <div className="aspect-[4/5] relative">
                            <img src={ASSETS.youthIcon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" alt="Youth" />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <Baby className="text-yellow-400 mb-4" size={32} />
                                <h3 className="text-2xl font-bold mb-2">Youth & Education</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">Kids Depo: A safe haven for mentorship, tutoring, and rites of passage curriculums.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    See Programs <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3: Economic Development */}
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer" onClick={() => navigate('programs')}>
                        <div className="aspect-[4/5] relative">
                            <img src={ASSETS.impactImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" alt="Business" />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <Briefcase className="text-yellow-400 mb-4" size={32} />
                                <h3 className="text-2xl font-bold mb-2">Economic Power</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">Business Roundtables: Strategy, networking, and advocacy for local entrepreneurs.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm group-hover:gap-3 transition-all">
                                    Join Roundtable <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Pre-Footer Newsletter CTA */}
        <section className="py-20 px-6 bg-slate-900 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-900/20 z-0"></div>
            <div className="max-w-[800px] mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Get Our Latest Updates</h2>
                <p className="text-slate-400 mb-8">Stay connected with Public Advocate Social Society. Receive news on drives, events, and community stories.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input type="email" placeholder="Email Address" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 transition-colors" />
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <Send size={18} /> Subscribe
                    </button>
                </div>
            </div>
        </section>
    </div>
);

// --- Main App ---

import IntroVideo from './IntroVideo';

const App = () => {
    const [activePage, setActivePage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactSubject, setContactSubject] = useState('Getting Involved');

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

    const [showGetInvolved, setShowGetInvolved] = useState(false);
    const [involvedType, setInvolvedType] = useState('volunteer');
    const [involvedEvent, setInvolvedEvent] = useState('');

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

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || activePage !== 'home' ? 'bg-green-950/95 backdrop-blur-xl py-2 shadow-2xl border-b border-white/10' : 'bg-transparent py-4 md:py-6'}`}>
                <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('home')}>
                        <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 ease-out">
                            <img src={ASSETS.logo} className="h-20 md:h-28 w-auto object-contain drop-shadow-md" alt="Public Advocate Logo" />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1 bg-black/20 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-lg">
                        {['home', 'about', 'programs', 'food-pantry', 'products', 'calendar'].map((page) => (
                            <button
                                key={page}
                                onClick={() => navigate(page)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activePage === page
                                    ? 'bg-yellow-400 text-green-950 shadow-lg scale-105'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('donations')}
                            className="hidden md:flex bg-yellow-400 text-green-950 px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-lg shadow-yellow-400/20"
                        >
                            Donate
                        </button>
                        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-green-950/98 backdrop-blur-xl z-40 flex flex-col items-center justify-start pt-32 gap-6 animate-in slide-in-from-top-10 duration-500">
                    {['Home', 'About', 'Programs', 'Food Pantry', 'Products', 'Calendar'].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setIsMenuOpen(false);
                                navigate(item.toLowerCase().replace(' ', '-'));
                            }}
                            className="text-3xl font-black text-white hover:text-yellow-400 transition-colors tracking-wide drop-shadow-lg"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.8)' }}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            navigate('donations');
                        }}
                        className="bg-yellow-400 text-green-950 px-8 py-3 rounded-full font-bold text-lg shadow-xl mt-4 hover:scale-105 transition-transform border-2 border-green-900/10"
                    >
                        Donate Now
                    </button>
                </div>
            )}

            {/* Main Render */}
            <main className="flex-grow">
                {activePage === 'home' && <HomePage navigate={navigate} />}
                {activePage === 'about' && <AboutPage openGetInvolved={openGetInvolved} />}
                {activePage === 'food-pantry' && <FoodPantryPage />}
                {activePage === 'programs' && <ProgramsPage openContact={openContactModal} />}
                {activePage === 'calendar' && <CalendarPage openGetInvolved={openGetInvolved} />}
                {activePage === 'products' && <ProductsPage />}
                {activePage === 'donations' && <DonationsPage />}
            </main>

            {/* Footer */}
            <footer className="bg-green-950 text-green-100 py-16 px-6 border-t border-green-900">
                <div className="max-w-[1200px] mx-auto grid md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-4 mb-6">
                            <img src={ASSETS.logo} alt="Public Advocate" className="h-16 w-auto brightness-0 invert opacity-90 transition-transform hover:scale-105" />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-white leading-none">Public</span>
                                <span className="font-bold text-lg text-white leading-none">Advocate</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 opacity-80">
                            Enriching the lives of our members, their families, and the communities we represent in Brooklyn.
                        </p>
                        <div className="flex gap-3 mb-6">
                            {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 bg-white/5 rounded-full hover:bg-yellow-500 hover:text-green-900 transition-colors cursor-pointer flex items-center justify-center text-xs">SOC</div>)}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles size={10} /> Established 2012
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Quick Links</h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li><button onClick={() => navigate('home')} className="hover:text-yellow-400 transition-colors">Home</button></li>
                            <li><button onClick={() => navigate('about')} className="hover:text-yellow-400 transition-colors">About Us</button></li>
                            <li><button onClick={() => navigate('donations')} className="hover:text-yellow-400 transition-colors">Payments & Donations</button></li>
                            <li><button onClick={() => navigate('products')} className="hover:text-yellow-400 transition-colors">Products</button></li>
                            <li><button onClick={() => navigate('calendar')} className="hover:text-yellow-400 transition-colors">Monthly Activities Calendar</button></li>
                            <li><button onClick={() => navigate('food-pantry')} className="hover:text-yellow-400 transition-colors">Food Pantry</button></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Contact</h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li className="flex gap-3"><MapPin size={16} className="text-yellow-500" /> P.O Box 340491, Jamaica Queens 11434</li>
                            <li className="flex gap-3"><Phone size={16} className="text-yellow-500" /> +1 718 612 8948</li>
                            <li className="flex gap-3"><Mail size={16} className="text-yellow-500" /> Publicadvocatessocialsociety@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-green-900 text-center text-xs opacity-60">
                    <p>© {new Date().getFullYear()} Public Advocate Social Society. All Rights Reserved.</p>
                </div>
            </footer >
        </div >
    );
};

export default App;








