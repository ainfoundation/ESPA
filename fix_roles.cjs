const fs = require('fs');
let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

const rolesOld = `      case 'roles': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Roles</h2><p>Role management and permissions.</p></div>;`;
const rolesNew = `      case 'roles': return (
        <div className="p-4 md:p-8 space-y-6 h-full flex flex-col tracking-tight bg-stone-50/50">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-stone-900">Roles</h1>
            <p className="text-stone-500 text-sm mt-2 font-medium">System roles and permissions overview.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200/60 p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'].map(role => (
                <div key={role} className="flex items-center gap-3 p-4 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-stone-100/80 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#004B36]/10 text-[#004B36] flex items-center justify-center font-bold shadow-sm">
                    {role.charAt(0)}
                  </div>
                  <span className="font-semibold text-stone-800 text-sm">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );`;

content = content.replace(rolesOld, rolesNew);

// Remove users and executive from navItems
content = content.replace(/    \{ id: 'users', icon: Users, label: 'Management', roles: \[.*?\] \},\n/, '');
content = content.replace(/    \{ id: 'executive', icon: Users, label: 'Executive Committee', roles: \['Admin'\] \},\n/, '');

// Fix spacing between navItems and adminItems.
// Change `space-y-8` in the sidebar to `space-y-1`
// We should find `<div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar pt-20 lg:pt-6">`
content = content.replace(
  '<div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar pt-20 lg:pt-6">',
  '<div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar pt-20 lg:pt-6">'
);

// Update default activeTab if it's 'users' to 'general'
content = content.replace(
  'const [activeTab, setActiveTab] = useLocalStorage("ain_activeTab", "users");',
  'const [activeTab, setActiveTab] = useLocalStorage("ain_activeTab", "general");'
);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
