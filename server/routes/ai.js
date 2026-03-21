import express from 'express';
import { protect } from '../middleware/auth.js';
import { callAI } from '../utils/ai.js';
import { checkAILimit, incrementAIUsage } from '../middleware/aiLimit.js';

const router = express.Router();

/**
 * POST /api/ai/parse-resume
 * Parses raw text from PDF into structured JSON.
 */
router.post('/parse-resume', protect, checkAILimit('resume'), async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "No text provided" });

  const systemPrompt = `You are an expert resume parser. Extract the following information from the provided text into a CLEAN JSON format. 
  Fields:
  - personal: { fullName, jobTitle, email, phone, website, location }
  - summary: string (short professional summary)
  - skills: array of { id: string, name: string, level: string }
  - experience: array of { id: string, title: string, company: string, startDate: string, endDate: string, current: boolean, description: string(bullet points) }
  - education: array of { id: string, degree: string, school: string, startDate: string, endDate: string, description: string }

  Rules:
  1. Return ONLY the JSON object. 
  2. Use generic IDs (1, 2, 3...) for skills, experience, and education.
  3. If a field is missing, leave it as empty string or empty array.
  4. Ensure the output is valid JSON.`;

  try {
    const result = await callAI(text, systemPrompt, true, 'resume');
    // Clean potential markdown code blocks
    const jsonStr = result.replace(/```json|```/g, '').trim();
    try {
      const parsedData = JSON.parse(jsonStr);
      await incrementAIUsage(req.user._id, 'resume');
      res.json(parsedData);
    } catch (parseError) {
      console.error("AI JSON Parse Error:", parseError, "Response:", result);
      res.status(500).json({ message: "AI returned invalid JSON" });
    }
  } catch (error) {
    console.error("AI Parse Error:", error);
    res.status(500).json({ message: "Failed to parse resume with AI" });
  }
});

/**
 * POST /api/ai/enhance
 * Enhances professional summary or experience description.
 */
router.post('/enhance', protect, checkAILimit('resume'), async (req, res) => {
  const { type, content } = req.body;
  if (!content) return res.status(400).json({ message: "No content provided" });

  const systemPrompt = `You are a professional resume writer. 
  Enhance the following ${type} to be more professional, impactful, and clear. 
  Use strong action verbs and focus on achievements. 
  Keep the length similar to the original.
  Return ONLY the enhanced text.`;

  try {
    const enhanced = await callAI(content, systemPrompt, false, 'resume');
    await incrementAIUsage(req.user._id, 'resume');
    res.json({ enhanced: enhanced.trim() });
  } catch (error) {
    res.status(500).json({ message: "Failed to enhance content" });
  }
});

/**
 * POST /api/ai/generate-cover-letter
 */
router.post('/generate-cover-letter', protect, checkAILimit('coverLetter'), async (req, res) => {
  const { cvData, jobDescription } = req.body;
  if (!cvData || !jobDescription) {
    return res.status(400).json({ message: "CV Data and Job Description are required" });
  }
  
  const prompt = `User CV Data: ${JSON.stringify(cvData)}\nJob Description: ${jobDescription}`;
  const systemPrompt = `Generate a highly professional and tailored cover letter based on the provided CV data and job description. 
  Use a modern, polite tone. Use placeholders like [Recipient Name] if not provided.
  Return ONLY the cover letter text.`;

  try {
    const content = await callAI(prompt, systemPrompt, false, 'coverLetter');
    await incrementAIUsage(req.user._id, 'coverLetter');
    res.json({ content });
  } catch (error) {
    console.error("AI Cover Letter Error:", error);
    res.status(500).json({ message: "Failed to generate cover letter" });
  }
});

/**
 * POST /api/ai/generate-email
 * Gemini focus for email generation.
 */
router.post('/generate-email', protect, checkAILimit('email'), async (req, res) => {
  const { type, details } = req.body;
  
  const systemPrompt = `Generate a professional email for a ${type} scenario. 
  Context/Details: ${details}
  Return ONLY the email subject and body.`;

  try {
    const content = await callAI(details, systemPrompt, true, 'email'); // Prefer Gemini
    await incrementAIUsage(req.user._id, 'email');
    res.json({ content });
  } catch (error) {
    console.error("AI Email Generation Error:", error);
    res.status(500).json({ message: "Failed to generate email" });
  }
});

export default router;
