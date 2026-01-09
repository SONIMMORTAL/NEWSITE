import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, MapPin, Clock, Utensils, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SectionHeader from '../components/ui/SectionHeader';
import FadeInSection from '../components/ui/FadeInSection';
import GradientText from '../components/ui/GradientText';
import AnimatedShinyButton from '../components/ui/AnimatedShinyButton';
import { PANTRY_LOCATIONS } from '../data';
import { callGemini } from '../services/gemini';

const FoodPantryPage = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateRecipe = async () => {
        if (!ingredients.trim()) return;
        setLoading(true);
        const prompt = `You are a helpful chef for a community food pantry. The user has these ingredients: "${ingredients}". 
        Create a simple, nutritious, and tasty recipe. 
        Format your response in nice Markdown:
        - Use a clear H3 (#) for the Title.
        - Use bolding for key words.
        - Use bullet points for ingredients.
        - Use numbered lists for instructions.
        Keep it concise and easy to read.`;

        const result = await callGemini(prompt);
        setRecipe(result);
        setLoading(false);
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
            <FadeInSection>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
                    >
                        <Utensils size={14} className="text-green-600" />
                        <span className="text-sm text-green-800 font-medium">Community Resources</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
                        Food <GradientText gradient="brand">Pantry Network</GradientText>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Access vital food distribution resources in Brooklyn. We are here to support our neighbors.
                    </p>
                </div>
            </FadeInSection>

            {/* Community Notice */}
            <FadeInSection delay={0.1}>
                <motion.div
                    className="mb-10 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-6 rounded-2xl flex gap-4 items-start shadow-lg"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="p-3 bg-red-100 rounded-xl text-red-600 shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-800 mb-2">Community Notice</h3>
                        <p className="text-red-700/80 text-sm leading-relaxed">
                            Due to potential changes in federal benefits (SNAP), we want to ensure everyone has information about food assistance options.
                            Below are links to city-wide resources to help lessen any impact on our families.
                        </p>
                    </div>
                </motion.div>
            </FadeInSection>

            <div className="grid lg:grid-cols-[1fr_400px] gap-10">
                {/* Pantry List */}
                <div className="space-y-4">
                    {PANTRY_LOCATIONS.map((pantry, i) => (
                        <FadeInSection key={i} delay={i * 0.1}>
                            <motion.div
                                className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-lg"
                                whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            >
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{pantry.name}</h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={16} className="text-green-600" />
                                            {pantry.addr}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={16} className="text-green-600" />
                                            {pantry.time}
                                        </span>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${pantry.status === 'Open'
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : pantry.status === 'Closed'
                                            ? 'bg-red-100 text-red-700 border border-red-200'
                                            : 'bg-orange-100 text-orange-700 border border-orange-200'
                                    }`}>
                                    {pantry.status}
                                </span>
                            </motion.div>
                        </FadeInSection>
                    ))}
                </div>

                {/* Recipe AI */}
                <div className="sticky top-32 self-start">
                    <FadeInSection variant="right" delay={0.2}>
                        <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-[2px] rounded-3xl shadow-2xl shadow-yellow-500/20">
                            <div className="bg-white rounded-[22px] overflow-hidden">
                                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 border-b border-yellow-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-xl shadow-lg">
                                            <Sparkles size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Pantry Chef AI</h3>
                                            <p className="text-xs text-slate-500">Powered by Gemini</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-snug">
                                        Got ingredients but no recipe? Let AI help you cook a delicious meal.
                                    </p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <textarea
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                        placeholder="e.g. Rice, Beans, Canned Tomatoes..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent h-24 resize-none transition-all"
                                    />
                                    <AnimatedShinyButton
                                        onClick={handleGenerateRecipe}
                                        disabled={loading || !ingredients}
                                        variant="primary"
                                        className="w-full !bg-green-600 hover:!bg-green-700"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Recipe"}
                                    </AnimatedShinyButton>
                                </div>
                                {recipe && (
                                    <motion.div
                                        className="px-6 pb-6"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl text-sm text-slate-700 max-h-80 overflow-y-auto custom-scrollbar prose prose-sm prose-green prose-p:my-1 prose-headings:mb-2 prose-ul:my-1 prose-li:my-0">
                                            <ReactMarkdown>{recipe}</ReactMarkdown>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
};

export default FoodPantryPage;
