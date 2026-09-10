const fs = require('fs');

let content = fs.readFileSync('src/components/SettingsView.jsx', 'utf8');

// Add setActiveTab to props if not there
if (!content.includes('setActiveTab')) {
  content = content.replace(
    'export default function SettingsView({ currentUser, globalUsers, setUsers, showToast, addLog, twoFactorConfig, setTwoFactorConfig }) {',
    'export default function SettingsView({ currentUser, globalUsers, setUsers, showToast, addLog, twoFactorConfig, setTwoFactorConfig, setActiveTab }) {'
  );
}

// Ensure Activity and Archive are imported
if (!content.includes('import { Settings, User, Lock, Save, ShieldAlert, Archive, Activity } from \'lucide-react\';')) {
  content = content.replace(
    'import { Settings, User, Lock, Save, ShieldAlert } from \'lucide-react\';',
    'import { Settings, User, Lock, Save, ShieldAlert, Archive, Activity } from \'lucide-react\';'
  );
}


// Add Archives and Activity sections in the UI
const securitySectionEnd = '        </div>\n      </div>';
const newSections = `        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Archive className="text-[#004B36]" size={20} /> System Archives
            </h2>
            <p className="text-stone-500 text-sm mt-1">Access deleted users and previously archived data.</p>
          </div>
          <button 
            onClick={() => setActiveTab('archives')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-sm transition-colors"
          >
            Open Archives
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Activity className="text-[#004B36]" size={20} /> Activity Log
            </h2>
            <p className="text-stone-500 text-sm mt-1">View the complete system audit and activity log.</p>
          </div>
          <button 
            onClick={() => setActiveTab('activity')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-sm transition-colors"
          >
            Open Activity Log
          </button>
        </div>
      </div>`;

if (!content.includes('System Archives')) {
  // We'll replace the last occurrence of the security section end.
  const idx = content.lastIndexOf(securitySectionEnd);
  if (idx !== -1) {
    content = content.slice(0, idx) + newSections + content.slice(idx + securitySectionEnd.length);
  }
}

fs.writeFileSync('src/components/SettingsView.jsx', content);
console.log('Settings updated');
