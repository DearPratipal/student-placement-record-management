import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: {
            type: String,
            enum: ["STUDENT", "COORDINATOR", "TNP_OFFICER", "ADMIN"],
            default: "STUDENT",
        },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["PENDING", "RESOLVED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Query", querySchema);
