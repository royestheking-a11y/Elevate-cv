import express from 'express';
import User from '../models/User.js';
import CV from '../models/CV.js';
import Message from '../models/Message.js';
import Asset from '../models/Asset.js';
import GlobalAIStats from '../models/GlobalAIStats.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCVs = await CV.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalAssets = await Asset.countDocuments();
    const aiStats = await GlobalAIStats.findOne() || { totalGroqCalls: 0, totalGeminiCalls: 0, totalFailures: 0 };

    res.json({ totalUsers, totalCVs, totalMessages, totalAssets, aiStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/messages
router.get('/messages', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/assets
router.get('/assets', protect, adminOnly, async (req, res) => {
  try {
    const assets = await Asset.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/messages (public — contact form)
router.post('/messages', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const msg = await Message.create({ name, email, message });
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
