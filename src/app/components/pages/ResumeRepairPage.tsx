import { useState, useRef } from "react";
import { Upload, FileText, Wand2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useStore } from "../../store";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure PDF.js worker from local node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// ─── Resume Parser ─────────────────────────────────

async function extractTextFromPDF(file: File): Promise<string[]> {
  const buffer = await file.arrayBuffer();
  const typedArray = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

  const allLines: string[] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();

    // 1. Group items by Y coordinate with a tolerance
    // Store as { x: number, str: string } to allow X-sorting
    const lineMap: Map<number, { x: number, str: string }[]> = new Map();
    
    for (const item of content.items as any[]) {
      const x = item.transform?.[4] ?? 0;
      const y = Math.round(item.transform?.[5] ?? 0);
      
      let bucket = y;
      for (const existingY of lineMap.keys()) {
        if (Math.abs(existingY - y) <= 4) { bucket = existingY; break; }
      }
      
      if (!lineMap.has(bucket)) lineMap.set(bucket, []);
      lineMap.get(bucket)!.push({ x, str: item.str });
    }

    // 2. Sort Y-buckets from top to bottom
    const sortedY = [...lineMap.entries()].sort((a, b) => b[0] - a[0]);

    for (const [, items] of sortedY) {
      // 3. Sort items within each line by X coordinate
      items.sort((a, b) => a.x - b.x);

      // 4. Multi-column detection: if there's a huge horizontal gap, treat as separate lines
      // This prevents "Experience" in col 1 from being joined with "Skills" in col 2 on the same line.
      let currentLine = "";
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nextItem = items[i + 1];
        
        currentLine += (currentLine ? " " : "") + item.str;

        // If gap between this and next item is > 150 units, it's likely a new column
        if (nextItem && (nextItem.x - (item.x + (item.str.length * 5))) > 150) {
          if (currentLine.trim()) allLines.push(currentLine.trim());
          currentLine = "";
        }
      }
      if (currentLine.trim()) allLines.push(currentLine.trim());
    }
  }

  return allLines;
}

function parseResume(lines: string[]) {
  const fullText = lines.join("\n");

  // 1. ─── Contact Info ───
  const emailMatch = fullText.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  const email = emailMatch?.[0] ?? "";

  const phoneMatch = fullText.match(/(\+?[\d][\d\s\-().]{7,}[\d])/);
  const phone = phoneMatch?.[0]?.trim() ?? "";

  const urlMatch = fullText.match(/(linkedin\.com\/in\/[^\s,|]+|github\.com\/[^\s,|]+|https?:\/\/[^\s,|]+|[\w-]+\.(?:dev|io|me|com)(?:\/[^\s,|]*)?)/i);
  const website = urlMatch?.[0] ?? "";

  const locationMatch = fullText.match(/([A-Z][a-zA-Z\s]+,\s*[A-Z]{2}\b)/);
  const location = locationMatch?.[0] ?? "";

  const isContactLine = (line: string) => {
    const clean = line.toLowerCase();
    return (
      (email && clean.includes(email.toLowerCase())) ||
      (phone && clean.includes(phone.replace(/\D/g, ""))) ||
      (website && clean.includes(website.toLowerCase())) ||
      clean.length < 2 ||
      /^(phone|email|website|linkedin|github|address|location|mobile):/i.test(clean)
    );
  };

  const SECTIONS: Record<string, RegExp> = {
    summary:    /\b(s\s*u\s*m\s*m\s*a\s*r\s*y|p\s*r\s*o\s*f\s*i\s*l\s*e|o\s*b\s*j\s*e\s*c\s*t\s*i\s*v\s*e|about\s*me|professional\s*summary|career\s*summary)\b/i,
    experience: /\b(e\s*x\s*p\s*e\s*r\s*i\s*e\s*n\s*c\s*e|work\s*(experience|history)|employment|professional\s*experience|career\s*history)\b/i,
    education:  /\b(e\s*d\s*u\s*c\s*a\s*t\s*i\s*o\s*n|academics?|qualifications?|degrees?|university|college|academic\s*history)\b/i,
    skills:     /\b(s\s*k\s*i\s*l\s*l\s*s|technical\s*skills?|competencies|expertise|technologies|tech\s*stack|tools)\b/i,
    projects:   /\b(projects?|portfolio|personal\s*projects?|side\s*projects?)\b/i,
  };

  // 2. ─── Name & Header Detection ───
  let fullName = "";
  let currentJobTitle = "";
  const filteredHeaderLines = lines.slice(0, 25).filter(l => !isContactLine(l));
  
  const flatSectionKeys = ["experience", "education", "skills", "summary", "profile", "objective", "projects", "history"];

  for (const line of filteredHeaderLines) {
    const clean = line.trim();
    const cleanLower = clean.toLowerCase();
    const isSectionHeader = flatSectionKeys.some(k => cleanLower.includes(k) && clean.length < 25);
    const validNameFormat = /^[A-Z][a-zA-Z.'-]+\s+[A-Z][a-zA-Z.'-]/.test(clean) && !isSectionHeader;
    
    if (!fullName && validNameFormat && clean.length < 50 && !/(resume|cv|curriculum)/i.test(clean)) {
      fullName = clean;
      continue;
    }
    if (fullName && !currentJobTitle && !isSectionHeader && clean.length < 60 && /^[A-Z]/.test(clean) && !/\d/.test(clean)) {
      currentJobTitle = clean;
      break;
    }
  }

  // 3. ─── Section Blocks Detection ───
  const sectionStarts: { name: string; idx: number; sameLineContent: string }[] = [];
  lines.forEach((line, idx) => {
    const clean = line.trim().replace(/^[•\-●►▪*.]+\s*/, "").replace(/[:\-_*•]$/, "").replace(/\s+/g, " ");
    if (clean.length > 100) return; // catch "Summary: Lorem ipsum..."

    for (const [name, re] of Object.entries(SECTIONS)) {
      const match = re.exec(clean);
      if (match) {
        const isHeader = clean.length < 40 || /[:\-]\s+/.test(clean);
        if (isHeader && (!clean.includes(".") || clean.length < 30)) {
          const contentAfter = clean.slice(match.index + match[0].length).replace(/^[:\-\s]+/, "").trim();
          sectionStarts.push({ name, idx, sameLineContent: contentAfter });
          break;
        }
      }
    }
  });

  const uniqueSections: typeof sectionStarts = [];
  sectionStarts.forEach(s => {
    if (!uniqueSections.find(u => u.name === s.name)) uniqueSections.push(s);
  });

  const getSectionLines = (sectionName: string): string[] => {
    const entry = uniqueSections.find((s) => s.name === sectionName);
    if (!entry) return [];
    
    const nextEntry = uniqueSections.filter(s => s.idx > entry.idx).sort((a,b) => a.idx - b.idx)[0];
    const linesInRange = lines.slice(entry.idx + 1, nextEntry ? nextEntry.idx : lines.length);
    
    if (entry.sameLineContent) {
      return [entry.sameLineContent, ...linesInRange];
    }
    return linesInRange;
  };

  // 4. ─── Summary ───
  const summaryLines = getSectionLines("summary").filter(l => !isContactLine(l));
  let summary = summaryLines.join(" ").replace(/\s+/g, " ").trim().slice(0, 1000);
  if (!summary) {
    const firstBigPara = lines.slice(0, 30).find(l => l.split(" ").length > 15 && !isContactLine(l));
    if (firstBigPara) summary = firstBigPara;
  }

  // 5. ─── Skills ───
  const skillsLines = getSectionLines("skills");
  const rawSkills = skillsLines.join(", ")
    .split(/[,;|•·●►▪\n\/]/)
    .map(s => s.trim().replace(/^[-*►●•.]\s*/, ""))
    .filter(s => s.length > 1 && s.length < 40 && s.split(/\s+/).length <= 5 && !isContactLine(s) && !/^\d{4}/.test(s));
  
  const skills = [...new Set(rawSkills)].slice(0, 25).map((name, i) => ({
    id: String(Date.now() + i),
    name,
    level: "Intermediate",
  }));

  // 6. ─── Experience ───
  const expLines = getSectionLines("experience").filter(l => !isContactLine(l));
  const experience: any[] = [];
  let currentExp: any = null;
  const YEAR_RE = /(\d{4}|\w+\.?\s+\d{4})\s*[-–—to]+\s*(\d{4}|\w+\.?\s+\d{4}|[Pp]resent|[Cc]urrent|[Nn]ow)/i;

  for (const line of expLines) {
    const clean = line.trim();
    if (!clean) continue;
    const dateMatch = YEAR_RE.exec(clean);
    const looksLikeHeader = dateMatch || (clean.length < 85 && /^[A-Z][a-z]+/.test(clean) && !clean.startsWith("-") && !clean.startsWith("•"));

    if (looksLikeHeader) {
      if (currentExp && !currentExp.company && !dateMatch && clean.length < 65) {
        currentExp.company = clean;
      } else {
        if (currentExp?.title) experience.push(currentExp);
        const parts = clean.split(/\s*[|·–—•,@]\s*/).map(p => p.trim()).filter(Boolean);
        currentExp = {
          id: String(Date.now() + experience.length),
          title: parts[0] ?? clean,
          company: parts[1] ?? "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        };
        if (dateMatch) {
          currentExp.startDate = dateMatch[1] ?? "";
          currentExp.endDate = dateMatch[2] ?? "";
          currentExp.current = /present|current|now/i.test(currentExp.endDate);
          if (currentExp.title.includes(dateMatch[0])) {
            currentExp.title = currentExp.title.replace(dateMatch[0], "").trim().replace(/[,|·\-]$/, "").trim();
          }
        }
      }
    } else if (currentExp) {
      const bullet = clean.replace(/^[•\-●►▪*]\s*/, "").trim();
      if (bullet.length > 5) currentExp.description += (currentExp.description ? "\n" : "") + bullet;
    }
  }
  if (currentExp?.title) experience.push(currentExp);

  // 7. ─── Education ───
  const eduLines = getSectionLines("education").filter(l => !isContactLine(l));
  const education: any[] = [];
  let currentEdu: any = null;

  for (const line of eduLines) {
    const clean = line.trim();
    if (!clean) continue;
    const dateMatch = YEAR_RE.exec(clean);
    const looksLikeEduHead = /Bachelor|Master|Degree|Ph\.?D|High\s*School|Diploma|Certificate|University|College|Institute/i.test(clean) || dateMatch;

    if (looksLikeEduHead) {
      if (currentEdu && !currentEdu.school && !dateMatch && clean.length < 75) {
        currentEdu.school = clean;
      } else {
        if (currentEdu?.degree) education.push(currentEdu);
        const parts = clean.split(/\s*[|·–—•,@]\s*/).map(p => p.trim()).filter(Boolean);
        currentEdu = {
          id: String(Date.now() + education.length),
          degree: parts[0] ?? clean,
          school: parts[1] ?? "",
          startDate: "",
          endDate: "",
          description: "",
        };
        if (dateMatch) {
          currentEdu.startDate = dateMatch[1] ?? "";
          currentEdu.endDate = dateMatch[2] ?? "";
          if (currentEdu.degree.includes(dateMatch[0])) {
             currentEdu.degree = currentEdu.degree.replace(dateMatch[0], "").trim().replace(/[,|·\-]$/, "").trim();
          }
        }
      }
    } else if (currentEdu) {
       const bullet = clean.replace(/^[•\-●►▪*]\s*/, "").trim();
       if (bullet.length > 3) currentEdu.description += (currentEdu.description ? "\n" : "") + bullet;
    }
  }
  if (currentEdu?.degree) education.push(currentEdu);

  return {
    personal: { 
      fullName: fullName || "User Name", 
      jobTitle: currentJobTitle || (experience.length > 0 ? experience[0].title : ""), 
      email, phone, website, location 
    },
    summary,
    skills,
    experience: experience.slice(0, 10),
    education: education.slice(0, 5),
    projects: [],
  };
}





// ─── Component ─────────────────────────────────────
export default function ResumeRepairPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [parseError, setParseError] = useState("");
  const [extractedCount, setExtractedCount] = useState({ skills: 0, experience: 0, education: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const updatePersonal = useStore((s) => s.updatePersonal);
  const updateSummary = useStore((s) => s.updateSummary);
  const saveCV = useStore((s) => s.saveCV);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (selectedFile: File) => {
    setParseError("");
    const validTypes = ["application/pdf"];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith(".pdf")) {
      setParseError("Only PDF files are supported for now. Please upload a .pdf resume.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setParseError("File is too large. Maximum size is 5MB.");
      return;
    }
    setFile(selectedFile);
  };

  const startRepair = async () => {
    if (!file) return;
    setIsProcessing(true);
    setParseError("");

    try {
      // 1. Extract lines from PDF (grouped by Y coordinate)
      const lines = await extractTextFromPDF(file);

      if (!lines || lines.length < 3) {
        throw new Error("Could not extract text. The PDF may be image-based or empty.");
      }

      // Debug log — check browser console to see what was extracted
      console.group("📄 Resume Repair — Extracted Lines");
      console.log("Total lines:", lines.length);
      console.log("First 30 lines:", lines.slice(0, 30));
      console.groupEnd();

      // 2. Try AI Parsing first, fallback to regex
      let parsed;
      try {
        const response = await fetch('/api/ai/parse-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('elevate_token')}` // Ensure token is sent
          },
          body: JSON.stringify({ text: lines.join('\n') })
        });
        
        if (response.status === 403) {
          const data = await response.json();
          toast.error(data.message);
          return;
        }
        if (!response.ok) throw new Error("AI parsing failed");
        
        const remaining = response.headers.get('X-AI-Limit-Remaining');
        if (remaining !== null) {
          toast.info(`${remaining} repairs left today`);
        } else {
          toast.success("Resume repaired successfully!");
        }

        parsed = await response.json();
        console.log("🤖 AI Parsed result:", parsed);
      } catch (aiErr) {
        console.error("AI Parsing failed, falling back to Regex:", aiErr);
        toast.warning("AI is currently busy. Using standard parser instead.");
        parsed = parseResume(lines);
        console.log("📊 Regex Parsed result:", parsed);
      }

      // 3. Push parsed data into the Zustand store
      const store = useStore.getState();

      // Update personal info (only overwrite non-empty fields)
      const personalUpdate: any = {};
      if (parsed.personal.fullName) personalUpdate.fullName = parsed.personal.fullName;
      if (parsed.personal.jobTitle) personalUpdate.jobTitle = parsed.personal.jobTitle;
      if (parsed.personal.email) personalUpdate.email = parsed.personal.email;
      if (parsed.personal.phone) personalUpdate.phone = parsed.personal.phone;
      if (parsed.personal.website) personalUpdate.website = parsed.personal.website;
      if (parsed.personal.location) personalUpdate.location = parsed.personal.location;

      // Use the new importCVData action to replace data and avoid duplication
      store.importCVData({
        personal: personalUpdate,
        summary: parsed.summary,
        skills: parsed.skills,
        experience: parsed.experience,
        education: parsed.education
      });

      // Save to database
      await store.saveCV();

      setExtractedCount({
        skills: parsed.skills.length,
        experience: parsed.experience.length,
        education: parsed.education.length,
      });

      setIsProcessing(false);
      setIsDone(true);
    } catch (err: any) {
      setIsProcessing(false);
      setParseError(err.message || "Failed to parse the resume. Please try a different file.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 h-full flex flex-col justify-center">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center size-16 bg-orange-100 text-orange-600 rounded-2xl mb-6 shadow-sm border border-orange-200">
          <Wand2 className="size-8" />
        </div>
        <h1 className="text-4xl font-bold text-[#3B2F2F] mb-4">Resume Repair <span className="text-sm align-top text-orange-500 font-bold bg-orange-100 px-2 py-1 rounded-full uppercase tracking-widest ml-2">Beta</span></h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">Upload your old CV (PDF). We'll extract your data and auto-fill the builder so you can start editing instantly.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#3B2F2F]/5 border border-gray-100 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isProcessing && !isDone && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center"
            >
              {parseError && (
                <div className="w-full max-w-2xl mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
                  <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
                  <span>{parseError}</span>
                </div>
              )}

              <div
                className={`w-full max-w-2xl border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
                  dragActive ? "border-[#D6A85F] bg-[#D6A85F]/5 scale-105" :
                  file ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !file && inputRef.current?.click()}
              >
                <input ref={inputRef} type="file" className="hidden" accept=".pdf" onChange={handleChange} />

                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <FileText className="size-8" />
                    </div>
                    <p className="text-lg font-bold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to parse</p>

                    <div className="flex space-x-4 mt-8 w-full justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); setParseError(""); }}
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); startRepair(); }}
                        className="px-8 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#3B2F2F] to-[#2B2222] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2"
                      >
                        <Wand2 className="size-4" />
                        <span>Extract & Repair</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className="size-16 bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Upload className="size-8" />
                    </div>
                    <p className="text-lg font-bold text-gray-800 mb-2">Click or drag file to upload</p>
                    <p className="text-sm text-gray-500">PDF files only (Max 5MB)</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 flex flex-col items-center text-center"
            >
              <div className="relative size-24 mb-8">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-4 border-[#D6A85F] rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[#3B2F2F]">
                  <Wand2 className="size-8 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Parsing your resume...</h3>
              <p className="text-gray-500 max-w-sm">Extracting text, identifying sections, and mapping your data into the builder.</p>

              <div className="mt-8 space-y-3 text-sm text-gray-400 text-left w-64 mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center space-x-2">
                  <CheckCircle2 className="size-4 text-green-500" /><span>Reading PDF...</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2">
                  <CheckCircle2 className="size-4 text-green-500" /><span>Extracting text content...</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center space-x-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="size-4 border-2 border-gray-300 border-t-[#D6A85F] rounded-full" />
                  <span>Mapping to builder fields...</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {isDone && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 flex flex-col items-center text-center"
            >
              <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Resume Parsed Successfully!</h3>
              <p className="text-gray-600 max-w-md mb-6">We've extracted your data and auto-filled the CV builder.</p>

              <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-sm">
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-2xl font-bold text-[#3B2F2F]">{extractedCount.skills}</div>
                  <div className="text-xs text-gray-500">Skills</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-2xl font-bold text-[#3B2F2F]">{extractedCount.experience}</div>
                  <div className="text-xs text-gray-500">Experiences</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-2xl font-bold text-[#3B2F2F]">{extractedCount.education}</div>
                  <div className="text-xs text-gray-500">Education</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => { setFile(null); setIsDone(false); }}
                  className="px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Upload Another
                </button>
                <Link
                  to="/dashboard/resume-builder"
                  className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#3B2F2F] to-[#2B2222] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2"
                >
                  <span>Open in Builder</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
