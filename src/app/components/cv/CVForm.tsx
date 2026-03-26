import { useState } from "react";
import { useStore } from "../../store";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Plus, Trash2, GripVertical, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { aiAPI } from "../../lib/api";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection = ({ title, children, defaultOpen = false }: AccordionSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-2xl mb-4 bg-white overflow-hidden shadow-sm transition-all hover:border-[#D6A85F]/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-gradient-to-b from-white to-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#D6A85F]/50 rounded-2xl"
      >
        <span className="text-[15px] font-bold text-[#3B2F2F] tracking-wide">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="size-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-white"
          >
            <div className="p-5 pt-2 border-t border-gray-100">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CVForm() {
  const {
    cvData,
    updatePersonal,
    updateSummary,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
  } = useStore();

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonal({ [e.target.name]: e.target.value });
  };

  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  const handleEnhance = async (type: string, content: string, onUpdate: (val: string) => void, id?: string) => {
    if (!content) return;
    setIsEnhancing(id || type);
    try {
      const response = await aiAPI.enhance(type, content);
      
      const remaining = response.headers['x-ai-limit-remaining'];
      if (remaining !== undefined) {
        toast.info(`Enhancement successful! ${remaining} left today.`);
      } else {
        toast.success("Content enhanced with AI!");
      }

      const { enhanced } = response.data;
      onUpdate(enhanced);
    } catch (err: any) {
      console.error("Enhancement failed:", err);
      if (err.response?.status === 403) {
        toast.error(err.response.data.message || "AI Limit reached");
      } else {
        toast.error("Enhancement failed. Please try again later.");
      }
    } finally {
      setIsEnhancing(null);
    }
  };

  return (
    <div className="w-full font-sans">
      <h2 className="text-2xl font-bold text-[#3B2F2F] mb-6 tracking-tight">Your Details</h2>

      {/* Personal Info */}
      <AccordionSection title="Personal Information" defaultOpen>
        <ImageUpload 
          photoUrl={cvData.personal.photoUrl} 
          photoShape={cvData.personal.photoShape}
          onUpdate={(url, shape) => updatePersonal({ photoUrl: url, photoShape: shape })} 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={cvData.personal.fullName}
              onChange={handlePersonalChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all placeholder:text-gray-400"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={cvData.personal.jobTitle}
              onChange={handlePersonalChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all"
              placeholder="e.g. Software Engineer"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              value={cvData.personal.email}
              onChange={handlePersonalChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all"
              placeholder="e.g. john@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
            <input
              type="tel"
              name="phone"
              value={cvData.personal.phone}
              onChange={handlePersonalChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all"
              placeholder="e.g. +1 234 567 890"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</label>
            <input
              type="text"
              name="location"
              value={cvData.personal.location}
              onChange={handlePersonalChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all"
              placeholder="e.g. London, UK"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Website / Link</label>
            <input
              type="url"
              name="website"
              value={cvData.personal.website}
              onChange={handlePersonalChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all"
              placeholder="e.g. linkedin.com/in/johndoe"
            />
          </div>
        </div>
      </AccordionSection>

      {/* Professional Summary */}
      <AccordionSection title="Professional Summary">
        <div className="space-y-3 relative group">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Summary</label>
            <button 
              onClick={() => handleEnhance("summary", cvData.summary, (val) => updateSummary(val))}
              disabled={isEnhancing === "summary"}
              className="text-xs font-medium text-[#D6A85F] bg-[#D6A85F]/10 px-2 py-1 rounded flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
            >
              <Sparkles className={`size-3 ${isEnhancing === "summary" ? "animate-spin" : ""}`} />
              <span>{isEnhancing === "summary" ? "Enhancing..." : "Enhance with AI"}</span>
            </button>
          </div>
          <textarea
            value={cvData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D6A85F]/50 focus:border-[#D6A85F] outline-none transition-all resize-y"
            placeholder="Write a brief professional summary..."
          />
        </div>
      </AccordionSection>

      {/* Experience */}
      <AccordionSection title="Work Experience">
        <div className="space-y-6">
          {cvData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 border border-gray-200 bg-gray-50/50 rounded-2xl relative group"
            >
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                    placeholder="e.g. Jan 2020"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center justify-between">
                    End Date
                    <label className="flex items-center space-x-1 normal-case text-gray-400 font-normal">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                        className="rounded text-[#D6A85F] focus:ring-[#D6A85F]"
                      />
                      <span>Current</span>
                    </label>
                  </label>
                  <input
                    type="text"
                    value={exp.current ? "Present" : exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1 relative group/desc">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                  <button 
                    onClick={() => handleEnhance("experience description", exp.description, (val) => updateExperience(exp.id, { description: val }), exp.id)}
                    disabled={isEnhancing === exp.id}
                    className="text-[10px] font-medium text-[#D6A85F] bg-[#D6A85F]/10 px-2 py-0.5 rounded flex items-center space-x-1 opacity-0 group-hover/desc:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <Sparkles className={`size-2.5 ${isEnhancing === exp.id ? "animate-spin" : ""}`} />
                    <span>{isEnhancing === exp.id ? "Enhancing..." : "AI Enhance"}</span>
                  </button>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                />
              </div>
            </motion.div>
          ))}

          <button
            onClick={() =>
              addExperience({
                id: Date.now().toString(),
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
              })
            }
            className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#D6A85F]/50 hover:bg-[#D6A85F]/5 text-[#3B2F2F] font-semibold rounded-2xl flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="size-4" />
            <span>Add Experience</span>
          </button>
        </div>
      </AccordionSection>

      {/* Education */}
      <AccordionSection title="Education">
        <div className="space-y-6">
          {cvData.education.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 border border-gray-200 bg-gray-50/50 rounded-2xl relative group"
            >
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">School / University</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">End Date</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D6A85F] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          ))}

          <button
            onClick={() =>
              addEducation({
                id: Date.now().toString(),
                degree: "",
                school: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
            className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#D6A85F]/50 hover:bg-[#D6A85F]/5 text-[#3B2F2F] font-semibold rounded-2xl flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="size-4" />
            <span>Add Education</span>
          </button>
        </div>
      </AccordionSection>

      {/* Skills */}
      <AccordionSection title="Skills">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5"
              >
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  className="bg-transparent text-sm font-medium text-[#3B2F2F] outline-none w-24 sm:w-auto"
                />
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() =>
              addSkill({
                id: Date.now().toString(),
                name: "New Skill",
                level: "",
              })
            }
            className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#D6A85F]/50 hover:bg-[#D6A85F]/5 text-[#3B2F2F] font-semibold rounded-2xl flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="size-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </AccordionSection>
      
      {/* Invisible padding at bottom for easy scrolling */}
      <div className="h-20"></div>
    </div>
  );
}

const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
