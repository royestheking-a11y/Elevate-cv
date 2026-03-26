import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store";
import { Download, Sparkles, Wand2, CheckCircle2 } from "lucide-react";
import { DownloadCLModal } from "../cv/DownloadCLModal";
import { motion } from "motion/react";
import { toast } from "sonner";
import { aiAPI } from "../../lib/api";

import imgBlackAndWhiteClassicProfessionalJobCoverLetter1 from "figma:asset/af0877775499e60889fbbe26670465895d5dd19d.png";
import imgBlackWhiteSimpleModernCoverLetter1 from "figma:asset/aa4c3adcafef56d2035efd6126b7327ccee544b4.png";
import imgBlackWhiteModernMinimalistSimpleJobApplicationCoverLetter1 from "figma:asset/d3c0c3dbe8f7672b8ee3a4f4284172c594631da2.png";
import imgBlackWhiteModernMinimalistSimpleJobApplicationCoverLetter11 from "figma:asset/ed8fde17d860802590343caabf29ccd3ad6b70b0.png";
import imgBeigeAndWhiteSimpleProfessionalJobCoverLetter1 from "figma:asset/058ac8a47e82aeabdb22c3102bf807853cc22af9.png";

const CL_TEMPLATES = [
  { id: "classic-professional", name: "Classic Professional", image: imgBlackAndWhiteClassicProfessionalJobCoverLetter1 },
  { id: "simple-modern", name: "Simple Modern", image: imgBlackWhiteSimpleModernCoverLetter1 },
  { id: "modern-minimalist", name: "Modern Minimalist", image: imgBlackWhiteModernMinimalistSimpleJobApplicationCoverLetter1 },
  { id: "modern-minimalist-alt", name: "Minimalist Bold", image: imgBlackWhiteModernMinimalistSimpleJobApplicationCoverLetter11 },
  { id: "beige-white", name: "Beige & White Pro", image: imgBeigeAndWhiteSimpleProfessionalJobCoverLetter1 },
  { id: "elegant-serif", name: "Elegant Serif", image: imgBlackAndWhiteClassicProfessionalJobCoverLetter1 },
  { id: "creative-sidebar", name: "Creative Sidebar", image: imgBlackWhiteSimpleModernCoverLetter1 },
  { id: "executive-direct", name: "Executive Direct", image: imgBlackWhiteModernMinimalistSimpleJobApplicationCoverLetter1 },
  { id: "ats-standard-letter", name: "ATS Standard", image: imgBlackAndWhiteClassicProfessionalJobCoverLetter1 }
];

export default function CoverLetterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  
  const { coverLetterData, updateCoverLetter, themeColor, cvData, selectedCoverLetterTemplateId, setSelectedCoverLetterTemplateId, fetchCoverLetter, fetchCV } = useStore();

  useEffect(() => {
    fetchCoverLetter();
    fetchCV();
  }, [fetchCoverLetter, fetchCV]);

  const handleGenerate = async () => {
    if (!coverLetterData.companyName || !coverLetterData.jobTitle) {
      alert("Please fill in the Company Name and Job Title first.");
      return;
    }
    setIsGenerating(true);
    try {
      const response = await aiAPI.generateCoverLetter({ 
        cvData, 
        jobDescription: `${coverLetterData.jobTitle} at ${coverLetterData.companyName}` 
      });
      
      const remaining = response.headers['x-ai-limit-remaining'];
      if (remaining !== undefined) {
        toast.info(`Cover letter generated! ${remaining} left today.`);
      } else {
        toast.success("Cover letter generated with AI!");
      }

      const { content } = response.data;
      updateCoverLetter({ body: content });
    } catch (err) {
      console.error("AI Generation failed:", err);
      toast.warning("AI generation failed. Using professional template instead.");
      updateCoverLetter({
        body: `Dear ${coverLetterData.recipientName},\n\nI am writing to express my strong interest in the ${coverLetterData.jobTitle} position at ${coverLetterData.companyName}.\n\nWith my proven track record of delivering high-quality results and my passion for excellence, I am confident in my ability to make an immediate impact at your organization. My previous experience has equipped me with the exact skills you are looking for.\n\nI would welcome the opportunity to discuss how my background aligns with your needs. Thank you for your time and consideration.\n\nSincerely,\n${cvData.personal.fullName}`
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const renderCoverLetter = () => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const { personal } = cvData;

    switch (selectedCoverLetterTemplateId) {
      case "classic-professional":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] font-serif text-[11pt] text-gray-800 leading-relaxed flex flex-col">
            <div className="border-b-2 pb-6 mb-8 text-center" style={{ borderColor: themeColor }}>
              <h1 className="text-4xl font-bold mb-2 tracking-wide uppercase" style={{ color: themeColor }}>{personal.fullName}</h1>
              <p className="text-sm text-gray-600">{personal.jobTitle}</p>
              <div className="mt-2 text-xs text-gray-500 flex justify-center gap-4">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.location && <span>{personal.location}</span>}
              </div>
            </div>
            <div className="mb-8"><p>{today}</p></div>
            <div className="mb-10">
              <p className="font-bold">{coverLetterData.recipientName}</p>
              <p>{coverLetterData.companyName}</p>
            </div>
            <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
          </div>
        );

      case "simple-modern":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] font-sans text-[11pt] text-gray-800 leading-relaxed flex flex-col">
            <div className="flex justify-between items-start border-b-4 pb-6 mb-10" style={{ borderColor: themeColor }}>
              <div>
                <h1 className="text-4xl font-black mb-1">{personal.fullName}</h1>
                <p className="text-lg font-medium text-gray-500">{personal.jobTitle}</p>
              </div>
              <div className="text-right text-xs text-gray-500 space-y-1">
                {personal.email && <p>{personal.email}</p>}
                {personal.phone && <p>{personal.phone}</p>}
                {personal.location && <p>{personal.location}</p>}
              </div>
            </div>
            <div className="mb-8 text-sm font-semibold" style={{ color: themeColor }}>{today}</div>
            <div className="mb-8">
              <p className="font-bold text-gray-900">{coverLetterData.recipientName}</p>
              <p className="text-gray-600">{coverLetterData.companyName}</p>
            </div>
            <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
          </div>
        );

      case "modern-minimalist":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] font-sans text-[11pt] text-gray-800 leading-relaxed flex flex-col">
            <div className="flex gap-12 h-full">
              <div className="w-1/3 border-r pr-8 space-y-8" style={{ borderColor: themeColor }}>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{personal.fullName}</h1>
                  <p className="text-sm font-medium" style={{ color: themeColor }}>{personal.jobTitle}</p>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  {personal.email && <p>{personal.email}</p>}
                  {personal.phone && <p>{personal.phone}</p>}
                  {personal.location && <p>{personal.location}</p>}
                </div>
              </div>
              <div className="w-2/3 flex flex-col">
                <div className="mb-12 text-sm text-gray-500">{today}</div>
                <div className="mb-12">
                  <p className="font-bold">{coverLetterData.recipientName}</p>
                  <p>{coverLetterData.companyName}</p>
                </div>
                <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
              </div>
            </div>
          </div>
        );

      case "modern-minimalist-alt":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-gray-50 shadow-2xl p-0 font-sans text-[11pt] text-gray-800 leading-relaxed flex flex-col">
            <header className="bg-[#1a1a1a] text-white p-[20mm] pb-[15mm]">
              <h1 className="text-4xl font-bold tracking-tight mb-2">{personal.fullName}</h1>
              <p className="text-lg opacity-80">{personal.jobTitle}</p>
              <div className="mt-6 flex gap-6 text-xs opacity-70">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
              </div>
            </header>
            <div className="p-[20mm] bg-white flex-1 flex flex-col mx-[10mm] my-[10mm] shadow-sm rounded">
              <div className="mb-8 font-medium">{today}</div>
              <div className="mb-10 border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <p className="font-bold text-gray-900">{coverLetterData.recipientName}</p>
                <p className="text-gray-600">{coverLetterData.companyName}</p>
              </div>
              <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
            </div>
          </div>
        );

      case "beige-white":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-[#FDFBF7] shadow-2xl font-serif text-[11pt] text-[#3B2F2F] leading-relaxed flex">
            <div className="w-1/4 bg-[#D6A85F]/20 p-[15mm] h-full flex flex-col gap-6">
              <div className="size-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#D6A85F] shadow-sm">
                {personal.fullName.charAt(0)}
              </div>
              <div className="space-y-4 text-xs mt-10">
                <h3 className="font-bold uppercase tracking-widest text-[#3B2F2F] border-b border-[#D6A85F]/30 pb-1">Contact</h3>
                {personal.email && <p className="break-all">{personal.email}</p>}
                {personal.phone && <p>{personal.phone}</p>}
                {personal.location && <p>{personal.location}</p>}
              </div>
            </div>
            <div className="w-3/4 p-[20mm] flex flex-col">
              <h1 className="text-4xl font-normal mb-2">{personal.fullName}</h1>
              <p className="text-lg italic text-[#D6A85F] mb-12">{personal.jobTitle}</p>
              <div className="mb-8 text-sm">{today}</div>
              <div className="mb-8">
                <p className="font-bold">{coverLetterData.recipientName}</p>
                <p>{coverLetterData.companyName}</p>
              </div>
              <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
            </div>
          </div>
        );

      case "creative-sidebar":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl font-sans text-[11pt] text-gray-800 leading-relaxed flex flex-row">
            <div className="w-[30%] p-[15mm] text-white flex flex-col gap-6" style={{ backgroundColor: themeColor }}>
              <div className="size-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4 border-2 border-white/40">
                {personal.fullName.charAt(0)}
              </div>
              <h2 className="font-bold uppercase tracking-widest border-b border-white/20 pb-2 text-sm">Contact</h2>
              <div className="space-y-4 text-sm opacity-90 break-words">
                {personal.email && <p>{personal.email}</p>}
                {personal.phone && <p>{personal.phone}</p>}
                {personal.location && <p>{personal.location}</p>}
              </div>
            </div>
            <div className="w-[70%] p-[20mm] flex flex-col">
              <h1 className="text-4xl font-black mb-1 text-gray-900">{personal.fullName}</h1>
              <p className="text-lg font-medium mb-12" style={{ color: themeColor }}>{personal.jobTitle}</p>
              <div className="mb-8 text-sm text-gray-500 font-medium">{today}</div>
              <div className="mb-8 border-l-4 pl-4" style={{ borderColor: themeColor }}>
                <p className="font-bold text-gray-900">{coverLetterData.recipientName}</p>
                <p className="text-gray-600">{coverLetterData.companyName}</p>
              </div>
              <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
            </div>
          </div>
        );

      case "executive-direct":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] font-serif text-[11pt] text-gray-800 leading-relaxed flex flex-col">
            <div className="border-t-[12px] pt-8 mb-10" style={{ borderColor: themeColor }}>
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight uppercase">{personal.fullName}</h1>
              <p className="text-xl mt-2 tracking-widest text-gray-500 uppercase">{personal.jobTitle}</p>
            </div>
            <div className="flex justify-between items-end mb-12 pb-4 border-b border-gray-200">
              <div className="text-xs text-gray-600 space-y-1">
                {personal.email && <p>{personal.email}</p>}
                {personal.phone && <p>{personal.phone}</p>}
                {personal.location && <p>{personal.location}</p>}
              </div>
              <div className="text-sm font-semibold" style={{ color: themeColor }}>{today}</div>
            </div>
            <div className="mb-8">
              <p className="font-bold text-gray-900">{coverLetterData.recipientName}</p>
              <p className="text-gray-600">{coverLetterData.companyName}</p>
            </div>
            <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="font-bold text-lg" style={{ color: themeColor }}>{personal.fullName}</p>
            </div>
          </div>
        );

      case "ats-standard-letter":
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] font-sans text-[11pt] text-black leading-relaxed flex flex-col">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-1">{personal.fullName}</h1>
              <p className="text-sm mb-2">{personal.jobTitle}</p>
              <p className="text-xs">
                {[personal.email, personal.phone, personal.location].filter(Boolean).join(" | ")}
              </p>
            </div>
            <div className="mb-6">{today}</div>
            <div className="mb-8">
              <p>{coverLetterData.recipientName}</p>
              <p>{coverLetterData.companyName}</p>
            </div>
            <div className="flex-1 whitespace-pre-wrap">{coverLetterData.body}</div>
            <div className="mt-10">
              <p>Sincerely,</p>
              <br/><br/>
              <p>{personal.fullName}</p>
            </div>
          </div>
        );

      case "elegant-serif":
      default:
        return (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] font-serif text-[11pt] text-gray-900 leading-relaxed flex flex-col">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-medium tracking-tighter mb-4">{personal.fullName}</h1>
              <div className="flex justify-center items-center gap-4 text-xs tracking-widest uppercase border-y border-gray-200 py-3">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.location && <span>{personal.location}</span>}
              </div>
            </div>
            <div className="mb-10 text-right italic">{today}</div>
            <div className="mb-12">
              <p className="font-bold">{coverLetterData.recipientName}</p>
              <p>{coverLetterData.companyName}</p>
            </div>
            <div className="flex-1 whitespace-pre-wrap text-justify">{coverLetterData.body}</div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-screen overflow-hidden bg-[#FDFBF7]">
      {/* Left Panel - Inputs */}
      <div className="w-full lg:w-[450px] flex flex-col border-r border-gray-200 bg-white shadow-sm z-10 overflow-hidden">
        {showTemplates ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center mb-6">
              <button onClick={() => setShowTemplates(false)} className="text-sm font-medium text-gray-500 hover:text-gray-900 mr-4">← Back</button>
              <h2 className="text-xl font-bold text-[#3B2F2F]">Cover Letter Templates</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CL_TEMPLATES.map((template) => {
                const isSelected = selectedCoverLetterTemplateId === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedCoverLetterTemplateId(template.id);
                      setShowTemplates(false);
                    }}
                    className={`relative group text-left transition-all duration-200 rounded-xl overflow-hidden border-2 ${isSelected ? 'border-[#D6A85F] ring-4 ring-[#D6A85F]/20' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <div className="aspect-[1/1.4] w-full bg-gray-100 overflow-hidden relative">
                      <img src={template.image} alt={template.name} className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} />
                      <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-[#D6A85F]/10' : 'bg-black/0 group-hover:bg-black/5'}`} />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-white rounded-full shadow-md">
                          <CheckCircle2 className="size-6 text-[#D6A85F]" />
                        </div>
                      )}
                    </div>
                    <div className={`p-3 bg-white border-t border-gray-100 ${isSelected ? 'bg-orange-50/50' : ''}`}>
                      <h3 className="font-semibold text-xs text-[#3B2F2F] truncate">{template.name}</h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold text-[#3B2F2F]">Cover Letter</h1>
              <button 
                onClick={() => setShowTemplates(true)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-medium text-gray-700 transition-colors"
              >
                Change Template
              </button>
            </div>
            <p className="text-gray-500 mb-8 text-sm">Tailor your cover letter instantly for any job application.</p>
            
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hiring Manager Name</label>
                <input
                  type="text"
                  value={coverLetterData.recipientName}
                  onChange={(e) => updateCoverLetter({ recipientName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 outline-none"
                  placeholder="e.g. John Smith or Hiring Manager"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  value={coverLetterData.companyName}
                  onChange={(e) => updateCoverLetter({ companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 outline-none"
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</label>
                <input
                  type="text"
                  value={coverLetterData.jobTitle}
                  onChange={(e) => updateCoverLetter({ jobTitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 outline-none"
                  placeholder="e.g. Senior Product Designer"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-[#3B2F2F] to-[#2B2222] text-white rounded-xl font-semibold shadow-lg shadow-[#3B2F2F]/20 hover:-translate-y-0.5 transition-all disabled:opacity-70"
                >
                  {isGenerating ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Wand2 className="size-5" />
                    </motion.div>
                  ) : (
                    <Sparkles className="size-5 text-[#D6A85F]" />
                  )}
                  <span>{isGenerating ? "AI is writing..." : "Auto-Generate Letter"}</span>
                </button>
              </div>
              
              <div className="space-y-1.5 mt-6">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between">
                  <span>Manual Edit</span>
                </label>
                <textarea
                  value={coverLetterData.body}
                  onChange={(e) => updateCoverLetter({ body: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Preview */}
      <div className="hidden lg:flex flex-1 flex-col bg-gray-100/50 relative overflow-hidden">
        <div className="absolute top-4 right-8 z-20">
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 text-sm font-semibold text-white bg-[#3B2F2F] rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Download className="size-4" />
            <span>Download Letter</span>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-12 flex justify-center custom-scrollbar">
          <div ref={letterRef} className="origin-top transition-all duration-300">
            {renderCoverLetter()}
          </div>
        </div>
      </div>
      <DownloadCLModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        letterRef={letterRef} 
      />
    </div>
  );
}