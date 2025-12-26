import React from 'react';
import { ArrowRight } from 'lucide-react';

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

export default NewsCard;
