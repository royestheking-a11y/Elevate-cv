import { useState, useRef, useMemo, useEffect } from "react";
import { Download, LayoutTemplate, Palette, CheckCircle2, Share2, TrendingUp, Eye, ChevronLeft } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "motion/react";
import CVForm from "../cv/CVForm";
import CVPreview from "../cv/CVPreview";
import TemplateSelector from "../cv/TemplateSelector";
import { ATSScoreModal } from "../cv/ATSScoreModal";
import { ShareCVModal } from "../cv/ShareCVModal";
import { DownloadCVModal } from "../cv/DownloadCVModal";
import confetti from "canvas-confetti";
import { useStore } from "../../store";

export default function CVBuilderPage() {
  const fetchCV = useStore((state) => state.fetchCV);
  
  useEffect(() => {
    fetchCV();
  }, [fetchCV]);

  const [activeTab, setActiveTab] = useState<"edit" | "templates" | "design" | "preview">("edit");
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  
  const cvRef = useRef<HTMLDivElement>(null);
  const themeColor = useStore((state) => state.themeColor);
  const setThemeColor = useStore((state) => state.setThemeColor);
  const cvData = useStore((state) => state.cvData);

  // Compute mock score strictly for the indicator
  const currentScore = useMemo(() => {
    let score = 0;
    if (cvData.personal?.email) score += 5;
    if (cvData.personal?.phone) score += 5;
    if (cvData.personal?.location) score += 5;
    const summaryWords = (cvData.summary || "").split(/\s+/).filter(Boolean).length;
    if (summaryWords >= 30) score += 15;
    else if (summaryWords > 0) score += 5;
    
    const expList = cvData.experience || [];
    if (expList.length >= 2) score += 40;
    else if (expList.length === 1) score += 20;
    
    const skillsList = cvData.skills || [];
    if (skillsList.length >= 8) score += 20;
    else if (skillsList.length >= 4) score += 10;
    
    const eduList = cvData.education || [];
    if (eduList.length > 0) score += 10;
    
    const allExpText = expList.map(e => (e.description || "").toLowerCase()).join(" ");
    const actionVerbs = ['managed', 'led', 'developed', 'created', 'improved'];
    const foundVerbs = actionVerbs.filter(v => allExpText.includes(v));
    if (foundVerbs.length < 2 && expList.length > 0) score -= 5;
    
    return Math.max(0, Math.min(100, score));
  }, [cvData]);

  const handleOpenDownload = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDFBF7]">
      {/* Left Panel - Controls & Form */}
      <div className={`w-full lg:w-[500px] flex-col border-r border-gray-200 bg-white shadow-sm z-10 ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Header Tabs */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-20 overflow-x-auto custom-scrollbar">
          <div className="flex space-x-2 min-w-max">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === "edit" ? "bg-[#3B2F2F] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 transition-all ${activeTab === "templates" ? "bg-[#3B2F2F] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <LayoutTemplate className="size-4 hidden sm:block" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 transition-all ${activeTab === "design" ? "bg-[#3B2F2F] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Palette className="size-4 hidden sm:block" />
              <span>Design</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`lg:hidden px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 transition-all ${activeTab === "preview" ? "bg-[#3B2F2F] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Eye className="size-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="p-6 h-full"
            >
              {activeTab === "edit" && <CVForm />}
              {activeTab === "templates" && <TemplateSelector />}
              {activeTab === "design" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#3B2F2F]">Theme Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {["#3B2F2F", "#D6A85F", "#1F2937", "#0369A1", "#15803D", "#B91C1C", "#7C3AED", "#BE185D"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setThemeColor(color)}
                        className={`size-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm border-2 ${themeColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      >
                        {themeColor === color && <CheckCircle2 className="size-5 text-white/90 drop-shadow-md" />}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
                    <strong>Auto-Save Enabled</strong>
                    <p className="mt-1 opacity-80">All changes are automatically saved to your browser's local storage.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>

      {/* Right Panel - Live Preview */}
      <div className={`flex-1 flex-col bg-gray-100/50 relative overflow-hidden ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        {/* Topbar Actions */}
        <div className="sticky top-0 z-20 flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-3 px-4 lg:px-8 py-3 bg-gray-100/80 backdrop-blur-md border-b border-gray-200/50">
           
           {/* Mobile Back Button */}
           <button 
             onClick={() => setActiveTab("edit")}
             className="lg:hidden flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full text-sm font-bold text-[#3B2F2F] shadow-sm border border-gray-200 hover:bg-gray-50"
           >
             <ChevronLeft className="size-4" />
             <span>Edit</span>
           </button>

           <div className="flex flex-wrap items-center gap-2 justify-end">
             {/* ATS Score Indicator */}
             <button 
               onClick={() => setIsAtsModalOpen(true)}
               className="group flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm border border-gray-200 hover:border-[#D6A85F] transition-all"
             >
               <div className="p-1 rounded-full bg-gradient-to-br from-[#D6A85F]/20 to-[#3B2F2F]/10 group-hover:bg-[#D6A85F]/20 transition-colors">
                 <TrendingUp className="size-3.5 text-[#3B2F2F]" />
               </div>
               <div className="flex items-baseline space-x-1">
                 <span className="text-[#3B2F2F] hidden sm:inline">ATS</span>
                 <span className={`text-xs ${currentScore >= 80 ? 'text-green-600' : currentScore >= 60 ? 'text-yellow-600' : 'text-red-500'}`}>
                   {currentScore}/100
                 </span>
               </div>
             </button>
             
             <div className="hidden sm:flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-green-200">
               <CheckCircle2 className="size-3.5" />
               <span>Saved</span>
             </div>
             
             {/* Share CV Link Button */}
             <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold text-[#3B2F2F] bg-white border border-[#3B2F2F]/20 rounded-full shadow-sm hover:bg-gray-50 hover:shadow transition-all"
             >
               <Share2 className="size-4" />
               <span className="hidden sm:inline">Share</span>
             </button>
  
             <button
              onClick={handleOpenDownload}
              className="flex items-center space-x-2 px-4 sm:px-6 py-1.5 sm:py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#3B2F2F] to-[#2B2222] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Download className="size-4" />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Scaled Preview Wrapper */}
        <div className="flex-1 overflow-auto custom-scrollbar flex items-start justify-center p-4 sm:p-12 relative">
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top transition-transform duration-300 transform scale-[0.4] sm:scale-75 md:scale-90 xl:scale-100 print:scale-100 print:shadow-none" ref={cvRef} style={{ transformOrigin: 'top center' }}>
             <CVPreview />
          </div>
        </div>
      </div>

      <ATSScoreModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
      <ShareCVModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      <DownloadCVModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} cvRef={cvRef} />
    </div>
  );
}