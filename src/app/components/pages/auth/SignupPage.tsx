import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, User, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Logo } from "../../ui/Logo";
import { useAuth } from "../../../context/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { TimeIllustration } from "../../auth/TimeIllustration";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signup(email, fullName, password);

    setIsLoading(false);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message || "Signup failed");
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError(null);
      const result = await loginWithGoogle(tokenResponse.access_token);
      setIsLoading(false);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Google Authentication failed");
      }
    },
    onError: () => setError("Google Sign-In was canceled")
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6 selection:bg-[#D6A85F] selection:text-white">
      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl shadow-[#3B2F2F]/5 overflow-hidden flex flex-col md:flex-row">

        {/* Left Graphic Side */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#1C1717] to-[#3B2F2F] p-12 relative overflow-hidden flex-col justify-between order-2 md:order-1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D6A85F]/20 rounded-full mix-blend-screen filter blur-3xl opacity-60" />
          </div>

          <div className="relative z-10 mb-8 overflow-visible">
            <TimeIllustration />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight mt-8">
              Start building<br />your premium brand.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm mb-20">
              Create unlimited professional documents entirely free. Upgrade later if you need advanced AI analysis.
            </p>

            <ul className="space-y-6">
              {[
                "10+ ATS-Optimized Resume Templates",
                "6 Professional Cover Letter Designs",
                "AI-Powered Resume Repair Parsing",
                "Context-Aware Email Writer"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center space-x-3 text-white/90">
                  <div className="size-6 rounded-full bg-[#D6A85F]/20 flex items-center justify-center text-[#D6A85F]">
                    <Sparkles className="size-3.5" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-auto pt-12">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} ElevateCV. Secure local storage.</p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col justify-center order-1 md:order-2">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight mb-12">
            <Logo className="size-8" />
            <span className="text-[#3B2F2F]">ElevateCV</span>
          </Link>

          <h1 className="text-3xl font-bold text-[#3B2F2F] mb-2">Create an account</h1>
          <p className="text-gray-500 mb-8">Join the platform built for modern professionals.</p>

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

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#3B2F2F]">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sunny Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:bg-white transition-all"
                />
              </div>
            </div>

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
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 8 chars)"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-6 bg-[#3B2F2F] text-white rounded-xl font-bold hover:bg-[#2B2222] transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Create Free Account</span>
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
              <span>Sign up with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account? <Link to="/login" className="font-bold text-[#3B2F2F] hover:text-[#D6A85F] transition-colors">Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}