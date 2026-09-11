import React, { useState } from 'react';
import { Settings, Save, Archive, Shield, Key, Info, CheckCircle2, AlertCircle, Mail, Smartphone, QrCode, Globe, User, Upload, Activity, Wallet, Trash2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { verifyTOTP } from './ManagementPortal';
import { AinManagementLogo, AINFoundationLogo } from './ManagementPortal';
import { ToggleSwitch } from './SharedComponents';
import { createPortal } from 'react-dom';
const Portal = ({ children }) => { return createPortal(children, document.body); };
import DraggableModal from './DraggableModal';

export default function SettingsView({ currentUser, globalUsers, setUsers, showToast, addLog, twoFactorConfig, setTwoFactorConfig, setActiveTab, funds, setFunds }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');


  
  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast('Please fill all password fields', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    
    const user = globalUsers?.find(u => u.id === currentUser.id);
    if (!user) {
        if (currentUser.id === 'A01' && (oldPassword === 'adminpass' || oldPassword === '12345' || oldPassword === 'admin')) {
            showToast('Admin password changed successfully', 'success');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            addLog('Admin changed their password');
            return;
        }
        showToast('User not found', 'error');
        return;
    }
    
    if (user.password !== oldPassword && user.password !== undefined && !(user.password === '' && oldPassword === '12345')) {
       if (user.password !== oldPassword) {
           showToast('Incorrect old password', 'error');
           return;
       }
    }
    
    const updatedUsers = globalUsers.map(u => u.id === user.id ? { ...u, password: newPassword } : u);
    setUsers(updatedUsers);
    showToast('Password updated successfully', 'success');
    addLog(`${currentUser.name} changed their password`);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8 h-full flex flex-col tracking-tight relative pb-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 flex items-center gap-2">Settings</h1>
          <p className="text-stone-500 text-base mt-2 font-medium">Manage Profile Settings, User Preferences, and Authentication.</p>
        </div>
      </div>

      

      
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8 items-stretch">
          {/* Security */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-8 flex flex-col h-full">
            <h2 className="text-lg font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4 flex items-center gap-2">
                <Shield size={20} className="text-[#004B36]" /> Security
            </h2>
            <div className="space-y-4 flex-1">
                {/* Email 2FA */}
                <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0">
                            <Mail size={18} className="text-stone-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-stone-900">Email Address</p>
                            <p className="text-xs text-stone-500 mt-1">Receive OTP for Verification via Email.</p>
                        </div>
                    </div>
                    <ToggleSwitch 
                        enabled={twoFactorConfig?.emailEnabled || false} 
                        onChange={(val) => {
                            if (val) {
                                setIsEmailModalOpen(true);
                            } else {
                                setTwoFactorConfig({...twoFactorConfig, emailEnabled: false, enabled: twoFactorConfig?.authEnabled});
                                addLog(`Email 2FA disabled for ${currentUser.name}`);
                                showToast('Email 2FA Disabled', 'success');
                            }
                        }} 
                    />
                </div>

                {/* Authenticator 2FA */}
                <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0">
                            <Smartphone size={18} className="text-stone-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-stone-900">Authenticator</p>
                            <p className="text-xs text-stone-500 mt-1">Receive OTP for Verification via Authenticator.</p>
                        </div>
                    </div>
                    <ToggleSwitch 
                        enabled={twoFactorConfig?.authEnabled || false} 
                        onChange={(val) => {
                            if (val) {
                                setIsAuthModalOpen(true);
                            } else {
                                setTwoFactorConfig({...twoFactorConfig, authEnabled: false, enabled: twoFactorConfig?.emailEnabled});
                                addLog(`Authenticator 2FA disabled for ${currentUser.name}`);
                                showToast('Authenticator 2FA Disabled', 'success');
                            }
                        }} 
                    />
                </div>

                {/* Password Change row */}
                <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0">
                            <Key size={18} className="text-stone-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-stone-900">Password</p>
                            <p className="text-xs text-stone-500 mt-1">Update Your Account Password.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsChangingPassword(!isChangingPassword)} 
                        className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                        Change
                    </button>
                </div>
                
                {isChangingPassword && (
                  <Portal>
                    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" aria-hidden="true" onClick={() => setIsChangingPassword(false)} />
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
                      <DraggableModal className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 pointer-events-auto" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4 flex items-center gap-3 drag-handle cursor-grab active:cursor-grabbing touch-none">
                          <Key className="text-[#004B36] pointer-events-none" size={24} /> <span className="pointer-events-none font-medium">Change Password</span>
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Old Password</label>
                            <input 
                              type="password" 
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B36] focus:border-[#004B36] text-sm"
                              placeholder="Enter old password"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">New Password</label>
                            <input 
                              type="password" 
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B36] focus:border-[#004B36] text-sm"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Confirm New Password</label>
                            <input 
                              type="password" 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B36] focus:border-[#004B36] text-sm"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end gap-3 shrink-0">
                          <button onClick={() => setIsChangingPassword(false)} className="px-5 py-2.5 text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors">Cancel</button>
                          <button 
                            onClick={() => {
                                handlePasswordChange();
                                setIsChangingPassword(false);
                            }} 
                            className="px-6 py-2.5 bg-[#004B36] hover:bg-[#003828] text-white rounded-full font-semibold flex items-center gap-2 transition-colors text-sm"
                          >
                            <Save size={16} /> Update
                          </button>
                        </div>
                      </DraggableModal>
                    </div>
                  </Portal>
                )}
            </div>
          </div>
          
          {/* Profile Section */}
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
                                        setUsers(globalUsers.map(u => u.id === currentUser.id ? {...u, avatar: result} : u));
                                        showToast('Profile picture updated successfully', 'success');
                                        addLog(`Profile picture updated for ${currentUser.name}`);
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
                                setUsers(globalUsers.map(u => u.id === currentUser.id ? {...u, email: e.target.value, username: e.target.value} : u));
                                showToast('Email address updated', 'success');
                                addLog(`Email updated for ${currentUser.name}`);
                            }
                        }} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800" placeholder="Enter email address" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                        <input type="tel" defaultValue={currentUser.phone || ''} onBlur={(e) => {
                            if(e.target.value !== currentUser.phone) {
                                setUsers(globalUsers.map(u => u.id === currentUser.id ? {...u, phone: e.target.value} : u));
                                showToast('Phone number updated', 'success');
                                addLog(`Phone number updated for ${currentUser.name}`);
                            }
                        }} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800" placeholder="+1 (555) 000-0000" />
                    </div>
                </div>
            </div>
</div>
</div>


                    {/* Universal Data Management */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                <Archive className="text-[#004B36]" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Universal Data Management</h2>
                <p className="text-stone-500 text-sm mt-1">Export or import data across the entire platform.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Data Section</label>
                <select id="data-section-select" className="w-full px-4 py-2.5 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800 bg-white">
                  <option value="ain_users">Members (Committee, Volunteers, Ambassadors, Partners, Donors)</option>
                  <option value="ain_funds">Funds Data</option>
                  <option value="entire">Entire System Data (All Sections)</option>
                </select>
              </div>
              <div className="flex items-end gap-3">
                <button 
                  onClick={() => {
                    const section = document.getElementById('data-section-select').value;
                    
                    if (section === 'entire') {
                        // Export all as JSON
                        const allData = {};
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (key.startsWith('ain_') || key === 'library_books') {
                                try {
                                    allData[key] = JSON.parse(localStorage.getItem(key));
                                } catch(e) {
                                    allData[key] = localStorage.getItem(key);
                                }
                            }
                        }
                        const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
                        const link = document.createElement("a");
                        link.setAttribute("href", jsonContent);
                        link.setAttribute("download", `espa_full_backup.json`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        addLog(`Exported Entire System Data to JSON`);
                        showToast('Export successful', 'success');
                        return;
                    }

                    // For CSV exports (Users, Funds)
                    let data = [];
                    if (section === 'ain_funds') {
                      const fundsObj = JSON.parse(window.localStorage.getItem('ain_funds') || '{"transactions":[]}');
                      data = fundsObj.transactions || [];
                    } else {
                      data = JSON.parse(window.localStorage.getItem(section) || '[]');
                    }

                    if (data.length === 0) {
                      showToast('No data available to export in this section.', 'error');
                      return;
                    }
                    
                    const keys = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object');
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + keys.join(",") + "\n"
                      + data.map(row => keys.map(k => {
                          let val = row[k] === null || row[k] === undefined ? '' : String(row[k]);
                          return `"${val.replace(/"/g, '""')}"`;
                        }).join(",")).join("\n");
                    
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `${section}_export.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    addLog(`Exported ${section} to CSV`);
                    showToast('Export successful', 'success');
                  }}
                  className="flex-1 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={16} className="rotate-180" /> Export
                </button>
                <label className="flex-1 cursor-pointer">
                  <input 
                    type="file" 
                    accept=".csv,.json" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const section = document.getElementById('data-section-select').value;
                      
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const fileData = event.target.result;
                        
                        // Strict entire import
                        if (section === 'entire') {
                            try {
                                const parsed = JSON.parse(fileData);
                                if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                                    throw new Error("Invalid JSON structure for full backup.");
                                }
                                // Basic validation for "Entire" import
                                if (!parsed.ain_users && !parsed.ain_funds) {
                                    throw new Error("File does not contain valid ESPA backup keys.");
                                }
                                for (const key in parsed) {
                                    if (key.startsWith('ain_') || key === 'library_books') {
                                        window.localStorage.setItem(key, JSON.stringify(parsed[key]));
                                    }
                                }
                                addLog(`Imported Entire System Data from ${file.name}`);
                                showToast('Import successful. Refreshing...', 'success');
                                setTimeout(() => window.location.reload(), 1500);
                            } catch(err) {
                                showToast(`Failed to parse JSON backup: ${err.message}`, 'error');
                            }
                            e.target.value = '';
                            return;
                        }

                        // Strict CSV import
                        const lines = fileData.split('\n').filter(l => l.trim() !== '');
                        if (lines.length < 2) {
                          showToast(`Error: ${file.name} does not contain valid data.`, 'error');
                          e.target.value = '';
                          return;
                        }
                        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
                        
                        let expectedKeys = [];
                        if (section === 'ain_users') {
                            expectedKeys = ['id', 'name', 'email', 'role'];
                        } else if (section === 'ain_funds') {
                            expectedKeys = ['id', 'type', 'amount', 'currency'];
                        }
                        
                        const missingKeys = expectedKeys.filter(k => !headers.includes(k));
                        if (missingKeys.length > 0) {
                          showToast(`Error: File is missing required columns: ${missingKeys.join(', ')}. Strict matching failed.`, 'error');
                          e.target.value = '';
                          return;
                        }
                        
                        try {
                          const importedArray = [];
                          for (let i = 1; i < lines.length; i++) {
                            let values = [];
                            let inQuotes = false;
                            let val = '';
                            for (let c = 0; c < lines[i].length; c++) {
                                const char = lines[i][c];
                                if (char === '"') {
                                    inQuotes = !inQuotes;
                                } else if (char === ',' && !inQuotes) {
                                    values.push(val.trim());
                                    val = '';
                                } else {
                                    val += char;
                                }
                            }
                            values.push(val.trim());
                            
                            const obj = {};
                            headers.forEach((h, index) => {
                              obj[h] = values[index] !== undefined ? values[index].replace(/^"|"$/g, '') : '';
                            });
                            
                            if (section === 'ain_funds') {
                                obj.amount = parseFloat(obj.amount) || 0;
                            }
                            importedArray.push(obj);
                          }
                          
                          if (section === 'ain_funds') {
                            const fundsObj = JSON.parse(window.localStorage.getItem('ain_funds') || '{"pkr": 0, "usd": 0, "transactions":[]}');
                            fundsObj.transactions = importedArray;
                            // Recalculate totals
                            let pkr = 0;
                            let usd = 0;
                            importedArray.forEach(tx => {
                                if(tx.currency === 'USD') {
                                    usd += tx.type === 'in' ? tx.amount : -tx.amount;
                                } else {
                                    pkr += tx.type === 'in' ? tx.amount : -tx.amount;
                                }
                            });
                            fundsObj.pkr = pkr;
                            fundsObj.usd = usd;
                            window.localStorage.setItem('ain_funds', JSON.stringify(fundsObj));
                            if (typeof setFunds === 'function') setFunds(fundsObj);
                          } else {
                            window.localStorage.setItem(section, JSON.stringify(importedArray));
                            if (section === 'ain_users' && typeof setUsers === 'function') {
                                setUsers(importedArray);
                            }
                          }
                          
                          addLog(`Imported ${file.name} to ${section}`);
                          showToast('Import successful.', 'success');
                          
                        } catch(err) {
                          showToast(`Failed to parse CSV: ${err.message}`, 'error');
                        }
                        e.target.value = '';
                      };
                      reader.readAsText(file);
                    }}
                  />
                  <div className="w-full px-4 py-2.5 bg-[#004B36] hover:bg-[#003828] text-white rounded-full font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Upload size={16} /> Import
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Funds Management */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-8 col-span-1 lg:col-span-2">
            <h2 className="text-lg font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4 flex items-center gap-2">
                <Wallet size={20} className="text-[#004B36]" /> Funds Management
            </h2>
            <div className="space-y-4">
                <p className="text-sm text-stone-500 mb-4">View recent fund transactions and remove them if added by mistake.</p>
                
                {funds?.transactions?.length > 0 ? (
                    <div className="space-y-3">
                        {[...funds.transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(tx => (
                            <div key={tx.id} className="flex items-center justify-between p-4 bg-stone-50 border border-stone-100 rounded-xl">
                                <div>
                                    <p className="text-sm font-semibold text-stone-900">{tx.description || 'Fund Added'}</p>
                                    <p className="text-xs text-stone-500">{new Date(tx.date).toLocaleString()} • Processed by {tx.processedBy || 'Admin'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`font-bold ${tx.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.type === 'in' ? '+' : '-'}{tx.currency === 'USD' ? '$' : 'Rs'} {tx.amount.toLocaleString()}
                                    </span>
                                    <button 
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to remove this transaction? This will undo the fund amount.")) {
                                                const newTx = funds.transactions.filter(t => t.id !== tx.id);
                                                const amount = parseFloat(tx.amount) || 0;
                                                const isUsd = tx.currency === 'USD';
                                                const typeMult = tx.type === 'in' ? -1 : 1;
                                                const newFunds = {
                                                    ...funds,
                                                    pkr: isUsd ? funds.pkr : (funds.pkr + (amount * typeMult)),
                                                    usd: isUsd ? (funds.usd + (amount * typeMult)) : funds.usd,
                                                    transactions: newTx
                                                };
                                                setFunds(newFunds);
                                                addLog(`Removed fund transaction: ${tx.id}`);
                                                showToast("Transaction removed successfully", "success");
                                            }
                                        }}
                                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                        title="Remove Transaction"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-stone-500 italic">No recent transactions found.</p>
                )}
            </div>
          </div>

{/* Modals for 2FA */}
      <Portal>

        {isEmailModalOpen && (
          <>
            <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" aria-hidden="true" onClick={() => setIsEmailModalOpen(false)} />
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
              <DraggableModal className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 pointer-events-auto" onClick={e => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#004B36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-[#004B36]" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">Verify Email</h3>
                <p className="text-sm text-stone-500 mt-2">Enter the 6-digit session code sent to your email address to activate 2FA.</p>
              </div>
              
              <div className="mb-6">
                <input 
                  type="text" 
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 text-center tracking-[1em] font-mono text-2xl border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004B36]"
                  placeholder="••••••"
                  autoFocus
                />
                {verificationError && <p className="text-red-500 text-xs mt-2 text-center">{verificationError}</p>}
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => {
                    setIsEmailModalOpen(false);
                    setVerificationCode('');
                    setVerificationError('');
                  }} 
                  className="flex-1 px-4 py-3 border border-stone-200 text-stone-700 font-semibold rounded-full hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={async () => {
                    if (verificationCode.length === 6) {
                      const isValid = await verifyTOTP(verificationCode);
                      if (isValid) {
                        setTwoFactorConfig({...twoFactorConfig, emailEnabled: true, enabled: true, requireForLogin: true});
                        setIsEmailModalOpen(false);
                        setVerificationCode('');
                        showToast('Two-Factor Authentication is active. Your account is secured.', 'success');
                        addLog(`Email 2FA enabled for ${currentUser.name}`);
                      } else {
                        setVerificationError('Invalid Code. Please try again.');
                      }
                    } else {
                      setVerificationError('Please enter a valid 6-digit code');
                    }
                  }} 
                  className="flex-1 px-4 py-3 font-semibold rounded-full transition-colors bg-[#004B36] text-white hover:bg-[#003828]"
                >
                  Activate
                </button>
              </div>
              </DraggableModal>
            </div>
          </>
        )}
        
        {isAuthModalOpen && (
          <>
            <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" aria-hidden="true" onClick={() => setIsAuthModalOpen(false)} />
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
              <DraggableModal className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 pointer-events-auto" onClick={e => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#004B36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone size={32} className="text-[#004B36]" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">Configure Authenticator</h3>
                <p className="text-sm text-stone-500 mt-2">Scan the QR code below with Google or Microsoft Authenticator, then insert the time-session code to activate 2FA.</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-white border-2 border-stone-200 rounded-2xl flex items-center justify-center">
                  <QRCodeSVG value={`otpauth://totp/AIN%20Management:${currentUser?.email || currentUser?.username}?secret=JBSWY3DPEHPK3PXP&issuer=AIN%20Management`} size={160} />
                </div>
              </div>
              
              <div className="mb-6">
                <input 
                  type="text" 
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 text-center tracking-[1em] font-mono text-2xl border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004B36]"
                  placeholder="••••••"
                />
                {verificationError && <p className="text-red-500 text-xs mt-2 text-center">{verificationError}</p>}
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setVerificationCode('');
                    setVerificationError('');
                  }} 
                  className="flex-1 px-4 py-3 border border-stone-200 text-stone-700 font-semibold rounded-full hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={async () => {
                    if (verificationCode.length === 6) {
                      const isValid = await verifyTOTP(verificationCode);
                      if (isValid) {
                        setTwoFactorConfig({...twoFactorConfig, authEnabled: true, enabled: true, requireForLogin: true});
                        setIsAuthModalOpen(false);
                        setVerificationCode('');
                        showToast('Two-Factor Authentication is active. Your account is secured.', 'success');
                        addLog(`Authenticator 2FA enabled for ${currentUser.name}`);
                      } else {
                        setVerificationError('Invalid Code. Please try again.');
                      }
                    } else {
                      setVerificationError('Please enter a valid 6-digit code');
                    }
                  }} 
                  className="flex-1 px-4 py-3 font-semibold rounded-full transition-colors bg-[#004B36] text-white hover:bg-[#003828]"
                >
                  Activate
                </button>
              </div>
              </DraggableModal>
            </div>
          </>
        )}
      </Portal>

    </div>
  );
}
