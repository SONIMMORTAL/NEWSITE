import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Loader2, Minimize2, Maximize2, User, Bot } from 'lucide-react';
import { CALENDAR_DATA_2026, PANTRY_LOCATIONS, SOCIAL_SERVICES, POLITICAL_INFO } from './data';

const API_KEY = import.meta.env.acc; // Securely loaded from environment variables

const SYSTEM_PROMPT = `
You are the Public Advocate Social Society's helpful AI Assistant.
Your goal is to help community members find information about events, social services, and food pantries, as well as providing up-to-date information about politicians, elected officials, and city council members.

Here is the current context data:
TODAY'S DATE: ${new Date().toLocaleDateString()}

CALENDAR EVENTS (2025-2026):
${JSON.stringify(CALENDAR_DATA_2026)}

FOOD PANTRY LOCATIONS:
${JSON.stringify(PANTRY_LOCATIONS)}

SOCIAL SERVICES:
${JSON.stringify(SOCIAL_SERVICES)}

POLITICAL DATABASE:
${JSON.stringify(POLITICAL_INFO)}

GUIDELINES:
1. Be warm, encouraging, and community-focused. You are a "partner" in the community.
2. If asked about events, check the Calendar Events data.
3. If asked about food, check the Pantry Locations.
4. If asked about business or youth programs, refer to the Social Services data.
5. You have a comprehensive database of NYC elected officials. Use it to answer questions about:
   - City Council Members (search by Name, District, or Borough).
   - Borough Presidents (search by Borough).
   - Citywide Officials (Mayor, Public Advocate, Comptroller).
6. Keep answers concise but helpful.
7. If you don't know something specific about the Center's internal operations, suggest they use the "Contact Us" form or visit the center.
`;

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hi, it's your Public Advocate. Welcome to our Social Society! How can we help?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\nUser Query: " + input }] }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error?.message || JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";

            setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', text: `Connection Error: ${error.message || error.toString()} (Key: ${API_KEY ? 'Present' : 'Missing'})` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-green-900 text-white rounded-full shadow-2xl hover:bg-green-800 transition-all hover:scale-110 flex items-center justify-center group"
            >
                <MessageSquare size={28} className="group-hover:hidden" />
                <Sparkles size={28} className="hidden group-hover:block animate-pulse text-yellow-400" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="bg-green-900 p-4 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-400 rounded-lg text-green-900">
                        <Sparkles size={16} />
                    </div>
                    <h3 className="font-bold text-sm">Community Assistant</h3>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <Minimize2 size={16} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-green-100 text-green-700'}
                        `}>
                            {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`
                            p-3 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow-sm
                            ${msg.role === 'user'
                                ? 'bg-green-900 text-white rounded-tr-none'
                                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
                        `}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                            <Bot size={14} />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about events, pantries..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-900 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-slate-400 font-medium">
                        Powered by Gemini AI • Information may vary
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;
