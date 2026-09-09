const fs = require('fs');

let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

// Replace the desktop button logic to just be a link
content = content.replace(
  /\{isAuthenticated \? \([\s\S]*?\) : \(/,
  `{isAuthenticated ? (
            <Link to={user?.role?.includes("library") ? "/library/dashboard" : "/management"} className="hidden md:flex text-sm font-medium tracking-wide text-[#004B36] bg-white border border-[#004B36] px-5 py-2.5 rounded-full hover:bg-[#004B36]/5 transition-colors items-center gap-2">
              {user?.name ? user.name.split(' ')[0] : "Dashboard"}
            </Link>
          ) : (`
);

fs.writeFileSync('src/components/Navigation.tsx', content);
