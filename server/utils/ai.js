import axios from 'axios';

/**
 * AI Utility to handle fallback between Groq and Gemini.
 * Waterfall: Groq (Primary) -> Gemini (Secondary)
 */
export const callAI = async (prompt, systemPrompt = "You are a helpful assistant.", preferGemini = false, actionType = null) => {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const tryGroq = async () => {
    if (!groqKey) throw new Error("Groq API key missing");
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );
    return response.data.choices[0].message.content;
  };

  const tryGemini = async () => {
    if (!geminiKey) throw new Error("Gemini API key missing");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        contents: [{
          parts: [{ text: `${systemPrompt}\n\n${prompt}` }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  };

  if (preferGemini) {
    try { 
      const res = await tryGemini(); 
      await updateGlobalStats('gemini', actionType);
      return res;
    } catch (e) { 
      console.error("Gemini failed, falling back to Groq:", e.message);
      try {
        const res = await tryGroq();
        await updateGlobalStats('groq', actionType);
        return res;
      } catch (e2) {
        console.error("Both AI services failed (Gemini preference mode):", e2.message);
        await updateGlobalStats('failure');
        throw new Error("AI services unavailable");
      }
    }
  }

  try { 
    const res = await tryGroq(); 
    await updateGlobalStats('groq', actionType);
    return res;
  } catch (e) {
    console.error("Groq failed, falling back to Gemini:", e.message);
    try { 
      const res = await tryGemini(); 
      await updateGlobalStats('gemini', actionType);
      return res;
    } catch (e2) {
      console.error("Both AI services failed:", e2.message);
      await updateGlobalStats('failure');
      throw new Error("AI services unavailable");
    }
  }
};

async function updateGlobalStats(type, actionType = null) {
  try {
    const GlobalAIStats = (await import('../models/GlobalAIStats.js')).default;
    let stats = await GlobalAIStats.findOne();
    if (!stats) stats = new GlobalAIStats();
    
    if (type === 'groq') stats.totalGroqCalls += 1;
    if (type === 'gemini') stats.totalGeminiCalls += 1;
    if (type === 'failure') stats.totalFailures += 1;
    
    if (actionType === 'resume') stats.totalResumesRepaired += 1;
    if (actionType === 'email') stats.totalEmailsGenerated += 1;
    if (actionType === 'coverLetter') stats.totalCoverLettersGenerated += 1;
    
    stats.lastUpdated = new Date();
    await stats.save();
  } catch (err) {
    console.error("Failed to update global stats:", err);
  }
}
