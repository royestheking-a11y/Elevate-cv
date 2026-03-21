import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import cvRoutes from './routes/cv.js';
import coverLetterRoutes from './routes/coverLetter.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';
import templatesRoutes from './routes/templates.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/cover-letter', coverLetterRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
    // Native self-ping to prevent Render Free Tier from going to sleep (triggers every 14 minutes)
    if (process.env.RENDER_EXTERNAL_URL) {
      setInterval(() => {
        https.get(`${process.env.RENDER_EXTERNAL_URL}/api/health`, (res) => {
          console.log(`[Self-Ping] Keep-Alive Status: ${res.statusCode}`);
        }).on('error', (err) => {
          console.error(`[Self-Ping] Error: ${err.message}`);
        });
      }, 14 * 60 * 1000); // 14 minutes
      console.log('⏰ Inner self-ping mechanism initialized for Render');
    }
  });
};

startServer();
