import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../contexts/AuthContext';
import { Edit2, Check, X } from 'lucide-react';
import { logEditHistory } from '../lib/history';

interface EditableTextProps {
 id: string; // Unique identifier for localStorage
 defaultText: string;
 as?: any;
 className?: string;
}

export default function EditableText({ id, defaultText, as: Component = 'span', className = '' }: EditableTextProps) {
 const { user } = useAuth();
 const isAdmin = user?.role === 'admin';
 const [text, setText] = useState(defaultText);
 const [isEditing, setIsEditing] = useState(false);
 const [tempText, setTempText] = useState('');

 // Load from local storage on mount
 useEffect(() => {
 const savedText = localStorage.getItem(`cms_text_${id}`);
 if (savedText) {
 setText(savedText);
 } else {
 setText(defaultText);
 }
 }, [id, defaultText]);

 const handleSave = () => {
 if (tempText.trim()) {
 setText(tempText.trim());
 localStorage.setItem(`cms_text_${id}`, tempText.trim());
 logEditHistory(id, 'text', text, tempText.trim(), user?.name || 'Admin');
 }
 setIsEditing(false);
 };

 const handleCancel = () => {
 setTempText('');
 setIsEditing(false);
 };

 const handleReset = () => {
 setText(defaultText);
 localStorage.removeItem(`cms_text_${id}`);
 logEditHistory(id, 'text', text, defaultText, user?.name || 'Admin');
 setIsEditing(false);
 };

 return (
 <span className={`relative group inline-block ${className}`}>
 <Component className={className}>{text}</Component>
 
 {isAdmin && (
 <>
 {/* Edit overlay trigger */}
 <span className="absolute -inset-2 bg-[#004B36]/50/10 border border-[#004B36]/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end pointer-events-none">
 <button 
 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTempText(text); setIsEditing(true); }}
 className="bg-[#004B36] text-white p-1.5 rounded-bl-lg rounded-tr-lg shadow-sm pointer-events-auto hover:bg-[#003828]"
 title="Edit Text"
 >
 <Edit2 size={14} />
 </button>
          </span>

 {/* Edit form modal */}
 
 {isEditing && createPortal(
            <div
 className="fixed inset-0 bg-[#004B36]/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm"
 onClick={e => e.stopPropagation()}
 >
 <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-lg text-left text-base font-sans font-normal tracking-normal normal-case leading-normal" onClick={e => e.stopPropagation()}>
 <h4 className="text-xl font-bold mb-4 text-[#004B36] ">Edit Content</h4>
 {Component === 'p' ? (
 <textarea 
 value={tempText}
 onChange={(e) => setTempText(e.target.value)}
 rows={5}
 className="w-full px-4 py-3 bg-[#004B36]/5 border border-neutral-300 rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#004B36] text-[#004B36] resize-none"
 />
 ) : (
 <input 
 type="text" 
 value={tempText}
 onChange={(e) => setTempText(e.target.value)}
 className="w-full px-4 py-3 bg-[#004B36]/5 border border-neutral-300 rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#004B36] text-[#004B36] "
 />
 )}
 <div className="flex justify-between items-center mt-2">
 <button 
 onClick={handleReset}
 className="text-sm text-red-500 hover:text-red-700 font-medium px-2 py-1"
 >
 Reset to Default
 </button>
 <div className="flex gap-2">
 <button 
 onClick={handleCancel}
 className="px-4 py-2 text-[#004B36]/70 hover:bg-[#004B36]/5 :bg-[#003828] rounded-lg transition-colors font-medium flex items-center gap-2"
 >
 <X size={16} /> Cancel
 </button>
 <button 
 onClick={handleSave}
 className="px-4 py-2 text-white bg-[#004B36] hover:bg-[#003828] rounded-lg transition-colors font-medium flex items-center gap-2 shadow-sm"
 >
 <Check size={16} /> Save
 </button>
          </div>
 </div>
 </div>
 </div>,
            document.body
          )}
 
      </>
      )}
    </span>
 );
}
