const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// Replace setIsLogoutModalOpen with logout
content = content.replace(
  "setIsLogoutModalOpen(true);",
  "logout();"
);

fs.writeFileSync('src/components/Navigation.tsx', content);
