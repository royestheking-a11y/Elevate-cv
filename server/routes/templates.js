import express from 'express';
import Template from '../models/Template.js';

const router = express.Router();

// GET /api/templates — Get all templates (public)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const templates = await Template.find(filter).sort({ createdAt: 1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/templates/:type — Get templates by type
router.get('/:type', async (req, res) => {
  try {
    const templates = await Template.find({ type: req.params.type }).sort({ createdAt: 1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
