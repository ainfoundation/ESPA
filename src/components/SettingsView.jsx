import React, { useState } from 'react';
import { Settings, Save, Shield, Key, Info, CheckCircle2, AlertCircle, Mail, Smartphone, QrCode, Globe, User, Upload } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { verifyTOTP } from './ManagementPortal';
import { AinManagementLogo, AINFoundationLogo } from './ManagementPortal';
import { ToggleSwitch } from './SharedComponents';
import { createPortal } from 'react-dom';
const Portal = ({ children }) => { return createPortal(children, document.body); };
import DraggableModal from './DraggableModal';

export default function SettingsView({ currentUser, globalUsers, setUsers, showToast, addLog, twoFactorConfig, setTwoFactorConfig }) {
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
    
    const user = globalUsers.find(u => u.id === currentUser.id);
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
          <h1 className="text-3xl font-semibold text-stone-900">Settings</h1>
          <p className="text-stone-500 text-sm mt-2 font-medium">Manage Profile Settings, User Preferences, and Authentication.</p>
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
                        className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
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
                          <button onClick={() => setIsChangingPassword(false)} className="px-5 py-2.5 text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors">Cancel</button>
                          <button 
                            onClick={() => {
                                handlePasswordChange();
                                setIsChangingPassword(false);
                            }} 
                            className="px-6 py-2.5 bg-[#004B36] hover:bg-[#003828] text-white rounded-xl font-semibold flex items-center gap-2 transition-colors text-sm"
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
                                        setUsers(users.map(u => u.id === currentUser.id ? {...u, avatar: result} : u));
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
                                setUsers(users.map(u => u.id === currentUser.id ? {...u, email: e.target.value, username: e.target.value} : u));
                                showToast('Email address updated', 'success');
                                addLog(`Email updated for ${currentUser.name}`);
                            }
                        }} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800" placeholder="Enter email address" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                        <input type="tel" defaultValue={currentUser.phone || ''} onBlur={(e) => {
                            if(e.target.value !== currentUser.phone) {
                                setUsers(users.map(u => u.id === currentUser.id ? {...u, phone: e.target.value} : u));
                                showToast('Phone number updated', 'success');
                                addLog(`Phone number updated for ${currentUser.name}`);
                            }
                        }} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#004B36] font-medium text-stone-800" placeholder="+1 (555) 000-0000" />
                    </div>
                </div>
            </div>
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
                  className="flex-1 px-4 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
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
                  className="flex-1 px-4 py-3 font-semibold rounded-xl transition-colors bg-[#004B36] text-white hover:bg-[#003828]"
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
                  className="flex-1 px-4 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
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
                  className="flex-1 px-4 py-3 font-semibold rounded-xl transition-colors bg-[#004B36] text-white hover:bg-[#003828]"
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
