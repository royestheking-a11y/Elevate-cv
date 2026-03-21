import { Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType } from "docx";
import { CVData } from "../../store";
import { DocxTemplateConfig } from "./docxConfigs";

const resolveColor = (colorConfig: string | ((t: string) => string), themeColor: string) => {
  const c = typeof colorConfig === 'function' ? colorConfig(themeColor) : colorConfig;
  return c.replace('#', '');
};

const createHeading = (text: string, font: string, size: number, color: string, addLine: boolean, primaryColor: string, uppercase: boolean) => {
  return new Paragraph({
    children: [new TextRun({ text: uppercase ? text.toUpperCase() : text, font, size, color, bold: true })],
    spacing: { before: 300, after: 150 },
    border: addLine ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 1 } } : undefined
  });
};

const createListParagraphs = (text: string, font: string, size: number, color: string, bullet: string) => {
  return text.split('\n').filter(l => l.trim()).map(line => {
    const cleanLine = line.replace(/^[•\-\*›▸→◦]\s*/, '').trim();
    return new Paragraph({
       children: [new TextRun({ text: `${bullet}  ${cleanLine}`, size, font, color })],
       spacing: { after: 80 },
       indent: { left: 240, hanging: 240 }
    });
  });
};

export const generateSidebarLayout = (cvData: CVData, themeColor: string, config: DocxTemplateConfig): Document => {
  const { personal, summary, experience, education, skills } = cvData;
  const primaryColor = resolveColor(config.colors.primary, themeColor);
  
  const sidebarContent: Paragraph[] = [];
  
  // Sidebar - Name & Title
  sidebarContent.push(new Paragraph({
    children: [new TextRun({ text: personal.fullName, bold: true, size: config.sizes.name, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.heading })],
    spacing: { after: 100 }
  }));
  sidebarContent.push(new Paragraph({
    children: [new TextRun({ text: personal.jobTitle, size: config.sizes.jobTitle, color: primaryColor, font: config.font.body })],
    spacing: { after: 400 }
  }));

  // Sidebar - Contact
  sidebarContent.push(createHeading("Contact", config.font.heading, config.sizes.sidebarHeading, resolveColor(config.colors.sidebarHeading, themeColor), config.styling.sidebarHeadingLine, primaryColor, config.styling.uppercaseHeadings));
  if (personal.email) sidebarContent.push(new Paragraph({ children: [new TextRun({ text: personal.email, size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })], spacing: { after: 100 } }));
  if (personal.phone) sidebarContent.push(new Paragraph({ children: [new TextRun({ text: personal.phone, size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })], spacing: { after: 100 } }));
  if (personal.location) sidebarContent.push(new Paragraph({ children: [new TextRun({ text: personal.location, size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })], spacing: { after: 100 } }));
  sidebarContent.push(new Paragraph({ spacing: { after: 200 } }));

  // Sidebar - Education
  if (education.length > 0) {
    sidebarContent.push(createHeading("Education", config.font.heading, config.sizes.sidebarHeading, resolveColor(config.colors.sidebarHeading, themeColor), config.styling.sidebarHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    education.forEach(edu => {
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: edu.degree, bold: true, size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })] }));
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: edu.school, size: config.sizes.sidebarBody - 2, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })] }));
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: `${edu.startDate} - ${edu.endDate}`, size: config.sizes.sidebarBody - 2, color: primaryColor, font: config.font.body })], spacing: { after: 150 } }));
    });
  }

  // Sidebar - Skills
  if (skills.length > 0) {
    sidebarContent.push(createHeading("Skills", config.font.heading, config.sizes.sidebarHeading, resolveColor(config.colors.sidebarHeading, themeColor), config.styling.sidebarHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    skills.forEach(skill => {
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: skill.name, size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })], spacing: { after: 100 } }));
    });
  }

  // To prevent docx validation errors over empty cell, if sidebarContent is empty, push a blank paragraph
  if (sidebarContent.length === 0) sidebarContent.push(new Paragraph({ text: "" }));

  const mainContent: Paragraph[] = [];
  
  if (summary) {
    mainContent.push(createHeading("Profile", config.font.heading, config.sizes.sectionHeading, resolveColor(config.colors.mainHeading, themeColor), config.styling.mainHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    mainContent.push(new Paragraph({ children: [new TextRun({ text: summary, size: config.sizes.body, color: resolveColor(config.colors.mainText, themeColor), font: config.font.body })], spacing: { after: 300 } }));
  }

  if (experience.length > 0) {
    mainContent.push(createHeading("Experience", config.font.heading, config.sizes.sectionHeading, resolveColor(config.colors.mainHeading, themeColor), config.styling.mainHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    experience.forEach(exp => {
      mainContent.push(new Paragraph({ children: [new TextRun({ text: exp.title, bold: true, size: config.sizes.body + 2, color: resolveColor(config.colors.mainHeading, themeColor), font: config.font.heading })] }));
      mainContent.push(new Paragraph({ children: [new TextRun({ text: `${exp.company} | ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, size: config.sizes.body - 2, color: primaryColor, font: config.font.body })], spacing: { after: 100 } }));
      mainContent.push(...createListParagraphs(exp.description, config.font.body, config.sizes.body, resolveColor(config.colors.mainText, themeColor), config.styling.bulletCharacter));
      mainContent.push(new Paragraph({ spacing: { after: 200 } }));
    });
  }

  if (mainContent.length === 0) mainContent.push(new Paragraph({ text: "" }));

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { fill: resolveColor(config.colors.sidebarBg, themeColor), type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 400, bottom: 400, left: 400, right: 400 },
            children: sidebarContent
          }),
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            shading: { fill: resolveColor(config.colors.mainBg, themeColor), type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 400, bottom: 400, left: 400, right: 400 },
            children: mainContent
          })
        ]
      })
    ]
  });

  return new Document({
    sections: [{
      properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
      children: [table]
    }]
  });
};

export const generateHeaderLayout = (cvData: CVData, themeColor: string, config: DocxTemplateConfig): Document => {
  const { personal, summary, experience, education, skills } = cvData;
  const primaryColor = resolveColor(config.colors.primary, themeColor);
  
  const children: (Paragraph | Table)[] = [];

  // Header
  children.push(new Paragraph({
    children: [new TextRun({ text: personal.fullName, bold: true, size: config.sizes.name, color: resolveColor(config.colors.mainHeading, themeColor), font: config.font.heading })],
    spacing: { after: 100 }
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: personal.jobTitle, size: config.sizes.jobTitle, color: primaryColor, font: config.font.body })],
    spacing: { after: 200 }
  }));
  
  const contactParts: string[] = [];
  if (personal.email) contactParts.push(personal.email);
  if (personal.phone) contactParts.push(personal.phone);
  if (personal.location) contactParts.push(personal.location);
  
  children.push(new Paragraph({
    children: [new TextRun({ text: contactParts.join("  |  "), size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })],
    spacing: { after: 400 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryColor, space: 12 } }
  }));

  const mainContent: Paragraph[] = [];
  
  if (summary) {
    mainContent.push(createHeading("Profile", config.font.heading, config.sizes.sectionHeading, resolveColor(config.colors.mainHeading, themeColor), config.styling.mainHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    mainContent.push(new Paragraph({ children: [new TextRun({ text: summary, size: config.sizes.body, color: resolveColor(config.colors.mainText, themeColor), font: config.font.body })], spacing: { after: 300 } }));
  }

  if (experience.length > 0) {
    mainContent.push(createHeading("Experience", config.font.heading, config.sizes.sectionHeading, resolveColor(config.colors.mainHeading, themeColor), config.styling.mainHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    experience.forEach(exp => {
      mainContent.push(new Paragraph({ children: [new TextRun({ text: exp.title, bold: true, size: config.sizes.body + 2, color: resolveColor(config.colors.mainHeading, themeColor), font: config.font.heading })] }));
      mainContent.push(new Paragraph({ children: [new TextRun({ text: `${exp.company} | ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, size: config.sizes.body - 2, color: primaryColor, font: config.font.body })], spacing: { after: 100 } }));
      mainContent.push(...createListParagraphs(exp.description, config.font.body, config.sizes.body, resolveColor(config.colors.mainText, themeColor), config.styling.bulletCharacter));
      mainContent.push(new Paragraph({ spacing: { after: 200 } }));
    });
  }

  if (mainContent.length === 0) mainContent.push(new Paragraph({ text: "" }));

  const sidebarContent: Paragraph[] = [];
  
  if (education.length > 0) {
    sidebarContent.push(createHeading("Education", config.font.heading, config.sizes.sidebarHeading, resolveColor(config.colors.sidebarHeading, themeColor), config.styling.sidebarHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    education.forEach(edu => {
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: edu.degree, bold: true, size: config.sizes.sidebarBody, color: resolveColor(config.colors.mainHeading, themeColor), font: config.font.body })] }));
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: edu.school, size: config.sizes.sidebarBody - 2, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })] }));
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: `${edu.startDate} - ${edu.endDate}`, size: config.sizes.sidebarBody - 2, color: primaryColor, font: config.font.body })], spacing: { after: 150 } }));
    });
  }

  if (skills.length > 0) {
    sidebarContent.push(createHeading("Skills", config.font.heading, config.sizes.sidebarHeading, resolveColor(config.colors.sidebarHeading, themeColor), config.styling.sidebarHeadingLine, primaryColor, config.styling.uppercaseHeadings));
    skills.forEach(skill => {
      sidebarContent.push(new Paragraph({ children: [new TextRun({ text: skill.name, size: config.sizes.sidebarBody, color: resolveColor(config.colors.sidebarText, themeColor), font: config.font.body })], spacing: { after: 100 } }));
    });
  }

  if (sidebarContent.length === 0) sidebarContent.push(new Paragraph({ text: "" }));

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            shading: { fill: resolveColor(config.colors.mainBg, themeColor), type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 0, bottom: 400, left: 0, right: 300 },
            children: mainContent
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { fill: resolveColor(config.colors.sidebarBg, themeColor), type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 0, bottom: 400, left: 300, right: 0 },
            children: sidebarContent
          })
        ]
      })
    ]
  });

  children.push(table);

  return new Document({
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children
    }]
  });
};
