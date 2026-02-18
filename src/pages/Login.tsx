// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { GraduationCap, Lock, Mail, AlertCircle, Eye, EyeOff} from 'lucide-react';


// Function to handle query submission
export const Login: React.FC = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Login page with Queries Model State
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryRole, setQueryRole] = useState('STUDENT');
  const [queryMessage, setQueryMessage] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");
    const savedRemember = localStorage.getItem("rememberMe");

    if (savedEmail && savedRemember === "true") {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


  /*
  const handleLogin = async () => {
    const user = await apiService.login(email);
    if (user) {
      login(user);
    }
  };
  */
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        // 🔹 Remember Me Logic
        localStorage.setItem("role", "ADMIN"); // 🔥 TEMP FORCE ADMIN
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
          localStorage.setItem("rememberPassword", password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberEmail");
          localStorage.removeItem("rememberPassword");
          localStorage.removeItem("rememberMe");
        }

        navigate('/');
      } else {
        setError('Invalid credentials. Try username & password again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Recomended API Service Structure (for reference)
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiService.submitQuery({
        name: queryName,
        email: queryEmail,
        role: queryRole,
        message: queryMessage,
      });

      alert("Request submitted successfully!");
      setShowQueryModal(false);
      setQueryName('');
      setQueryEmail('');
      setQueryRole('STUDENT');
      setQueryMessage('');
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/mmdu-college.jpg')",
        }}
      ></div>

      {/* 🎬 Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/campus-video.mp4" type="video/mp4" />
      </video> */}

      {/* 🔹 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🔹 Login Card */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-mmdu-red px-8 py-8 text-center">

          <div className="flex justify-center mb-4">
            <img
              src="/mmdu-logo.png"
              // src="/mmdu-logo-black.png"
              // src="/mmdu-logo-white.png"
              // src="/mmdu-logo-red-white.png"
              alt="MMDU Logo"
              // Add Shadow
              // className="w-30 h-20 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              className="w-30 h-20 object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>

          <h2 className="text-2xl font-bold text-white">MM(DU)</h2>
          <p className="text-red-100 text-sm">
            Placement Record Management System
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Secure Login
          </h3>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3">
              <AlertCircle className="text-red-500 w-5 h-5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  placeholder="username@mmumullana.org"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              {/*}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  placeholder="••••••••"
                />

                {/* 👁 Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-mmdu-red transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">

              {/* Remember Me */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-red-600 w-4 h-4"
                />
                <span className="text-gray-600">Remember Me</span>
              </label>

              {/* Forgot Password */}
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-mmdu-red hover:underline font-medium"
              >
                Forgot Password?
              </button>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-lg transition-all
              ${isSubmitting
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-mmdu-red hover:bg-mmdu-dark hover:shadow-xl active:scale-95'
                }`}
            >
              {isSubmitting ? 'Authenticating...' : 'Access Dashboard'}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Need access?{" "}
            {/* <span className="text-mmdu-red font-medium hover:underline cursor-pointer">
              Contact TNP Administrator
            </span> */}
            <button
              type="button"
              onClick={() => setShowQueryModal(true)}
              className="text-mmdu-red font-medium hover:underline"
            >
              Contact TNP Administrator
            </button>

          </div>
        </div>
      </div>

      {/* ================= QUERY MODAL ================= */}
      {showQueryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">

            <button
              onClick={() => setShowQueryModal(false)}
              className="absolute top-7 right-7 text-gray-400 hover:text-gray-600"
            >
              ✕ Close
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Access / Query Request
            </h2>

            <form onSubmit={handleQuerySubmit} className="space-y-4">
            
            
            {/* <form
              onSubmit={async (e) => {
                e.preventDefault();

                try {
                  await apiService.submitQuery({
                    name: queryName,
                    email: queryEmail,
                    role: queryRole,
                    message: queryMessage,
                  });

                  alert("Request submitted successfully!");
                  setShowQueryModal(false);

                  // Reset fields
                  setQueryName('');
                  setQueryEmail('');
                  setQueryRole('STUDENT');
                  setQueryMessage('');

                } catch (error) {
                  alert("Something went wrong. Please try again.");
                }
              }}
              className="space-y-4"
            > */}

              <input
                type="text"
                placeholder="Full Name"
                required
                value={queryName}
                onChange={(e) => setQueryName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={queryEmail}
                onChange={(e) => setQueryEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              />

              <select
                value={queryRole}
                onChange={(e) => setQueryRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">TNP Mentor</option>
                <option value="COORDINATOR">Coordinator</option>
                <option value="TNP_OFFICER">TNP Officer</option>
              </select>

              <textarea
                placeholder="Write your message..."
                required
                rows={3}
                value={queryMessage}
                onChange={(e) => setQueryMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-mmdu-red text-white py-2 rounded-lg hover:bg-mmdu-dark transition"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};