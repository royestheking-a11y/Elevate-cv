import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEditorStore } from '../../../store/useEditorStore';
import { TEMPLATES, CVData } from '../../../lib/editorTemplates';
import { extractTextFromPDF, parseResumeToCVData } from '../../../lib/resumeParser';
import { X, Upload, Check, ChevronRight, ChevronLeft, FileText, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import CVPreview from "../CVPreview";
import { DUMMY_CV_DATA } from "../../../lib/dummyData";
import { memo } from "react";

const TemplatePreviewMini = memo(({ templateId }: { templateId: string }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <div 
        className="absolute top-0 left-0 w-[794px] h-[1123px] origin-top-left pointer-events-none select-none"
        style={{ transform: 'scale(0.18)' }}
      >
        <CVPreview templateId={templateId} data={DUMMY_CV_DATA} />
      </div>
    </div>
  );
});

export const ImportWizard: React.FC = () => {
  const { isImportWizardOpen, setImportWizardOpen, applyTemplate } = useEditorStore();
  const [step, setStep] = useState(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<CVData>({
    name: '', title: '', email: '', phone: '', address: '', summary: '',
    experience: [], education: [], skills: [], languages: []
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState('noir');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isImportWizardOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const startExtraction = async () => {
    if (!file) return;
    setIsExtracting(true);
    try {
      // 1. Extract raw text from PDF
      const lines = await extractTextFromPDF(file);
      const rawText = lines.join('\n');

      if (!rawText.trim()) throw new Error("No text found in PDF");

      // 2. Try Gemini AI Parsing
      try {
        const response = await fetch('/api/ai/parse-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('elevate_token')}`
          },
          body: JSON.stringify({ text: rawText })
        });

        if (!response.ok) throw new Error("AI parsing failed");
        
        const ai = await response.json();
        
        // 3. Map AI result to CVData format
        const mappedData: CVData = {
          name: ai.personal?.fullName || '',
          title: ai.personal?.jobTitle || '',
          email: ai.personal?.email || '',
          phone: ai.personal?.phone || '',
          address: ai.personal?.location || '',
          summary: ai.summary || '',
          skills: ai.skills?.map((s: any) => s.name) || [],
          experience: ai.experience?.map((e: any) => ({
            role: e.title || '',
            company: e.company || '',
            period: (e.startDate && e.endDate) ? `${e.startDate} - ${e.endDate}` : (e.startDate || e.endDate || ''),
            bullets: typeof e.description === 'string' ? e.description.split('\n').filter((b: string) => b.trim()) : []
          })) || [],
          education: ai.education?.map((edu: any) => ({
            degree: edu.degree || '',
            institution: edu.school || '',
            period: (edu.startDate && edu.endDate) ? `${edu.startDate} - ${edu.endDate}` : (edu.startDate || edu.endDate || '')
          })) || [],
          languages: [{ l: 'English', lv: 'Native' }]
        };

        setExtractedData(mappedData);
        toast.success('Gemini AI extracted your data perfectly!');
      } catch (aiErr) {
        console.error("AI Parse failed, falling back to regex:", aiErr);
        const parsed = parseResumeToCVData(lines);
        setExtractedData(parsed);
        toast.warning('Using standard parser (AI is busy)');
      }

      setStep(2);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to extract text from PDF.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImport = () => {
    applyTemplate(selectedTemplateId, extractedData);
    setImportWizardOpen(false);
    setStep(1);
    setFile(null);
    toast.success('Template imported to canvas!');
  };

  const steps = [
    { n: 1, label: 'Upload' },
    { n: 2, label: 'Review' },
    { n: 3, label: 'Template' },
    { n: 4, label: 'Import' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setImportWizardOpen(false)}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#222]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#D6A85F]/10 flex items-center justify-center text-[#D6A85F]">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Import Wizard</h2>
              <p className="text-xs text-white/40">Convert your CV to an editable design in seconds</p>
            </div>
          </div>
          <button 
            onClick={() => setImportWizardOpen(false)}
            className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="px-8 py-6 bg-[#1f1f1f] flex items-center justify-between border-b border-white/5">
          {steps.map((s) => (
            <div key={s.n} className="flex items-center gap-2 group">
              <div className={`
                size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step > s.n ? 'bg-green-500 text-white' : step === s.n ? 'bg-[#D6A85F] text-[#3B2F2F] shadow-[0_0_15px_rgba(214,168,95,0.3)]' : 'bg-white/5 text-white/20'}
              `}>
                {step > s.n ? <Check size={14} /> : s.n}
              </div>
              <span className={`text-xs font-medium uppercase tracking-wider ${step === s.n ? 'text-[#D6A85F]' : 'text-white/20'}`}>
                {s.label}
              </span>
              {s.n < 4 && <div className="w-8 h-px bg-white/5 mx-2" />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div 
                  className={`
                    w-full max-w-md aspect-video border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer
                    ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#D6A85F]/50 hover:bg-[#D6A85F]/5 bg-white/5'}
                  `}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".pdf,.png,.jpg,.jpeg" 
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <>
                      <div className="size-16 rounded-2xl bg-green-500/20 text-green-500 flex items-center justify-center">
                        <Check size={32} />
                      </div>
                      <div>
                        <p className="text-white font-bold">{file.name}</p>
                        <p className="text-white/40 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="size-16 rounded-2xl bg-white/5 text-white/20 flex items-center justify-center group-hover:text-[#D6A85F] group-hover:bg-[#D6A85F]/10 transition-colors">
                        <Upload size={32} />
                      </div>
                      <div>
                        <p className="text-white font-bold">Drop your CV here</p>
                        <p className="text-white/40 text-xs mt-1">Accepts PDF, PNG, JPG (Max 5MB)</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-8 p-4 bg-white/5 rounded-2xl text-left w-full max-w-md border border-white/5">
                  <h4 className="text-xs font-bold text-[#D6A85F] uppercase tracking-widest mb-2">How it works</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                    We'll extract all information including your work history, education, and skills. 
                    You can review the data before applying it to your chosen template.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[#D6A85F] font-bold">Full Name</label>
                    <input 
                      type="text" 
                      value={extractedData.name}
                      onChange={(e) => setExtractedData({...extractedData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#D6A85F] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[#D6A85F] font-bold">Job Title</label>
                    <input 
                      type="text" 
                      value={extractedData.title}
                      onChange={(e) => setExtractedData({...extractedData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#D6A85F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[#D6A85F] font-bold">Email</label>
                    <input 
                      type="text" 
                      value={extractedData.email}
                      onChange={(e) => setExtractedData({...extractedData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#D6A85F] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[#D6A85F] font-bold">Phone</label>
                    <input 
                      type="text" 
                      value={extractedData.phone}
                      onChange={(e) => setExtractedData({...extractedData, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#D6A85F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#D6A85F] font-bold">Professional Summary</label>
                  <textarea 
                    value={extractedData.summary}
                    onChange={(e) => setExtractedData({...extractedData, summary: e.target.value})}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#D6A85F] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#D6A85F] font-bold">Skills (comma separated)</label>
                  <input 
                    type="text" 
                    value={extractedData.skills.join(', ')}
                    onChange={(e) => setExtractedData({...extractedData, skills: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#D6A85F] focus:outline-none transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-3 gap-4"
              >
                {TEMPLATES.map((t) => (
                  <div 
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    className={`
                      relative aspect-[1/1.4] rounded-2xl overflow-hidden cursor-pointer group border-2 transition-all p-1
                      ${selectedTemplateId === t.id ? 'border-[#D6A85F] bg-[#D6A85F]/10 scale-[1.02]' : 'border-white/5 bg-white/5 hover:border-white/20'}
                    `}
                  >
                    <div className="w-full h-full bg-white rounded-xl border border-white/5 flex flex-col overflow-hidden">
                       <div className="flex-1 bg-white relative">
                          <TemplatePreviewMini templateId={t.id} />
                       </div>
                       <div className="p-3 bg-[#222]">
                         <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedTemplateId === t.id ? 'text-[#D6A85F]' : 'text-white/60'}`}>
                           {t.label}
                         </p>
                       </div>
                    </div>
                    {selectedTemplateId === t.id && (
                      <div className="absolute top-3 right-3 size-6 bg-[#D6A85F] text-[#3B2F2F] rounded-full flex items-center justify-center shadow-lg">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="size-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6 border border-green-500/20 shadow-2xl shadow-green-500/10">
                  <Check size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Import!</h3>
                <p className="text-white/40 max-w-sm mb-8">
                  Your CV data has been successfully processed and mapped to the <span className="text-[#D6A85F] font-bold">{TEMPLATES.find(t => t.id === selectedTemplateId)?.label}</span> template.
                </p>

                <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-8">
                   <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-white/20 uppercase font-black mb-1">Experience</p>
                      <p className="text-white font-bold">{extractedData.experience.length} Items</p>
                   </div>
                   <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-white/20 uppercase font-black mb-1">Education</p>
                      <p className="text-white font-bold">{extractedData.education.length} Items</p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-[#1A1A1A] flex items-center justify-between">
          <button 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1 || isExtracting}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all
              ${step === 1 || isExtracting ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white hover:bg-white/5'}
            `}
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {step === 1 ? (
             <button 
               onClick={startExtraction}
               disabled={!file || isExtracting}
               className={`
                 flex items-center gap-2 px-8 py-2.5 rounded-2xl text-sm font-bold transition-all
                 ${!file || isExtracting ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#D6A85F] text-[#3B2F2F] hover:bg-[#EBC07F] shadow-lg shadow-[#D6A85F]/20'}
               `}
             >
               {isExtracting ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
               {isExtracting ? 'Extracting...' : 'Extract Data'}
             </button>
          ) : step === 4 ? (
            <button 
              onClick={handleImport}
              className="flex items-center gap-2 px-10 py-2.5 rounded-2xl text-sm font-bold bg-[#D6A85F] text-[#3B2F2F] hover:bg-[#EBC07F] shadow-lg shadow-green-500/20"
            >
              <span>Import to Canvas</span>
              <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={() => setStep(s => Math.min(4, s + 1))}
              className="flex items-center gap-2 px-8 py-2.5 rounded-2xl text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              Next Step
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
