import mongoose from 'mongoose';

const coverLetterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientName: { type: String, default: 'Hiring Manager' },
  companyName: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  body: { type: String, default: '' },
  selectedTemplateId: { type: String, default: 'classic-professional' },
}, { timestamps: true });

export default mongoose.model('CoverLetter', coverLetterSchema);
