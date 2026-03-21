import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertTriangle, AlertCircle, TrendingUp, Search } from "lucide-react";
import { useStore } from "../../store";
import { useMemo } from "react";

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ATSScoreModal({ isOpen, onClose }: ATSScoreModalProps) {
  const cvData = useStore((state) => state.cvData);
  const themeColor = useStore((state) => state.themeColor);

  const { score, missingKeywords, suggestions } = useMemo(() => {
    let currentScore = 0;
    const hints: string[] = [];
    const keywordsToSuggest: string[] = [];

    // 1. Contact Info (15 points)
    if (cvData.personal.email) currentScore += 5;
    else hints.push("Add a professional email address.");
    
    if (cvData.personal.phone) currentScore += 5;
    else hints.push("Include a contact number.");
    
    if (cvData.personal.location) currentScore += 5;
    else hints.push("Add your location (City, State) for local or remote matching.");

    // 2. Summary (15 points)
    const summaryWords = (cvData.summary || "").split(/\s+/).filter(Boolean).length;
    if (summaryWords >= 30) {
      currentScore += 15;
    } else if (summaryWords > 0) {
      currentScore += 5;
      hints.push("Expand your professional summary. Aim for 30-50 words.");
    } else {
      hints.push("Add a professional summary to hook recruiters.");
    }

    // 3. Experience (40 points)
    const expList = cvData.experience || [];
    if (expList.length >= 2) {
      currentScore += 40;
    } else if (expList.length === 1) {
      currentScore += 20;
      hints.push("Consider adding more work experience or detailed projects.");
    } else {
      hints.push("Add your work experience. It's the most critical part of your CV.");
    }

    // Check action verbs in experience
    const allExpText = expList.map(e => (e.description || "").toLowerCase()).join(" ");
    const actionVerbs = ['managed', 'led', 'developed', 'created', 'improved', 'increased', 'reduced', 'designed', 'built', 'resolved'];
    const foundVerbs = actionVerbs.filter(v => allExpText.includes(v));
    if (foundVerbs.length < 3 && expList.length > 0) {
      hints.push("Start your bullet points with strong action verbs (e.g., 'Spearheaded', 'Optimized', 'Delivered').");
      currentScore -= 5; // Penalty for weak verbs
    }

    // 4. Skills (20 points)
    const skillsList = cvData.skills || [];
    if (skillsList.length >= 8) {
      currentScore += 20;
    } else if (skillsList.length >= 4) {
      currentScore += 10;
      hints.push("List more relevant skills. Aim for 8-10 hard and soft skills.");
    } else {
      hints.push("Add a dedicated skills section to pass ATS keyword filters.");
    }

    // 5. Education (10 points)
    const eduList = cvData.education || [];
    if (eduList.length > 0) {
      currentScore += 10;
    } else {
      hints.push("Include your educational background or certifications.");
    }

    // Normalize score between 0 and 100
    currentScore = Math.max(0, Math.min(100, currentScore));

    // Simple keyword extraction based on job title
    const jobTitleLower = (cvData.personal?.jobTitle || "").toLowerCase();
    const existingSkillsText = skillsList.map(s => (s.name || "").toLowerCase()).join(" ");
    const fullText = ((cvData.summary || "") + " " + allExpText + " " + existingSkillsText).toLowerCase();

    if (jobTitleLower.includes('developer') || jobTitleLower.includes('engineer')) {
      if (!fullText.includes('agile')) keywordsToSuggest.push('Agile Methodology');
      if (!fullText.includes('git') || !fullText.includes('version control')) keywordsToSuggest.push('Git / Version Control');
      if (!fullText.includes('api')) keywordsToSuggest.push('RESTful APIs');
      if (!fullText.includes('testing') && !fullText.includes('jest')) keywordsToSuggest.push('Automated Testing');
    } else if (jobTitleLower.includes('manager') || jobTitleLower.includes('lead')) {
      if (!fullText.includes('leadership')) keywordsToSuggest.push('Leadership');
      if (!fullText.includes('strategy')) keywordsToSuggest.push('Strategic Planning');
      if (!fullText.includes('budget')) keywordsToSuggest.push('Budgeting');
      if (!fullText.includes('cross-functional')) keywordsToSuggest.push('Cross-functional Teams');
    } else if (jobTitleLower.includes('designer') || jobTitleLower.includes('ux')) {
      if (!fullText.includes('figma')) keywordsToSuggest.push('Figma');
      if (!fullText.includes('wireframing')) keywordsToSuggest.push('Wireframing');
      if (!fullText.includes('prototyping')) keywordsToSuggest.push('Prototyping');
      if (!fullText.includes('user research')) keywordsToSuggest.push('User Research');
    }

    // Add generic keywords if we don't have enough
    if (keywordsToSuggest.length < 3) {
      const generic = ['Problem Solving', 'Communication', 'Project Management', 'Data Analysis'];
      generic.forEach(g => {
        if (!fullText.includes(g.toLowerCase()) && keywordsToSuggest.length < 4) {
          keywordsToSuggest.push(g);
        }
      });
    }

    // Limit suggestions
    const topSuggestions = hints.slice(0, 4);

    return {
      score: currentScore,
      missingKeywords: keywordsToSuggest,
      suggestions: topSuggestions.length > 0 ? topSuggestions : ["Your CV looks excellent! Keep it tailored to the specific job description."]
    };
  }, [cvData]);

  let scoreColor = "text-red-500";
  let scoreBg = "bg-red-50";
  let scoreBorder = "border-red-200";
  if (score >= 80) {
    scoreColor = "text-green-600";
    scoreBg = "bg-green-50";
    scoreBorder = "border-green-200";
  } else if (score >= 60) {
    scoreColor = "text-yellow-600";
    scoreBg = "bg-yellow-50";
    scoreBorder = "border-yellow-200";
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-5 py-4 sm:px-8 sm:py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-[#D6A85F]/20 to-[#3B2F2F]/10 rounded-xl hidden sm:block">
                  <TrendingUp className="size-6 text-[#3B2F2F]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3B2F2F]">ATS Resume Analysis</h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">See how your resume scores against hiring systems</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center col-span-1">
                  <div className={`relative flex items-center justify-center size-40 rounded-full border-8 ${scoreBorder} ${scoreBg} shadow-inner`}>
                    <div className="text-center">
                      <span className={`text-5xl font-black ${scoreColor} tracking-tighter`}>{score}</span>
                      <span className={`text-lg font-bold ${scoreColor} opacity-50`}>/100</span>
                    </div>
                  </div>
                  <p className="mt-4 text-center font-bold text-gray-800">
                    {score >= 80 ? "Excellent Match!" : score >= 60 ? "Good, but needs work" : "Requires Attention"}
                  </p>
                  <p className="text-xs text-center text-gray-500 mt-1 max-w-[150px]">
                    Based on industry-standard ATS parsing rules.
                  </p>
                </div>

                {/* Missing Keywords */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div className="flex items-center space-x-2 text-[#3B2F2F] font-bold text-lg mb-2">
                    <Search className="size-5 text-[#D6A85F]" />
                    <h3>Missing Keywords</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    ATS systems scan for role-specific keywords. Based on your target title of <span className="font-semibold text-gray-900">"{cvData.personal.jobTitle || 'Professional'}"</span>, consider adding these missing terms:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm font-medium flex items-center space-x-1 shadow-sm">
                        <AlertCircle className="size-3.5" />
                        <span>{kw}</span>
                      </span>
                    ))}
                    {missingKeywords.length === 0 && (
                      <span className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-lg text-sm font-medium flex items-center space-x-1">
                        <CheckCircle className="size-3.5" />
                        <span>All core keywords found!</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 text-[#3B2F2F] font-bold text-lg mb-4">
                  <AlertTriangle className="size-5 text-[#D6A85F]" />
                  <h3>Improvement Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-[#D6A85F]/30 transition-colors">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#D6A85F]/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#D6A85F]">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Footer */}
            <div className="px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#3B2F2F] text-white rounded-xl font-semibold shadow-md hover:bg-[#2B2222] transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}