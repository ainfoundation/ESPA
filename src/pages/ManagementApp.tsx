import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutDashboard, Users, Calendar, FileText, CheckSquare, Archive, Settings, LogOut, Lock, Loader2, Menu, X, User } from 'lucide-react';

// Views
import ItineraryView from '../management/views/ItineraryView';
import FormsView from '../management/views/FormsView';
import UsersView from '../management/views/UsersView';
import SettingsView from '../management/views/SettingsView';
import ArchivesView from '../management/views/ArchivesView';
import GeneralAgreementsView from '../management/views/GeneralAgreementsView';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

function LoginScreen({ onLogin, twoFactorConfig, users, setUsers, hosts, addLog, showToast, batches, roles }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin({ id: 'admin-1', name: 'Admin', role: 'Admin' });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[100dvh] bg-stone-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#004B36]">ESPA Management</h1>
          <p className="text-stone-500 text-sm mt-2">Sign in to the management portal</p>
        </div>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004B36]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004B36]" />
          </div>
          <button type="submit" className="w-full bg-[#004B36] text-white py-3 rounded-xl font-bold hover:bg-[#003828] transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ManagementApp() {
  const [currentUser, setCurrentUser] = useLocalStorage('espa_currentUser', null);
  const [twoFactorConfig, setTwoFactorConfig] = useLocalStorage('espa_twoFactorConfig', { enabled: false, requireForLogin: false, requireForReset: false });
  const [appSettings, setAppSettings] = useLocalStorage('espa_appSettings', { returnTimeframe: 7, lastResetMonth: new Date().getMonth(), lastResetDate: new Date().toISOString() });
  const [hosts, setHosts] = useLocalStorage('espa_hosts', []);
  const [archivedHosts, setArchivedHosts] = useLocalStorage('espa_archivedHosts', []);
  const [archivedUsers, setArchivedUsers] = useLocalStorage('espa_archivedUsers', []);
  const [archivedBatches, setArchivedBatches] = useLocalStorage('espa_archivedBatches', []);
  const [archivedRooms, setArchivedRooms] = useLocalStorage('espa_archivedRooms', []);
  const [archivedForms, setArchivedForms] = useLocalStorage('espa_archivedForms', []);
  const [users, setUsers] = useLocalStorage('espa_users', []);
  const [batches, setBatches] = useLocalStorage('espa_batches', []);
  const [rooms, setRooms] = useLocalStorage('espa_rooms', []);
  const [agreements, setAgreements] = useLocalStorage('espa_agreements', []);
  const [events, setEvents] = useLocalStorage('espa_events', []);
  const [forms, setForms] = useLocalStorage('espa_forms', []);
  const [resources, setResources] = useLocalStorage('espa_resources', []);
  const [notifications, setNotifications] = useLocalStorage('espa_notifications', []);
  const [roles, setRoles] = useLocalStorage('espa_roles', []);
  const [logs, setLogs] = useLocalStorage('espa_logs', []);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(true);

  const showToast = (msg, type = 'success') => {
    console.log(`[${type}] ${msg}`);
  };

  const addLog = (action, userOverride) => {
    const user = userOverride || (currentUser ? currentUser.name : 'Unknown');
    const newLog = { id: Date.now(), timestamp: new Date().toISOString(), user, action };
    setLogs(prev => [newLog, ...prev]);
  };

  const executeLogout = () => {
    addLog('Logged out successfully', currentUser?.name);
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} twoFactorConfig={twoFactorConfig} users={users} setUsers={setUsers} hosts={hosts} addLog={addLog} showToast={showToast} batches={batches} roles={roles} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'agreements', label: 'Agreements', icon: CheckSquare },
    { id: 'archives', label: 'Archives', icon: Archive },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex flex-col h-[100dvh] bg-[#FDFCFB] text-stone-800 antialiased font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className={`bg-white border-r border-stone-200 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="h-20 flex items-center justify-center border-b border-stone-200">
                <div className={`font-bold text-[#004B36] ${isOpen ? 'text-xl' : 'text-sm'}`}>ESPA</div>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map(item => (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#E4E2DC] text-[#004B36]' : 'text-stone-900 hover:bg-stone-200 hover:text-[#004B36]'}`}
                >
                <item.icon size={20} className="text-[#004B36] flex-shrink-0" />
                {isOpen && <span className="ml-3">{item.label}</span>}
                </button>
            ))}
            </nav>
            <div className="p-4 border-t border-stone-200">
                <button onClick={executeLogout} className="w-full flex items-center py-2.5 px-3 rounded-xl text-sm font-medium text-stone-900 hover:bg-stone-200">
                    <LogOut size={20} className="text-[#004B36] flex-shrink-0" />
                    {isOpen && <span className="ml-3">Sign Out</span>}
                </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-stone-50">
          <div className="p-8">
            {activeTab === 'dashboard' && (
              <div>
                <h1 className="text-3xl font-bold text-stone-900 mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-700">Total Users</h3>
                    <p className="text-4xl font-bold text-[#004B36] mt-4">{users.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-700">Active Forms</h3>
                    <p className="text-4xl font-bold text-[#004B36] mt-4">{forms.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-700">Agreements</h3>
                    <p className="text-4xl font-bold text-[#004B36] mt-4">{agreements.length}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'users' && <UsersView users={users} setUsers={setUsers} globalUsers={users} batches={batches} roles={roles} hosts={hosts} currentUser={currentUser} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} addLog={addLog} showToast={showToast} onUserClick={() => {}} setActiveTab={setActiveTab} />}
            {activeTab === 'itinerary' && <ItineraryView users={users} setUsers={setUsers} globalUsers={users} showToast={showToast} addLog={addLog} currentUser={currentUser} />}
            {activeTab === 'forms' && <FormsView forms={forms} setForms={setForms} currentUser={currentUser} globalUsers={users} addLog={addLog} showToast={showToast} onUserClick={() => {}} archivedForms={archivedForms} setArchivedForms={setArchivedForms} />}
            {activeTab === 'agreements' && <GeneralAgreementsView agreements={agreements} setAgreements={setAgreements} currentUser={currentUser} users={users} showToast={showToast} addLog={addLog} setActiveTab={setActiveTab} />}
            {activeTab === 'archives' && <ArchivesView archivedHosts={archivedHosts} setArchivedHosts={setArchivedHosts} hosts={hosts} setHosts={setHosts} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} users={users} setUsers={setUsers} archivedBatches={archivedBatches} setArchivedBatches={setArchivedBatches} batches={batches} setBatches={setBatches} archivedRooms={archivedRooms} setArchivedRooms={setArchivedRooms} rooms={rooms} setRooms={setRooms} showToast={showToast} addLog={addLog} />}
            {activeTab === 'settings' && <SettingsView currentUser={currentUser} globalUsers={users} setUsers={setUsers} showToast={showToast} addLog={addLog} twoFactorConfig={twoFactorConfig} setTwoFactorConfig={setTwoFactorConfig} />}
          </div>
        </div>
      </div>
    </div>
  );
}
