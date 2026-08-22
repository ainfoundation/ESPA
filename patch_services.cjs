const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// Import Link
content = content.replace("import { Helmet } from 'react-helmet-async';", "import { Helmet } from 'react-helmet-async';\nimport { Link } from 'react-router-dom';");

// Add links and rename Digital Card
content = content.replace('title: "Point-of-Sale (POS)",', 'title: "Point-of-Sale (POS)",\n      link: "/pos",');
content = content.replace('title: "Digital Library",', 'title: "Digital Library",\n      link: "/library/login",');
content = content.replace('title: "Management Portal",', 'title: "Management Portal",\n      link: "/login",');
content = content.replace('title: "Digital Card (VCard)",', 'title: "Virtual Card (VCard)",\n      link: "/vcard/login",');
content = content.replace('title: "Digital Signature",', 'title: "Digital Signature",\n      link: "/signature",');

// Update text alignment
content = content.replace("w-full md:w-1/2 ${isReversed ? 'md:order-1 text-right' : 'text-left'}", "w-full md:w-1/2 ${isReversed ? 'md:order-1 text-left' : 'text-left'}");

// Make title clickable
content = content.replace(
  '<h2 className={`font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 ${textColor}`}>\n                    {service.title}\n                  </h2>',
  '<Link to={service.link} className="inline-block hover:opacity-80 transition-opacity">\n                    <h2 className={`font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 ${textColor}`}>\n                      {service.title}\n                    </h2>\n                  </Link>'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', content);
