import { motion } from "motion/react";
import { Play } from "lucide-react";

const TUTORIALS = [
  {
    step: "Step One",
    title: "How to create an account",
    description: "Learn the basics of setting up your ElevateCV profile, choosing your primary goals, and getting started with your first resume.",
  },
  {
    step: "Step Two",
    title: "Choosing the right template",
    description: "Navigate our extensive library of ATS-friendly templates and find the perfect match for your industry and experience level.",
  },
  {
    step: "Step Three",
    title: "Using AI to write bullet points",
    description: "Discover how to leverage our AI assistant to generate powerful, action-oriented bullet points that highlight your achievements.",
  },
  {
    step: "Step Four",
    title: "Generating matched cover letters",
    description: "See how easily you can create a tailored cover letter that perfectly matches your newly built resume and specific job descriptions.",
  }
];

import { useSEO } from "../../../hooks/useSEO";

export default function TutorialsPage() {
  useSEO({
    title: "Resume & Career Tutorials | ElevateCV Resources",
    description: "Master your job search with expert tutorials on writing resumes, passing ATS filters, and networking.",
    keywords: "career advice, resume tips, ats guide, job search tutorial"
  });
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#3B2F2F]">Video Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master ElevateCV in minutes. Watch our quick step-by-step guides to get the most out of your premium subscription.
          </p>
        </motion.div>

        <div className="space-y-16">
          {TUTORIALS.map((tutorial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-[#D6A85F]/5 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="text-[#D6A85F] font-bold text-sm uppercase tracking-wider mb-2">{tutorial.step}</div>
                <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4">{tutorial.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {tutorial.description}
                </p>
                <button className="text-[#3B2F2F] font-semibold border-b-2 border-[#D6A85F] pb-1 hover:text-[#D6A85F] transition-colors">
                  Read text version
                </button>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="aspect-video bg-[#3B2F2F] rounded-2xl relative group overflow-hidden shadow-lg flex items-center justify-center cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="size-16 bg-[#D6A85F]/90 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="size-8 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}