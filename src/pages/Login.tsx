// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { GraduationCap, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';


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

  // Forget Password State
  const [isForgot, setIsForgot] = useState(false);

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

      // alert("Request submitted successfully!");
      toast.success("Query submitted successfully 🎉");
      setShowQueryModal(false);
      setQueryName('');
      setQueryEmail('');
      setQueryRole('STUDENT');
      setQueryMessage('');
    } catch (error) {
      // alert("Something went wrong.");
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Effect to Login Page if "Forgot Password" is clicked
  const panelVariants = {
    initial: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)"
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(10px)"
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/mmdu-college.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
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
              // src="/mmdu-logo.png"
              src="/Logo-Color-MMDU.webp"
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
          
          {/* <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Secure Login
          </h3> */}

          <AnimatePresence mode="wait">

            {!isForgot ? (
              <motion.div
                key="login"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >

                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Secure Login
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="username@mmumullana.org"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      Remember Me
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsForgot(true)}
                      className="text-mmdu-red hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-mmdu-red text-white py-3 rounded-lg"
                  >
                    Access Dashboard
                  </button>

                </form>

              </motion.div>
            ) : (

              <motion.div
                key="forgot"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >

                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Forgot Password
                </h3>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your registered email"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-mmdu-red text-white py-3 rounded-lg"
                  >
                    Reset Password
                  </button>

                </form>

                <div className="mt-6 text-center text-sm">
                  <button
                    onClick={() => setIsForgot(false)}
                    className="text-mmdu-red hover:underline"
                  >
                    Remember your password? Login here
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>


          {/* Missing Provisous -  */}

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