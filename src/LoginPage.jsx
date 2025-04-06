import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from './components/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setMessage(null);
    setEmail("");
    setPassword("");
  };


  const handleLoginSubmit = (e) => {
    e.preventDefault();
  
    if (email === "adiagark@iu.edu" && password === "Agent123") {
      setMessage({ type: "success", text: "✅ Login successful! Redirecting..." });
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // wait 1.5 seconds before redirecting
    } else {
      setMessage({ type: "error", text: "❌ Invalid email or password." });
    }
  };

  const transitionVariant = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-900 text-white flex flex-col justify-center items-center text-center p-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            {isLogin ? "Welcome Back!" : "Get Started with Us"}
          </h2>
          <p className="text-gray-200 text-sm max-w-xs">
            {isLogin
              ? "“Know what you own, and know why you own it.” – Peter Lynch"
              : "“The individual investor should act consistently as an investor and not as a speculator.” – Ben Graham"}
          </p>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div className="bg-black p-10 md:p-14 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                variants={transitionVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                <p className="text-gray-400 mb-8 text-sm">Access your account securely.</p>

                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div>
                    <label className="block mb-1 text-sm text-gray-300">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-300">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {message && (
                    <div
                      className={`text-sm mt-2 font-medium ${
                        message.type === "success" ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md mt-2"
                  >
                    Login
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                variants={transitionVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
                <p className="text-gray-400 mb-8 text-sm">Create your investment account.</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm text-gray-300">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-300">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-300">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-300">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md mt-2"
                  >
                    Sign Up
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-sm text-center text-gray-400 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-purple-400 hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
