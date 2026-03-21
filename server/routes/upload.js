import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Asset from '../models/Asset.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/upload
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'elevatecv',
      resource_type: 'auto',
    });

    const asset = await Asset.create({
      userId: req.user._id,
      cloudinaryId: result.public_id,
      url: result.secure_url,
      type: req.file.mimetype.startsWith('image/') ? 'image' : 'file',
    });

    res.status(201).json({
      url: result.secure_url,
      cloudinaryId: result.public_id,
      assetId: asset._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
