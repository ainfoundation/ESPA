import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

function DonationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [amount, setAmount] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setAmount('');
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#004B36]/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#004B36]/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#004B36] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Thank You!</h3>
                  <p className="text-[#004B36]/60 mb-8">Your contribution makes a difference.</p>
                  <button onClick={onClose} className="w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Make a Donation</h2>
                  <p className="text-[#004B36]/60 text-sm mb-2">Support our mission to empower communities.</p>
                  <p className="text-[#004B36]/80 text-xs font-semibold mb-8 p-3 bg-[#004B36]/5 rounded-lg border border-[#004B36]/10">
                    ESPA Foundation is a registered tax-exempt non-profit organization. All donations are tax-deductible.
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success('Donation processed!'); }} className="flex flex-col gap-6">
                    <div className="grid grid-cols-3 gap-3">
                      {['25', '50', '100'].map(val => (
                        <button 
                          type="button" 
                          key={val} 
                          onClick={() => setAmount(val)} 
                          className={`py-3 rounded-xl border font-bold transition-all ${amount === val ? 'bg-[#004B36] text-white border-[#004B36]' : 'border-[#004B36]/10 text-[#004B36] hover:border-[#004B36]/30'}`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                    <div>
                      <input 
                        type="number" 
                        placeholder="Custom Amount" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={!amount} 
                      className="w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                    >
                      Donate {amount ? `$${amount}` : ''}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PartnerModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#004B36]/60 backdrop-blur-sm"
            onClick={onClose} 
          />
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#004B36]/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#004B36] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Request Received</h3>
                  <p className="text-[#004B36]/60 mb-8">Our partnership team will review your details and contact you shortly.</p>
                  <button onClick={onClose} className="w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Partner With Us</h2>
                  <p className="text-[#004B36]/60 text-sm mb-8">Let's collaborate to make a lasting impact.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success('Submitted successfully!'); }} className="flex flex-col gap-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Organization Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <textarea 
                        placeholder="How would you like to partner?" 
                        rows={3}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="mt-4 w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors"
                    >
                      Submit Proposal
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VolunteerModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#004B36]/60 backdrop-blur-sm"
            onClick={onClose} 
          />
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#004B36]/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#004B36] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Thank You!</h3>
                  <p className="text-[#004B36]/60 mb-8">We have received your interest in volunteering. Our team will contact you soon.</p>
                  <button onClick={onClose} className="w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Volunteer With Us</h2>
                  <p className="text-[#004B36]/60 text-sm mb-8">Fill out the form below to express your interest.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success('Submitted successfully!'); }} className="flex flex-col gap-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <textarea 
                        placeholder="Tell us a little about yourself and how you'd like to help" 
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="mt-4 w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Modals() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  useEffect(() => {
    const handleOpenDonation = () => setIsDonationOpen(true);
    const handleOpenPartner = () => setIsPartnerOpen(true);
    const handleOpenVolunteer = () => setIsVolunteerOpen(true);

    window.addEventListener('open-donation', handleOpenDonation);
    window.addEventListener('open-partner', handleOpenPartner);
    window.addEventListener('open-volunteer', handleOpenVolunteer);

    return () => {
      window.removeEventListener('open-donation', handleOpenDonation);
      window.removeEventListener('open-partner', handleOpenPartner);
      window.removeEventListener('open-volunteer', handleOpenVolunteer);
    };
  }, []);

  return (
    <>
      <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
      <PartnerModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
      <VolunteerModal isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
    </>
  );
}
