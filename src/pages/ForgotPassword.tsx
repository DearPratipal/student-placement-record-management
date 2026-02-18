import React, { useState } from "react";
import { Mail } from "lucide-react";

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Password reset link sent (demo mode)");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            required
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-mmdu-red text-white py-3 rounded-lg hover:bg-mmdu-dark transition"
                    >
                        Send Reset Link
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

// Note: This is a demo implementation. In a real application, you would integrate with your backend to handle password reset requests securely.