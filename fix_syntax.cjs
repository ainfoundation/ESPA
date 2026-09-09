const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsView.jsx', 'utf8');

const errorBlock = `          </div>
       </div>
      </div>
            
      {/* Modals for 2FA */}`;

const fixedBlock = `          </div>
      </div>
            
      {/* Modals for 2FA */}`;

if(content.includes(errorBlock)) {
    content = content.replace(errorBlock, fixedBlock);
    fs.writeFileSync('src/components/SettingsView.jsx', content);
    console.log("Fixed");
} else {
    // If not exact, let's just find the string that exists
    console.log("Let's just replace all right before Modals");
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Modals for 2FA \*\/\}/, '</div>\n</div>\n\n{/* Modals for 2FA */}');
    fs.writeFileSync('src/components/SettingsView.jsx', content);
}
