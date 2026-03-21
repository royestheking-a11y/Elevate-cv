import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import CV from '../models/CV.js';
import CoverLetter from '../models/CoverLetter.js';
import axios from 'axios';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password, role: 'user' });

    // Create default CV for the new user
    await CV.create({
      userId: user._id,
      personal: {
        fullName: name,
        email: email,
      },
      summary: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
    });

    // Create default Cover Letter
    await CoverLetter.create({
      userId: user._id,
      recipientName: 'Hiring Manager',
      companyName: '',
      jobTitle: '',
      body: '',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    const googleRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const { email, name } = googleRes.data;
    if (!email) return res.status(400).json({ message: 'Invalid Google Token or Email not provided' });
    
    let user = await User.findOne({ email });
    
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      user = await User.create({ name, email, password: randomPassword, role: 'user' });
      
      await CV.create({
        userId: user._id,
        personal: { fullName: name, email: email },
        summary: '',
        skills: [],
        experience: [],
        education: [],
        projects: [],
      });
      await CoverLetter.create({
        userId: user._id,
        recipientName: 'Hiring Manager',
        companyName: '',
        jobTitle: '',
        body: '',
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Authentication failed. Please try again.' });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

export default router;
