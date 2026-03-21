import { useState, RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, Image, FileType, Loader2, CheckCircle2 } from "lucide-react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { useStore } from "../../store";
import confetti from "canvas-confetti";
import { docxTemplateConfigs } from "../../lib/docx/docxConfigs";
import { generateSidebarLayout, generateHeaderLayout } from "../../lib/docx/docxEngines";

interface DownloadCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvRef: RefObject<HTMLDivElement | null>;
}

type FormatType = "pdf" | "image" | "doc" | null;

export function DownloadCVModal({ isOpen, onClose, cvRef }: DownloadCVModalProps) {
  const [downloading, setDownloading] = useState<FormatType>(null);
  const [completed, setCompleted] = useState<FormatType>(null);
  const cvData = useStore((state) => state.cvData);
  const themeColor = useStore((state) => state.themeColor);
  const selectedTemplateId = useStore((state) => state.selectedTemplateId) || "";

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D6A85F", "#3B2F2F", "#FFFFFF"],
    });
  };

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;
    setDownloading("pdf");
    setCompleted(null);
    try {
      const element = cvRef.current;
      // html-to-image handles oklch better than html2canvas
      const dataUrl = await htmlToImage.toJpeg(element, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#FFFFFF",
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (pdfWidth * 297) / 210; // A4 ratio
      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
      const fileName = cvData.personal.fullName ? `Resume - ${cvData.personal.fullName}.pdf` : "Resume.pdf";
      pdf.save(fileName);
      fireConfetti();
      setCompleted("pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadImage = async () => {
    if (!cvRef.current) return;
    setDownloading("image");
    setCompleted(null);
    try {
      const element = cvRef.current;
      const dataUrl = await htmlToImage.toPng(element, {
        pixelRatio: 3,
        backgroundColor: "#FFFFFF",
      });
      const fileName = cvData.personal.fullName ? `Resume - ${cvData.personal.fullName}.png` : "Resume.png";
      saveAs(dataUrl, fileName);
      fireConfetti();
      setCompleted("image");
    } catch (error) {
      console.error("Failed to generate image", error);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadDOC = async () => {
    setDownloading("doc");
    setCompleted(null);
    try {
      const config = docxTemplateConfigs[selectedTemplateId];
      if (config) {
        const doc = config.type === 'sidebar-left'
          ? generateSidebarLayout(cvData, themeColor, config)
          : generateHeaderLayout(cvData, themeColor, config);
        
        const blob = await Packer.toBlob(doc);
        const fileName = cvData.personal.fullName ? `Resume - ${cvData.personal.fullName}.docx` : "Resume.docx";
        saveAs(blob, fileName);
        fireConfetti();
        setCompleted("doc");
        setDownloading(null);
        return;
      }

      const { personal, summary, experience, education, skills, projects } = cvData;
      const primaryColor = themeColor.replace("#", "");
      let baseFont = "Calibri";
      if (
        selectedTemplateId.includes("premium-1") ||
        selectedTemplateId.includes("premium-3") ||
        selectedTemplateId.includes("premium-6") ||
        selectedTemplateId.includes("premium-7") ||
        selectedTemplateId.includes("premium-10") ||
        selectedTemplateId.includes("harvard") ||
        selectedTemplateId.includes("french") ||
        selectedTemplateId.includes("europass")
      ) {
        baseFont = "Times New Roman";
      } else if (
        selectedTemplateId.includes("premium-2") ||
        selectedTemplateId.includes("premium-4") ||
        selectedTemplateId.includes("premium-9")
      ) {
        baseFont = "Arial";
      }

      const children: Paragraph[] = [];

      // Name
      children.push(
        new Paragraph({
          children: [new TextRun({ text: personal.fullName || "Your Name", bold: true, size: 48, font: baseFont, color: "111111" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
        })
      );

      // Job Title
      if (personal.jobTitle) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: personal.jobTitle, size: 28, color: primaryColor, font: baseFont, bold: true })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          })
        );
      }

      // Contact Info
      const contactParts: string[] = [];
      if (personal.email) contactParts.push(personal.email);
      if (personal.phone) contactParts.push(personal.phone);
      if (personal.location) contactParts.push(personal.location);
      if (personal.website) contactParts.push(personal.website);
      if (contactParts.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: contactParts.join("  |  "), size: 20, color: "555555", font: baseFont })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 12 } },
          })
        );
      }

      // Summary
      if (summary) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "PROFESSIONAL SUMMARY", color: primaryColor, bold: true, size: 28, font: baseFont })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 4 } },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: summary, size: 22, font: baseFont, color: "333333" })],
            spacing: { after: 200 },
          })
        );
      }

      // Experience
      if (experience.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "WORK EXPERIENCE", color: primaryColor, bold: true, size: 28, font: baseFont })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 4 } },
          })
        );
        experience.forEach((exp) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.title, bold: true, size: 24, font: baseFont, color: "111111" }),
                new TextRun({ text: `  —  ${exp.company}`, size: 24, color: "555555", font: baseFont }),
              ],
              spacing: { before: 160, after: 40 },
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `${exp.startDate} – ${exp.current ? "Present" : exp.endDate}`, size: 20, color: primaryColor, italics: true, font: baseFont, bold: true })],
              spacing: { after: 80 },
            })
          );
          if (exp.description) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: exp.description, size: 22, font: baseFont, color: "333333" })],
                spacing: { after: 120 },
              })
            );
          }
        });
      }

      // Education
      if (education.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "EDUCATION", color: primaryColor, bold: true, size: 28, font: baseFont })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 4 } },
          })
        );
        education.forEach((edu) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true, size: 24, font: baseFont, color: "111111" }),
                new TextRun({ text: `  —  ${edu.school}`, size: 24, color: "555555", font: baseFont }),
              ],
              spacing: { before: 120, after: 40 },
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `${edu.startDate} – ${edu.endDate}`, size: 20, color: primaryColor, italics: true, font: baseFont, bold: true })],
              spacing: { after: 80 },
            })
          );
          if (edu.description) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: edu.description, size: 22, font: baseFont, color: "333333" })],
                spacing: { after: 120 },
              })
            );
          }
        });
      }

      // Skills
      if (skills.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "SKILLS", color: primaryColor, bold: true, size: 28, font: baseFont })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 4 } },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: skills.map((s) => s.name).join("  •  "), size: 22, font: baseFont, color: "333333" })],
            spacing: { after: 120 },
          })
        );
      }

      // Projects
      if (projects && projects.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "PROJECTS", color: primaryColor, bold: true, size: 28, font: baseFont })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 4 } },
          })
        );
        projects.forEach((proj) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: proj.name, bold: true, size: 24, font: baseFont, color: "111111" }),
                ...(proj.url ? [new TextRun({ text: `  (${proj.url})`, size: 20, color: primaryColor, font: baseFont })] : []),
              ],
              spacing: { before: 120, after: 40 },
            })
          );
          if (proj.description) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: proj.description, size: 22, font: baseFont, color: "333333" })],
                spacing: { after: 120 },
              })
            );
          }
        });
      }

      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: { top: 720, right: 720, bottom: 720, left: 720 },
            },
          },
          children,
        }],
      });

      const blob = await Packer.toBlob(doc);
      const fileName = personal.fullName ? `Resume - ${personal.fullName}.docx` : "Resume.docx";
      saveAs(blob, fileName);
      fireConfetti();
      setCompleted("doc");
    } catch (error) {
      console.error("Failed to generate DOC", error);
    } finally {
      setDownloading(null);
    }
  };

  const formats = [
    {
      id: "pdf" as const,
      icon: FileText,
      title: "PDF Document",
      ext: ".pdf",
      description: "Best for sharing & printing. Pixel-perfect copy of your CV as shown in preview.",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      hoverBorder: "hover:border-red-400",
      textColor: "text-red-600",
      handler: handleDownloadPDF,
    },
    {
      id: "image" as const,
      icon: Image,
      title: "PNG Image",
      ext: ".png",
      description: "High-resolution screenshot. Great for social media or portfolio websites.",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      textColor: "text-blue-600",
      handler: handleDownloadImage,
    },
    {
      id: "doc" as const,
      icon: FileType,
      title: "Word Document",
      ext: ".docx",
      description: "Editable text format. Automatically styled to match your chosen theme color and fonts.",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      hoverBorder: "hover:border-indigo-400",
      textColor: "text-indigo-600",
      handler: handleDownloadDOC,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-[#D6A85F]/20 to-[#3B2F2F]/10 rounded-xl border border-[#D6A85F]/20">
                  <Download className="size-4 sm:size-5 text-[#D6A85F]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#3B2F2F] font-serif">Download CV</h2>
                  <p className="text-xs text-gray-500 font-medium">Choose your preferred format</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Format Cards */}
            <div className="p-5 sm:p-6 space-y-3">
              {formats.map((format) => {
                const Icon = format.icon;
                const isDownloading = downloading === format.id;
                const isCompleted = completed === format.id;

                return (
                  <motion.button
                    key={format.id}
                    whileHover={{ scale: downloading ? 1 : 1.01 }}
                    whileTap={{ scale: downloading ? 1 : 0.99 }}
                    onClick={format.handler}
                    disabled={downloading !== null}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left group
                      ${isCompleted
                        ? "border-green-300 bg-green-50/50"
                        : `${format.borderColor} ${format.bgColor}/30 ${format.hoverBorder}`
                      }
                      ${downloading && !isDownloading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}
                    `}
                  >
                    {/* Icon */}
                    <div className={`shrink-0 size-12 sm:size-14 rounded-xl bg-gradient-to-br ${isCompleted ? "from-green-500 to-emerald-600" : format.color} flex items-center justify-center shadow-lg`}>
                      {isDownloading ? (
                        <Loader2 className="size-6 text-white animate-spin" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="size-6 text-white" />
                      ) : (
                        <Icon className="size-6 text-white" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-gray-900">{format.title}</span>
                        <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${isCompleted ? "bg-green-100 text-green-700" : `${format.bgColor} ${format.textColor}`}`}>
                          {isCompleted ? "Done!" : format.ext}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                        {isDownloading ? "Generating your file, please wait..." : format.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {!isDownloading && !isCompleted && (
                      <div className={`shrink-0 size-8 rounded-full flex items-center justify-center border border-gray-200 group-hover:${format.borderColor} transition-colors`}>
                        <Download className="size-4 text-gray-400 group-hover:text-gray-600" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/50">
              <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                PDF & Image match your preview exactly. Word format provides an ATS-optimized, structured layout matching your theme color.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
