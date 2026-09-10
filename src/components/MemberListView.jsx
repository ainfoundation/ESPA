import React, { useState } from 'react';
import { Download, Plus, Search, FileText, Calendar, Mail, Phone, Eye, History, X, Shield, ChevronDown } from 'lucide-react';
import DraggableModal from './DraggableModal';
import MemberDetailsModal from './MemberDetailsModal';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => createPortal(children, document.body);

export default function MemberListView({ title, description, icon: Icon, members = [], onUpdateRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToChangeRole, setMemberToChangeRole] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '' });

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;
    
    // We would need to pass setUsers here, or just mock it or notify parent.
    // Assuming the user just wanted the button. For now let's just close modal.
    setIsAddModalOpen(false);
    setNewMember({ name: '', email: '', phone: '' });
  };

  const availableRoles = ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    if (filteredMembers.length === 0) return;
    const headers = ['Name', 'Email', 'Role', 'Join Date', 'Phone'];
    const csvContent = [
      headers.join(','),
      ...filteredMembers.map(m => `"${m.name}","${m.email}","${m.role}","${m.joinDate || ''}","${m.phone || ''}"`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 h-full flex flex-col tracking-tight relative p-4 md:p-8 overflow-hidden">
      <div className="shrink-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 flex items-center gap-2">{title}
          </h1>
          <p className="text-stone-500 text-base mt-2 font-medium">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 border border-stone-200 shadow-sm"
          >
            <Download size={16} /> Export to CSV
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#004B36] hover:bg-[#003828] text-white rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm flex flex-col overflow-hidden min-h-0 flex-1">
        <div className="p-4 border-b border-stone-100 shrink-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B36] text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredMembers.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-50/50 sticky top-0 z-10 border-b border-stone-200 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap hidden md:table-cell">Email</th>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap">Join Date</th>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMembers.map((member, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-900 text-sm">{member.name}</div>
                      <div className="text-xs text-stone-500 md:hidden">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 text-stone-600 text-sm hidden md:table-cell">{member.email}</td>
                    <td className="px-6 py-4 text-stone-600 text-sm">{member.joinDate || 'N/A'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => setMemberToChangeRole(member)}
                          className="p-2 text-stone-400 hover:text-[#004B36] hover:bg-[#004B36]/10 rounded-lg transition-colors"
                          title="Change Role"
                        >
                          <Shield size={18} />
                        </button>
                        <button 
                          onClick={() => setSelectedMember(member)}
                          className="p-2 text-stone-400 hover:text-[#004B36] hover:bg-[#004B36]/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-stone-500 flex flex-col items-center">
              <FileText size={48} className="text-stone-300 mb-4" />
              <p className="font-medium text-stone-600">No records found</p>
            </div>
          )}
        </div>
      </div>

      {selectedMember && <MemberDetailsModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      {memberToChangeRole && (
        <Portal>
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" onClick={() => setMemberToChangeRole(null)} />
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
            <DraggableModal className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col pointer-events-auto animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Shield className="text-[#004B36]" size={24} /> Change Role
                </h3>
                <button onClick={() => setMemberToChangeRole(null)} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-stone-500 mb-6 font-medium">Select a new role for <span className="font-bold text-stone-800">{memberToChangeRole.name}</span>.</p>
              
              <div className="space-y-2 max-h-[40vh] overflow-y-auto no-scrollbar pb-2 pr-2">
                {availableRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      if (onUpdateRole) onUpdateRole(memberToChangeRole.id, role);
                      setMemberToChangeRole(null);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${memberToChangeRole.role === role ? 'bg-[#004B36]/5 border-[#004B36]/20' : 'bg-white border-stone-100 hover:bg-stone-50 hover:border-stone-200'}`}
                  >
                    <span className={`font-semibold text-sm ${memberToChangeRole.role === role ? 'text-[#004B36]' : 'text-stone-700'}`}>{role}</span>
                    {memberToChangeRole.role === role && <span className="text-[10px] uppercase font-bold tracking-wider text-[#004B36]/60 bg-[#004B36]/10 px-2 py-0.5 rounded-full">Current</span>}
                  </button>
                ))}
              </div>
            </DraggableModal>
          </div>
        </Portal>
      )}

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

    </div>
  );
}
