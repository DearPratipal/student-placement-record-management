import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true },
        role: { type: String, required: true },
        packageLPA: { type: Number, required: true },
        date: { type: Date, required: true },
        eligibilityCgpa: { type: Number, required: true },
        eligibleBranches: [{ type: String }],
        status: { type: String, enum: ['UPCOMING', 'ONGOING', 'COMPLETED'], default: 'UPCOMING' },
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model('Drive', driveSchema);
