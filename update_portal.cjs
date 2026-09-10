const fs = require('fs');

let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

// 1. Add Funds state and views
if (!content.includes('const [funds, setFunds] = useLocalStorage')) {
  content = content.replace(
    'const [activeTab, setActiveTab] = useLocalStorage("ain_activeTab", "dashboard");',
    `const [activeTab, setActiveTab] = useLocalStorage("ain_activeTab", "dashboard");
  const [funds, setFunds] = useLocalStorage("ain_funds", { pkr: 0, usd: 0, transactions: [] });`
  );
}

// Add Wallet, Banknote, HandCoins if missing
content = content.replace(
  "import {",
  "import { Wallet, Banknote, Heart, HandCoins, ArrowDownRight, ArrowUpRight,"
);
content = content.replace(
  "import DraggableModal from './DraggableModal';",
  "import DraggableModal from './DraggableModal';\nimport FundsView from './FundsView';"
);

const mgmtRolesCode = `
  const mgmtRoles = ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member'];
  
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'] },
    { id: 'general', icon: Users, label: 'General Committee', roles: mgmtRoles },
    { id: 'volunteers', icon: HeartHandshake, label: 'Volunteers', roles: mgmtRoles },
    { id: 'ambassadors', icon: Globe, label: 'Ambassadors', roles: mgmtRoles },
    { id: 'partners', icon: Briefcase, label: 'Partners', roles: mgmtRoles },
    { id: 'donors', icon: HandCoins, label: 'Donors', roles: mgmtRoles },
    { id: 'funds', icon: Wallet, label: 'Funds', roles: mgmtRoles },
    { id: 'roles', icon: Shield, label: 'Roles', roles: mgmtRoles },
  ];

  const adminItems = [
    { id: 'settings', icon: Settings, label: 'Settings', roles: ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'] }
  ];
`;

content = content.replace(/const navItems = \[[\s\S]*?const adminItems = \[[\s\S]*?\];/m, mgmtRolesCode);

// Update renderContent cases
const renderContentOld = /      case 'dashboard': return <SummaryDashboard (.*?) \/>;([\s\S]*?)case 'settings': return <SettingsView (.*?) \/>;/m;

const renderContentNew = `      case 'dashboard': return <SummaryDashboard funds={funds} currentUser={currentUser} />;
      case 'general': return <MemberListView title="General Committee" description="Registered members of the NGO other than the Office bearers." icon={Users} members={users.filter(u => u.role === 'General Member')} onUpdateRole={handleUpdateRole} />;
      case 'volunteers': return <MemberListView title="Volunteers" description="List of all the Volunteers." icon={HeartHandshake} members={users.filter(u => u.role === 'Volunteer')} onUpdateRole={handleUpdateRole} />;
      case 'ambassadors': return <MemberListView title="Ambassadors" description="List of all the Ambassadors." icon={Globe} members={users.filter(u => u.role === 'Ambassador')} onUpdateRole={handleUpdateRole} />;
      case 'partners': return <MemberListView title="Partners" description="List of all the Partners." icon={Briefcase} members={users.filter(u => u.role === 'Partner')} onUpdateRole={handleUpdateRole} />;
      case 'donors': return <MemberListView title="Donors" description="List of all the Donors." icon={HandCoins} members={users.filter(u => u.role === 'Donor')} onUpdateRole={handleUpdateRole} />;
      case 'funds': return <FundsView funds={funds} setFunds={setFunds} addLog={addLog} showToast={showToast} />;
      case 'settings': return <SettingsView currentUser={currentUser} globalUsers={users} setUsers={setUsers} showToast={showToast} addLog={addLog} twoFactorConfig={twoFactorConfig} setTwoFactorConfig={setTwoFactorConfig} setActiveTab={setActiveTab} />;\n`;

content = content.replace(renderContentOld, renderContentNew);

// Fix Logout button text size
content = content.replace(
  '{isSidebarOpen && <span>Log Out</span>}',
  '{isSidebarOpen && <span className="text-sm">Log Out</span>}'
);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
console.log('Portal updated');
