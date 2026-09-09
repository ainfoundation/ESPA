import React, { useRef, useState } from 'react';

const DraggableModal = ({ children, className, onClick }) => {
  const modalRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });

  const handlePointerDown = (e) => {
    if (!e.target.closest('.drag-handle')) return;
    if (e.target.closest('button')) return;
    setIsDragging(true);
    dragRef.current = { startX: e.clientX - posRef.current.x, startY: e.clientY - posRef.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragRef.current.startX;
    const newY = e.clientY - dragRef.current.startY;
    posRef.current = { x: newX, y: newY };
    if (modalRef.current) modalRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={modalRef}
      className={`${className} ${isDragging ? 'relative z-50 cursor-grabbing !transition-none' : ''}`}
      style={{ transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`, transitionProperty: isDragging ? 'none' : undefined, touchAction: 'none' }}
      onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DraggableModal;
