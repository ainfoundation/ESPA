const fs = require('fs');
let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

content = content.replace(
  "import {\n  Banknote, Heart, HandCoins, ArrowDownRight, ArrowUpRight, createPortal } from 'react-dom';",
  "import { createPortal } from 'react-dom';"
);
content = content.replace(
  "import {  Banknote, Heart, HandCoins, ArrowDownRight, ArrowUpRight, createPortal } from 'react-dom';",
  "import { createPortal } from 'react-dom';"
);

content = content.replace(
  "import {    ArrowLeft,",
  "import { Banknote, Heart, HandCoins, ArrowDownRight, ArrowUpRight, ArrowLeft,"
);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
