import express from 'express';
import CV from '../models/CV.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/cv — Get the current user's CV
router.get('/', protect, async (req, res) => {
  try {
    let cv = await CV.findOne({ userId: req.user._id });
    if (!cv) {
      cv = await CV.create({ userId: req.user._id });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/cv — Update the current user's CV
router.put('/', protect, async (req, res) => {
  try {
    const cv = await CV.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/cv/share/:id — Public route to get a CV by ID
router.get('/share/:id', async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
