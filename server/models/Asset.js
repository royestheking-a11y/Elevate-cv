import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cloudinaryId: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: 'image' },
  folder: { type: String, default: 'elevatecv' },
}, { timestamps: true });

export default mongoose.model('Asset', assetSchema);
