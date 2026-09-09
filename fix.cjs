const fs = require('fs');
let text = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

text = text.replace(
  /<div className="p-4 border-t border-stone-100 shrink-0 bg-stone-50">\s*<div className={`flex items-center \$\{isSidebarOpen \? 'justify-between' : 'justify-center'\} mb-4`}>\s*<\/div>\s*/g,
  ''
);

fs.writeFileSync('src/components/ManagementPortal.jsx', text);
