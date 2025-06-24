import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['agent', 'admin'], default: 'agent' },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    location: { type: String },
    whatsappNumber: { type: String },
    companyName: { type: String },
    specialities: { type: String },
    bio: { type: String },
    metadata: {
        social: {
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String },
            linkedin: { type: String }
        }
    }
})

export const User = mongoose.model('User', userSchema);