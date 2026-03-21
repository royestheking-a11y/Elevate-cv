import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Zap, PenTool, LayoutTemplate, ShieldCheck, Wrench, Plus, Minus, MessageSquare, Phone, MapPin, Mail, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

// Figma Asset Imports
import imgBlackAndWhiteSimpleCvResume1 from "figma:asset/49703a1aacca74b339a73d242b5ea68aa2cadf2f.png";
import imgWhiteSimpleSalesRepresentativeCvResume1 from "figma:asset/adae69e22bdbf070cab4ab6e16ca8bdfb98ed950.png";
import imgProfessionalModernCvResume1 from "figma:asset/fa6cddfe339dc9d1dcadfe8d4a21097618bb09b4.png";
import imgGreenAndBlackProfessionalCorporateAtsResume1 from "figma:asset/9578458b44a32b3f9e4ffbdd84a5b421a580496c.png";

import imgStep1 from "figma:asset/295019edb15a9f3dee662d71444c2d0c9a1007fb.png";
import imgStep2 from "figma:asset/4a8a0f663038668c69a04370e9497d90df409c74.png";
import imgStep3 from "figma:asset/509abf385fe92f465ad29fb96c156d89ceca9b7c.png";
import imgStep4 from "figma:asset/9a0414946b3039cba7d8bed77d88ce3d8ae6885a.png";

const HOW_IT_WORKS_STEPS = [
  {
    title: "Pre-written content",
    desc: "Select from thousands of pre-written phrases for hundreds of jobs and careers. Just click and insert them directly into your CV!",
    image: imgStep1
  },
  {
    title: "20+ click & ready CV templates",
    desc: "Use our recommendations or pick your own. All templates are recruiter-approved and guaranteed to pass applicant tracking systems (ATS).",
    image: imgStep2
  },
  {
    title: "Expert insights",
    desc: "Detailed CV-building tips and advice every step of the way. CV pro or beginner - we've got you covered.",
    image: imgStep3
  },
  {
    title: "Instant feedback & score",
    desc: "Get an instant score on your resume and actionable tips to improve it and increase your chances.",
    image: imgStep4
  }
];

const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const characters = text.split("");
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05, duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const FAQS = [
  { question: "Is ElevateCV really free?", answer: "Yes, you can create and download a basic resume for free. We also offer premium features for advanced ATS optimization and advanced templates." },
  { question: "How does the Resume Repair feature work?", answer: "Simply upload your existing resume in PDF or Word format, and our AI will automatically parse the information, reorganize it into a modern ATS-friendly format, and rewrite bullet points to highlight your achievements." },
  { question: "Can I use multiple templates?", answer: "Absolutely! Once your data is entered, you can switch between any of our premium templates with a single click without losing any information." },
  { question: "Are the templates ATS-friendly?", answer: "Yes. All our templates are rigorously tested against popular Applicant Tracking Systems (ATS) to ensure your resume gets parsed correctly by recruiters." },
  { question: "Is my data secure?", answer: "We take privacy seriously. All your data is stored securely in your browser's local storage using Zustand, meaning we don't keep your personal information on our servers." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % HOW_IT_WORKS_STEPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-36 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D6A85F]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#3B2F2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-[#D6A85F]/30 shadow-sm mb-8"
          >
            <Sparkles className="size-4 text-[#D6A85F]" />
            <span className="text-sm font-medium text-[#3B2F2F]">AI-Powered Resume Builder</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <TypewriterText text="Build a " />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6A85F] to-[#3B2F2F]">
              <TypewriterText text="Job-Winning" />
            </span>
            <br />
            <TypewriterText text="Resume in Minutes" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Create job-ready resumes, cover letters, and professional outreach emails effortlessly. Free, premium-feel tools designed to get you hired.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="flex items-center justify-center space-x-2 px-8 py-4 text-base font-semibold text-white bg-[#3B2F2F] hover:bg-[#2B2222] rounded-full shadow-xl shadow-[#3B2F2F]/20 transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="size-5" />
            </Link>
            <Link
              to="/templates"
              className="flex items-center justify-center space-x-2 px-8 py-4 text-base font-medium text-[#3B2F2F] bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all w-full sm:w-auto"
            >
              View Templates
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it Works Animated Section */}
      <section className="py-24 bg-[#FDFBF7] border-t border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#3B2F2F]">
              Easiest and most feature-packed<br/>CV builder available
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            {/* Left Image Area */}
            <div className="w-full md:w-1/2 relative min-h-[400px] flex items-center justify-center bg-white border border-gray-100 shadow-xl shadow-[#D6A85F]/5 rounded-2xl p-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={HOW_IT_WORKS_STEPS[activeStep].image}
                  alt={HOW_IT_WORKS_STEPS[activeStep].title}
                  initial={{ opacity: 0, scale: 0.95, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-auto object-contain max-h-[350px] drop-shadow-xl"
                />
              </AnimatePresence>
            </div>

            {/* Right Steps Area */}
            <div className="w-full md:w-1/2 flex flex-col space-y-2">
              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-start text-left p-4 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-white shadow-lg shadow-black/5" : "hover:bg-gray-50/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="mr-6 mt-1 relative flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                        isActive ? "bg-[#3B2F2F] text-white shadow-sm" : "bg-white text-gray-800 shadow-sm border border-gray-200"
                      }`}>
                        {idx + 1}
                      </div>
                      {/* Animated border for active state */}
                      {isActive && (
                        <motion.svg 
                          className="absolute -inset-2 w-12 h-12 text-[#D6A85F] pointer-events-none" 
                          viewBox="0 0 48 48"
                        >
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </motion.svg>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg mb-1 transition-colors duration-300 ${isActive ? "text-[#3B2F2F]" : "text-gray-900"}`}>
                        {step.title}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 text-sm leading-relaxed pt-2">
                              {step.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-[#3B2F2F] hover:bg-[#2B2222] rounded-full shadow-xl shadow-[#3B2F2F]/30 transition-all hover:-translate-y-1"
            >
              Let's get started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Outline */}
      <section className="py-24 bg-white relative border-t border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Everything you need to land the job</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our four core engines work seamlessly together to present the best version of your professional self.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Resume Builder", desc: "Split-screen editor with real-time preview and 10+ premium templates.", icon: LayoutTemplate, color: "bg-blue-50 text-blue-600", link: "/features#builder" },
              { title: "Resume Repair", desc: "Upload your old resume and watch our parser rebuild it instantly.", icon: Wrench, color: "bg-orange-50 text-orange-600", link: "/features#repair" },
              { title: "Cover Letter", desc: "Auto-generate customized letters based on specific job descriptions.", icon: PenTool, color: "bg-emerald-50 text-emerald-600", link: "/features#cover-letter" },
              { title: "Email Writer", desc: "Generate professional outreach and follow-up emails that get replies.", icon: Zap, color: "bg-purple-50 text-purple-600", link: "/features#email" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-[#FDFBF7] border border-gray-100 hover:shadow-xl hover:shadow-[#D6A85F]/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{feature.desc}</p>
                <Link to={feature.link} className="inline-flex items-center space-x-1 text-sm font-semibold text-[#3B2F2F] hover:text-[#D6A85F] mt-6 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview Gallery */}
      <section className="py-24 bg-[#3B2F2F] text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
           <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#D6A85F] to-transparent blur-3xl mix-blend-screen" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-white to-transparent blur-3xl mix-blend-overlay" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-white"
          >
            ATS-Friendly, Premium Designs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto mb-8"
          >
            Choose from our collection of professionally designed templates that pass the robots and impress humans.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/templates" className="inline-flex items-center space-x-2 bg-white text-[#3B2F2F] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              <span>Explore All Templates</span>
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
        
        <div className="flex space-x-6 px-6 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar relative z-10">
          {[
            imgBlackAndWhiteSimpleCvResume1,
            imgWhiteSimpleSalesRepresentativeCvResume1,
            imgProfessionalModernCvResume1,
            imgGreenAndBlackProfessionalCorporateAtsResume1
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="flex-none w-[300px] md:w-[400px] snap-center rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 relative group"
            >
              <img src={img} alt={`Template preview ${i + 1}`} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <Link to="/templates" className="bg-white text-[#3B2F2F] px-6 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
                  View Template Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Got questions? We've got answers.</p>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg text-[#3B2F2F]">{faq.question}</span>
                  <div className={`p-1 rounded-full transition-colors ${openFaq === index ? "bg-[#3B2F2F] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#FDFBF7] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                Have a question about our templates or need help with your account? Our dedicated support team is here to help you succeed.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#D6A85F]/20 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="size-14 bg-[#FDFBF7] rounded-xl flex items-center justify-center shrink-0 text-[#D6A85F] group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#3B2F2F]">Email us</h4>
                    <p className="text-gray-500 text-sm mb-2">We'll respond within 24 hours.</p>
                    <a href="mailto:support@elevatecv.com" className="text-[#D6A85F] font-semibold hover:underline text-lg">support@elevatecv.com</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#D6A85F]/20 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="size-14 bg-[#FDFBF7] rounded-xl flex items-center justify-center shrink-0 text-[#D6A85F] group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#3B2F2F]">Call us</h4>
                    <p className="text-gray-500 text-sm mb-2">Mon-Fri from 9am to 6pm EST.</p>
                    <a href="tel:01343042761" className="text-[#D6A85F] font-semibold hover:underline text-lg">01343042761</a>
                  </div>
                </div>

                <div className="flex items-start space-x-5 p-6 rounded-2xl bg-[#3B2F2F] shadow-xl group overflow-hidden relative">
                  <div className="absolute -right-8 -top-8 size-32 bg-[#D6A85F]/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="size-14 bg-[#4A3D3D] rounded-xl flex items-center justify-center shrink-0 text-[#D6A85F] group-hover:scale-110 transition-transform relative z-10">
                    <MapPin size={24} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-xl text-white">Visit us</h4>
                    <p className="text-white/70 text-sm leading-relaxed mt-1">
                      Nikunja 2, Dhaka.<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#3B2F2F] rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#3B2F2F]/20 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D6A85F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 pointer-events-none" />
              
              <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Send us a message</h3>
              <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:border-transparent transition-all" placeholder="Sunny" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:border-transparent transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:border-transparent transition-all" placeholder="sunny@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:border-transparent transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-[#D6A85F] text-[#3B2F2F] rounded-xl font-bold hover:bg-[#c29650] hover:shadow-lg hover:shadow-[#D6A85F]/20 transition-all flex items-center justify-center space-x-2">
                  <MessageSquare size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}