import mongoose from 'mongoose';

const globalAIStatsSchema = new mongoose.Schema({
  totalGroqCalls: { type: Number, default: 0 },
  totalGeminiCalls: { type: Number, default: 0 },
  totalResumesRepaired: { type: Number, default: 0 },
  totalEmailsGenerated: { type: Number, default: 0 },
  totalCoverLettersGenerated: { type: Number, default: 0 },
  totalFailures: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('GlobalAIStats', globalAIStatsSchema);
