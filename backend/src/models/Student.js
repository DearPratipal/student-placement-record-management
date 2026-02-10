import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        rollNo: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        department: { type: String, required: true },
        cgpa: { type: Number, required: true },
        placed: { type: Boolean, default: false },
        backlogs: { type: Number, default: 0 },
        missedDrives: { type: Number, default: 0 },
        status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'PLACED'], default: 'ACTIVE' },
    },
    { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
