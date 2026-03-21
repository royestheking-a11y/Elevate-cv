import React, { useEffect, useState } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import { StudioCanvas } from "../cv/studio/StudioCanvas";
import { StudioSidebar } from "../cv/studio/StudioSidebar";
import { StudioPropsPanel } from "../cv/studio/StudioPropsPanel";
import { StudioTopbar } from "../cv/studio/StudioTopbar";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { Menu, SlidersHorizontal } from "lucide-react";

export default function ResumeStudioPage() {
  const { saveHistory, setSelectedId } = useEditorStore();
  const [mobileView, setMobileView] = useState<'canvas' | 'sidebar' | 'props'>('canvas');
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  useEffect(() => {
    // Initial empty history state
    saveHistory();

    // Global click to deselect
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If clicking inside the studio container, but NOT on an element or controls
      if (
        target.closest('.resume-studio-container') && 
        !target.closest('.cv-el') && 
        !target.closest('.studio-controls') &&
        !target.closest('button') &&
        !target.closest('input') &&
        !target.closest('select')
      ) {
        setSelectedId(null);
      }
    };

    window.addEventListener('mousedown', handleGlobalClick);
    return () => window.removeEventListener('mousedown', handleGlobalClick);
  }, [saveHistory, setSelectedId]);

  return (
    <div className="resume-studio-container h-[100dvh] flex flex-col bg-[#131111] text-[#E8E8F0] overflow-hidden select-none">
      <div className={`flex-shrink-0 flex flex-col ${mobileView !== 'canvas' ? 'hidden lg:flex' : 'flex'}`}>
        <StudioTopbar />
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`studio-controls flex-shrink-0 absolute inset-0 lg:static lg:h-full z-40 bg-[#131111] ${mobileView === 'sidebar' ? 'block' : 'hidden lg:block'}`}>
          <StudioSidebar />
        </div>
        
        <div className={`w-full lg:w-auto lg:flex-1 h-full min-w-0 flex flex-col ${mobileView === 'canvas' ? 'flex' : 'hidden lg:flex'}`}>
          <StudioCanvas />
        </div>
        
        <div className={`studio-controls flex-shrink-0 absolute inset-0 lg:static lg:h-full z-40 bg-[#131111] ${mobileView === 'props' ? 'block' : 'hidden lg:block'}`}>
          <StudioPropsPanel />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden flex flex-shrink-0 border-t border-white/10 bg-[#2A2323] h-14 pb-safe">
        <button onClick={() => setMobileView('sidebar')} className={`flex-1 flex items-center justify-center transition-colors ${mobileView === 'sidebar' ? 'text-[#D6A85F] bg-[#1A1616]' : 'text-[#8888A0] hover:text-white'}`}>
          <Menu size={20} />
        </button>
        <button onClick={() => setMobileView('canvas')} className={`flex-1 flex items-center justify-center transition-colors ${mobileView === 'canvas' ? 'text-[#D6A85F] bg-[#1A1616]' : 'text-[#8888A0] hover:text-white'}`}>
          <div className="text-xs font-bold uppercase tracking-widest">Canvas</div>
        </button>
        <button onClick={() => setMobileView('props')} className={`flex-1 flex items-center justify-center transition-colors ${mobileView === 'props' ? 'text-[#D6A85F] bg-[#1A1616]' : 'text-[#8888A0] hover:text-white'}`}>
          <SlidersHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
