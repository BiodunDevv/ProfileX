import mongoose, { Schema, Document } from 'mongoose';

// Define interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationCode?: string;
  verificationExpires?: Date;
  resetToken?: string;
  resetTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: {
      type: String
    },
    verificationExpires: {
      type: Date
    },
    resetToken: {
      type: String,
      default: null
    },
    resetTokenExpires: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Use mongoose.models to prevent model recompilation error during development
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;