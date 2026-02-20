import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { apiService } from "../services/apiService";
import toast from "react-hot-toast";

export const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await apiService.resetPassword(token!, password);
        toast.success(res.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;

// Note: This is a demo implementation. In a real application, you would integrate with your backend to handle password reset requests securely.