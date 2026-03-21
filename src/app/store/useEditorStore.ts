import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { buildTemplate, CVData } from '../lib/editorTemplates';

export type ElementType = 'text' | 'shape' | 'divider' | 'image' | 'skillbar';

export interface EditorElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  visible: boolean;
  locked: boolean;
  rotation: number;
  pageIndex?: number;
  
  // Text & General
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  italic?: boolean;
  underline?: boolean;
  lineHeight?: number;
  letterSpacing?: number;

  // Shapes
  shape?: 'rect' | 'circle' | 'triangle' | 'badge' | 'hexagon' | 'star' | 'heart' | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'octagon' | 'pentagon';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  opacity?: number;
  textColor?: string;
  shadow?: string;
  blur?: number;

  // Divider
  thickness?: number;
  style?: 'solid' | 'dashed' | 'dotted';

  // Image
  src?: string | null;

  // Skillbar
  label?: string;
  value?: number;
  bg?: string;
}

interface EditorState {
  elements: EditorElement[];
  selectedId: string | null;
  zoom: number;
  history: string[];
  historyIdx: number;
  pageBg: string;
  gridOn: boolean;
  numPages: number;
  activePageIndex: number;

  // Pro Features State
  isImportWizardOpen: boolean;
  importData: CVData | null;
  currentThemeColor: string;
  activeTemplateId: string | null;

  // Actions
  setElements: (elements: EditorElement[]) => void;
  addElement: (element: EditorElement) => void;
  updateElement: (id: string, updates: Partial<EditorElement>) => void;
  deleteElement: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  setPageBg: (color: string) => void;
  toggleGrid: () => void;
  setNumPages: (num: number) => void;
  setActivePageIndex: (index: number) => void;
  addPage: () => void;
  removePage: (index: number) => void;
  clearCanvas: () => void;
  
  // History
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;

  // Layer Operations
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;

  // Pro Actions
  setImportWizardOpen: (isOpen: boolean) => void;
  setImportData: (data: CVData | null) => void;
  setCurrentThemeColor: (color: string) => void;
  setActiveTemplateId: (id: string | null) => void;
  applyTemplate: (templateId: string, data: Partial<CVData>) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      elements: [],
      selectedId: null,
      zoom: 1,
      history: [],
      historyIdx: -1,
      pageBg: '#ffffff',
      gridOn: false,
      numPages: 1,
      activePageIndex: 0,

  isImportWizardOpen: false,
  importData: null,
  currentThemeColor: '#D6A85F',
  activeTemplateId: null,

  setElements: (elements) => set({ elements }),

  addElement: (element) => {
    set((state) => {
      const elWithPage = { ...element, pageIndex: element.pageIndex !== undefined ? element.pageIndex : state.activePageIndex };
      const newElements = [...state.elements, elWithPage];
      return { elements: newElements };
    });
    get().saveHistory();
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    }));
  },

  deleteElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));
    get().saveHistory();
  },

  setSelectedId: (id) => set({ selectedId: id }),

  setZoom: (zoom) => set({ zoom }),

  setPageBg: (color) => {
    set({ pageBg: color });
    get().saveHistory();
  },

  toggleGrid: () => set((state) => ({ gridOn: !state.gridOn })),

  saveHistory: () => {
    const { elements, pageBg, history, historyIdx, numPages } = get();
    const currentState = JSON.stringify({ elements, pageBg, numPages });
    
    if (historyIdx >= 0 && history[historyIdx] === currentState) return;

    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(currentState);
    
    if (newHistory.length > 50) newHistory.shift();

    set({
      history: newHistory,
      historyIdx: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIdx } = get();
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1;
      const parsed = JSON.parse(history[prevIdx]);
      set({ elements: parsed.elements, pageBg: parsed.pageBg, numPages: parsed.numPages || 1, historyIdx: prevIdx, selectedId: null });
    }
  },

  redo: () => {
    const { history, historyIdx } = get();
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1;
      const parsed = JSON.parse(history[nextIdx]);
      set({ elements: parsed.elements, pageBg: parsed.pageBg, numPages: parsed.numPages || 1, historyIdx: nextIdx, selectedId: null });
    }
  },

  bringForward: (id) => {
    set((state) => {
      const sorted = [...state.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex(el => el.id === id);
      if (idx < sorted.length - 1) {
        const next = sorted[idx + 1];
        const current = sorted[idx];
        const tempZ = next.zIndex;
        next.zIndex = current.zIndex;
        current.zIndex = tempZ;
      }
      return { elements: [...state.elements] };
    });
    get().saveHistory();
  },

  sendBackward: (id) => {
    set((state) => {
      const sorted = [...state.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex(el => el.id === id);
      if (idx > 0) {
        const prev = sorted[idx - 1];
        const current = sorted[idx];
        const tempZ = prev.zIndex;
        prev.zIndex = current.zIndex;
        current.zIndex = tempZ;
      }
      return { elements: [...state.elements] };
    });
    get().saveHistory();
  },

  bringToFront: (id) => {
    set((state) => {
      const maxZ = Math.max(...state.elements.map(el => el.zIndex), 0);
      return {
        elements: state.elements.map(el => el.id === id ? { ...el, zIndex: maxZ + 1 } : el)
      };
    });
    get().saveHistory();
  },

  sendToBack: (id) => {
    set((state) => {
      const minZ = Math.min(...state.elements.map(el => el.zIndex), 0);
      return {
        elements: state.elements.map(el => el.id === id ? { ...el, zIndex: minZ - 1 } : el)
      };
    });
    get().saveHistory();
  },

  setImportWizardOpen: (isOpen) => set({ isImportWizardOpen: isOpen }),
  setImportData: (data) => set({ importData: data }),
  setCurrentThemeColor: (color) => {
    set({ currentThemeColor: color });
    // If we have an active template, re-apply it with the new color
    const { activeTemplateId, importData } = get();
    if (activeTemplateId) {
      const newElements = buildTemplate(activeTemplateId, importData || {}, color);
      set({ elements: newElements });
    }
  },
  setActiveTemplateId: (id) => set({ activeTemplateId: id }),
  applyTemplate: (templateId, data) => {
    const { currentThemeColor } = get();
    const newElements = buildTemplate(templateId, data, currentThemeColor);
    set({ 
      elements: newElements.map(el => ({ ...el, pageIndex: 0 })), 
      selectedId: null, 
      activeTemplateId: templateId,
      importData: data as CVData,
      numPages: 1,
      activePageIndex: 0
    });
    get().saveHistory();
  },

  setNumPages: (num) => set({ numPages: Math.max(1, num) }),
  setActivePageIndex: (index) => set({ activePageIndex: Math.max(0, index) }),
  addPage: () => {
    set((state) => ({
      numPages: state.numPages + 1,
      activePageIndex: state.numPages
    }));
    get().saveHistory();
  },
  removePage: (index) => {
    set((state) => {
      if (state.numPages <= 1) return state;
      const newElements = state.elements.filter(el => el.pageIndex !== index).map(el => {
        if ((el.pageIndex || 0) > index) return { ...el, pageIndex: (el.pageIndex || 0) - 1 };
        return el;
      });
      return {
        numPages: state.numPages - 1,
        elements: newElements,
        activePageIndex: Math.min(state.activePageIndex, state.numPages - 2)
      };
    });
    get().saveHistory();
  },
  clearCanvas: () => {
    set({ elements: [], numPages: 1, activePageIndex: 0, activeTemplateId: null, selectedId: null });
    get().saveHistory();
  },
    }),
    {
      name: 'resume-studio-storage',
      partialize: (state) => ({
        elements: state.elements,
        numPages: state.numPages,
        pageBg: state.pageBg,
        currentThemeColor: state.currentThemeColor,
        activeTemplateId: state.activeTemplateId,
        importData: state.importData
      })
    }
  )
);

