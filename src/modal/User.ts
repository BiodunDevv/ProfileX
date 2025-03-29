import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    verificationCode?: string;
    verificationExpiry?: Date;
    isVerified: boolean;
    role?: 'student' | 'teacher' | 'chef';
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
    verificationExpiry: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'chef', null],
        default: null, 
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    // Only hash if password is modified
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
