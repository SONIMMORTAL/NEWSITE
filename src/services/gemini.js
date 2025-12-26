const apiKey = import.meta.env.acc; // Securely loaded from environment variables

// --- Helper: Gemini API Call ---
export const callGemini = async (prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
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
