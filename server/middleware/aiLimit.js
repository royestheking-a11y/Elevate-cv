import User from '../models/User.js';

const LIMITS = {
  resume: 2,
  coverLetter: 2,
  email: 5
};

export const checkAILimit = (type) => async (req, res, next) => {
  if (req.user.role === 'admin') return next();

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const usage = user.aiUsage[type];
  const now = new Date();
  const lastReset = new Date(usage.lastReset);

  // Reset if more than 24 hours have passed
  if (now - lastReset > 24 * 60 * 60 * 1000) {
    usage.count = 0;
    usage.lastReset = now;
    await user.save();
  }

  if (usage.count >= LIMITS[type]) {
    return res.status(403).json({ 
      message: `Today's limit for ${type} is done. Back again tomorrow for another build!`,
      limitReached: true
    });
  }

  // Pass remaining count to frontend via custom header (optional)
  res.setHeader('X-AI-Limit-Remaining', LIMITS[type] - usage.count - 1);
  
  next();
};

export const incrementAIUsage = async (userId, type) => {
  const user = await User.findById(userId);
  if (user) {
    user.aiUsage[type].count += 1;
    user.totalAiUsage[type] += 1;
    await user.save();
  }
};
