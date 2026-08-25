import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MEMBERS = [
  "Aitzaz Rahim",
  "Ali Hasnain",
  "Ali Shan",
  "Ashfaq Jan",
  "Azhan Khan",
  "Rameez Taj",
  "Shabbir Ahmed"
];

const POSITIONS = [
  { id: 'president', label: 'President' },
  { id: 'vicePresident', label: 'Vice President' },
  { id: 'generalSecretary', label: 'General Secretary' },
  { id: 'jointSecretary', label: 'Joint Secretary' },
  { id: 'treasurer', label: 'Treasurer' },
  { id: 'executiveMember1', label: 'Executive Member 1' },
  { id: 'executiveMember2', label: 'Executive Member 2' },
];

export default function ElectionPage() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    voterName: '',
    president: '',
    vicePresident: '',
    generalSecretary: '',
    jointSecretary: '',
    treasurer: '',
    executiveMember1: '',
    executiveMember2: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/election', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({
          voterName: '',
          president: '',
          vicePresident: '',
          generalSecretary: '',
          jointSecretary: '',
          treasurer: '',
          executiveMember1: '',
          executiveMember2: ''
        });
      } else {
        const errData = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(errData.error || 'Failed to submit vote.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-[#004B36] mb-4">Elections 2026</h1>
          <p className="text-lg text-gray-600">Cast your vote for the board members.</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vote Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">Your vote has been securely recorded.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="bg-[#004B36] text-white px-6 py-2 rounded-full font-medium hover:bg-[#003828] transition-colors"
              >
                Submit Another Vote
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
                <label htmlFor="voterName" className="block text-sm font-bold text-[#004B36] mb-2 uppercase tracking-wide">
                  Your Name (Voter)
                </label>
                <select
                  id="voterName"
                  name="voterName"
                  required
                  value={formData.voterName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004B36] focus:border-transparent transition-all duration-300 font-medium"
                >
                  <option value="" disabled>Select your name</option>
                  {MEMBERS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Cast Your Votes</h3>

              {POSITIONS.map((pos) => (
                <div key={pos.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <label htmlFor={pos.id} className="block text-sm font-semibold text-gray-800 mb-2">
                    {pos.label}
                  </label>
                  <select
                    id={pos.id}
                    name={pos.id}
                    required
                    value={formData[pos.id as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004B36] focus:border-transparent transition-all duration-300"
                  >
                    <option value="" disabled>Select a nominee</option>
                    {MEMBERS.map(m => (
                      <option key={`${pos.id}-${m}`} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              ))}

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#004B36] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#003828] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4 text-lg"
              >
                {status === 'submitting' ? 'Submitting Votes...' : 'Submit Votes'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
