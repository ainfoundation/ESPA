const fs = require('fs');

let portal = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

const handleUpdateRole = `
  const handleUpdateRole = (userId, newRole) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast(\`Role updated to \${newRole} for \${userToUpdate.name}\`, 'success');
    addLog(\`Changed role of \${userToUpdate.name} to \${newRole}\`);
  };
`;

if (!portal.includes('handleUpdateRole')) {
    portal = portal.replace(
        "const renderContent = () => {",
        handleUpdateRole + "\n  const renderContent = () => {"
    );
}

portal = portal.replace(
    /case 'general': return <MemberListView (.*?) \/>;/g,
    "case 'general': return <MemberListView $1 onUpdateRole={handleUpdateRole} />;"
);
portal = portal.replace(
    /case 'volunteers': return <MemberListView (.*?) \/>;/g,
    "case 'volunteers': return <MemberListView $1 onUpdateRole={handleUpdateRole} />;"
);
portal = portal.replace(
    /case 'ambassadors': return <MemberListView (.*?) \/>;/g,
    "case 'ambassadors': return <MemberListView $1 onUpdateRole={handleUpdateRole} />;"
);
portal = portal.replace(
    /case 'partners': return <MemberListView (.*?) \/>;/g,
    "case 'partners': return <MemberListView $1 onUpdateRole={handleUpdateRole} />;"
);

fs.writeFileSync('src/components/ManagementPortal.jsx', portal);

let list = fs.readFileSync('src/components/MemberListView.jsx', 'utf8');

// add Edit2/Shield icon
list = list.replace(
    "import { Download, Search, FileText, Calendar, Mail, Phone, Eye, X } from 'lucide-react';",
    "import { Download, Search, FileText, Calendar, Mail, Phone, Eye, X, Shield, ChevronDown } from 'lucide-react';"
);

// Add onUpdateRole prop and roleModal state
list = list.replace(
    "export default function MemberListView({ title, description, icon: Icon, members = [] }) {",
    "export default function MemberListView({ title, description, icon: Icon, members = [], onUpdateRole }) {"
);

list = list.replace(
    "const [selectedMember, setSelectedMember] = useState(null);",
    "const [selectedMember, setSelectedMember] = useState(null);\n  const [memberToChangeRole, setMemberToChangeRole] = useState(null);\n  const availableRoles = ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'];"
);

// Add action button
const actionOld = `                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedMember(member)}
                        className="p-2 text-stone-400 hover:text-[#004B36] hover:bg-[#004B36]/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>`;
const actionNew = `                    <td className="px-6 py-4 text-right">
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
                    </td>`;
list = list.replace(actionOld, actionNew);

// Add the change role modal
const roleModalCode = `      {memberToChangeRole && (
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
                    className={\`w-full flex items-center justify-between p-3 rounded-xl border transition-colors \${memberToChangeRole.role === role ? 'bg-[#004B36]/5 border-[#004B36]/20' : 'bg-white border-stone-100 hover:bg-stone-50 hover:border-stone-200'}\`}
                  >
                    <span className={\`font-semibold text-sm \${memberToChangeRole.role === role ? 'text-[#004B36]' : 'text-stone-700'}\`}>{role}</span>
                    {memberToChangeRole.role === role && <span className="text-[10px] uppercase font-bold tracking-wider text-[#004B36]/60 bg-[#004B36]/10 px-2 py-0.5 rounded-full">Current</span>}
                  </button>
                ))}
              </div>
            </DraggableModal>
          </div>
        </Portal>
      )}
    </div>
  );
}
`;

list = list.replace(/    <\/div>\n  \);\n\}\n?$/, roleModalCode);

fs.writeFileSync('src/components/MemberListView.jsx', list);
console.log('Done updating files.');
