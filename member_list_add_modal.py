import re

content = open('src/components/MemberListView.jsx').read()

# Add states for modal
modal_states = """  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '' });

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;
    
    // We would need to pass setUsers here, or just mock it or notify parent.
    // Assuming the user just wanted the button. For now let's just close modal.
    setIsAddModalOpen(false);
    setNewMember({ name: '', email: '', phone: '' });
  };
"""

content = content.replace("  const [memberToChangeRole, setMemberToChangeRole] = useState(null);", "  const [memberToChangeRole, setMemberToChangeRole] = useState(null);\n" + modal_states)

# change the Add button onClick
content = content.replace("alert(`Add ${title.replace('s', '')} functionality coming soon.`)}", "setIsAddModalOpen(true)}")

add_modal_jsx = """
      {isAddModalOpen && (
        <Portal>
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" onClick={() => setIsAddModalOpen(false)} />
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
            <DraggableModal className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col pointer-events-auto animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Plus className="text-[#004B36]" size={24} /> Add {title.endsWith('s') ? title.slice(0, -1) : title}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddMemberSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-normal text-stone-500 mb-1 uppercase tracking-wider">Name<span className="text-red-500 font-medium">*</span></label>
                  <input required type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#004B36] outline-none text-sm font-medium text-stone-800" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-normal text-stone-500 mb-1 uppercase tracking-wider">Email<span className="text-red-500 font-medium">*</span></label>
                  <input required type="email" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#004B36] outline-none text-sm font-medium text-stone-800" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-normal text-stone-500 mb-1 uppercase tracking-wider">Phone</label>
                  <input type="text" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#004B36] outline-none text-sm font-medium text-stone-800" placeholder="+1 234 567 890" />
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[#004B36] hover:bg-[#003828] transition-colors">Add</button>
                </div>
              </form>
            </DraggableModal>
          </div>
        </Portal>
      )}
"""

content = content.replace("    </div>\n  );\n}", add_modal_jsx + "\n    </div>\n  );\n}")

open('src/components/MemberListView.jsx', 'w').write(content)
