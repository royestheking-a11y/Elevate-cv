import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  aiUsage: {
    resume: { count: { type: Number, default: 0 }, lastReset: { type: Date, default: Date.now } },
    email: { count: { type: Number, default: 0 }, lastReset: { type: Date, default: Date.now } },
    coverLetter: { count: { type: Number, default: 0 }, lastReset: { type: Date, default: Date.now } },
  },
  totalAiUsage: {
    resume: { type: Number, default: 0 },
    email: { type: Number, default: 0 },
    coverLetter: { type: Number, default: 0 },
  }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
