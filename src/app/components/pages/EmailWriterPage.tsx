import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Sparkles, Wand2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function EmailWriterPage() {
  const [cvContent, setCvContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [emailTone, setEmailTone] = useState("Professional");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!cvContent || !jobDescription) {
      alert("Please paste your CV and Job Description first.");
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('elevate_token')}`
        },
        body: JSON.stringify({ 
          type: emailTone, 
          details: `CV Content: ${cvContent}\nJob Description: ${jobDescription}` 
        })
      });
      if (response.status === 403) {
        const data = await response.json();
        toast.error(data.message);
        return;
      }
      if (!response.ok) throw new Error("Generation failed");

      const remaining = response.headers.get('X-AI-Limit-Remaining');
      if (remaining !== null) {
        toast.info(`Email generated! ${remaining} left today.`);
      } else {
        toast.success("Email generated with AI!");
      }

      const { content } = await response.json();
      setGeneratedEmail(content);
    } catch (err) {
      console.error("AI Generation failed:", err);
      toast.warning("AI is currently unavailable. Using professional email template.");
      // Fallback
      const subject = `Application for Open Position`;
      let body = "";
      if (emailTone === "Professional") {
        body = `Dear Hiring Manager,\n\nI am writing to express my interest in the position described in your recent posting...`;
      } else {
        body = `Hello,\n\nI'm applying for the open role. Please see my resume attached...`;
      }
      setGeneratedEmail(`Subject: ${subject}\n\n${body}`);
    } finally {
      setIsGenerating(false);
      setCopied(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 h-full flex flex-col md:flex-row gap-8">
      {/* Left Side: Generator Form */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#3B2F2F] mb-2">Email Writer</h1>
          <p className="text-gray-500">Generate professional outreach emails that get replies.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5 flex-1 flex flex-col">
          <div className="space-y-1.5 flex-1 flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase">Paste your CV</label>
            <textarea
              value={cvContent}
              onChange={(e) => setCvContent(e.target.value)}
              className="w-full flex-1 min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 outline-none resize-none"
              placeholder="Paste your resume text here..."
            />
          </div>

          <div className="space-y-1.5 flex-1 flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase">Paste Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full flex-1 min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 outline-none resize-none"
              placeholder="Paste the job description here..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Tone</label>
            <div className="flex gap-2">
              {["Professional", "Enthusiastic", "Short & Direct"].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setEmailTone(tone)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emailTone === tone ? 'bg-[#3B2F2F] text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-[#3B2F2F] to-[#2B2222] text-white rounded-xl font-semibold shadow-lg shadow-[#3B2F2F]/20 hover:-translate-y-0.5 transition-all disabled:opacity-70"
            >
              {isGenerating ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Wand2 className="size-5" />
                </motion.div>
              ) : (
                <Sparkles className="size-5 text-[#D6A85F]" />
              )}
              <span>{isGenerating ? "Drafting Email..." : "Generate Email"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Output */}
      <div className="flex-[1.2] flex flex-col">
        {generatedEmail ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full relative"
          >
             <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
               <div className="flex space-x-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-sm font-semibold text-[#3B2F2F] bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
               >
                 {copied ? <CheckCircle2 className="size-4 text-green-500" /> : <Copy className="size-4" />}
                 <span>{copied ? "Copied!" : "Copy"}</span>
               </button>
             </div>
             <textarea 
               value={generatedEmail}
               onChange={(e) => setGeneratedEmail(e.target.value)}
               className="flex-1 w-full p-6 text-sm text-gray-700 leading-relaxed outline-none resize-none bg-transparent font-sans"
             />
          </motion.div>
        ) : (
          <div className="h-full bg-white rounded-3xl border border-dashed border-gray-300 flex items-center justify-center p-12 text-center">
            <div>
              <div className="size-16 bg-[#D6A85F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="size-8 text-[#D6A85F]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Ready to write</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Fill out the details on the left and we'll craft the perfect email for your application.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
