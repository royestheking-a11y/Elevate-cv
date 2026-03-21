import { motion } from "motion/react";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
            <Shield className="size-8 text-[#D6A85F]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#3B2F2F] tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-[#D6A85F]/5 border border-gray-100 prose prose-lg prose-gray max-w-none text-gray-600"
        >
          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4">1. Introduction</h2>
          <p>
            Welcome to ElevateCV. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">2. The data we collect about you</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">3. How we use your personal data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
            All document generation is processed locally in your browser where possible to minimize data transmission.
          </p>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@elevatecv.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
}