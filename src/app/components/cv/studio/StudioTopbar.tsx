import React, { useRef } from 'react';
import { 
  Undo2, Redo2, Grid3X3, ZoomIn, ZoomOut, 
  Download, FileUp, Sparkles
} from 'lucide-react';
import { useEditorStore } from '../../../store/useEditorStore';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export const StudioTopbar: React.FC = () => {
  const { 
    undo, redo, zoom, setZoom, gridOn, toggleGrid, 
    elements, pageBg, setElements, setPageBg, setSelectedId,
    setImportWizardOpen
  } = useEditorStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.elements) setElements(data.elements);
        if (data.pageBg) setPageBg(data.pageBg);
        if (data.numPages) useEditorStore.getState().setNumPages(data.numPages);
        setSelectedId(null);
        toast.success('Design imported successfully');
      } catch (err) {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadPDF = async () => {
    const { numPages } = useEditorStore.getState();
    const firstPage = document.getElementById('cv-studio-page-0');
    if (!firstPage) return;

    toast.loading('Generating PDF...', { id: 'pdf-gen' });
    setSelectedId(null);

    try {
      // Small delay to ensure selection markers are gone
      await new Promise(resolve => setTimeout(resolve, 100));

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      for (let i = 0; i < numPages; i++) {
        const pageNode = document.getElementById(`cv-studio-page-${i}`);
        if (!pageNode) continue;

        const dataUrl = await htmlToImage.toJpeg(pageNode, { 
          quality: 0.95, 
          pixelRatio: 3,
          backgroundColor: pageBg
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`CV_Studio_Resume_${Date.now()}.pdf`);
      
      toast.success('PDF downloaded!', { id: 'pdf-gen' });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Failed to generate PDF', { id: 'pdf-gen' });
    }
  };

  return (
    <div className="h-14 w-full border-b border-white/5 bg-[#3B2F2F] flex items-center px-2 sm:px-4 gap-2 sm:gap-4 flex-shrink-0 z-30 overflow-x-auto overflow-y-hidden scrollbar-none">
      <div className="flex items-center gap-2 pr-2 sm:pr-4 border-r border-white/10 flex-shrink-0">
        <span className="font-bold text-lg tracking-tight text-white">Resume<span className="text-[#D6A85F]">Studio</span></span>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
        <button 
          onClick={undo} 
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-[#8888A0] hover:text-white" 
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button 
          onClick={redo} 
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-[#8888A0] hover:text-white" 
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <div className="flex items-center gap-1">
        <button 
          onClick={toggleGrid} 
          className={`p-2 rounded-lg transition-colors ${gridOn ? 'bg-[#D6A85F] text-[#3B2F2F]' : 'hover:bg-white/5 text-[#8888A0] hover:text-white'}`}
          title="Toggle Grid"
        >
          <Grid3X3 size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button onClick={() => setZoom(Math.max(0.2, zoom - 0.1))} className="p-1 sm:p-1.5 hover:bg-white/5 rounded-md text-[#8888A0] hover:text-white">
          <ZoomOut size={16} />
        </button>
        <span className="text-[10px] sm:text-xs font-medium w-8 sm:w-12 text-center text-[#8888A0]">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-1 sm:p-1.5 hover:bg-white/5 rounded-md text-[#8888A0] hover:text-white">
          <ZoomIn size={16} />
        </button>
        <button onClick={() => setZoom(0.7)} className="hidden sm:block px-2 py-1 text-[10px] uppercase font-bold hover:bg-white/5 rounded text-[#8888A0] hover:text-white">
          Reset
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button 
          onClick={() => setImportWizardOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-amber-500/20"
        >
          <Sparkles size={16} />
          <span className="hidden sm:inline">Import CV</span>
        </button>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImportJSON} 
          accept=".json" 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-[#8888A0] hover:text-white text-sm transition-colors"
        >
          <FileUp size={16} />
          <span>JSON Import</span>
        </button>
        <button 
          onClick={handleDownloadPDF}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg bg-[#D6A85F] hover:bg-[#EBC07F] text-[#3B2F2F] text-xs sm:text-sm font-bold transition-colors shadow-lg shadow-[#D6A85F]/20"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Download PDF</span>
        </button>
      </div>

    </div>
  );
};

