import React from 'react';
import { useEditorStore, EditorElement } from '../../../store/useEditorStore';
import { 
  Type, Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, AlignJustify, ArrowUp, ArrowDown, ChevronUp, 
  ChevronDown, Trash2, Copy, Layers, MousePointer2 
} from 'lucide-react';

export const StudioPropsPanel: React.FC = () => {
  const { 
    selectedId, elements, updateElement, saveHistory, 
    bringForward, sendBackward, bringToFront, sendToBack,
    deleteElement, addElement
  } = useEditorStore();

  const element = elements.find(el => el.id === selectedId);

  if (!element) {
    return (
      <div className="w-72 bg-[#3B2F2F] border-l border-white/5 flex flex-col items-center justify-center p-8 text-center gap-4">
        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/20">
          <MousePointer2 size={24} />
        </div>
        <p className="text-sm text-[#8888A0]">Click any element to edit its properties</p>
      </div>
    );
  }

  const handleChange = (updates: Partial<EditorElement>) => {
    updateElement(element.id, updates);
  };

  const handleBlur = () => {
    saveHistory();
  };

  const FONTS = [
    'Plus Jakarta Sans', 'Cormorant Garamond', 'Montserrat', 
    'DM Sans', 'Playfair Display', 'Lora', 'Inter', 'Outfit'
  ];

  return (
    <div className="w-full lg:w-72 bg-[#3B2F2F] border-l border-white/10 flex flex-col h-full z-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-safe">
      <div className="p-4 border-b border-white/5 bg-[#2A2323] sticky top-0 z-10 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">
          {element.type.toUpperCase()} PROPERTIES
        </h3>
        <div className="flex items-center gap-1">
           <button 
             onClick={() => addElement({ ...element, id: `el_${Date.now()}`, x: element.x + 20, y: element.y + 20 })}
             className="p-1.5 hover:bg-white/5 rounded text-[#8888A0] hover:text-white transition-colors"
           >
             <Copy size={14} />
           </button>
           <button 
             onClick={() => deleteElement(element.id)}
             className="p-1.5 hover:bg-white/5 rounded text-red-500 hover:text-red-400 transition-colors"
           >
             <Trash2 size={14} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Position & Size */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Position & Size</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-[#666] uppercase">X</label>
              <input 
                type="number" 
                value={element.x} 
                onChange={(e) => handleChange({ x: parseInt(e.target.value) || 0 })}
                onBlur={handleBlur}
                className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white disabled:opacity-50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#666] uppercase">Y</label>
              <input 
                type="number" 
                value={element.y} 
                onChange={(e) => handleChange({ y: parseInt(e.target.value) || 0 })}
                onBlur={handleBlur}
                className="w-full bg-[#22222E] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#666] uppercase">Width</label>
              <input 
                type="number" 
                value={element.w} 
                onChange={(e) => handleChange({ w: parseInt(e.target.value) || 0 })}
                onBlur={handleBlur}
                className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#666] uppercase">Height</label>
              <input 
                type="number" 
                value={element.h} 
                disabled={element.type === 'skillbar'}
                onChange={(e) => handleChange({ h: parseInt(e.target.value) || 0 })}
                onBlur={handleBlur}
                className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white disabled:opacity-50"
              />
            </div>
          </div>
        </section>

        {/* Transform */}
        <section className="space-y-3 pt-4 border-t border-white/5">
          <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Transform</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-[#666] uppercase">Rotation</label>
              <span className="text-[10px] text-white/50">{element.rotation || 0}°</span>
            </div>
            <input 
              type="range" min="0" max="360"
              value={element.rotation || 0} 
              onChange={(e) => handleChange({ rotation: parseInt(e.target.value) })}
              onBlur={handleBlur}
              className="w-full accent-[#D6A85F]"
            />
          </div>
        </section>

        {/* Typography */}
        {element.type === 'text' && (
          <section className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Typography</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-[#666] uppercase">Font Family</label>
                <select 
                  value={element.fontFamily}
                  onChange={(e) => { handleChange({ fontFamily: e.target.value }); saveHistory(); }}
                  className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
                >
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#666] uppercase">Size</label>
                  <input 
                    type="number" 
                    value={element.fontSize} 
                    onChange={(e) => handleChange({ fontSize: parseInt(e.target.value) || 0 })}
                    onBlur={handleBlur}
                    className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#666] uppercase">Weight</label>
                  <select 
                    value={element.fontWeight}
                    onChange={(e) => { handleChange({ fontWeight: e.target.value }); saveHistory(); }}
                    className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
                  >
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { handleChange({ italic: !element.italic }); saveHistory(); }}
                  className={`flex-1 p-2 rounded bg-[#2A2323] border transition-colors ${element.italic ? 'border-[#D6A85F] text-[#D6A85F]' : 'border-white/5 text-[#8888A0]'}`}
                >
                  <Italic size={14} className="mx-auto" />
                </button>
                <button 
                  onClick={() => { handleChange({ underline: !element.underline }); saveHistory(); }}
                  className={`flex-1 p-2 rounded bg-[#22222E] border transition-colors ${element.underline ? 'border-[#6C63FF] text-[#6C63FF]' : 'border-white/5 text-[#8888A0]'}`}
                >
                  <Underline size={14} className="mx-auto" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-[#2A2323] p-1 rounded-lg border border-white/5">
                {(['left', 'center', 'right', 'justify'] as const).map(align => (
                  <button 
                    key={align}
                    onClick={() => { handleChange({ textAlign: align }); saveHistory(); }}
                    className={`flex-1 p-1.5 rounded transition-colors ${element.textAlign === align ? 'bg-[#D6A85F] text-[#3B2F2F]' : 'text-[#8888A0] hover:text-white'}`}
                  >
                    {align === 'left' && <AlignLeft size={14} className="mx-auto" />}
                    {align === 'center' && <AlignCenter size={14} className="mx-auto" />}
                    {align === 'right' && <AlignRight size={14} className="mx-auto" />}
                    {align === 'justify' && <AlignJustify size={14} className="mx-auto" />}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                   <label className="text-[10px] text-[#666] uppercase">Color</label>
                   <span className="text-[10px] text-white/50">{element.color}</span>
                </div>
                <input 
                  type="color" 
                  value={element.color} 
                  onChange={(e) => handleChange({ color: e.target.value })}
                  onBlur={handleBlur}
                  className="w-full bg-transparent border-none p-0 h-8 cursor-pointer"
                />
              </div>
            </div>
          </section>
        )}

        {/* Shape Properties */}
        {element.type === 'shape' && (
           <section className="space-y-4 pt-4 border-t border-white/5">
             <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Shape Style</h4>
             <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                     <label className="text-[10px] text-[#666] uppercase">Fill</label>
                     <input 
                       type="color" 
                       value={element.fill} 
                       onChange={(e) => handleChange({ fill: e.target.value })}
                       onBlur={handleBlur}
                       className="w-full bg-transparent border-none p-0 h-8 cursor-pointer"
                     />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] text-[#666] uppercase">Stroke</label>
                     <input 
                       type="color" 
                       value={element.stroke === 'none' ? '#000000' : element.stroke} 
                       onChange={(e) => handleChange({ stroke: e.target.value })}
                       onBlur={handleBlur}
                       className="w-full bg-transparent border-none p-0 h-8 cursor-pointer"
                     />
                   </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-[#666] uppercase">Corner Radius</label>
                    <span className="text-[10px] text-white/50">{element.radius}px</span>
                  </div>
                  <input 
                    type="range" min="0" max="100"
                    value={element.radius} 
                    onChange={(e) => handleChange({ radius: parseInt(e.target.value) })}
                    onBlur={handleBlur}
                    className="w-full accent-[#D6A85F]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-[#666] uppercase">Opacity</label>
                    <span className="text-[10px] text-white/50">{Math.round((element.opacity || 1) * 100)}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.01"
                    value={element.opacity} 
                    onChange={(e) => handleChange({ opacity: parseFloat(e.target.value) })}
                    onBlur={handleBlur}
                    className="w-full accent-[#D6A85F]"
                  />
                </div>
            </div>
          </section>
        )}

        {/* Skillbar Properties */}
        {element.type === 'skillbar' && (
          <section className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Skill Bar Style</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#666] uppercase">Percentage</label>
                  <span className="text-[10px] text-white/50">{element.value}%</span>
                </div>
                <input 
                  type="range" min="0" max="100"
                  value={element.value} 
                  onChange={(e) => handleChange({ value: parseInt(e.target.value) })}
                  onBlur={handleBlur}
                  className="w-full accent-[#D6A85F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#666] uppercase">Bar Color</label>
                  <input 
                    type="color" 
                    value={element.color} 
                    onChange={(e) => handleChange({ color: e.target.value })}
                    onBlur={handleBlur}
                    className="w-full bg-transparent border-none p-0 h-8 cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#666] uppercase">Track Color</label>
                  <input 
                    type="color" 
                    value={element.bg} 
                    onChange={(e) => handleChange({ bg: e.target.value })}
                    onBlur={handleBlur}
                    className="w-full bg-transparent border-none p-0 h-8 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#666] uppercase">Font Family</label>
                <select 
                  value={element.fontFamily}
                  onChange={(e) => { handleChange({ fontFamily: e.target.value }); saveHistory(); }}
                  className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
                >
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </section>
        )}

        {/* Effects */}
        <section className="space-y-3 pt-4 border-t border-white/5">
          <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Effects</h4>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-[#666] uppercase">Blur</label>
                <span className="text-[10px] text-white/50">{element.blur || 0}px</span>
              </div>
              <input 
                type="range" min="0" max="20"
                value={element.blur || 0} 
                onChange={(e) => handleChange({ blur: parseInt(e.target.value) })}
                onBlur={handleBlur}
                className="w-full accent-[#D6A85F]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#666] uppercase">Shadow</label>
              <input 
                type="text" 
                value={element.shadow || ''} 
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                onChange={(e) => handleChange({ shadow: e.target.value })}
                onBlur={handleBlur}
                className="w-full bg-[#2A2323] border border-white/5 rounded px-2 py-1.5 text-xs text-white"
              />
            </div>
          </div>
        </section>

        {/* Layers Order */}
        <section className="space-y-3 pt-4 border-t border-white/5">
          <h4 className="text-[10px] font-bold text-[#8888A0] uppercase tracking-widest">Arrangement</h4>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => bringForward(element.id)} className="flex items-center justify-center gap-2 p-2 bg-[#2A2323] border border-white/5 rounded text-[11px] text-[#8888A0] hover:text-white transition-colors">
              <ChevronUp size={14} /> Forward
            </button>
            <button onClick={() => sendBackward(element.id)} className="flex items-center justify-center gap-2 p-2 bg-[#2A2323] border border-white/5 rounded text-[11px] text-[#8888A0] hover:text-white transition-colors">
              <ChevronDown size={14} /> Backward
            </button>
            <button onClick={() => bringToFront(element.id)} className="flex items-center justify-center gap-2 p-2 bg-[#2A2323] border border-white/5 rounded text-[11px] text-[#8888A0] hover:text-white transition-colors">
              <ArrowUp size={14} /> To Front
            </button>
            <button onClick={() => sendToBack(element.id)} className="flex items-center justify-center gap-2 p-2 bg-[#2A2323] border border-white/5 rounded text-[11px] text-[#8888A0] hover:text-white transition-colors">
              <ArrowDown size={14} /> To Back
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
