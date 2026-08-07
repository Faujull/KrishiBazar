import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AIAssistantModal } from './AIAssistantModal';

interface Position {
  side: 'left' | 'right';
  y: number; // in pixels from top
}

export const FloatingAIAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Position state with default right side, 80% down
  const [pos, setPos] = useState<Position>(() => {
    try {
      const saved = localStorage.getItem('krishibazar_fab_pos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return { side: 'right', y: 560 };
  });

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(pos.y);
  const [dragSide, setDragSide] = useState<'left' | 'right'>(pos.side);
  const [currentX, setCurrentX] = useState<number | null>(null);

  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMovedRef = useRef<boolean>(false);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Sync saved position
  useEffect(() => {
    localStorage.setItem('krishibazar_fab_pos', JSON.stringify({ side: dragSide, y: dragY }));
  }, [dragSide, dragY]);

  // Pointer Down handler (mouse / touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isMovedRef.current = false;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    if (fabRef.current) {
      fabRef.current.setPointerCapture(e.pointerId);
    }
  };

  // Pointer Move handler
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!fabRef.current || !fabRef.current.hasPointerCapture(e.pointerId)) return;

    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 6) {
      isMovedRef.current = true;
      setIsDragging(true);

      // Bound Y between top (70px) and bottom (height - 120px)
      const parentHeight = fabRef.current.parentElement?.clientHeight || window.innerHeight;
      const newY = Math.max(70, Math.min(parentHeight - 120, e.clientY - 28));
      setDragY(newY);

      // Calculate horizontal position
      const parentWidth = fabRef.current.parentElement?.clientWidth || window.innerWidth;
      setCurrentX(e.clientX);

      if (e.clientX < parentWidth / 2) {
        setDragSide('left');
      } else {
        setDragSide('right');
      }
    }
  };

  // Pointer Up handler
  const handlePointerUp = (e: React.PointerEvent) => {
    if (fabRef.current && fabRef.current.hasPointerCapture(e.pointerId)) {
      fabRef.current.releasePointerCapture(e.pointerId);
    }

    if (isDragging) {
      setIsDragging(false);
      setCurrentX(null);
    } else if (!isMovedRef.current) {
      // It was a click!
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Material FAB Button */}
      <button
        ref={fabRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          top: `${dragY}px`,
          left: isDragging && currentX !== null ? `${Math.max(16, currentX - 28)}px` : dragSide === 'left' ? '16px' : 'auto',
          right: isDragging && currentX !== null ? 'auto' : dragSide === 'right' ? '16px' : 'auto',
        }}
        className={`fixed z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white shadow-2xl flex items-center justify-center ring-4 ring-green-100/90 cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
          isDragging ? 'scale-110 shadow-3xl' : 'hover:scale-105 animate-bounce-subtle'
        }`}
        title={t('aiAssistant')}
      >
        <div className="relative pointer-events-none flex items-center justify-center">
          <Bot className="w-7 h-7 text-white" />
          <Sparkles className="w-3.5 h-3.5 text-[#F9A825] absolute -top-1.5 -right-1.5 animate-pulse" />
        </div>

        {/* Small badge text */}
        <span className="absolute -bottom-1 bg-[#F9A825] text-gray-900 font-black text-[9px] px-1.5 py-0.2 rounded-full border border-white shadow-xs pointer-events-none">
          AI
        </span>
      </button>

      {/* AI Assistant Drawer Modal */}
      <AIAssistantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
