import { motion } from "motion/react";
import { Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
            <Cookie className="size-8 text-[#D6A85F]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#3B2F2F] tracking-tight">Cookie Policy</h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-[#D6A85F]/5 border border-gray-100 prose prose-lg prose-gray max-w-none text-gray-600"
        >
          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4">1. What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">2. How we use cookies</h2>
          <p>
            We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options 
            for disabling cookies without completely disabling the functionality and features they add to this site.
          </p>
          <p className="mt-4">We use the following types of cookies:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Strictly necessary cookies:</strong> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas.</li>
            <li><strong>Analytical/performance cookies:</strong> They allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it.</li>
            <li><strong>Functionality cookies:</strong> These are used to recognise you when you return to our website. This enables us to personalise our content for you and remember your preferences.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">3. Disabling cookies</h2>
          <p>
            You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). 
            Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. 
          </p>

          <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4 mt-8">4. More information</h2>
          <p>
            Hopefully, that has clarified things for you. If there is something that you aren't sure whether you need or not, 
            it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
          </p>
        </motion.div>
      </div>
    </div>
  );
}