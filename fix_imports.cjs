const fs = require('fs');
let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

content = content.replace(
  "import { Banknote, Heart, HandCoins, ArrowDownRight, ArrowUpRight,  createPortal } from 'react-dom';",
  "import { createPortal } from 'react-dom';"
);

// find lucide-react import and add them
content = content.replace(
  "import {",
  "import {\n  Banknote, Heart, HandCoins, ArrowDownRight, ArrowUpRight,"
);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
