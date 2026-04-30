// API key is securely managed on the backend

// --- Helper: Gemini API Call ---
export const callGemini = async (prompt) => {
    const url = '/api/generate';
    const payload = { prompt };

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
        return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
};
