const fs = require('fs');

let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

// 1. Update roles array
const oldRoles = `  const roles = [
    { id: 'Admin' },
    { id: 'In-Country Coordinator' },
    { id: 'Deputy Lead Coordinator' },
    { id: 'Lead Coordinator' },
    { id: 'Intern' },
    { id: 'Host' },
    { id: 'Camper' }
  ];`;
  
const newRoles = `  const roles = [
    { id: 'Admin' },
    { id: 'President' },
    { id: 'Vice President' },
    { id: 'General Secretary' },
    { id: 'Joint Secretary' },
    { id: 'Treasurer' },
    { id: 'Executive Member' },
    { id: 'General Member' },
    { id: 'Volunteer' },
    { id: 'Ambassador' },
    { id: 'Partner' }
  ];`;
content = content.replace(oldRoles, newRoles);

// 2. Add imports for icons
content = content.replace(
  /import \{ (.*) \} from 'lucide-react';/,
  "import { $1, Shield, Globe, Briefcase, Activity, HeartHandshake } from 'lucide-react';"
);

// 3. Update navItems
const oldNavItems = `  const navItems = [
    { id: 'users', icon: Users, label: 'Management', roles: ['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'] },
  ];`;

const newNavItems = `  const navItems = [
    { id: 'users', icon: Users, label: 'Management', roles: ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'] },
    { id: 'executive', icon: Users, label: 'Executive Committee', roles: ['Admin'] },
    { id: 'general', icon: Users, label: 'General Committee', roles: ['Admin'] },
    { id: 'volunteers', icon: HeartHandshake, label: 'Volunteers', roles: ['Admin'] },
    { id: 'ambassadors', icon: Globe, label: 'Ambassadors', roles: ['Admin'] },
    { id: 'partners', icon: Briefcase, label: 'Partners', roles: ['Admin'] },
    { id: 'activity', icon: Activity, label: 'Activity Log', roles: ['Admin'] },
    { id: 'roles', icon: Shield, label: 'Roles', roles: ['Admin'] },
  ];`;
content = content.replace(oldNavItems, newNavItems);

// 4. Update adminItems to allow all new roles (if needed, but user said "This interface would be only for the Admin". Let's allow everyone to see settings, but only admin to see archives?
const oldAdminItems = `  const adminItems = [
    { id: 'archives', icon: Archive, label: 'Archives', roles: ['Admin'] },
    { id: 'settings', icon: Settings, label: 'Settings', roles: ['Admin', 'In-Country Coordinator', 'Deputy Lead Coordinator', 'Lead Coordinator', 'Intern', 'Host', 'Camper'] }
  ];`;

const newAdminItems = `  const adminItems = [
    { id: 'archives', icon: Archive, label: 'Archives', roles: ['Admin'] },
    { id: 'settings', icon: Settings, label: 'Settings', roles: ['Admin', 'President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Executive Member', 'General Member', 'Volunteer', 'Ambassador', 'Partner'] }
  ];`;
content = content.replace(oldAdminItems, newAdminItems);

// 5. Update renderContent to handle new tabs
const oldRender = `      case 'archives': return <ArchivesView archivedHosts={archivedHosts} setArchivedHosts={setArchivedHosts} setHosts={setHosts} hosts={hosts} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} setUsers={setUsers} users={users} archivedBatches={archivedBatches} setArchivedBatches={setArchivedBatches} setBatches={setBatches} batches={batches} archivedRooms={archivedRooms} setArchivedRooms={setArchivedRooms} setRooms={setRooms} rooms={rooms} showToast={showToast} addLog={addLog} />;
      default: return <div className="p-8 text-stone-500">Select a valid tab</div>;`;

const newRender = `      case 'archives': return <ArchivesView archivedHosts={archivedHosts} setArchivedHosts={setArchivedHosts} setHosts={setHosts} hosts={hosts} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} setUsers={setUsers} users={users} archivedBatches={archivedBatches} setArchivedBatches={setArchivedBatches} setBatches={setBatches} batches={batches} archivedRooms={archivedRooms} setArchivedRooms={setArchivedRooms} setRooms={setRooms} rooms={rooms} showToast={showToast} addLog={addLog} />;
      case 'executive': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Executive Committee</h2><p>The only 7 office bearers.</p></div>;
      case 'general': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">General Committee</h2><p>Registered members of the NGO other than the Office bearers.</p></div>;
      case 'volunteers': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Volunteers</h2><p>List of all the Volunteers.</p></div>;
      case 'ambassadors': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Ambassadors</h2><p>List of all the Ambassadors.</p></div>;
      case 'partners': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Partners</h2><p>List of all the Partners.</p></div>;
      case 'activity': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Activity Log</h2><p>Every action would be logged to see what is happening.</p></div>;
      case 'roles': return <div className="p-8 text-stone-500"><h2 className="text-2xl font-bold mb-4 text-stone-800">Roles</h2><p>Role management and permissions.</p></div>;
      default: return <div className="p-8 text-stone-500">Select a valid tab</div>;`;
content = content.replace(oldRender, newRender);

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
