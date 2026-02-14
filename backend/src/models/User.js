import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['ADMIN', 'TNP_HEAD', 'TNP_OFFICER', 'COORDINATOR', 'STUDENT'],
            default: 'STUDENT',
        },
        department: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
