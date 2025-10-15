// lib/mongodb/models/User.ts
import mongoose, { Schema } from 'mongoose';

// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    subscription: { type: String, default: 'free' }, // free, monthly, yearly
    requestsCount: { type: Number, default: 0 },
    lastRequestDate: { type: Date },
  },
  { timestamps: true }
);

// Remove duplicate index - email is already unique in schema
// userSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model('User', userSchema);