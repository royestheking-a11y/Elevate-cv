export type DocxLayoutType = 'sidebar-left' | 'header-top';

export interface DocxTemplateConfig {
  id: string;
  type: DocxLayoutType;
  font: { heading: string; body: string };
  colors: {
    sidebarBg: string | ((theme: string) => string);
    sidebarText: string;
    sidebarHeading: string | ((theme: string) => string);
    mainBg: string;
    mainText: string;
    mainHeading: string | ((theme: string) => string);
    primary: string | ((theme: string) => string);
  };
  sizes: {
    name: number; jobTitle: number; sectionHeading: number; body: number; sidebarHeading: number; sidebarBody: number;
  };
  styling: { sidebarHeadingLine: boolean; mainHeadingLine: boolean; uppercaseHeadings: boolean; bulletCharacter: string; };
}

export const docxTemplateConfigs: Record<string, DocxTemplateConfig> = {
  "premium-1": { // Noir
    id: "premium-1",
    type: "sidebar-left",
    font: { heading: "Georgia", body: "Arial" },
    colors: {
      sidebarBg: "1A1A1A",
      sidebarText: "FFFFFF",
      sidebarHeading: (theme: string) => theme,
      mainBg: "F5F0E8",
      mainText: "333333",
      mainHeading: "1A1A1A",
      primary: (theme: string) => theme,
    },
    sizes: { name: 64, jobTitle: 24, sectionHeading: 32, body: 21, sidebarHeading: 20, sidebarBody: 18 },
    styling: { sidebarHeadingLine: true, mainHeadingLine: false, uppercaseHeadings: false, bulletCharacter: "•" }
  },
  "premium-2": { // Swiss
    id: "premium-2",
    type: "header-top",
    font: { heading: "Arial Black", body: "Arial" },
    colors: {
      sidebarBg: "FFFFFF",
      sidebarText: "555555",
      sidebarHeading: "111111",
      mainBg: "FFFFFF",
      mainText: "444444",
      mainHeading: "111111",
      primary: (theme: string) => theme,
    },
    sizes: { name: 72, jobTitle: 28, sectionHeading: 26, body: 21, sidebarHeading: 22, sidebarBody: 19 },
    styling: { sidebarHeadingLine: false, mainHeadingLine: true, uppercaseHeadings: true, bulletCharacter: "—" }
  },
  "premium-3": { // Architect
    id: "premium-3",
    type: "sidebar-left",
    font: { heading: "Times New Roman", body: "Arial" },
    colors: {
      sidebarBg: "F2F2F2",
      sidebarText: "555555",
      sidebarHeading: (theme: string) => theme,
      mainBg: "FAFAFA",
      mainText: "555555",
      mainHeading: "1C1C1C",
      primary: (theme: string) => theme,
    },
    sizes: { name: 56, jobTitle: 22, sectionHeading: 32, body: 22, sidebarHeading: 20, sidebarBody: 19 },
    styling: { sidebarHeadingLine: true, mainHeadingLine: true, uppercaseHeadings: false, bulletCharacter: "•" }
  },
  "premium-4": { // Gradient
    id: "premium-4",
    type: "header-top",
    font: { heading: "Arial", body: "Arial" },
    colors: {
      sidebarBg: "F1F3F9",
      sidebarText: "777777",
      sidebarHeading: "1A1A1A",
      mainBg: "FFFFFF",
      mainText: "555555",
      mainHeading: "1A1A1A",
      primary: (theme: string) => theme,
    },
    sizes: { name: 68, jobTitle: 24, sectionHeading: 24, body: 21, sidebarHeading: 20, sidebarBody: 19 },
    styling: { sidebarHeadingLine: false, mainHeadingLine: false, uppercaseHeadings: true, bulletCharacter: "•" }
  },
  "premium-5": { // Timeline
    id: "premium-5",
    type: "sidebar-left",
    font: { heading: "Arial", body: "Arial" },
    colors: {
      sidebarBg: "111827",
      sidebarText: "D1D5DB",
      sidebarHeading: "9CA3AF",
      mainBg: "FFFFFF",
      mainText: "4B5563",
      mainHeading: "111827",
      primary: (theme: string) => theme,
    },
    sizes: { name: 64, jobTitle: 22, sectionHeading: 28, body: 22, sidebarHeading: 20, sidebarBody: 20 },
    styling: { sidebarHeadingLine: true, mainHeadingLine: true, uppercaseHeadings: true, bulletCharacter: "›" }
  },
  "premium-6": { // Minimal
    id: "premium-6",
    type: "header-top",
    font: { heading: "Times New Roman", body: "Arial" },
    colors: {
      sidebarBg: "FFFEF9",
      sidebarText: "444444",
      sidebarHeading: "AAAAAA",
      mainBg: "FFFEF9",
      mainText: "444444",
      mainHeading: "111111",
      primary: (theme: string) => theme,
    },
    sizes: { name: 76, jobTitle: 24, sectionHeading: 32, body: 23, sidebarHeading: 22, sidebarBody: 21 },
    styling: { sidebarHeadingLine: false, mainHeadingLine: false, uppercaseHeadings: false, bulletCharacter: "•" }
  },
  "premium-7": { // Horizon
    id: "premium-7",
    type: "header-top",
    font: { heading: "Georgia", body: "Calibri" },
    colors: {
      sidebarBg: "F3F4F6",
      sidebarText: "4B5563",
      sidebarHeading: (theme: string) => theme,
      mainBg: "F9FAFB",
      mainText: "4B5563",
      mainHeading: (theme: string) => theme,
      primary: (theme: string) => theme,
    },
    sizes: { name: 60, jobTitle: 22, sectionHeading: 24, body: 22, sidebarHeading: 20, sidebarBody: 20 },
    styling: { sidebarHeadingLine: true, mainHeadingLine: true, uppercaseHeadings: true, bulletCharacter: "›" }
  },
  "premium-8": { // Diamond
    id: "premium-8",
    type: "sidebar-left",
    font: { heading: "Georgia", body: "Arial" },
    colors: {
      sidebarBg: (theme: string) => theme,
      sidebarText: "FFFFFF",
      sidebarHeading: "FFFFFF",
      mainBg: "FEFEFE",
      mainText: "555555",
      mainHeading: "18181B",
      primary: (theme: string) => theme,
    },
    sizes: { name: 64, jobTitle: 20, sectionHeading: 24, body: 21, sidebarHeading: 18, sidebarBody: 19 },
    styling: { sidebarHeadingLine: true, mainHeadingLine: true, uppercaseHeadings: true, bulletCharacter: "▸" }
  },
  "premium-9": { // Mono
    id: "premium-9",
    type: "header-top",
    font: { heading: "Arial Black", body: "Arial" },
    colors: {
      sidebarBg: "FFFFFF",
      sidebarText: "555555",
      sidebarHeading: "0C0C0C",
      mainBg: "FFFFFF",
      mainText: "444444",
      mainHeading: "0C0C0C",
      primary: (theme: string) => theme,
    },
    sizes: { name: 72, jobTitle: 24, sectionHeading: 28, body: 22, sidebarHeading: 22, sidebarBody: 21 },
    styling: { sidebarHeadingLine: false, mainHeadingLine: true, uppercaseHeadings: true, bulletCharacter: "→" }
  },
  "premium-10": { // Soft
    id: "premium-10",
    type: "sidebar-left",
    font: { heading: "Georgia", body: "Calibri" },
    colors: {
      sidebarBg: "F5F0E8",
      sidebarText: "555555",
      sidebarHeading: "999999",
      mainBg: "FDFAF6",
      mainText: "555555",
      mainHeading: "1C1917",
      primary: (theme: string) => theme,
    },
    sizes: { name: 68, jobTitle: 22, sectionHeading: 24, body: 22, sidebarHeading: 18, sidebarBody: 20 },
    styling: { sidebarHeadingLine: true, mainHeadingLine: true, uppercaseHeadings: true, bulletCharacter: "◦" }
  }
};
