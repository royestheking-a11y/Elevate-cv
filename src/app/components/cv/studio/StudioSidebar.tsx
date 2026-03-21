import React, { useState } from 'react';
import { 
  Type, Square, Circle, Minus, Triangle, User, 
  BarChart, List, BadgeCheck, LayoutTemplate, Layers, Settings, Plus,
  Eye, EyeOff, Trash2, Hexagon, Star, Heart, ArrowRight, Sparkles, Paintbrush, FileText
} from 'lucide-react';
import { useEditorStore, EditorElement } from '../../../store/useEditorStore';
import { DEFAULTS } from '../../../lib/editorDefaults';
import { TEMPLATES } from '../../../lib/editorTemplates';
import { toast } from 'sonner';

export const StudioSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'templates' | 'layers' | 'page'>('add');
  const { 
    addElement, elements, setSelectedId, setPageBg, 
    pageBg, setElements, updateElement, deleteElement, selectedId,
    currentThemeColor, setCurrentThemeColor, applyTemplate, activeTemplateId, importData, clearCanvas
  } = useEditorStore();

  const handleAdd = (type: string) => {
    const config = DEFAULTS[type];
    if (!config) return;

    const newElement: EditorElement = {
      ...config as EditorElement,
      id: `el_${Date.now()}`,
      x: 100 + (elements.length * 10),
      y: 100 + (elements.length * 10),
      zIndex: elements.length + 1,
      visible: true,
      locked: false,
    };

    addElement(newElement);
    setSelectedId(newElement.id);
  };

  const loadModernPreset = () => {
    if (elements.length > 0 && !confirm('This will replace your current design. Continue?')) return;
    applyTemplate('noir', {});
    setPageBg('#ffffff');
    toast.success('Modern Noir template loaded');
  };

  const loadMinimalPreset = () => {
    if (elements.length > 0 && !confirm('This will replace your current design. Continue?')) return;
    applyTemplate('minimal', {});
    setPageBg('#FAFAF8');
    toast.success('Minimal template loaded');
  };

  const loadBlankPreset = () => {
    if (elements.length > 0 && !confirm('This will clear your current design. Continue?')) return;
    clearCanvas();
    setPageBg('#ffffff');
    toast.success('Blank canvas loaded');
  };

  const renderAddTab = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <section>
        <h3 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest mb-3">Text Blocks</h3>
        <div className="grid grid-cols-2 gap-2">
          {['heading', 'subheading', 'body', 'label'].map((t) => (
            <button key={t} onClick={() => handleAdd(t)} className="flex flex-col items-center gap-2 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group">
              <Type className="text-[#8888A0] group-hover:text-[#D6A85F]" size={20} />
              <span className="text-[11px] font-medium capitalize">{t}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest mb-3">Shapes & Lines</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'rect', icon: <Square size={18} /> },
            { id: 'circle', icon: <Circle size={18} /> },
            { id: 'triangle', icon: <Triangle size={18} /> },
            { id: 'hexagon', icon: <Hexagon size={18} /> },
            { id: 'star', icon: <Star size={18} /> },
            { id: 'heart', icon: <Heart size={18} /> },
            { id: 'octagon', icon: <Hexagon size={18} className="rotate-45" /> },
            { id: 'pentagon', icon: <Triangle size={18} className="rotate-180" /> },
            { id: 'arrow-right', icon: <ArrowRight size={18} /> },
            { id: 'divider', icon: <Minus size={18} /> },
            { id: 'badge', icon: <BadgeCheck size={18} /> },
          ].map((s) => (
            <button key={s.id} onClick={() => handleAdd(s.id)} className="flex flex-col items-center gap-2 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group">
              <span className="text-[#8888A0] group-hover:text-[#D6A85F]">{s.icon}</span>
              <span className="text-[11px] font-medium capitalize">{s.id}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest mb-3">Content Blocks</h3>
        <div className="grid grid-cols-2 gap-2">
           <button onClick={() => handleAdd('photo')} className="flex flex-col items-center gap-2 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group">
              <User className="text-[#8888A0] group-hover:text-[#D6A85F]" size={18} />
              <span className="text-[11px] font-medium">Photo</span>
            </button>
            <button onClick={() => handleAdd('skillbar')} className="flex flex-col items-center gap-2 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group">
              <BarChart className="text-[#8888A0] group-hover:text-[#D6A85F]" size={18} />
              <span className="text-[11px] font-medium">Skill Bar</span>
            </button>
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest mb-3">Full CV Presets</h3>
        <div className="space-y-2">
          <button 
            onClick={loadBlankPreset}
            className="w-full flex items-center gap-3 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group text-left"
          >
            <FileText className="text-[#D6A85F]" size={18} />
            <div>
              <div className="text-[12px] font-bold text-white">Blank Page</div>
              <div className="text-[10px] text-[#8888A0]">Start from scratch</div>
            </div>
          </button>
          <button 
            onClick={loadModernPreset}
            className="w-full flex items-center gap-3 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group text-left"
          >
            <LayoutTemplate className="text-[#D6A85F]" size={18} />
            <div>
              <div className="text-[12px] font-bold text-white">Modern Noir</div>
              <div className="text-[10px] text-[#8888A0]">Professional dark layout</div>
            </div>
          </button>
          <button 
            onClick={loadMinimalPreset}
            className="w-full flex items-center gap-3 p-3 bg-[#2A2323] border border-white/5 rounded-xl hover:border-[#D6A85F]/50 transition-all group text-left"
          >
            <LayoutTemplate className="text-[#D6A85F]" size={18} />
            <div>
              <div className="text-[12px] font-bold text-white">Minimal Clean</div>
              <div className="text-[10px] text-[#8888A0]">Elegant serif design</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
       <section>
          <h3 className="text-[10px] font-bold text-[#D6A85F] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Paintbrush size={12} />
            Theme Color
          </h3>
          <div className="grid grid-cols-5 gap-2">
             {['#D6A85F', '#6C63FF', '#E63946', '#2A9D8F', '#F4A261', '#264653', '#E9C46A', '#BC4B51', '#5B8E7D', '#F4E285'].map(c => (
                <button 
                  key={c}
                  onClick={() => setCurrentThemeColor(c)}
                  className={`size-8 rounded-lg border-2 transition-all ${currentThemeColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                />
             ))}
             <label className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10">
                <Plus size={14} className="text-white/40" />
                <input type="color" className="sr-only" value={currentThemeColor} onChange={(e) => setCurrentThemeColor(e.target.value)} />
             </label>
          </div>
       </section>

       <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-[#D6A85F] uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} />
              Pro Templates
            </h3>
            <span className="text-[9px] bg-[#D6A85F]/20 text-[#D6A85F] px-1.5 py-0.5 rounded font-black uppercase">Plus</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pb-8">
             {TEMPLATES.map(t => (
                <button 
                  key={t.id}
                  onClick={() => applyTemplate(t.id, importData || {})}
                  className={`
                    relative aspect-[1/1.41] rounded-xl overflow-hidden border-2 transition-all group
                    ${activeTemplateId === t.id ? 'border-[#D6A85F] ring-2 ring-[#D6A85F]/20' : 'border-white/5 hover:border-white/20 bg-[#2A2323]'}
                  `}
                >
                   {/* Preview Mockup */}
                   <div className="absolute inset-0 bg-[#222]" style={{ opacity: activeTemplateId === t.id ? 1 : 0.6 }}>
                      <div className="w-full h-1/4" style={{ backgroundColor: t.preview.bg }}>
                         <div className="absolute inset-0 opacity-20" style={{ backgroundColor: t.preview.accent }} />
                      </div>
                      <div className="p-2 space-y-1.5">
                         <div className="w-1/2 h-1.5 bg-white/20 rounded" />
                         <div className="w-2/3 h-1 bg-white/10 rounded" />
                         <div className="w-full h-8 bg-white/5 rounded mt-2" />
                         <div className="w-3/4 h-1 bg-white/5 rounded" />
                         <div className="w-1/2 h-1 bg-white/5 rounded" />
                      </div>
                   </div>
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                      <span className="text-[9px] font-black text-white uppercase tracking-tighter bg-[#D6A85F] px-2 py-1 rounded shadow-xl">Use Template</span>
                   </div>

                   <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className={`text-[9px] font-bold truncate ${activeTemplateId === t.id ? 'text-[#D6A85F]' : 'text-white/60'}`}>
                        {t.label}
                      </p>
                   </div>
                </button>
             ))}
          </div>
       </section>
    </div>
  );

  const renderLayersTab = () => (
    <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {[...elements].reverse().map((el) => (
        <div 
          key={el.id}
          onClick={() => setSelectedId(el.id)}
          className={`group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${el.id === selectedId ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-[#8888A0]'}`}
        >
          <div className="size-8 rounded bg-[#2A2323] border border-white/5 flex items-center justify-center text-[10px] font-bold text-[#D6A85F]">
            {el.type === 'text' ? 'T' : el.type === 'divider' ? '—' : el.type === 'shape' ? 'S' : el.type === 'image' ? 'I' : el.type === 'skillbar' ? 'B' : '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-medium truncate">{el.text || el.label || el.type}</div>
            <div className="text-[9px] opacity-40 uppercase tracking-tighter">{el.type}</div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
             <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, { visible: el.visible === false }); }} className="p-1 hover:text-white">
                {el.visible !== false ? <Eye size={12} /> : <EyeOff size={12} />}
             </button>
             <button onClick={(e) => { e.stopPropagation(); if(confirm('Delete layer?')) deleteElement(el.id); }} className="p-1 hover:text-red-400">
                <Trash2 size={12} />
             </button>
          </div>
        </div>
      ))}
      {elements.length === 0 && (
        <div className="p-12 text-center">
           <Layers className="size-8 text-white/5 mx-auto mb-3" />
           <p className="text-[#8888A0] text-[10px] uppercase font-bold tracking-widest">No layers yet</p>
        </div>
      )}
    </div>
  );

  const renderPageTab = () => (
    <div className="p-4 space-y-6">
      <section>
        <h3 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest mb-4">Background</h3>
        <div className="grid grid-cols-6 gap-2 mb-6">
          {['#ffffff', '#FAFAF8', '#F5F5FA', '#1A1A1A', '#0F172A', '#6C63FF', '#EEF2FF', '#FEF3C7', '#DCFCE7', '#FCE7F3', '#FFEDD5', '#F5F3FF'].map(c => (
            <button 
              key={c}
              onClick={() => setPageBg(c)}
              className={`size-6 rounded-full border border-white/10 transition-transform ${pageBg === c ? 'scale-125 ring-2 ring-[#D6A85F] shadow-lg ring-offset-2 ring-offset-[#3B2F2F]' : 'hover:scale-110'}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <label className="size-6 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 overflow-hidden">
             <Plus size={12} />
             <input type="color" className="sr-only" onChange={(e) => setPageBg(e.target.value)} />
          </label>
        </div>
      </section>

      <div className="p-4 bg-[#21212B]/30 rounded-2xl border border-white/5">
         <div className="text-[10px] font-bold text-[#8888A0] uppercase mb-2 tracking-widest">Page Specs</div>
         <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60">A4 ISO 216</span>
            <span className="text-[9px] bg-[#D6A85F]/20 px-1.5 py-0.5 rounded text-[#D6A85F] font-bold uppercase tracking-tighter">Portrait</span>
         </div>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-64 bg-[#3B2F2F] border-r border-white/10 flex flex-col h-full scrollbar-none z-40">
      <div className="flex p-2 gap-1 bg-[#2A2323] border-b border-white/5">
        {(['add', 'templates', 'layers', 'page'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-[9px] uppercase font-black tracking-widest rounded transition-all ${activeTab === tab ? 'bg-[#D6A85F] text-[#3B2F2F] shadow-lg shadow-[#D6A85F]/10' : 'text-[#8888A0] hover:text-white hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'add' && renderAddTab()}
        {activeTab === 'templates' && renderTemplatesTab()}
        {activeTab === 'layers' && renderLayersTab()}
        {activeTab === 'page' && renderPageTab()}
      </div>
    </div>
  );
};

