const fs = require('fs');
let content = fs.readFileSync('src/pages/PrivacyPolicy.tsx', 'utf8');

if (!content.includes('react-helmet-async')) {
  content = content.replace("import React from 'react';", "import React from 'react';\nimport { Helmet } from 'react-helmet-async';");
}

content = content.replace(
  '<div className="bg-white min-h-[50vh] pt-24 pb-16 px-6">',
  `<div className="bg-white min-h-[50vh] pt-24 pb-16 px-6">
      <Helmet>
        <title>Privacy Policy | ESPA Foundation</title>
        <meta name="description" content="Privacy Policy for ESPA Foundation's digital services." />
        <meta property="og:title" content="Privacy Policy | ESPA Foundation" />
      </Helmet>`
);

fs.writeFileSync('src/pages/PrivacyPolicy.tsx', content);

let termsContent = fs.readFileSync('src/pages/TermsOfService.tsx', 'utf8');

if (!termsContent.includes('react-helmet-async')) {
  termsContent = termsContent.replace("import React from 'react';", "import React from 'react';\nimport { Helmet } from 'react-helmet-async';");
}

termsContent = termsContent.replace(
  '<div className="bg-white min-h-[50vh] pt-24 pb-16 px-6">',
  `<div className="bg-white min-h-[50vh] pt-24 pb-16 px-6">
      <Helmet>
        <title>Terms of Service | ESPA Foundation</title>
        <meta name="description" content="Terms of Service for ESPA Foundation's digital platforms." />
        <meta property="og:title" content="Terms of Service | ESPA Foundation" />
      </Helmet>`
);

fs.writeFileSync('src/pages/TermsOfService.tsx', termsContent);
