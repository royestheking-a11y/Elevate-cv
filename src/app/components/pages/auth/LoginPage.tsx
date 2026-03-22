import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Logo } from "../../ui/Logo";
import { useAuth } from "../../../context/AuthContext";
import { TimeIllustration } from "../../auth/TimeIllustration";

import { useSEO } from "../../../hooks/useSEO";

export default function LoginPage() {
  useSEO({
    title: "Log in to ElevateCV | Resume & CV Builder",
    description: "Log in to your ElevateCV account to manage your resumes, cover letters, and track your career progress."
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    // Priority 1: Email passed from Signup page
    if (location.state?.email) {
      setEmail(location.state.email);
      return;
    }

    // Priority 2: Remember me logic
    const savedEmail = localStorage.getItem("elevate_saved_email");
    const savedRemember = localStorage.getItem("elevate_remember_me") === "true";
    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [location.state]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Auto-save logic
    if (rememberMe) {
      localStorage.setItem("elevate_saved_email", email);
      localStorage.setItem("elevate_remember_me", "true");
    } else {
      localStorage.removeItem("elevate_saved_email");
      localStorage.setItem("elevate_remember_me", "false");
    }

    const result = await login(email, password);
    
    setIsLoading(false);
    if (result.success) {
      if (email === "admin@elevatecv.com") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(result.message || "Invalid credentials");
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError(null);
      const result = await loginWithGoogle(tokenResponse.access_token);
      setIsLoading(false);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || "Google Authentication failed");
      }
    },
    onError: () => setError("Google Sign-In was canceled")
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6 selection:bg-[#D6A85F] selection:text-white">
      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl shadow-[#3B2F2F]/5 overflow-hidden flex flex-col md:flex-row">

        {/* Left Form Side */}
        <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col justify-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight mb-12">
            <Logo className="size-8" />
            <span className="text-[#3B2F2F]">ElevateCV</span>
          </Link>

          <h1 className="text-3xl font-bold text-[#3B2F2F] mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Enter your details to access your dashboard.</p>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3 text-red-600 text-sm font-medium"
              >
                <AlertCircle className="size-5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form id="login-form" onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#3B2F2F]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#3B2F2F]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3B2F2F] focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#D6A85F] focus:ring-[#D6A85F] border-gray-300 size-4"
                />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-[#D6A85F] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-4 bg-[#3B2F2F] text-white rounded-xl font-bold hover:bg-[#2B2222] transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={() => handleGoogleAuth()}
              className="w-full mt-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3 group shadow-sm"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account? <Link to="/signup" className="font-bold text-[#3B2F2F] hover:text-[#D6A85F] transition-colors">Sign up</Link>
          </p>
        </div>

        {/* Right Graphic Side */}
        <div className="hidden md:flex w-1/2 bg-[#3B2F2F] p-12 relative overflow-hidden flex-col justify-between">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-[#D6A85F]/30 rounded-full mix-blend-screen filter blur-3xl opacity-50" />
            <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-[#D6A85F]/20 rounded-full mix-blend-screen filter blur-3xl opacity-50" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-md">
              <span className="size-2 rounded-full bg-green-400 animate-pulse" />
              <span>System Operational</span>
            </div>

            <div className="mb-8 flex justify-center md:justify-start">
              <TimeIllustration />
            </div>

            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Craft your<br />future with precision.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm mb-20">
              Join thousands of professionals who have accelerated their career using our state-of-the-art builder tools.
            </p>
          </div>

          <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#D6A85F] to-yellow-600 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
                  SD
                </div>
                <div>
                  <h4 className="text-white font-semibold">Sunny Doe</h4>
                  <p className="text-white/60 text-sm">Full stack Developer</p>
                </div>
              </div>
              <p className="text-white/80 text-sm italic">
                "ElevateCV transformed my messy 4-page document into a sleek, 1-page masterpiece that got me interviews at FAANG companies instantly."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}