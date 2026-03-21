import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { CVData } from "./editorTemplates";

// Configure PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

export async function extractTextFromPDF(file: File): Promise<string[]> {
  const buffer = await file.arrayBuffer();
  const typedArray = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

  const allLines: string[] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();

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

    const sortedY = [...lineMap.entries()].sort((a, b) => b[0] - a[0]);

    for (const [, items] of sortedY) {
      items.sort((a, b) => a.x - b.x);
      let currentLine = "";
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nextItem = items[i + 1];
        currentLine += (currentLine ? " " : "") + item.str;
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

export function parseResumeToCVData(lines: string[]): CVData {
  const fullText = lines.join("\n");

  const emailMatch = fullText.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  const email = emailMatch?.[0] ?? "";

  const phoneMatch = fullText.match(/(\+?[\d][\d\s\-().]{7,}[\d])/);
  const phone = phoneMatch?.[0]?.trim() ?? "";

  const locationMatch = fullText.match(/([A-Z][a-zA-Z\s]+,\s*[A-Z]{2}\b)/);
  const location = locationMatch?.[0] ?? "";

  const isContactLine = (line: string) => {
    const clean = line.toLowerCase();
    return (
      (email && clean.includes(email.toLowerCase())) ||
      (phone && clean.includes(phone.replace(/\D/g, ""))) ||
      clean.length < 2 ||
      /^(phone|email|website|linkedin|github|address|location|mobile):/i.test(clean)
    );
  };

  const SECTIONS: Record<string, RegExp> = {
    summary:    /\b(summary|profile|objective|about\s*me|professional\s*summary|career\s*summary)\b/i,
    experience: /\b(experience|work\s*(experience|history)|employment|professional\s*experience|career\s*history)\b/i,
    education:  /\b(education|academics?|qualifications?|degrees?|university|college|academic\s*history)\b/i,
    skills:     /\b(skills|technical\s*skills?|competencies|expertise|technologies|tech\s*stack|tools)\b/i,
  };

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

  const sectionStarts: { name: string; idx: number; sameLineContent: string }[] = [];
  lines.forEach((line, idx) => {
    const clean = line.trim().replace(/^[•\-●►▪*.]+\s*/, "").replace(/[:\-_*•]$/, "").replace(/\s+/g, " ");
    if (clean.length > 100) return;

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
    if (entry.sameLineContent) return [entry.sameLineContent, ...linesInRange];
    return linesInRange;
  };

  const summaryLines = getSectionLines("summary").filter(l => !isContactLine(l));
  let summary = summaryLines.join(" ").replace(/\s+/g, " ").trim().slice(0, 1000);

  const skillsLines = getSectionLines("skills");
  const skills = skillsLines.join(", ")
    .split(/[,;|•·●►▪\n\/]/)
    .map(s => s.trim().replace(/^[-*►●•.]\s*/, ""))
    .filter(s => s.length > 1 && s.length < 40 && s.split(/\s+/).length <= 5 && !isContactLine(s))
    .slice(0, 12);

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
        if (currentExp?.role) experience.push(currentExp);
        const parts = clean.split(/\s*[|·–—•,@]\s*/).map(p => p.trim()).filter(Boolean);
        currentExp = {
          role: parts[0] ?? clean,
          company: parts[1] ?? "",
          period: dateMatch ? dateMatch[0] : "",
          bullets: [],
        };
      }
    } else if (currentExp) {
      const bullet = clean.replace(/^[•\-●►▪*]\s*/, "").trim();
      if (bullet.length > 5) currentExp.bullets.push(bullet);
    }
  }
  if (currentExp?.role) experience.push(currentExp);

  const eduLines = getSectionLines("education").filter(l => !isContactLine(l));
  const education: any[] = [];
  let currentEdu: any = null;

  for (const line of eduLines) {
    const clean = line.trim();
    if (!clean) continue;
    const dateMatch = YEAR_RE.exec(clean);
    const looksLikeEduHead = /Bachelor|Master|Degree|Ph\.?D|High\s*School|Diploma|Certificate|University|College|Institute/i.test(clean) || dateMatch;

    if (looksLikeEduHead) {
      if (currentEdu && !currentEdu.institution && !dateMatch && clean.length < 75) {
        currentEdu.institution = clean;
      } else {
        if (currentEdu?.degree) education.push(currentEdu);
        const parts = clean.split(/\s*[|·–—•,@]\s*/).map(p => p.trim()).filter(Boolean);
        currentEdu = {
          degree: parts[0] ?? clean,
          institution: parts[1] ?? "",
          period: dateMatch ? dateMatch[0] : "",
        };
      }
    }
  }
  if (currentEdu?.degree) education.push(currentEdu);

  return {
    name: fullName || "Your Name",
    title: currentJobTitle || (experience.length > 0 ? experience[0].role : ""),
    email,
    phone,
    address: location,
    summary,
    skills,
    experience: experience.slice(0, 3),
    education: education.slice(0, 2),
    languages: [{ l: 'English', lv: 'Native' }]
  };
}
