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
    clerkId: { type: String, required: true }, // Store Clerk user ID for reference
  },
  { timestamps: true }
);

// Add index with sparse option
userSchema.index({ clerkId: 1 }, { unique: true, sparse: true });

export default mongoose.models.User || mongoose.model('User', userSchema);