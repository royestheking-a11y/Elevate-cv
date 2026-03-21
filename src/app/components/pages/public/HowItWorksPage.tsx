import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, UserPlus, Upload, FileEdit, DownloadCloud, Sparkles, Send } from "lucide-react";
import { useRef } from "react";

export default function HowItWorksPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    {
      icon: UserPlus,
      title: "1. Create Your Profile",
      desc: "Sign up for free and enter your basic details. All data is securely stored locally in your browser so you never lose your progress."
    },
    {
      icon: Upload,
      title: "2. Upload or Build",
      desc: "Start from scratch with our granular block builder, or instantly parse your messy old PDF/DOCX using our Resume Repair tool."
    },
    {
      icon: FileEdit,
      title: "3. Choose a Template",
      desc: "Select from our 10 beautifully crafted, ATS-friendly resume designs and 6 matching cover letter designs. Change themes with a single click."
    },
    {
      icon: Sparkles,
      title: "4. Generate Cover Letter & Emails",
      desc: "Paste the target job description. We'll automatically match it with your resume context to write the perfect cover letter and outreach email."
    },
    {
      icon: DownloadCloud,
      title: "5. Download & Apply",
      desc: "Export your documents in pristine, high-resolution PDF format, totally ready to bypass ATS systems and impress hiring managers."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-[#3B2F2F]"
        >
          How ElevateCV Works
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-10"
        >
          The complete system designed to take you from a messy document to a hired professional in five easy steps.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24 relative" ref={timelineRef}>
        <div className="relative mb-24">
          {/* Timeline Line Background */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 hidden sm:block md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Timeline Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[39px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#D6A85F] via-[#c29650] to-[#3B2F2F] hidden sm:block md:-translate-x-1/2 rounded-full z-0" 
          />
          
          <div className="space-y-24 md:space-y-32 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
                  
                  {/* Content Card (Left or Right depending on index) */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className={`flex-1 w-full flex flex-col ${isEven ? 'md:pr-24 md:text-right md:order-1' : 'md:pl-24 md:text-left md:order-2'}`}
                  >
                    <div className="md:hidden flex items-center space-x-4 mb-4">
                      <div className="size-12 rounded-full bg-white border-2 border-[#D6A85F] flex items-center justify-center text-[#3B2F2F] shadow-[0_0_10px_rgba(214,168,95,0.4)]">
                        <step.icon className="size-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#3B2F2F]">{step.title}</h3>
                    </div>
                    
                    <h3 className="hidden md:block text-2xl font-bold text-[#3B2F2F] mb-4 group-hover:text-[#D6A85F] transition-colors">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6 md:mb-0">{step.desc}</p>
                  </motion.div>
                  
                  {/* Center Icon Indicator */}
                  <div className="absolute left-[39px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-150px" }}
                      className="size-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center relative shadow-sm"
                    >
                      {/* Glow effect on scroll */}
                      <div className="absolute inset-0 rounded-full border-4 border-[#D6A85F] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(214,168,95,0.6)]" />
                      <step.icon className="size-7 text-[#3B2F2F] relative z-10 group-hover:text-[#D6A85F] transition-colors" />
                    </motion.div>
                  </div>

                  {/* Empty placeholder for flex alignment */}
                  <div className={`hidden md:block flex-1 w-full ${isEven ? 'md:order-2' : 'md:order-1'}`} />
                </div>
              );
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative z-10 bg-white"
        >
          <div className="bg-[#FDFBF7] border border-[#D6A85F]/30 p-12 rounded-3xl inline-block max-w-3xl w-full shadow-lg relative">
            <Send className="size-12 text-[#D6A85F] mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-[#3B2F2F]">Ready to elevate your career?</h2>
            <p className="text-gray-600 mb-8 text-lg">Join thousands of professionals who have already upgraded their applications.</p>
            <Link to="/signup" className="inline-flex items-center space-x-2 bg-[#3B2F2F] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:-translate-y-1 hover:bg-[#2B2222] transition-all">
              <span>Start Building Free</span>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}