const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes("import { AnimatePresence, motion } from 'framer-motion';")) {
  content = content.replace("import React, { Suspense, lazy } from 'react';", "import React, { Suspense, lazy } from 'react';\nimport { AnimatePresence, motion } from 'framer-motion';");
}

content = content.replace(
  '<Routes location={location} key={location.pathname}>',
  '<AnimatePresence mode="wait">\n      <Routes location={location} key={location.pathname}>'
);
content = content.replace(
  '</Routes>',
  '</Routes>\n      </AnimatePresence>'
);

content = content.replace(
  'function PageWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <div\n      className="w-full h-full"\n    >\n      {children}\n    </div>\n  );\n}',
  `function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}`
);

fs.writeFileSync('src/App.tsx', content);
