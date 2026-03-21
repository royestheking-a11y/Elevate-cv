import { useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';

export const useKeyboardShortcuts = () => {
  const { 
    undo, redo, deleteElement, selectedId, 
    elements, updateElement, saveHistory, addElement 
  } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or contentEditable
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.isContentEditable;
      
      if (isTyping && e.key !== 'Escape') return;

      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }

      // Delete
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault();
        deleteElement(selectedId);
      }

      // Deselect
      if (e.key === 'Escape') {
        // blurred current element if editing
        if (isTyping) {
            (target as HTMLElement).blur();
        }
      }

      // Duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedId) {
        e.preventDefault();
        const el = elements.find(el => el.id === selectedId);
        if (el) {
          addElement({
            ...el,
            id: `el_${Date.now()}`,
            x: el.x + 20,
            y: el.y + 20,
            zIndex: elements.length + 1
          });
        }
      }

      // Nudge
      const nudge = e.shiftKey ? 10 : 1;
      if (selectedId && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        const el = elements.find(el => el.id === selectedId);
        if (el) {
          const updates: any = {};
          if (e.key === 'ArrowLeft') updates.x = el.x - nudge;
          if (e.key === 'ArrowRight') updates.x = el.x + nudge;
          if (e.key === 'ArrowUp') updates.y = el.y - nudge;
          if (e.key === 'ArrowDown') updates.y = el.y + nudge;
          updateElement(selectedId, updates);
          saveHistory();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, deleteElement, selectedId, elements, updateElement, saveHistory, addElement]);
};
