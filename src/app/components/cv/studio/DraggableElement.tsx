import React, { useState, useEffect, useRef } from 'react';
import { useEditorStore, EditorElement } from '../../../store/useEditorStore';
import { Trash2, Copy, Lock, Unlock, Image as ImageIcon, Plus, RotateCw } from 'lucide-react';

interface DraggableElementProps {
  element: EditorElement;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({ element }) => {
  const { 
    selectedId, setSelectedId, updateElement, zoom, 
    deleteElement, addElement, saveHistory 
  } = useEditorStore();
  
  const isSelected = selectedId === element.id;
  const elementRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, elX: 0, elY: 0, elW: 0, elH: 0 });

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, handle: string | null = null) => {
    if (isEditingText) return;
    if (element.locked && !handle) return;
    
    e.stopPropagation();
    setSelectedId(element.id);

    let startX = 0;
    let startY = 0;

    if ('touches' in e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    } else {
      if ((e as React.MouseEvent).button === 2) return; // Right click
      startX = (e as React.MouseEvent).clientX;
      startY = (e as React.MouseEvent).clientY;
    }

    setDragStart({
      x: startX,
      y: startY,
      elX: element.x,
      elY: element.y,
      elW: element.w,
      elH: element.h
    });

    if (handle === 'rotate') {
      setIsRotating(true);
    } else if (handle) {
      setIsResizing(handle);
    } else {
      setIsDragging(true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (element.type === 'text' || (element.type === 'shape' && element.shape === 'badge')) {
      e.stopPropagation();
      setIsEditingText(true);
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.focus();
          // Select all text
          const range = document.createRange();
          range.selectNodeContents(textRef.current);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }, 0);
    } else if (element.type === 'image') {
      fileInputRef.current?.click();
    }
  };

  const handleTextBlur = () => {
    setIsEditingText(false);
    if (textRef.current) {
      updateElement(element.id, { text: textRef.current.innerText });
      saveHistory();
    }
  };

  const handleLabelBlur = () => {
    setIsEditingLabel(false);
    if (textRef.current) {
      updateElement(element.id, { label: textRef.current.innerText });
      saveHistory();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      updateElement(element.id, { src: event.target?.result as string });
      saveHistory();
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging && !isResizing && !isRotating) return;

      if (e.cancelable && ('touches' in e)) {
        e.preventDefault(); // Stop mobile page scroll while dragging
      }

      let currentX = 0;
      let currentY = 0;

      if ('touches' in e) {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      } else {
        currentX = (e as MouseEvent).clientX;
        currentY = (e as MouseEvent).clientY;
      }

      if (isRotating) {
        if (!elementRef.current) return;
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(currentY - centerY, currentX - centerX);
        const degree = (angle * 180 / Math.PI) + 90;
        updateElement(element.id, { rotation: Math.round(degree) });
        return;
      }

      const dx = (currentX - dragStart.x) / zoom;
      const dy = (currentY - dragStart.y) / zoom;

      if (isDragging) {
        updateElement(element.id, {
          x: Math.round(dragStart.elX + dx),
          y: Math.round(dragStart.elY + dy)
        });
      } else if (isResizing) {
        let { elX: x, elY: y, elW: w, elH: h } = dragStart;
        const minW = 20;
        const minH = 10;

        if (isResizing.includes('r')) w = Math.max(minW, dragStart.elW + dx);
        if (isResizing.includes('l')) {
          const newW = Math.max(minW, dragStart.elW - dx);
          if (newW !== minW) {
            x = dragStart.elX + dx;
            w = newW;
          }
        }
        if (isResizing.includes('b')) h = Math.max(minH, dragStart.elH + dy);
        if (isResizing.includes('t')) {
          const newH = Math.max(minH, dragStart.elH - dy);
          if (newH !== minH) {
            y = dragStart.elY + dy;
            h = newH;
          }
        }

        updateElement(element.id, {
          x: Math.round(x),
          y: Math.round(y),
          w: Math.round(w),
          h: Math.round(h)
        });
      }
    };

    const handleDragEnd = () => {
      if (isDragging || isResizing || isRotating) {
        saveHistory();
        setIsDragging(false);
        setIsResizing(null);
        setIsRotating(false);
      }
    };

    if (isDragging || isResizing || isRotating) {
      window.addEventListener('mousemove', handleDragMove, { passive: false });
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, isResizing, isRotating, dragStart, zoom, element.id, updateElement, saveHistory]);

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div 
            ref={textRef}
            contentEditable={isEditingText}
            onBlur={handleTextBlur}
            suppressContentEditableWarning
            className={`w-full h-full outline-none ${isEditingText ? 'cursor-text select-text' : 'cursor-default'}`}
            style={{
              fontFamily: element.fontFamily,
              fontSize: `${element.fontSize}px`,
              fontWeight: element.fontWeight,
              color: element.color,
              textAlign: element.textAlign,
              fontStyle: element.italic ? 'italic' : 'normal',
              textDecoration: element.underline ? 'underline' : 'none',
              lineHeight: element.lineHeight,
              letterSpacing: `${element.letterSpacing}px`,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              padding: '4px'
            }}
          >
            {element.text}
          </div>
        );
      case 'shape':
        if (element.shape === 'badge') {
           return (
             <div 
               ref={textRef}
               contentEditable={isEditingText}
               onBlur={handleTextBlur}
               suppressContentEditableWarning
               className={`w-full h-full flex items-center justify-center font-semibold outline-none ${isEditingText ? 'cursor-text select-text' : 'cursor-default'}`}
               style={{
                 backgroundColor: element.fill,
                 border: `${element.strokeWidth}px solid ${element.stroke}`,
                 borderRadius: `${element.radius}px`,
                 opacity: element.opacity,
                 color: element.textColor,
                 fontSize: `${element.fontSize}px`,
                 fontFamily: element.fontFamily,
               }}
             >
               {element.text}
             </div>
           );
        }
        const renderShape = () => {
          const { shape, fill, stroke, strokeWidth, opacity, radius, shadow, blur } = element;
          const commonProps = {
            fill: fill || '#D6A85F',
            stroke: stroke === 'none' ? 'transparent' : stroke,
            strokeWidth: strokeWidth || 0,
            opacity: opacity === undefined ? 1 : opacity,
            style: { 
              filter: shadow ? `drop-shadow(${shadow}) blur(${blur || 0}px)` : blur ? `blur(${blur}px)` : 'none',
              transition: 'all 0.2s' 
            }
          };

          if (shape === 'rect' || shape === 'circle') {
             return (
               <div className="w-full h-full"
                 style={{
                   backgroundColor: fill,
                   border: stroke === 'none' ? 'none' : `${strokeWidth}px solid ${stroke}`,
                   borderRadius: shape === 'circle' ? '50%' : `${radius}px`,
                   opacity: opacity,
                   filter: shadow ? `drop-shadow(${shadow}) blur(${blur || 0}px)` : blur ? `blur(${blur}px)` : 'none'
                 }}
               />
             );
          }

          let points = "";
          if (shape === 'triangle') points = "50,0 0,100 100,100";
          else if (shape === 'hexagon') points = "25,5 75,5 100,50 75,95 25,95 0,50";
          else if (shape === 'pentagon') points = "50,0 100,38 81,100 19,100 0,38";
          else if (shape === 'octagon') points = "30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30";
          else if (shape === 'star') points = "50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35";
          else if (shape === 'arrow-right') points = "0,25 60,25 60,0 100,50 60,100 60,75 0,75";
          else if (shape === 'arrow-left') points = "100,25 40,25 40,0 0,50 40,100 40,75 100,75";
          else if (shape === 'arrow-up') points = "25,100 25,40 0,40 50,0 100,40 75,40 75,100";
          else if (shape === 'arrow-down') points = "25,0 25,60 0,60 50,100 100,60 75,60 75,0";

          if (shape === 'heart') {
            return (
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <path d="M50 88.35L41.45 80.51C16.4 57.7 0 42.84 0 24.65 0 9.85 11.65 0 26.5 0c8.35 0 16.35 4.15 23.5 10.65C57.15 4.15 65.15 0 73.5 0 88.35 0 100 9.85 100 24.65c0 18.19-16.4 33.05-41.45 55.86L50 88.35z" {...commonProps} />
              </svg>
            );
          }

          return (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <polygon points={points} {...commonProps} />
            </svg>
          );
        };
        return renderShape();
      case 'divider':
        return (
          <div className="w-full h-full flex items-center">
             <div className="w-full"
               style={{
                 borderTop: `${element.thickness}px ${element.style} ${element.color}`
               }}
             />
          </div>
        );
      case 'image':
        return (
          <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center overflow-hidden group/img relative" 
            style={{ borderRadius: `${element.radius}px` }}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            {element.src ? (
              <>
                <img src={element.src} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                   <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white rounded-full text-black shadow-lg">
                      <ImageIcon size={16} />
                   </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                 <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <Plus size={20} />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
              </div>
            )}
          </div>
        );
      case 'skillbar':
        return (
          <div className="w-full select-none">
            <div className="text-[11px] font-bold mb-1.5 flex items-center justify-between" style={{ color: element.color, fontFamily: element.fontFamily }}>
              <span 
                ref={isEditingLabel ? textRef : null}
                contentEditable={isEditingLabel}
                onBlur={handleLabelBlur}
                onDoubleClick={(e) => { e.stopPropagation(); setIsEditingLabel(true); }}
                suppressContentEditableWarning
                className={isEditingLabel ? 'outline-none bg-white/10 px-1 rounded' : ''}
              >
                {element.label}
              </span>
              <span className="opacity-50">{element.value}%</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: element.bg }}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${element.value}%`, backgroundColor: element.color }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handles = ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'];

  return (
    <div
      ref={elementRef}
      className={`absolute group cursor-default transition-shadow ${isSelected ? 'z-50' : 'z-10'}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.w,
        height: element.type === 'skillbar' ? 'auto' : element.h,
        zIndex: element.zIndex,
        transform: `rotate(${element.rotation || 0}deg)`,
      }}
      onMouseDown={(e) => handleDragStart(e)}
      onTouchStart={(e) => handleDragStart(e)}
      onDoubleClick={handleDoubleClick}
    >
      {/* Visual Component */}
      <div className={`w-full h-full relative ${element.locked ? 'opacity-80' : ''}`}>
        {renderContent()}
      </div>

      {/* Selection Border & Handles */}
      {(isSelected || isDragging || isResizing) && !isEditingText && (
        <div className={`absolute -inset-1 border-2 ${isSelected ? 'border-[#D6A85F]' : 'border-[#D6A85F]/30 border-dashed'} pointer-events-none rounded-sm`}>
          {isSelected && (
            <>
              {/* Rotation Handle */}
              {!element.locked && (
                <div 
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 size-7 bg-[#3B2F2F] border border-[#D6A85F] rounded-full pointer-events-auto shadow-lg flex items-center justify-center cursor-alias hover:scale-110 transition-transform text-[#D6A85F]"
                  onMouseDown={(e) => handleDragStart(e, 'rotate')}
                  onTouchStart={(e) => handleDragStart(e, 'rotate')}
                >
                  <RotateCw size={14} />
                </div>
              )}

              {/* Resize Handles */}
              {!element.locked && handles.map((h) => (
                <div
                  key={h}
                  className={`absolute size-2.5 bg-white border-2 border-[#D6A85F] rounded-sm pointer-events-auto shadow-sm
                    ${h === 'tl' ? '-top-1.5 -left-1.5 cursor-nw-resize' : ''}
                    ${h === 'tm' ? '-top-1.5 left-1/2 -translate-x-1/2 cursor-n-resize' : ''}
                    ${h === 'tr' ? '-top-1.5 -right-1.5 cursor-ne-resize' : ''}
                    ${h === 'ml' ? 'top-1/2 -left-1.5 -translate-y-1/2 cursor-w-resize' : ''}
                    ${h === 'mr' ? 'top-1/2 -right-1.5 -translate-y-1/2 cursor-e-resize' : ''}
                    ${h === 'bl' ? '-bottom-1.5 -left-1.5 cursor-sw-resize' : ''}
                    ${h === 'bm' ? '-bottom-1.5 left-1/2 -translate-x-1/2 cursor-s-resize' : ''}
                    ${h === 'br' ? '-bottom-1.5 -right-1.5 cursor-se-resize' : ''}
                  `}
                  onMouseDown={(e) => handleDragStart(e, h)}
                  onTouchStart={(e) => handleDragStart(e, h)}
                />
              ))}

              {/* Mini Toolbar */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#3B2F2F] border border-white/10 rounded-xl p-1 flex items-center gap-1 shadow-2xl pointer-events-auto min-w-max">
                <button 
                  onClick={() => addElement({ ...element, id: `el_${Date.now()}`, x: element.x + 20, y: element.y + 20 })}
                  className="p-2 hover:bg-white/5 rounded-lg text-[#8888A0] hover:text-white transition-colors"
                  title="Duplicate"
                >
                  <Copy size={14} />
                </button>
                <button 
                  onClick={() => { updateElement(element.id, { locked: !element.locked }); saveHistory(); }}
                  className={`p-2 rounded-lg transition-colors ${element.locked ? 'text-[#D6A85F] bg-[#D6A85F]/10' : 'text-[#8888A0] hover:bg-white/5 hover:text-white'}`}
                  title={element.locked ? "Unlock" : "Lock"}
                >
                  {element.locked ? <Lock size={14} /> : <Unlock size={14} />}
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button 
                  onClick={() => deleteElement(element.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hover Border (if not selected) */}
      {!isSelected && !isDragging && !isResizing && (
        <div className="absolute -inset-1 border border-[#D6A85F]/30 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-sm" />
      )}

      {/* Locked Icon */}
      {element.locked && !isSelected && (
        <div className="absolute top-1 right-1 p-1 bg-white/10 rounded-full text-white/40">
           <Lock size={10} />
        </div>
      )}
    </div>
  );
};
