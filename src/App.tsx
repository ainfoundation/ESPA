import { Toaster } from 'react-hot-toast';
import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Modals from './components/Modals';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('/login') || location.pathname === '/pos' || location.pathname === '/signature';
  const hideFooter = location.pathname.includes('/login') || location.pathname.startsWith('/dashboard');
  
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

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LibraryLogin = lazy(() => import('./pages/LibraryLogin'));
const LibraryDashboard = lazy(() => import('./pages/LibraryDashboard'));
const VCardLogin = lazy(() => import('./pages/VCardLogin'));
const DigitalSignature = lazy(() => import('./pages/DigitalSignature'));
const POSPlaceholder = lazy(() => import('./pages/POSPlaceholder'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const ElectionPage = lazy(() => import('./pages/ElectionPage'));

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ManagementApp = lazy(() => import('./pages/ManagementApp'));
const ManagementLogin = lazy(() => import('./pages/ManagementLogin'));
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
              <Suspense fallback={<LoadingSpinner />}>
                <AnimatedRoutes />
              </Suspense>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
