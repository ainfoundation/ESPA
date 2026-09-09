const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace lazy with direct imports
content = content.replace(/import React, \{ Suspense, lazy \} from 'react';/, "import React from 'react';");
content = content.replace(/import LoadingSpinner from '.\/components\/LoadingSpinner';\n/, "");
content = content.replace(/\/\/ Lazy loaded pages[\s\S]*?const ManagementApp = lazy\(\(\) => import\('\.\/pages\/ManagementApp'\)\);/, 
`import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LibraryLogin from './pages/LibraryLogin';
import LibraryDashboard from './pages/LibraryDashboard';
import VCardLogin from './pages/VCardLogin';
import DigitalSignature from './pages/DigitalSignature';
import POSPlaceholder from './pages/POSPlaceholder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ElectionPage from './pages/ElectionPage';
import ServicesPage from './pages/ServicesPage';
import ManagementApp from './pages/ManagementApp';`);

content = content.replace(/<Suspense fallback=\{<LoadingSpinner \/>\}>\s*<AnimatedRoutes \/>\s*<\/Suspense>/, "<AnimatedRoutes />");

fs.writeFileSync('src/App.tsx', content);
