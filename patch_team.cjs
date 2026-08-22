const fs = require('fs');
let content = fs.readFileSync('src/components/Team.tsx', 'utf8');

// Update team members data
content = content.replace(
  '{ name: "Shabbir Ahmed", role: "Founder | Chief-in-Patron", bio: "Guides the strategic vision and provides foundational support for ESPA\'s overarching mission.", linkedin: "https://www.linkedin.com/in/shaaaaabbir/" }',
  '{ name: "Shabbir Ahmed", role: "Founder | Chief-in-Patron", bio: "Guides the strategic vision and provides foundational support for ESPA\'s overarching mission.", linkedin: "https://www.linkedin.com/in/shaaaaabbir/", image: "https://i.postimg.cc/jqntzBxg/shabbir.png" }'
);

content = content.replace(
  '{ name: "Ali Shan", role: "Member", bio: "Dedicated team member supporting various educational and organizational activities.", linkedin: "https://www.linkedin.com/in/ali-shan-b037a6269/" }',
  '{ name: "Ali Shan", role: "Member", bio: "Dedicated team member supporting various educational and organizational activities.", linkedin: "https://www.linkedin.com/in/ali-shan-b037a6269/", image: "https://i.postimg.cc/pV5RD3WZ/ali.png" }'
);

// Update markup
content = content.replace(
  '<div className={`flex items-center justify-center rounded-full shrink-0 bg-neutral-200 border-4 border-[#004B36] shadow-sm ${i === 0 ? \'w-40 h-40 md:w-56 md:h-56\' : \'w-40 h-40 mb-4 md:mb-6\'}`}>\n                <User className="text-[#004B36]/30 w-1/2 h-1/2" />\n              </div>',
  `<div className={\`flex overflow-hidden items-center justify-center rounded-full shrink-0 bg-neutral-200 border-4 border-[#004B36] shadow-sm \${i === 0 ? 'w-40 h-40 md:w-56 md:h-56' : 'w-40 h-40 mb-4 md:mb-6'}\`}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-[#004B36]/30 w-1/2 h-1/2" />
                )}
              </div>`
);

fs.writeFileSync('src/components/Team.tsx', content);
