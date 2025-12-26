import React, { useState } from 'react';
import { Newspaper, MapPin, Clock, Utensils, Loader2 } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import { PANTRY_LOCATIONS } from '../data';
import { callGemini } from '../services/gemini';

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
                    {PANTRY_LOCATIONS.map((pantry, i) => (
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

export default FoodPantryPage;
