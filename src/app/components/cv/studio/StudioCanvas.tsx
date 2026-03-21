import React, { useEffect } from 'react';
import { useEditorStore } from '../../../store/useEditorStore';
import { DraggableElement } from './DraggableElement';
import { Plus, Trash2 } from 'lucide-react';

export const StudioCanvas: React.FC = () => {
  const { elements, zoom, setZoom, pageBg, gridOn, setSelectedId, numPages, activePageIndex, setActivePageIndex, addPage, removePage } = useEditorStore();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      const padding = window.innerWidth < 640 ? 32 : 80;
      setZoom(Math.max(0.2, Math.min(1, (window.innerWidth - padding) / 794)));
    }
  }, [setZoom]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If clicking directly on the page (not an element), deselect
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  };

  const unscaledHeight = (1123 * numPages) + 100 + (32 * numPages) + 128;

  return (
    <div 
      className="flex-1 bg-[#131111] relative overflow-auto flex items-start justify-center p-4 sm:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      onMouseDown={handleCanvasClick}
    >
      <div 
        className="relative transition-none"
        style={{
          width: `${794 * zoom}px`,
          height: `${unscaledHeight * zoom}px`,
        }}
      >
        <div 
          className="absolute top-0 left-0 flex flex-col gap-8 pb-32 origin-top-left"
          style={{
            transform: `scale(${zoom})`,
            width: '794px'
          }}
        >
        {Array.from({ length: numPages }).map((_, i) => {
          const pageElements = elements.filter(el => (el.pageIndex || 0) === i && el.visible !== false);
          const isActive = activePageIndex === i;

          return (
            <div key={`page-${i}`} className="relative flex group">
              {/* Page Controls (Left Side) */}
              <div className="absolute -left-14 top-0 bottom-0 w-10 flex flex-col items-center justify-start pt-8 gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="text-[#8888A0] text-xs font-black tracking-widest bg-[#2A2323] px-2 py-1 rounded shadow-lg border border-white/5">P{i + 1}</div>
                 {numPages > 1 && (
                   <button onClick={() => removePage(i)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 hover:border-red-500" title="Delete Page">
                     <Trash2 size={16} />
                   </button>
                 )}
              </div>

              {/* A4 Paper */}
              <div 
                id={`cv-studio-page-${i}`}
                onMouseDown={() => setActivePageIndex(i)}
                className={`shadow-[0_20px_80px_rgba(0,0,0,0.5)] flex-shrink-0 relative overflow-hidden transition-all duration-200 cursor-default
                  ${isActive ? 'ring-2 ring-[#D6A85F] ring-offset-4 ring-offset-[#131111]' : 'opacity-80 hover:opacity-100'}
                `}
                style={{ 
                  width: '794px', 
                  height: '1123px',
                  backgroundColor: pageBg,
                }}
              >
                {/* Grid Overlay */}
                {gridOn && isActive && (
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100]"
                    style={{
                      backgroundImage: `linear-gradient(#D6A85F 1px, transparent 1px), linear-gradient(90deg, #D6A85F 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  />
                )}
                
                {/* Elements */}
                {pageElements.map((el) => (
                  <DraggableElement key={el.id} element={el} />
                ))}

                {pageElements.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center gap-4 pointer-events-none">
                    <div className="size-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-200 border-2 border-dashed border-gray-100">
                       <span className="text-4xl">＋</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-400">Page {i + 1} is empty</h3>
                      <p className="text-sm text-gray-300">Choose an element from the left panel to start building.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add New Page Button */}
        <button 
          onClick={addPage}
          className="w-[794px] h-[100px] border-2 border-dashed border-white/10 hover:border-[#D6A85F]/50 bg-[#1A1616] hover:bg-[#201B1B] rounded-2xl flex flex-col items-center justify-center gap-2 text-[#8888A0] hover:text-[#D6A85F] transition-all group shadow-xl"
        >
          <div className="size-10 rounded-full bg-[#2A2323] group-hover:bg-[#D6A85F]/20 flex items-center justify-center transition-colors">
            <Plus size={20} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-bold tracking-widest uppercase text-xs">Add New Page</span>
        </button>
      </div>
     </div>
    </div>
  );
};
