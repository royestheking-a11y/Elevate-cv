import { motion } from "motion/react";
import { LayoutTemplate, PenTool, Wrench, Zap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

import { useSEO } from "../../../hooks/useSEO";

export default function FeaturesPage() {
  useSEO({
    title: "CV Builder Features | Resume Repair, Cover Letter & Email Generator",
    description: "Explore ElevateCV's powerful features including an AI resume builder, resume repair, auto cover letter generation, and professional email writing.",
    keywords: "cv builder features, resume repair, cover letter generator, email generator, ai resume builder"
  });
  const features = [
    {
      id: "builder",
      title: "Resume Builder",
      description: "Our premium builder offers a split-screen experience. Edit your details on the left and see real-time updates on your template on the right.",
      icon: LayoutTemplate,
      color: "from-blue-500/20 to-blue-500/5 text-blue-600 border-blue-500/20",
      accent: "bg-blue-500",
      points: [
        "Real-time visual preview",
        "Granular typography controls",
        "Drag and drop section reordering",
        "ATS-friendly exports"
      ],
      mockUi: (
        <div className="flex h-full w-full gap-4">
          <div className="w-1/3 bg-gray-50 rounded-lg p-3 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-white border border-gray-200 rounded"></div>
            <div className="h-8 bg-white border border-gray-200 rounded"></div>
            <div className="h-20 bg-white border border-gray-200 rounded"></div>
          </div>
          <div className="w-2/3 bg-white rounded-lg border border-gray-100 shadow-sm p-4 space-y-4">
            <div className="flex justify-between items-end border-b border-gray-100 pb-3">
              <div>
                <div className="h-6 bg-gray-800 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-400 rounded w-24"></div>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <LayoutTemplate className="size-4 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "repair",
      title: "Resume Repair",
      description: "Don't want to start from scratch? Upload your existing messy resume. Our advanced parsing engine reads your old file and extracts all details perfectly into our modern format.",
      icon: Wrench,
      color: "from-orange-500/20 to-orange-500/5 text-orange-600 border-orange-500/20",
      accent: "bg-orange-500",
      points: [
        "Smart PDF & DOCX parsing",
        "Auto-format detection",
        "Bullet point optimization suggestions",
        "Instant visual upgrade"
      ],
      mockUi: (
        <div className="flex flex-col h-full w-full items-center justify-center gap-6 relative">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 bg-white p-4 rounded-lg shadow-md border border-gray-200 rotate-[-5deg] relative z-10"
          >
            <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-1 bg-gray-100 rounded w-full mb-1"></div>
            <div className="h-1 bg-gray-100 rounded w-5/6"></div>
            <Wrench className="absolute -right-3 -bottom-3 size-8 text-orange-500 drop-shadow-md" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 bg-orange-400/20 rounded-full blur-xl -z-10"
          />
        </div>
      )
    },
    {
      id: "cover-letter",
      title: "Cover Letter Generator",
      description: "A customized cover letter gives you a huge advantage. Our generator takes the job description and your resume context to craft a tailored, professional letter.",
      icon: PenTool,
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-600 border-emerald-500/20",
      accent: "bg-emerald-500",
      points: [
        "Job description matching",
        "Matches resume design",
        "Professional tone adjustment",
        "One-click PDF download"
      ],
      mockUi: (
        <div className="flex h-full w-full gap-4 items-center justify-center relative">
          <div className="w-40 bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm relative z-10 -mr-6">
            <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase">Job Description</div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-300 rounded w-full"></div>
              <div className="h-1.5 bg-gray-300 rounded w-full"></div>
              <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1.5 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
          
          <motion.div 
             animate={{ x: [0, 5, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="z-20 text-emerald-500 bg-white rounded-full p-1 shadow-md border border-gray-100"
          >
             <ArrowRight className="size-5" />
          </motion.div>
          
          <div className="w-48 bg-white rounded-lg p-4 border border-emerald-100 shadow-md relative z-10 -ml-6">
            <div className="absolute top-2 right-2">
               <Sparkles className="size-4 text-emerald-500" />
            </div>
            <div className="h-8 w-8 bg-emerald-50 rounded-full mb-3 flex items-center justify-center">
              <div className="h-3 w-3 bg-emerald-400 rounded-sm"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-800 rounded w-1/2"></div>
              <div className="h-1.5 bg-gray-200 rounded w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
              <div className="h-1.5 bg-gray-200 rounded w-4/6 mt-4"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "email",
      title: "Email Writer",
      description: "Writing the perfect outreach or follow-up email is tedious. Paste your resume and the target job description to get a concise, impactful email ready to send to recruiters.",
      icon: Zap,
      color: "from-purple-500/20 to-purple-500/5 text-purple-600 border-purple-500/20",
      accent: "bg-purple-500",
      points: [
        "Recruiter-focused templates",
        "Context-aware generation",
        "Follow-up sequences",
        "Direct copy-to-clipboard"
      ],
      mockUi: (
        <div className="flex flex-col h-full w-full bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex items-center space-x-2">
            <div className="size-2.5 rounded-full bg-red-400" />
            <div className="size-2.5 rounded-full bg-yellow-400" />
            <div className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="px-4 py-3 border-b border-gray-100 text-xs flex text-gray-500">
            <span className="w-12">To:</span> <span className="text-gray-800 font-medium">hiring.manager@company.com</span>
          </div>
          <div className="px-4 py-3 border-b border-gray-100 text-xs flex text-gray-500">
            <span className="w-12">Subject:</span> <span className="text-gray-800 font-medium flex items-center gap-2">Application for Senior Role <Zap className="size-3 text-purple-500" /></span>
          </div>
          <div className="p-4 space-y-3 flex-1 relative">
            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              className="absolute bottom-4 right-4 bg-purple-600 text-white text-[10px] px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-md"
            >
              <Zap className="size-3" /> Auto-Generated
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D6A85F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#3B2F2F]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-[#D6A85F]/30 shadow-sm mb-8"
        >
          <Sparkles className="size-4 text-[#D6A85F]" />
          <span className="text-sm font-semibold text-[#3B2F2F]">The ElevateCV Arsenal</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-[#3B2F2F] tracking-tight leading-tight"
        >
          Powerful Features <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6A85F] to-[#3B2F2F]">
            for Your Career
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Discover a suite of intelligent tools designed to craft a compelling professional narrative and accelerate your job search.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-32 pb-24 relative z-10">
        {features.map((feature, i) => (
          <div key={feature.id} id={feature.id} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="flex-1 w-full"
            >
              <div className={`size-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br border shadow-sm ${feature.color}`}>
                <feature.icon className="size-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#3B2F2F] tracking-tight">{feature.title}</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-4 mb-10">
                {feature.points.map((point, j) => (
                  <motion.li 
                    key={j} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * j }}
                    className="flex items-center space-x-3 text-gray-700 font-medium text-lg bg-white/50 px-4 py-3 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <CheckCircle2 className="size-5 text-[#D6A85F] shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Interactive Mock UI Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="flex-1 w-full"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] p-1 bg-gradient-to-br from-gray-100 to-gray-50 shadow-2xl shadow-[#3B2F2F]/10 border border-gray-200/60 group">
                {/* Glow effect on hover */}
                <div className={`absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />
                
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/20 rounded-[2rem] pointer-events-none" />
                
                <div className="relative h-full w-full bg-[#FDFBF7] rounded-[1.75rem] p-6 sm:p-8 flex flex-col overflow-hidden border border-white shadow-inner">
                  {/* Mock Window Controls */}
                  <div className="flex space-x-2 mb-6">
                    <div className="size-3 rounded-full bg-red-400/80 shadow-sm" />
                    <div className="size-3 rounded-full bg-yellow-400/80 shadow-sm" />
                    <div className="size-3 rounded-full bg-green-400/80 shadow-sm" />
                  </div>
                  
                  {/* Dynamic Mock UI specific to each feature */}
                  <div className="flex-1 relative flex items-center justify-center bg-gray-100/50 rounded-2xl border border-gray-200/50 p-4 overflow-hidden">
                     {feature.mockUi}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 text-center mt-12 pb-20"
      >
        <div className="bg-[#3B2F2F] text-white rounded-3xl p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-[#D6A85F] rounded-full blur-[100px] opacity-30 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Experience the difference</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto relative z-10">Stop struggling with formatting and let our AI-powered tools help you build a professional brand that gets you hired.</p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-[#3B2F2F] bg-white hover:bg-[#FDFBF7] rounded-full shadow-xl transition-all hover:scale-105 relative z-10"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}