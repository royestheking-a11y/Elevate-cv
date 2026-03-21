import { EditorElement } from "../store/useEditorStore";

export interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  skills: string[];
  languages: Array<{
    l: string;
    lv: string;
  }>;
}

export interface TemplateMeta {
  id: string;
  label: string;
  preview: {
    bg: string;
    accent: string;
  };
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'noir', label: 'Noir Modern', preview: { bg: '#1a1a1a', accent: '#D6A85F' } },
  { id: 'swiss', label: 'Swiss Clean', preview: { bg: '#ffffff', accent: '#E63946' } },
  { id: 'arch', label: 'The Architect', preview: { bg: '#F4F4F9', accent: '#2A9D8F' } },
  { id: 'gradient', label: 'Vibrant Gradient', preview: { bg: '#ffffff', accent: '#6C63FF' } },
  { id: 'timeline', label: 'Timeline Pro', preview: { bg: '#FAFAFA', accent: '#1D4ED8' } },
  { id: 'minimal', label: 'Elegant Minimal', preview: { bg: '#ffffff', accent: '#111111' } },
  { id: 'horizon', label: 'Horizon Split', preview: { bg: '#f0f4f8', accent: '#0F172A' } },
  { id: 'diamond', label: 'Diamond Executive', preview: { bg: '#ffffff', accent: '#B8860B' } },
  { id: 'mono', label: 'Monochrome Grid', preview: { bg: '#ffffff', accent: '#000000' } },
  { id: 'soft', label: 'Soft Pastel', preview: { bg: '#FFF9F5', accent: '#FF8A65' } },
];

export function buildTemplate(id: string, data: Partial<CVData>, themeColor: string = '#D6A85F'): EditorElement[] {
  const els: EditorElement[] = [];
  let z = 1;

  const d: CVData = {
    name: data.name || 'Your Name',
    title: data.title || 'Job Title',
    email: data.email || 'email@example.com',
    phone: data.phone || '+1 (000) 000-0000',
    address: data.address || 'City, Country',
    summary: data.summary || 'Professional and dedicated expert with years of experience...',
    experience: data.experience || [
      { role: 'Senior Designer', company: 'Global Tech', period: '2020 - Present', bullets: ['Led design team for flagship product', 'Increased engagement by 40%'] },
      { role: 'UI/UX Designer', company: 'Creative Studio', period: '2018 - 2020', bullets: ['Developed 20+ mobile app designs'] }
    ],
    education: data.education || [
      { degree: 'Master of Design', institution: 'State University', period: '2016 - 2018' },
      { degree: 'BA in Graphics', institution: 'Design Institute', period: '2012 - 2016' }
    ],
    skills: data.skills || ['React', 'TypeScript', 'Figma', 'UI Design', 'Next.js'],
    languages: data.languages || [{ l: 'English', lv: 'Native' }]
  };

  const add = (el: any) => {
    els.push({ ...el, id: `e${z}`, zIndex: z, visible: true, rotation: 0, locked: false });
    z++;
  };

  if (id === 'noir') {
    // Dark Sidebar Background
    add({ type: 'shape', shape: 'rect', x: 0, y: 0, w: 260, h: 1123, fill: '#1a1a1a' });
    // Photo Placeholder
    add({ type: 'image', x: 70, y: 60, w: 120, h: 120, radius: 60, src: null });
    // Contact Info (Sidebar)
    add({ type: 'text', x: 30, y: 210, w: 200, h: 20, text: 'CONTACT', fontSize: 10, fontWeight: '700', color: themeColor, letterSpacing: 3 });
    add({ type: 'text', x: 30, y: 240, w: 200, h: 40, text: d.email + '\n' + d.phone + '\n' + d.address, fontSize: 10, color: '#aaa', lineHeight: 1.6 });
    // Skills (Sidebar)
    add({ type: 'text', x: 30, y: 320, w: 200, h: 20, text: 'SKILLS', fontSize: 10, fontWeight: '700', color: themeColor, letterSpacing: 3 });
    d.skills.slice(0, 6).forEach((s, i) => {
      add({ type: 'skillbar', x: 30, y: 350 + (i * 45), w: 200, h: 32, label: s, value: 85 - (i * 5), color: themeColor, bg: '#333', textColor: '#fff' });
    });
    // Main Area Header
    add({ type: 'text', x: 290, y: 60, w: 450, h: 56, text: d.name, fontSize: 44, fontWeight: '700', color: '#1a1a1a', fontFamily: 'Playfair Display' });
    add({ type: 'text', x: 290, y: 115, w: 450, h: 24, text: d.title, fontSize: 18, color: themeColor, fontWeight: '500', letterSpacing: 2 });
    // Summary
    add({ type: 'text', x: 290, y: 170, w: 450, h: 0, text: d.summary, fontSize: 12, color: '#666', lineHeight: 1.8 });
    // Experience
    add({ type: 'text', x: 290, y: 300, w: 450, h: 24, text: 'PROFESSIONAL EXPERIENCE', fontSize: 12, fontWeight: '700', color: '#1a1a1a', letterSpacing: 2 });
    add({ type: 'divider', x: 290, y: 325, w: 450, h: 10, color: themeColor, thickness: 2 });
    d.experience.slice(0, 3).forEach((e, i) => {
      const y = 350 + (i * 120);
      add({ type: 'text', x: 290, y, w: 300, h: 20, text: e.role, fontSize: 13, fontWeight: '700', color: '#1a1a1a' });
      add({ type: 'text', x: 600, y, w: 140, h: 20, text: e.period, fontSize: 11, color: '#999', textAlign: 'right' });
      add({ type: 'text', x: 290, y: y + 20, w: 450, h: 18, text: e.company, fontSize: 12, color: themeColor, fontWeight: '500' });
      add({ type: 'text', x: 290, y: y + 42, w: 450, h: 0, text: '• ' + e.bullets.join('\n• '), fontSize: 11, color: '#666', lineHeight: 1.6 });
    });
  }

  else if (id === 'swiss') {
    // Top Bar
    add({ type: 'shape', shape: 'rect', x: 0, y: 0, w: 794, h: 15, fill: themeColor });
    // Name
    add({ type: 'text', x: 50, y: 60, w: 480, h: 70, text: d.name, fontSize: 52, fontWeight: '800', fontFamily: 'Inter', color: '#000' });
    add({ type: 'text', x: 55, y: 135, w: 400, h: 24, text: d.title, fontSize: 18, color: themeColor, letterSpacing: 4, fontWeight: '600' });
    // Contact Grid
    add({ type: 'shape', shape: 'rect', x: 50, y: 175, w: 694, h: 1, fill: '#eee' });
    add({ type: 'text', x: 50, y: 185, w: 220, h: 40, text: '✉ ' + d.email, fontSize: 10, color: '#444' });
    add({ type: 'text', x: 280, y: 185, w: 220, h: 40, text: '📞 ' + d.phone, fontSize: 10, color: '#444', textAlign: 'center' });
    add({ type: 'text', x: 524, y: 185, w: 220, h: 40, text: '📍 ' + d.address, fontSize: 10, color: '#444', textAlign: 'right' });
    add({ type: 'shape', shape: 'rect', x: 50, y: 215, w: 694, h: 1, fill: '#eee' });
    // Two Column Layout
    // Left: Experience
    add({ type: 'text', x: 50, y: 250, w: 440, h: 24, text: 'EXPERIENCE', fontSize: 13, fontWeight: '800', color: '#000', letterSpacing: 1 });
    d.experience.slice(0, 4).forEach((e, i) => {
      const y = 290 + (i * 140);
      add({ type: 'shape', shape: 'rect', x: 50, y, w: 8, h: 8, fill: themeColor, radius: 4 });
      add({ type: 'text', x: 70, y: y - 5, w: 420, h: 24, text: e.role, fontSize: 15, fontWeight: '700', color: '#000' });
      add({ type: 'text', x: 70, y: y + 20, w: 200, h: 20, text: e.company, fontSize: 12, color: themeColor, fontWeight: '600' });
      add({ type: 'text', x: 280, y: y + 20, w: 210, h: 20, text: e.period, fontSize: 11, color: '#888', textAlign: 'right' });
      add({ type: 'text', x: 70, y: y + 45, w: 420, h: 0, text: e.bullets.join('\n'), fontSize: 11, color: '#555', lineHeight: 1.7 });
    });
    // Right: Summary & Skills & Edu
    add({ type: 'text', x: 530, y: 250, w: 220, h: 24, text: 'SUMMARY', fontSize: 13, fontWeight: '800', color: '#000', letterSpacing: 1 });
    add({ type: 'text', x: 530, y: 285, w: 220, h: 0, text: d.summary, fontSize: 11, color: '#555', lineHeight: 1.8 });
    add({ type: 'text', x: 530, y: 440, w: 220, h: 24, text: 'SKILLS', fontSize: 13, fontWeight: '800', color: '#000', letterSpacing: 1 });
    d.skills.forEach((s, i) => {
      add({ type: 'shape', shape: 'badge', x: 530 + ((i % 2) * 115), y: 480 + (Math.floor(i / 2) * 35), w: 105, h: 28, fill: themeColor + '15', stroke: themeColor + '40', radius: 4, text: s, textColor: themeColor });
    });
    add({ type: 'text', x: 530, y: 680, w: 220, h: 24, text: 'EDUCATION', fontSize: 13, fontWeight: '800', color: '#000', letterSpacing: 1 });
    d.education.forEach((edu, i) => {
      add({ type: 'text', x: 530, y: 715 + (i * 70), w: 220, h: 40, text: edu.degree + '\n' + edu.institution + '\n' + edu.period, fontSize: 11, color: '#555', lineHeight: 1.6 });
    });
  }

  else if (id === 'arch') {
    add({ type: 'shape', shape: 'rect', x: 40, y: 40, w: 714, h: 1043, fill: 'none', stroke: themeColor, strokeWidth: 1 });
    add({ type: 'shape', shape: 'rect', x: 40, y: 40, w: 240, h: 1043, fill: themeColor + '08' });
    add({ type: 'text', x: 310, y: 80, w: 400, h: 80, text: d.name.toUpperCase(), fontSize: 42, fontWeight: '300', color: '#111', fontFamily: 'Montserrat', letterSpacing: 10 });
    add({ type: 'text', x: 315, y: 155, w: 400, h: 24, text: d.title, fontSize: 14, color: themeColor, letterSpacing: 6, fontWeight: '600' });
    add({ type: 'divider', x: 315, y: 195, w: 100, h: 4, color: themeColor, thickness: 4 });
  }

  else if (id === 'gradient') {
    add({ type: 'shape', shape: 'rect', x: 0, y: 0, w: 794, h: 260, fill: themeColor });
    add({ type: 'text', x: 60, y: 70, w: 600, h: 80, text: d.name, fontSize: 56, fontWeight: '900', color: '#fff' });
    add({ type: 'text', x: 65, y: 145, w: 600, h: 30, text: d.title, fontSize: 22, color: 'rgba(255,255,255,.8)', fontWeight: '300', letterSpacing: 5 });
    add({ type: 'image', x: 600, y: 70, w: 130, h: 130, radius: 15, src: null });
    // Contact Bar
    add({ type: 'shape', shape: 'rect', x: 60, y: 220, w: 674, h: 80, fill: '#fff', radius: 12, shadow: '0 10px 30px rgba(0,0,0,0.1)' });
    add({ type: 'text', x: 90, y: 245, w: 200, h: 30, text: '✉ ' + d.email, fontSize: 11, fontWeight: '600', color: themeColor });
    add({ type: 'text', x: 300, y: 245, w: 200, h: 30, text: '📞 ' + d.phone, fontSize: 11, fontWeight: '600', color: themeColor, textAlign: 'center' });
    add({ type: 'text', x: 510, y: 245, w: 200, h: 30, text: '📍 ' + d.address, fontSize: 11, fontWeight: '600', color: themeColor, textAlign: 'right' });
  }

  else if (id === 'timeline') {
    add({ type: 'text', x: 50, y: 50, w: 400, h: 60, text: d.name, fontSize: 44, fontWeight: '800', color: '#111' });
    add({ type: 'text', x: 50, y: 105, w: 400, h: 24, text: d.title, fontSize: 16, color: themeColor, fontWeight: '600', letterSpacing: 2 });
    // Central Timeline Line
    add({ type: 'shape', shape: 'rect', x: 200, y: 160, w: 2, h: 900, fill: '#eee' });
    // Summary
    add({ type: 'text', x: 230, y: 160, w: 500, h: 0, text: d.summary, fontSize: 11, color: '#666', lineHeight: 1.6 });
    // Experience with Dots
    d.experience.slice(0, 3).forEach((e, i) => {
      const y = 280 + (i * 150);
      add({ type: 'shape', shape: 'circle', x: 195, y: y + 5, w: 12, h: 12, fill: themeColor });
      add({ type: 'text', x: 50, y: y, w: 140, h: 20, text: e.period, fontSize: 10, fontWeight: '700', color: '#999', textAlign: 'right' });
      add({ type: 'text', x: 230, y: y, w: 514, h: 20, text: e.role, fontSize: 14, fontWeight: '700', color: '#111' });
      add({ type: 'text', x: 230, y: y + 22, w: 514, h: 20, text: e.company, fontSize: 12, color: themeColor, fontWeight: '600' });
      add({ type: 'text', x: 230, y: y + 45, w: 514, h: 0, text: e.bullets.join('\n'), fontSize: 11, color: '#666', lineHeight: 1.6 });
    });
  }

  else if (id === 'minimal') {
    add({ type: 'text', x: 50, y: 50, w: 694, h: 70, text: d.name, fontSize: 48, fontWeight: '300', fontFamily: 'Cormorant Garamond', color: '#111', textAlign: 'center' });
    add({ type: 'text', x: 50, y: 125, w: 694, h: 24, text: d.title.toUpperCase(), fontSize: 12, color: '#888', letterSpacing: 6, fontWeight: '400', textAlign: 'center' });
    add({ type: 'divider', x: 347, y: 165, w: 100, h: 2, color: themeColor, thickness: 2 });
    add({ type: 'text', x: 100, y: 200, w: 594, h: 0, text: d.summary, fontSize: 11, color: '#555', textAlign: 'center', lineHeight: 2, italic: true });
    // Experience
    add({ type: 'text', x: 50, y: 320, w: 694, h: 20, text: 'HISTORY', fontSize: 10, fontWeight: '700', color: themeColor, letterSpacing: 4, textAlign: 'center' });
    d.experience.forEach((e, i) => {
      const y = 360 + (i * 100);
      add({ type: 'text', x: 50, y, w: 694, h: 24, text: e.role + ' at ' + e.company, fontSize: 14, fontWeight: '600', color: '#111', textAlign: 'center' });
      add({ type: 'text', x: 50, y: y + 25, w: 694, h: 20, text: e.period, fontSize: 10, color: '#999', textAlign: 'center' });
    });
  }

  else if (id === 'horizon') {
    add({ type: 'shape', shape: 'rect', x: 0, y: 0, w: 794, h: 100, fill: '#0F172A' });
    add({ type: 'text', x: 50, y: 30, w: 400, h: 40, text: d.name, fontSize: 32, fontWeight: '700', color: '#fff' });
    add({ type: 'text', x: 450, y: 40, w: 294, h: 20, text: d.email + ' | ' + d.phone, fontSize: 10, color: 'rgba(255,255,255,0.6)', textAlign: 'right' });
    add({ type: 'shape', shape: 'rect', x: 0, y: 100, w: 794, h: 4, fill: themeColor });
    // Left Col: Contacts & Skills
    add({ type: 'text', x: 50, y: 140, w: 220, h: 20, text: 'EXPERTise', fontSize: 11, fontWeight: '800', color: '#0F172A', letterSpacing: 2 });
    d.skills.forEach((s, i) => {
      add({ type: 'text', x: 50, y: 175 + (i * 25), w: 220, h: 20, text: '▪ ' + s, fontSize: 11, color: '#444' });
    });
    // Right Col: Exp
    add({ type: 'text', x: 300, y: 140, w: 444, h: 20, text: 'PROFESSIONAL PATH', fontSize: 11, fontWeight: '800', color: '#0F172A', letterSpacing: 2 });
    d.experience.forEach((e, i) => {
      const y = 175 + (i * 150);
      add({ type: 'text', x: 300, y, w: 444, h: 24, text: e.role, fontSize: 16, fontWeight: '700', color: themeColor });
      add({ type: 'text', x: 300, y: y + 24, w: 444, h: 20, text: e.company + ' | ' + e.period, fontSize: 11, fontWeight: '600', color: '#666' });
      add({ type: 'text', x: 300, y: y + 48, w: 444, h: 0, text: e.bullets.join('\n'), fontSize: 11, color: '#444', lineHeight: 1.6 });
    });
  }

  else if (id === 'diamond') {
    add({ type: 'shape', shape: 'rect', x: 395, y: 40, w: 4, h: 1043, fill: '#eee' });
    add({ type: 'text', x: 50, y: 60, w: 694, h: 60, text: d.name, fontSize: 44, fontWeight: '700', color: '#000', textAlign: 'center', fontFamily: 'Playfair Display' });
    add({ type: 'text', x: 50, y: 115, w: 694, h: 24, text: d.title, fontSize: 16, color: themeColor, letterSpacing: 8, textAlign: 'center' });
    // Diamond Icons
    add({ type: 'shape', shape: 'star', x: 387, y: 160, w: 20, h: 20, fill: themeColor });
  }

  else if (id === 'mono') {
    add({ type: 'shape', shape: 'rect', x: 40, y: 40, w: 714, h: 1, fill: '#000' });
    add({ type: 'shape', shape: 'rect', x: 40, y: 1083, w: 714, h: 1, fill: '#000' });
    add({ type: 'text', x: 60, y: 80, w: 674, h: 80, text: d.name, fontSize: 64, fontWeight: '900', color: '#000', letterSpacing: -2 });
  }

  else if (id === 'soft') {
    add({ type: 'shape', shape: 'rect', x: 40, y: 40, w: 714, h: 200, fill: themeColor + '10', radius: 20 });
    add({ type: 'text', x: 80, y: 80, w: 400, h: 50, text: d.name, fontSize: 38, fontWeight: '700', color: '#333' });
    add({ type: 'text', x: 80, y: 130, w: 400, h: 24, text: d.title, fontSize: 16, color: themeColor, fontWeight: '500' });
  }

  else {
    add({ type: 'text', x: 50, y: 50, w: 500, h: 60, text: d.name, fontSize: 40, fontWeight: '700', color: '#000' });
    add({ type: 'text', x: 50, y: 110, w: 500, h: 30, text: d.title, fontSize: 20, color: themeColor });
    add({ type: 'divider', x: 50, y: 150, w: 694, h: 2, color: '#eee', thickness: 1 });
    add({ type: 'text', x: 50, y: 180, w: 694, h: 100, text: d.summary, fontSize: 12, lineHeight: 1.6 });
  }

  return els;
}

