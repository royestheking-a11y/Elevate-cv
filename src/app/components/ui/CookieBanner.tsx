import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ ...preferences, status: "accepted" }));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ essential: true, analytics: false, marketing: false, status: "declined" }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ ...preferences, status: "partial" }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 md:px-6 md:pb-6"
        >
          <div className="max-w-7xl mx-auto bg-[#3B2F2F]/95 backdrop-blur-2xl text-white p-4 md:p-6 rounded-[2rem] shadow-2xl shadow-black/60 border border-white/10 relative overflow-hidden">
            {/* Decorative background gradients */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#D6A85F] rounded-full blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#D6A85F] rounded-full blur-[100px] opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Icon & Title Group */}
                <div className="flex items-center space-x-4 flex-shrink-0 self-start md:self-center">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-[#D6A85F] to-[#B68A4F] flex items-center justify-center shadow-lg shadow-[#D6A85F]/30 transform hover:rotate-12 transition-transform">
                    <Cookie className="size-7 text-[#3B2F2F]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                      Privacy Portal
                      <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] text-white/50 font-medium">v2.0</span>
                    </h3>
                    <div className="flex items-center text-[#D6A85F] text-[10px] font-bold uppercase tracking-widest mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D6A85F] mr-2 animate-pulse" />
                      Security Verified
                    </div>
                  </div>
                </div>

                {/* Message / Details Toggle */}
                <div className="flex-1 text-center lg:text-left">
                  {!showDetails ? (
                    <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl">
                      We use premium analytics and essential cookies to craft a seamless resume-building experience for you. 
                      By accepting, you allow us to optimize our tools for your success. <Link to="/cookies" className="text-[#D6A85F] font-semibold hover:underline decoration-2 underline-offset-4">Learn more</Link> about your data.
                    </p>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2"
                    >
                      {[
                        { id: 'essential', name: 'Essential', desc: 'Required for site function', required: true },
                        { id: 'analytics', name: 'Analytics', desc: 'Helps us improve features', required: false },
                        { id: 'marketing', name: 'Marketing', desc: 'Personalized offers & tips', required: false }
                      ].map((pref) => (
                        <div key={pref.id} className="bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <div className="text-xs font-bold text-white">{pref.name}</div>
                              <div className="text-[10px] text-white/40">{pref.desc}</div>
                            </div>
                            <input 
                              type="checkbox" 
                              disabled={pref.required}
                              checked={preferences[pref.id as keyof typeof preferences]}
                              onChange={(e) => setPreferences(prev => ({ ...prev, [pref.id]: e.target.checked }))}
                              className="size-4 rounded border-white/20 bg-transparent text-[#D6A85F] focus:ring-[#D6A85F]"
                            />
                          </label>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  {!showDetails ? (
                    <>
                      <button 
                        onClick={() => setShowDetails(true)}
                        className="flex-1 lg:flex-none px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 hover:border-white/20 active:scale-95"
                      >
                        Configure
                      </button>
                      <button 
                        onClick={handleAccept}
                        className="flex-1 lg:flex-none px-10 py-3.5 rounded-2xl bg-[#D6A85F] hover:bg-[#c29650] text-[#3B2F2F] font-bold transition-all shadow-xl shadow-[#D6A85F]/20 hover:shadow-[#D6A85F]/30 active:scale-95"
                      >
                        Accept All
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setShowDetails(false)}
                        className="flex-1 lg:flex-none px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 active:scale-95"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleSavePreferences}
                        className="flex-1 lg:flex-none px-10 py-3.5 rounded-2xl bg-[#D6A85F] hover:bg-[#c29650] text-[#3B2F2F] font-bold transition-all shadow-xl shadow-[#D6A85F]/20 active:scale-95"
                      >
                        Save Preferences
                      </button>
                    </>
                  )}
                  
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="hidden md:flex ml-2 size-10 rounded-full hover:bg-white/5 items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}