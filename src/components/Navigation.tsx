import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    if (isHome) {
      return (
        <a href={href} className="text-sm font-medium hover:text-[#004B36]/60 transition-colors">
          {children}
        </a>
      );
    }
    return (
      <Link to={`/${href}`} className="text-sm font-medium hover:text-[#004B36]/60 transition-colors">
        {children}
      </Link>
    );
  };

  

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[999] px-[34px] md:px-[58px] py-4 flex items-center justify-between bg-white shadow-sm border-b border-[#004B36]/5"
    >
      <Link to="/" className="flex items-center gap-2 z-50 relative"><svg className="h-7 md:h-9 text-[#004B36] w-auto" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_350_59)">
<path d="M188.9 99.9202V203.487H21.8804V299.761H188.9V412.08H0V512H313.618V0H0V99.9202H188.9Z" fill="currentColor"/>
<path d="M512.211 0V99.9202H303.618V207.863H459.698V304.866H303.618V512H251.001L251 0H512.211Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_350_59">
<rect width="512" height="512" fill="white"/>
</clipPath>
</defs>
</svg>
<span className="font-outfit font-bold text-xl text-[#004B36]">ESPA Foundation</span>
</Link>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <div className="relative group">
            <button className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/60 transition-colors flex items-center gap-1 py-2">
              Services
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-[#004B36]/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 flex flex-col overflow-hidden z-[100]">
              <Link to="/pos" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Point-of-Sale</Link>
              <Link to="/library/login" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Digital Library</Link>
              <Link to="/login" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Management Portal</Link>
              <Link to="/vcard/login" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Digital Card</Link>
              <Link to="/signature" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Digital Signature</Link>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/60 transition-colors flex items-center gap-1 py-2">
              More
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-[#004B36]/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 flex flex-col overflow-hidden z-[100]">
              <Link to="/about" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">About Us</Link>
              <Link to="/contact" className="px-4 py-2.5 text-sm hover:bg-[#004B36]/5 transition-colors">Contact Us</Link>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-3">
          <Link to={isAuthenticated ? (user?.role?.includes("library") ? "/library/dashboard" : "/dashboard") : "/login"} className="hidden md:flex text-sm font-medium tracking-wide text-white bg-[#004B36] px-5 py-2.5 rounded-full hover:bg-[#003828] transition-colors items-center gap-2">
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
          <button className="md:hidden ml-2 p-2 rounded-lg transition-colors text-[#004B36] hover:bg-[#004B36]/5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} color="#004B36" /> : <Menu size={24} color="#004B36" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-b border-[#004B36]/10 shadow-xl flex flex-col py-4 px-6 gap-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <Link to={isAuthenticated ? (user?.role?.includes("library") ? "/library/dashboard" : "/dashboard") : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white bg-[#004B36] px-4 py-3 rounded-xl hover:bg-[#003828] transition-colors text-center mb-2">
              {isAuthenticated ? "Dashboard" : "Login"}
            </Link>
            <span className="text-xs font-bold text-[#004B36]/50 uppercase tracking-wider mb-2">Services</span>
            <Link to="/pos" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">Point-of-Sale</Link>
            <Link to="/library/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">Digital Library</Link>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">Management Portal</Link>
            <Link to="/vcard/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">Digital Card</Link>
            <Link to="/signature" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">Digital Signature</Link>
          </div>
          
          <div className="flex flex-col gap-4 mt-2">
            <span className="text-xs font-bold text-[#004B36]/50 uppercase tracking-wider mb-2">More</span>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#004B36] hover:text-[#004B36]/80 transition-colors">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
