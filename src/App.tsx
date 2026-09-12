import { Toaster } from 'react-hot-toast';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Modals from './components/Modals';
import ScrollToTop from './components/ScrollToTop';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('/login') || location.pathname === '/pos' || location.pathname === '/signature';
  const hideFooter = location.pathname.includes('/login') || location.pathname.includes('/dashboard') || location.pathname.includes('/management');
  
  return (
    <div className={`bg-white min-h-screen selection:bg-[#004B36] selection:text-white dark:bg-white dark:text-[#004B36] font-sans transition-colors duration-300 ${isLoginPage ? "h-screen overflow-hidden" : ""}`}>
      <Navigation />
      <main className={!isLoginPage ? "pt-[80px]" : "pt-[80px]"}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      <ScrollToTop />
      <Modals />
    </div>
  );
}

const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const Donate = React.lazy(() => import('./pages/Donate'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const LibraryLogin = React.lazy(() => import('./pages/LibraryLogin'));
const LibraryDashboard = React.lazy(() => import('./pages/LibraryDashboard'));
const VCardLogin = React.lazy(() => import('./pages/VCardLogin'));
const DigitalSignature = React.lazy(() => import('./pages/DigitalSignature'));
const POSPlaceholder = React.lazy(() => import('./pages/POSPlaceholder'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
import ElectionPage from './pages/ElectionPage';
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ManagementApp = React.lazy(() => import('./pages/ManagementApp'));
function AnimatedRoutes() {
  const location = useLocation();
  return (
    
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        {/* <Route path="/election" element={<PageWrapper><ElectionPage /></PageWrapper>} /> */}
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
        <Route path="/donate" element={<PageWrapper><Donate /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/library/login" element={<PageWrapper><LibraryLogin /></PageWrapper>} />
        <Route path="/library/dashboard" element={<PageWrapper><LibraryDashboard /></PageWrapper>} />
        <Route path="/vcard/login" element={<PageWrapper><VCardLogin /></PageWrapper>} />
        <Route path="/signature" element={<PageWrapper><DigitalSignature /></PageWrapper>} />
        <Route path="/pos" element={<PageWrapper><POSPlaceholder /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
        <Route path="/management/*" element={<PageWrapper><ManagementApp /></PageWrapper>} />
      </Routes>
      </AnimatePresence>
    
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
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
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <React.Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-stone-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B36]"></div></div>}><AnimatedRoutes /></React.Suspense>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
