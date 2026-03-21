import dotenv from 'dotenv';
import { callAI } from './server/utils/ai.js';

dotenv.config();

async function testAI() {
  console.log("--- Testing AI Integration ---");
  
  try {
    console.log("Testing Groq (Primary)...");
    const groqResult = await callAI("Say 'Groq is working' if you can hear me.");
    console.log("Result:", groqResult);
  } catch (err) {
    console.error("Groq Test Failed:", err.message);
  }

  try {
    console.log("\nTesting Gemini (Primary/Fallback)...");
    const geminiResult = await callAI("Say 'Gemini is working' if you can hear me.", "Assistant", true);
    console.log("Result:", geminiResult);
  } catch (err) {
    console.error("Gemini Test Failed:", err.message);
  }
}

testAI();
