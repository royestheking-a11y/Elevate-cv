import User from '../models/User.js';

const LIMITS = {
  resume: 20, // Increased from 2
  coverLetter: 15, // Increased from 2
  email: 20 // Increased from 5
};

export const checkAILimit = (type) => async (req, res, next) => {
  if (req.user.role === 'admin') return next();

  // Safety check for missing aiUsage structure (for older docs)
  if (!user.aiUsage) user.aiUsage = { resume: { count: 0 }, email: { count: 0 }, coverLetter: { count: 0 } };
  if (!user.aiUsage[type]) user.aiUsage[type] = { count: 0, lastReset: new Date() };

  const usage = user.aiUsage[type];
  const now = new Date();
  const lastReset = usage.lastReset ? new Date(usage.lastReset) : new Date(0);

  // Reset if more than 24 hours have passed
  if (now - lastReset > 24 * 60 * 60 * 1000) {
    usage.count = 0;
    usage.lastReset = now;
    await user.save();
  }

  if ((usage.count || 0) >= LIMITS[type]) {
    return res.status(403).json({ 
      message: `You've reached your daily limit for ${type} (${LIMITS[type]}). Please come back tomorrow for more!`,
      limitReached: true,
      limit: LIMITS[type]
    });
  }

  // Pass remaining count to frontend via custom header (optional)
  res.setHeader('X-AI-Limit-Remaining', LIMITS[type] - usage.count - 1);
  
  next();
};

export const incrementAIUsage = async (userId, type) => {
  const user = await User.findById(userId);
  if (user) {
    if (!user.aiUsage) user.aiUsage = { resume: { count: 0 }, email: { count: 0 }, coverLetter: { count: 0 } };
    if (!user.aiUsage[type]) user.aiUsage[type] = { count: 0, lastReset: new Date() };
    if (!user.totalAiUsage) user.totalAiUsage = { resume: 0, email: 0, coverLetter: 0 };
    
    user.aiUsage[type].count = (user.aiUsage[type].count || 0) + 1;
    user.totalAiUsage[type] = (user.totalAiUsage[type] || 0) + 1;
    await user.save();
  }
};
