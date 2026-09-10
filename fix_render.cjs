const fs = require('fs');
let content = fs.readFileSync('src/components/ManagementPortal.jsx', 'utf8');

const match = content.match(/const renderContent = \(\) => \{([\s\S]*?)\};/);
if (match) {
  const newRender = `const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <SummaryDashboard funds={funds} currentUser={currentUser} />;
      case 'general': return <MemberListView title="General Committee" description="Registered members of the NGO other than the Office bearers." icon={Users} members={users.filter(u => u.role === 'General Member')} onUpdateRole={handleUpdateRole} />;
      case 'volunteers': return <MemberListView title="Volunteers" description="List of all the Volunteers." icon={HeartHandshake} members={users.filter(u => u.role === 'Volunteer')} onUpdateRole={handleUpdateRole} />;
      case 'ambassadors': return <MemberListView title="Ambassadors" description="List of all the Ambassadors." icon={Globe} members={users.filter(u => u.role === 'Ambassador')} onUpdateRole={handleUpdateRole} />;
      case 'partners': return <MemberListView title="Partners" description="List of all the Partners." icon={Briefcase} members={users.filter(u => u.role === 'Partner')} onUpdateRole={handleUpdateRole} />;
      case 'donors': return <MemberListView title="Donors" description="List of all the Donors." icon={HandCoins} members={users.filter(u => u.role === 'Donor')} onUpdateRole={handleUpdateRole} />;
      case 'funds': return <FundsView funds={funds} setFunds={setFunds} addLog={addLog} showToast={showToast} />;
      case 'settings': return <SettingsView currentUser={currentUser} globalUsers={users} setUsers={setUsers} showToast={showToast} addLog={addLog} twoFactorConfig={twoFactorConfig} setTwoFactorConfig={setTwoFactorConfig} setActiveTab={setActiveTab} />;
      case 'activity': return (
          <div className="space-y-8 h-full flex flex-col tracking-tight relative p-4 md:p-8 overflow-hidden">
            <div>
              <h1 className="text-3xl font-semibold text-stone-900 flex items-center gap-2"><Activity className="text-[#004B36]" size={28} /> Activity Log</h1>
              <p className="text-stone-500 text-base mt-2 font-medium">System-wide audit trail of all actions.</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {logs.length > 0 ? logs.map(log => (
                  <div key={log.id} className="flex gap-4 items-start p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="p-2 bg-white rounded-lg border border-stone-200 text-stone-400 shrink-0"><History size={16} /></div>
                    <div>
                      <div className="text-stone-800 font-medium">{log.action}</div>
                      <div className="text-xs text-stone-500 mt-1">{new Date(log.timestamp).toLocaleString()} by {log.user}</div>
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center text-stone-500">No activity logged yet.</div>
                )}
              </div>
            </div>
          </div>
        );
      case 'archives': return <ArchivesView archivedHosts={archivedHosts} setArchivedHosts={setArchivedHosts} setHosts={setHosts} hosts={hosts} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} setUsers={setUsers} users={users} archivedBatches={archivedBatches} setArchivedBatches={setArchivedBatches} setBatches={setBatches} batches={batches} archivedRooms={archivedRooms} setArchivedRooms={setArchivedRooms} setRooms={setRooms} rooms={rooms} showToast={showToast} addLog={addLog} />;
      case 'roles': return <UsersView users={users} setUsers={setUsers} showToast={showToast} addLog={addLog} />;
      default: return <SummaryDashboard funds={funds} currentUser={currentUser} />;
    }
  };`;
  content = content.replace(/const renderContent = \(\) => \{([\s\S]*?)\};/, newRender);
}

fs.writeFileSync('src/components/ManagementPortal.jsx', content);
