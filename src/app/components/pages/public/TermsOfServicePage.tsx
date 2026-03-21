import { motion } from "motion/react";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
            <FileText className="size-8 text-[#D6A85F]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#3B2F2F] tracking-tight">Terms of Service</h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-[#D6A85F]/5 border border-gray-100 prose prose-lg prose-gray max-w-none text-gray-600"
        >
          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using ElevateCV's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">2. Use License</h2>
          <p>
            Permission is granted to temporarily use the materials and services on ElevateCV's website for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose;</li>
            <li>attempt to decompile or reverse engineer any software contained on the website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">3. Disclaimer</h2>
          <p>
            The materials on ElevateCV's website are provided on an 'as is' basis. ElevateCV makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
            fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">4. Limitations</h2>
          <p>
            In no event shall ElevateCV or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
            or due to business interruption) arising out of the use or inability to use the materials on ElevateCV's website.
          </p>
        </motion.div>
      </div>
    </div>
  );
}