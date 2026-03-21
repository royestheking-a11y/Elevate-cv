import { motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { FileText, Mail, ArrowRight } from "lucide-react";

// Figma Asset Imports
// Figma Asset Imports
import imgProfessionalModernCvResume1 from "figma:asset/fa6cddfe339dc9d1dcadfe8d4a21097618bb09b4.png";
import imgBlackAndWhiteSimpleCvResume1 from "figma:asset/49703a1aacca74b339a73d242b5ea68aa2cadf2f.png";
import imgGreenAndBlackProfessionalCorporateAtsResume1 from "figma:asset/9578458b44a32b3f9e4ffbdd84a5b421a580496c.png";
import imgWhiteSimpleSalesRepresentativeCvResume1 from "figma:asset/adae69e22bdbf070cab4ab6e16ca8bdfb98ed950.png";
import imgBlackAndWhiteModernResume1 from "figma:asset/e07b416d0e8b7a6ff712ff729ccda017d9641967.png";
import imgGreenProfessionalModernCvResume1 from "figma:asset/0fb6f0bc0756356d3fe6f7901db968c9aea80dfa.png";
import imgBlueAndWhiteSimpleMarketingManagerResume1 from "figma:asset/c342ff76309f72861ae17fc942135b7cb140c282.png";
import imgBlackAndWhiteSimpleProfessionalCvResume1 from "figma:asset/85c48ced7cedf222e84b8f3dfa51c0279b5e92f9.png";
import imgProfessionalModernCvResume11 from "figma:asset/44c1bac3352a48c55a72a51b75188e1cff79a5bc.png";
import imgPinkAndMaroonPhotoModernResume1 from "figma:asset/93235516fed88e6d982b772d5ca4f68713162b26.png";

const CV_TEMPLATES = [
  { id: "modern-maroon", name: "Modern Maroon", img: imgProfessionalModernCvResume1 },
  { id: "dark-charcoal", name: "Dark Charcoal", img: imgBlackAndWhiteModernResume1 },
  { id: "navy-executive", name: "Navy Executive", img: imgBlueAndWhiteSimpleMarketingManagerResume1 },
  { id: "emerald-corporate", name: "Emerald Corporate", img: imgGreenProfessionalModernCvResume1 },
  { id: "luxury-navy-gold", name: "Luxury Navy Gold", img: imgProfessionalModernCvResume1 },
  { id: "indigo-tech", name: "Indigo Tech", img: imgBlueAndWhiteSimpleMarketingManagerResume1 },
  { id: "bold-orange-creative", name: "Bold Orange Creative", img: imgPinkAndMaroonPhotoModernResume1 },
  { id: "teal-modern-pro", name: "Teal Modern Pro", img: imgGreenProfessionalModernCvResume1 },
  { id: "europass-official", name: "Europass Official", img: imgBlackAndWhiteSimpleCvResume1 },
  { id: "european-modern-french", name: "European Modern French", img: imgProfessionalModernCvResume11 },
  { id: "german-swiss-style", name: "German / Swiss Style", img: imgBlackAndWhiteSimpleProfessionalCvResume1 },
  { id: "french-belgian-style", name: "French / Belgian Style", img: imgWhiteSimpleSalesRepresentativeCvResume1 },
  { id: "modern", name: "Modern Minimalist", img: imgBlackAndWhiteSimpleCvResume1 },
  { id: "sales", name: "Sales Professional", img: imgWhiteSimpleSalesRepresentativeCvResume1 },
  { id: "professional", name: "Corporate Classic", img: imgProfessionalModernCvResume1 },
  { id: "ats", name: "ATS Optimized", img: imgGreenAndBlackProfessionalCorporateAtsResume1 },
  // Adding duplicates just to show 10 designs in the grid visually
  { id: "creative", name: "Creative Agency", img: imgBlackAndWhiteSimpleCvResume1 },
  { id: "tech", name: "Tech Startup", img: imgWhiteSimpleSalesRepresentativeCvResume1 },
  { id: "executive", name: "Executive Suite", img: imgProfessionalModernCvResume1 },
  { id: "academic", name: "Academic Scholar", img: imgGreenAndBlackProfessionalCorporateAtsResume1 },
  { id: "freelance", name: "Freelance Hustler", img: imgBlackAndWhiteSimpleCvResume1 },
  { id: "clean", name: "Clean Essential", img: imgWhiteSimpleSalesRepresentativeCvResume1 },
];

const COVER_LETTER_TEMPLATES = [
  { id: "cl-classic", name: "Classic Corporate", img: imgProfessionalModernCvResume1 },
  { id: "cl-modern", name: "Modern Minimalist", img: imgBlackAndWhiteSimpleCvResume1 },
  { id: "cl-creative", name: "Creative Professional", img: imgWhiteSimpleSalesRepresentativeCvResume1 },
  { id: "cl-tech", name: "Tech Forward", img: imgGreenAndBlackProfessionalCorporateAtsResume1 },
  { id: "cl-executive", name: "Executive Brief", img: imgProfessionalModernCvResume1 },
  { id: "cl-simple", name: "Simple Clean", img: imgBlackAndWhiteSimpleCvResume1 },
];

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<"cv" | "cover">("cv");

  return (
    <div className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-[#3B2F2F]"
        >
          Professional Templates
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          Explore our collection of 22 Resume designs and 6 Cover Letter layouts, rigorously tested to pass ATS scanners while looking incredible to human eyes.
        </motion.p>

        {/* Custom Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("cv")}
            className={`flex items-center space-x-2 px-8 py-4 rounded-full font-bold transition-all ${
              activeTab === "cv" 
              ? "bg-[#3B2F2F] text-white shadow-xl shadow-[#3B2F2F]/20 scale-105" 
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <FileText className="size-5" />
            <span>Resume Templates (22)</span>
          </button>
          <button
            onClick={() => setActiveTab("cover")}
            className={`flex items-center space-x-2 px-8 py-4 rounded-full font-bold transition-all ${
              activeTab === "cover" 
              ? "bg-[#3B2F2F] text-white shadow-xl shadow-[#3B2F2F]/20 scale-105" 
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Mail className="size-5" />
            <span>Cover Letter Templates (6)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {activeTab === "cv" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {CV_TEMPLATES.map((tpl, i) => (
              <div key={i} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-[#D6A85F]/20 transition-all duration-300">
                <div className="aspect-[1/1.4] overflow-hidden bg-gray-100">
                  <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 border-t border-gray-50 bg-white flex justify-between items-center">
                  <h3 className="font-semibold text-[#3B2F2F]">{tpl.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Link to="/dashboard/resume-builder" className="bg-white text-[#3B2F2F] px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center space-x-2">
                    <span>Use Template</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "cover" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {COVER_LETTER_TEMPLATES.map((tpl, i) => (
              <div key={i} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-[#D6A85F]/20 transition-all duration-300">
                <div className="aspect-[1/1.4] overflow-hidden bg-gray-100 relative">
                  <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Overlay simulating a cover letter look on top of the CV previews since we only have CV images */}
                  <div className="absolute inset-4 bg-white/95 rounded shadow-sm p-4 border border-gray-200 pointer-events-none">
                    <div className="h-4 w-1/3 bg-gray-200 rounded mb-6" />
                    <div className="h-3 w-1/4 bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-1/5 bg-gray-100 rounded mb-8" />
                    <div className="space-y-3 mb-6">
                      <div className="h-2 w-full bg-gray-100 rounded" />
                      <div className="h-2 w-full bg-gray-100 rounded" />
                      <div className="h-2 w-[80%] bg-gray-100 rounded" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-gray-100 rounded" />
                      <div className="h-2 w-[60%] bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-50 bg-white flex justify-between items-center">
                  <h3 className="font-semibold text-[#3B2F2F]">{tpl.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                  <Link to="/dashboard/cover-letter" className="bg-white text-[#3B2F2F] px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center space-x-2">
                    <span>Use Cover Letter</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}