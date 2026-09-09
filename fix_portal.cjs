const fs = require('fs');

let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

// 1. Remove agreements, itinerary, forms
content = content.replace(
  /const navItems = \[\s*\{ id: 'users', icon: Users, label: 'Management', roles: \['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'\] \},\s*\{ id: 'agreements', icon: FileText, label: 'In-House', roles: \['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'\] \},\s*\{ id: 'itinerary', icon: CalendarDays, label: 'Itinerary', roles: \['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'\] \},\s*\{ id: 'forms', icon: ClipboardList, label: 'Forms', roles: \['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'\] \},\s*\];/,
  `const navItems = [
    { id: 'users', icon: Users, label: 'Management', roles: ['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'] },
  ];`
);

// 2. Remove "System" header
content = content.replace(
  /<div className="px-6 mb-2 mt-6">\s*<p className="text-xs font-bold text-stone-400 uppercase tracking-wider">System<\/p>\s*<\/div>/,
  ''
);

// 3. Remove Logo from ManagementPortal top-left.
// There is the mobile header:
content = content.replace(
  /<AinManagementLogo className="w-28 h-auto" \/>/g,
  '<div className="w-28 font-bold text-stone-800 text-lg">Management</div>'
);

// 4. And the desktop header logo logic:
content = content.replace(
  /\{isSidebarOpen \? <AinManagementLogo className="w-28 h-auto" \/> : <div className="w-8 h-8 bg-\[#004B36\] rounded-lg flex items-center justify-center font-bold text-white text-xs">AIN<\/div>\}/,
  `{isSidebarOpen ? <div className="w-28 font-bold text-stone-800 text-lg">Management</div> : <div className="w-8 h-8 bg-[#004B36] rounded-lg flex items-center justify-center font-bold text-white text-xs">M</div>}`
);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
