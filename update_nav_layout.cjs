const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// Replace the <nav> structure for the desktop view
// We want 3 columns on desktop, 2 on mobile

const oldNav = `<nav 
      className="fixed top-0 left-0 right-0 z-[999] px-[34px] md:px-[58px] py-4 flex items-center justify-between bg-white shadow-sm border-b border-[#004B36]/5"
    >
      <Link to="/" className="flex items-center gap-2 z-50 relative"><svg className="h-7 md:h-9 text-[#004B36] w-auto" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_350_59)"><path d="M188.9 99.9202V203.487H21.8804V299.761H188.9V412.08H0V512H313.618V0H0V99.9202H188.9Z" fill="currentColor"/><path d="M512.211 0V99.9202H303.618V207.863H459.698V304.866H303.618V512H251.001L251 0H512.211Z" fill="currentColor"/></g><defs><clipPath id="clip0_350_59"><rect width="512" height="512" fill="white"/></clipPath></defs></svg></Link>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">`;

const newNav = `<nav 
      className="fixed top-0 left-0 right-0 z-[999] px-[34px] md:px-[58px] py-4 grid grid-cols-2 md:grid-cols-3 items-center bg-white shadow-sm border-b border-[#004B36]/5"
    >
      <div className="flex items-center justify-start">
        <Link to="/" className="flex items-center gap-2 z-50 relative"><svg className="h-7 md:h-9 text-[#004B36] w-auto" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_350_59)"><path d="M188.9 99.9202V203.487H21.8804V299.761H188.9V412.08H0V512H313.618V0H0V99.9202H188.9Z" fill="currentColor"/><path d="M512.211 0V99.9202H303.618V207.863H459.698V304.866H303.618V512H251.001L251 0H512.211Z" fill="currentColor"/></g><defs><clipPath id="clip0_350_59"><rect width="512" height="512" fill="white"/></clipPath></defs></svg></Link>
      </div>
      
      <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium tracking-wide">`;

content = content.replace(oldNav, newNav);

const oldNavMiddleEnd = `          </motion.div>
        </div>
        <div className="flex items-center gap-3">`;

const newNavMiddleEnd = `          </motion.div>
      </div>
      
      <div className="flex items-center justify-end gap-3">`;

content = content.replace(oldNavMiddleEnd, newNavMiddleEnd);

fs.writeFileSync('src/components/Navigation.tsx', content);
