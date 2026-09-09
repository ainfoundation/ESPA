const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsView.jsx', 'utf8');

const regex = /<\/div>\n<\/div>\n\n\{\/\* Modals for 2FA \*\/\}/;
content = content.replace(regex, '</div>\n</div>\n</div>\n\n{/* Modals for 2FA */}');

fs.writeFileSync('src/components/SettingsView.jsx', content);
