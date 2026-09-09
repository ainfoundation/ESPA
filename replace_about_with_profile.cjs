const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsView.jsx', 'utf8');

// Find the About section
const aboutStartIndex = content.indexOf('{/* About Section */}');
const nextSectionMatch = content.indexOf('</div>\n      </div>', aboutStartIndex); 
// Wait, looking at the previous grep:
//          </div>
//      </div>
//            {/* Modals for 2FA */}

const endOfAbout = content.indexOf('</div>\n          </div>\n      </div>', aboutStartIndex);

if(aboutStartIndex !== -1 && endOfAbout !== -1) {
    const aboutBlock = content.substring(aboutStartIndex, endOfAbout + 10);
    
    // Create Profile section
    const profileBlock = `{/* Profile Section */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-8 flex flex-col h-full">
            <h2 className="text-lg font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4 flex items-center gap-2">
                <User size={20} className="text-[#004B36]" /> Profile
            </h2>
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-[#004B36] text-white flex items-center justify-center font-bold text-3xl shadow-sm border-4 border-stone-50 shrink-0 relative overflow-hidden group">
                        {currentUser.avatar ? (
                            <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            currentUser.name.charAt(0)
                        )}
                        <label className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-colors">
                            <Upload size={20} className="text-white" />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        const result = e.target.result;
                                        setUsers(users.map(u => u.id === currentUser.id ? {...u, avatar: result} : u));
                                        showToast('Profile picture updated successfully', 'success');
                                        addLog(\`Profile picture updated for \${currentUser.name}\`);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </label>
                    </div>
                    <div className="flex-1 text-center sm:text-left w-full">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Full Name</label>
                        <input type="text" value={currentUser.name} disabled className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-500 cursor-not-allowed font-medium" />
                        <p className="text-[10px] text-stone-400 mt-1">Name changes are not permitted.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Email Address</label>
                        <input type="email" defaultValue={currentUser.email || currentUser.username} onBlur={(e) => {
                            if(e.target.value !== (currentUser.email || currentUser.username)) {
                                setUsers(users.map(u => u.id === currentUser.id ? {...u, email: e.target.value, username: e.target.value} : u));
                                showToast('Email address updated', 'success');
                                addLog(\`Email updated for \${currentUser.name}\`);
                            }
                        }} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800" placeholder="Enter email address" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                        <input type="tel" defaultValue={currentUser.phone || ''} onBlur={(e) => {
                            if(e.target.value !== currentUser.phone) {
                                setUsers(users.map(u => u.id === currentUser.id ? {...u, phone: e.target.value} : u));
                                showToast('Phone number updated', 'success');
                                addLog(\`Phone number updated for \${currentUser.name}\`);
                            }
                        }} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800" placeholder="+1 (555) 000-0000" />
                    </div>
                </div>
            </div>
          </div>`;

    content = content.replace(aboutBlock, profileBlock);
    content = content.replace(/import \{ (.*) \} from 'lucide-react';/, "import { $1, User, Upload } from 'lucide-react';");
    fs.writeFileSync('src/components/SettingsView.jsx', content);
    console.log("Success");
} else {
    console.log("About section not found properly");
}
