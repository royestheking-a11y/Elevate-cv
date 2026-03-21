import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Twitter, Linkedin, Github, Mail, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CookieBanner } from "./CookieBanner";
import { AnimatePresence, motion } from "motion/react";

export function PublicLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Force scroll to top on mount and path change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Templates", path: "/templates" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "Tutorials", path: "/tutorials" },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#FDFBF7] text-[#3B2F2F] font-sans selection:bg-[#D6A85F] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-[#3B2F2F]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight">
            <Logo className="size-8" />
            <span>ElevateCV</span>
          </Link>
          <div className="hidden md:flex items-center space-x-2 text-sm font-medium bg-gray-50/50 p-1 rounded-full border border-gray-200/50">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-white shadow-sm border border-gray-200/50 text-[#D6A85F]" 
                      : "text-gray-600 hover:text-[#3B2F2F] hover:bg-black/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="hidden sm:block px-5 py-2.5 text-sm font-medium text-[#3B2F2F] bg-white/50 hover:bg-white border border-[#3B2F2F]/10 rounded-full transition-all shadow-sm hover:shadow-md"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#3B2F2F] to-[#2B2222] rounded-full hover:shadow-lg hover:shadow-[#3B2F2F]/20 transition-all active:scale-95 border border-[#3B2F2F]"
            >
              Sign up
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-[#3B2F2F] hover:bg-black/5 rounded-full transition-colors"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-[70] p-6 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-[#3B2F2F]">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                >
                  <X className="size-5" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-4 flex-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium p-3 rounded-xl transition-colors ${
                      location.pathname === link.path 
                        ? "bg-[#3B2F2F]/5 text-[#D6A85F]" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#3B2F2F]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-6 flex flex-col space-y-3">
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-medium text-[#3B2F2F] bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-medium text-white bg-[#3B2F2F] shadow-md hover:bg-[#2B2222] transition-colors"
                >
                  Sign up free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-[#3B2F2F] text-white/80 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white tracking-tight mb-6">
                <Logo className="size-8" />
                <span>ElevateCV</span>
              </Link>
              <p className="text-sm leading-relaxed text-white/60 mb-8 max-w-sm">
                Build job-winning resumes, cover letters, and outreach emails with our premium AI-powered tools. Designed to help you land your dream job faster.
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://x.com/Rizqaratech" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#D6A85F] hover:text-white transition-colors"><Twitter size={18} /></a>
                <a href="http://linkedin.com/company/rizqara-tech" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#D6A85F] hover:text-white transition-colors"><Linkedin size={18} /></a>
                <a href="https://github.com/royestheking-a11y" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#D6A85F] hover:text-white transition-colors"><Github size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/dashboard/resume-builder" className="hover:text-[#D6A85F] transition-colors">Resume Builder</Link></li>
                <li><Link to="/dashboard/resume-repair" className="hover:text-[#D6A85F] transition-colors">Resume Repair</Link></li>
                <li><Link to="/dashboard/cover-letter" className="hover:text-[#D6A85F] transition-colors">Cover Letter</Link></li>
                <li><Link to="/dashboard/email-writer" className="hover:text-[#D6A85F] transition-colors">Email Writer</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/templates" className="hover:text-[#D6A85F] transition-colors">Templates</Link></li>
                <li><Link to="/how-it-works" className="hover:text-[#D6A85F] transition-colors">How it Works</Link></li>
                <li><Link to="/features" className="hover:text-[#D6A85F] transition-colors">Features</Link></li>
                <li><a href="#faq" className="hover:text-[#D6A85F] transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
              <p className="text-sm text-white/60 mb-4">Get the latest career advice and feature updates directly to your inbox.</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 rounded-l-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#D6A85F] transition-colors"
                  />
                </div>
                <button type="submit" className="bg-[#D6A85F] text-white px-4 py-2.5 rounded-r-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} ElevateCV. All rights reserved. &nbsp;|&nbsp; Product of <a href="https://www.rizqara.tech" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">Rizqara Tech</a>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}