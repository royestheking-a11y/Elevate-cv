import { create } from 'zustand';
import { cvAPI, coverLetterAPI } from './lib/api';

export interface CVData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    photoUrl?: string;
    photoShape?: 'circle' | 'square';
  };
  summary: string;
  skills: { id: string; name: string; level?: string }[];
  experience: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    id: string;
    name: string;
    url: string;
    description: string;
  }[];
  _id?: string;
}

const emptyData: CVData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    location: '',
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
};

interface AppState {
  cvData: CVData;
  isLoadingCV: boolean;
  
  // CV Actions
  fetchCV: () => Promise<void>;
  updatePersonal: (data: Partial<CVData['personal']>) => void;
  updateSummary: (summary: string) => void;
  addSkill: (skill: CVData['skills'][0]) => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, skill: Partial<CVData['skills'][0]>) => void;
  addExperience: (exp: CVData['experience'][0]) => void;
  updateExperience: (id: string, exp: Partial<CVData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: CVData['education'][0]) => void;
  updateEducation: (id: string, edu: Partial<CVData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  saveCV: () => Promise<void>;
  
  // App UI State
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  
  // Cover Letter Data
  coverLetterData: {
    recipientName: string;
    companyName: string;
    jobTitle: string;
    body: string;
  };
  isLoadingCoverLetter: boolean;
  fetchCoverLetter: () => Promise<void>;
  updateCoverLetter: (data: Partial<AppState['coverLetterData']>) => void;
  saveCoverLetter: () => Promise<void>;
  selectedCoverLetterTemplateId: string;
  setSelectedCoverLetterTemplateId: (id: string) => void;
  importCVData: (data: Partial<CVData>) => void;
}

// Debounce helper for auto-save
let cvSaveTimeout: ReturnType<typeof setTimeout>;
let clSaveTimeout: ReturnType<typeof setTimeout>;

const debouncedSaveCV = (saveFunc: () => Promise<void>) => {
  clearTimeout(cvSaveTimeout);
  cvSaveTimeout = setTimeout(saveFunc, 1000);
};

const debouncedSaveCL = (saveFunc: () => Promise<void>) => {
  clearTimeout(clSaveTimeout);
  clSaveTimeout = setTimeout(saveFunc, 1000);
};

export const useStore = create<AppState>()((set, get) => ({
  cvData: emptyData,
  isLoadingCV: false,
  
  fetchCV: async () => {
    const token = localStorage.getItem('elevate_token');
    if (!token) return;
    set({ isLoadingCV: true });
    try {
      const res = await cvAPI.get();
      const data = res.data;
      set({
        cvData: {
          personal: data.personal || emptyData.personal,
          summary: data.summary || '',
          skills: data.skills || [],
          experience: data.experience || [],
          education: data.education || [],
          projects: data.projects || [],
          _id: data._id,
        },
        selectedTemplateId: data.selectedTemplateId || 'modern-professional',
        themeColor: data.themeColor || '#3B2F2F',
      });
    } catch (error) {
      console.error('Failed to fetch CV:', error);
    } finally {
      set({ isLoadingCV: false });
    }
  },

  saveCV: async () => {
    const state = get();
    try {
      await cvAPI.update({
        personal: state.cvData.personal,
        summary: state.cvData.summary,
        skills: state.cvData.skills,
        experience: state.cvData.experience,
        education: state.cvData.education,
        projects: state.cvData.projects,
        selectedTemplateId: state.selectedTemplateId,
        themeColor: state.themeColor,
      });
    } catch (error) {
      console.error('Failed to save CV:', error);
    }
  },

  updatePersonal: (data) => {
    set((state) => ({ cvData: { ...state.cvData, personal: { ...state.cvData.personal, ...data } } }));
    debouncedSaveCV(get().saveCV);
  },
  updateSummary: (summary) => {
    set((state) => ({ cvData: { ...state.cvData, summary } }));
    debouncedSaveCV(get().saveCV);
  },
  addSkill: (skill) => {
    set((state) => ({ cvData: { ...state.cvData, skills: [...state.cvData.skills, skill] } }));
    debouncedSaveCV(get().saveCV);
  },
  removeSkill: (id) => {
    set((state) => ({ cvData: { ...state.cvData, skills: state.cvData.skills.filter((s) => s.id !== id) } }));
    debouncedSaveCV(get().saveCV);
  },
  updateSkill: (id, data) => {
    set((state) => ({ cvData: { ...state.cvData, skills: state.cvData.skills.map((s) => (s.id === id ? { ...s, ...data } : s)) } }));
    debouncedSaveCV(get().saveCV);
  },
  addExperience: (exp) => {
    set((state) => ({ cvData: { ...state.cvData, experience: [...state.cvData.experience, exp] } }));
    debouncedSaveCV(get().saveCV);
  },
  updateExperience: (id, data) => {
    set((state) => ({ cvData: { ...state.cvData, experience: state.cvData.experience.map((e) => (e.id === id ? { ...e, ...data } : e)) } }));
    debouncedSaveCV(get().saveCV);
  },
  removeExperience: (id) => {
    set((state) => ({ cvData: { ...state.cvData, experience: state.cvData.experience.filter((e) => e.id !== id) } }));
    debouncedSaveCV(get().saveCV);
  },
  addEducation: (edu) => {
    set((state) => ({ cvData: { ...state.cvData, education: [...state.cvData.education, edu] } }));
    debouncedSaveCV(get().saveCV);
  },
  updateEducation: (id, data) => {
    set((state) => ({ cvData: { ...state.cvData, education: state.cvData.education.map((e) => (e.id === id ? { ...e, ...data } : e)) } }));
    debouncedSaveCV(get().saveCV);
  },
  removeEducation: (id) => {
    set((state) => ({ cvData: { ...state.cvData, education: state.cvData.education.filter((e) => e.id !== id) } }));
    debouncedSaveCV(get().saveCV);
  },
  
  selectedTemplateId: 'modern-professional',
  setSelectedTemplateId: (id) => {
    set({ selectedTemplateId: id });
    debouncedSaveCV(get().saveCV);
  },
  selectedCoverLetterTemplateId: 'classic-professional',
  setSelectedCoverLetterTemplateId: (id) => {
    set({ selectedCoverLetterTemplateId: id });
    debouncedSaveCL(get().saveCoverLetter);
  },
  themeColor: '#3B2F2F',
  setThemeColor: (color) => {
    set({ themeColor: color });
    debouncedSaveCV(get().saveCV);
  },

  // Cover Letter
  coverLetterData: {
    recipientName: 'Hiring Manager',
    companyName: '',
    jobTitle: '',
    body: '',
  },
  isLoadingCoverLetter: false,

  fetchCoverLetter: async () => {
    const token = localStorage.getItem('elevate_token');
    if (!token) return;
    set({ isLoadingCoverLetter: true });
    try {
      const res = await coverLetterAPI.get();
      const data = res.data;
      set({
        coverLetterData: {
          recipientName: data.recipientName || 'Hiring Manager',
          companyName: data.companyName || '',
          jobTitle: data.jobTitle || '',
          body: data.body || '',
        },
        selectedCoverLetterTemplateId: data.selectedTemplateId || 'classic-professional',
      });
    } catch (error) {
      console.error('Failed to fetch cover letter:', error);
    } finally {
      set({ isLoadingCoverLetter: false });
    }
  },

  saveCoverLetter: async () => {
    const state = get();
    try {
      await coverLetterAPI.update({
        ...state.coverLetterData,
        selectedTemplateId: state.selectedCoverLetterTemplateId,
      });
    } catch (error) {
      console.error('Failed to save cover letter:', error);
    }
  },

  updateCoverLetter: (data) => {
    set((state) => ({ coverLetterData: { ...state.coverLetterData, ...data } }));
    debouncedSaveCL(get().saveCoverLetter);
  },

  importCVData: (data) => {
    set((state) => ({
      cvData: {
        personal: { ...state.cvData.personal, ...(data.personal || {}) },
        summary: data.summary ?? state.cvData.summary,
        skills: data.skills ?? state.cvData.skills,
        experience: data.experience ?? state.cvData.experience,
        education: data.education ?? state.cvData.education,
        projects: data.projects ?? state.cvData.projects,
      }
    }));
    debouncedSaveCV(get().saveCV);
  },
}));
