import express from 'express';
import CoverLetter from '../models/CoverLetter.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/cover-letter
router.get('/', protect, async (req, res) => {
  try {
    let cl = await CoverLetter.findOne({ userId: req.user._id });
    if (!cl) {
      cl = await CoverLetter.create({ userId: req.user._id });
    }
    res.json(cl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/cover-letter
router.put('/', protect, async (req, res) => {
  try {
    const cl = await CoverLetter.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(cl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
