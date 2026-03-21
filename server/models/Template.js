import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  templateId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['cv', 'cover-letter'], required: true },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Template', templateSchema);
