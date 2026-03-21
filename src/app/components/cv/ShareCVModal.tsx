import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Share2, Copy, Check, Globe, Link, Unlock } from "lucide-react";
import { useStore } from "../../store";
import confetti from "canvas-confetti";

interface ShareCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareCVModal({ isOpen, onClose }: ShareCVModalProps) {
  const [copied, setCopied] = useState(false);
  const cvData = useStore((state) => state.cvData);
  const themeColor = useStore((state) => state.themeColor);

  const baseUrl = window.location.origin;
  // Use the actual CV _id for the share link if available, otherwise fallback to a slug
  const cvId = cvData._id || (cvData.personal?.fullName || "cv").toLowerCase().replace(/[^a-z0-9]/g, "");
  const shareLink = `${baseUrl}/share/${cvId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D6A85F", "#3B2F2F", "#FFFFFF"],
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 sm:p-2.5 bg-[#D6A85F]/10 rounded-xl border border-[#D6A85F]/20">
                  <Share2 className="size-4 sm:size-5 text-[#D6A85F]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#3B2F2F] font-serif">Share Your Resume</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-8 flex flex-col items-center">
              <div className="size-16 sm:size-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 sm:mb-6 relative">
                <Globe className="size-6 sm:size-8 text-blue-500" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                  <Unlock className="size-2 sm:size-3 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Your public link is ready</h3>
              <p className="text-gray-500 text-center text-xs sm:text-sm max-w-sm mb-6 sm:mb-8 leading-relaxed">
                Recruiters can view your stunning CV online. Updates are instantly synced when you save!
              </p>

              {/* Link Box */}
              <div className="w-full bg-gray-50 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex items-center border border-gray-200 shadow-inner group transition-all focus-within:ring-2 focus-within:ring-[#D6A85F]/50">
                <div className="px-2 sm:px-3 flex items-center justify-center">
                  <Link className="size-4 sm:size-5 text-gray-400 group-focus-within:text-[#D6A85F]" />
                </div>
                <input 
                  type="text" 
                  readOnly 
                  value={shareLink} 
                  className="bg-transparent flex-1 text-xs sm:text-sm font-medium text-gray-700 outline-none truncate min-w-0"
                />
                <button
                  onClick={handleCopy}
                  className={`ml-1 sm:ml-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-1.5 sm:space-x-2 transition-all shrink-0 ${
                    copied 
                      ? "bg-green-500 text-white shadow-green-500/30 shadow-lg" 
                      : "bg-[#3B2F2F] text-white shadow-md hover:bg-[#2B2222] hover:shadow-lg"
                  }`}
                >
                  {copied ? <Check className="size-3 sm:size-4" /> : <Copy className="size-3 sm:size-4" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center space-x-2 text-xs font-semibold text-gray-400">
                <span className="w-8 h-px bg-gray-200"></span>
                <span className="uppercase tracking-widest">Share on</span>
                <span className="w-8 h-px bg-gray-200"></span>
              </div>
              
              <div className="mt-4 flex space-x-4">
                <button className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-400 border border-gray-100 shadow-sm">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
                <button className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-400 transition-colors text-gray-400 border border-gray-100 shadow-sm">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}