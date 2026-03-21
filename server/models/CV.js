import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personal: {
    fullName: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    location: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    photoShape: { type: String, enum: ['circle', 'square'], default: 'circle' },
  },
  summary: { type: String, default: '' },
  skills: [{
    id: String,
    name: String,
    level: String,
  }],
  experience: [{
    id: String,
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String,
  }],
  education: [{
    id: String,
    degree: String,
    school: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  projects: [{
    id: String,
    name: String,
    url: String,
    description: String,
  }],
  selectedTemplateId: { type: String, default: 'modern-professional' },
  themeColor: { type: String, default: '#3B2F2F' },
}, { timestamps: true });

export default mongoose.model('CV', cvSchema);
