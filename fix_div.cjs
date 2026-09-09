const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsView.jsx', 'utf8');

const regex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Modals for 2FA \*\/\}/;

if (content.includes('            </div>\n          </div>\n       </div>\n      </div>\n            \n      {/* Modals for 2FA */}')) {
    console.log("No, already has 4 divs?");
}
