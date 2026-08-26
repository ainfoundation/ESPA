import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";

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
            className="relative w-full max-w-[500px] h-[500px] max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-[#004B36]/5 flex flex-col"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10 flex flex-col flex-1">
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
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success('Donation processed!'); }} className="flex flex-col gap-6 flex-1">
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
                      className="mt-auto w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        recaptchaRef.current?.reset();
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
            className="relative w-full max-w-[500px] h-[500px] max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-[#004B36]/5 flex flex-col"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10 flex flex-col flex-1">
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
                  <form onSubmit={async (e) => { 
                    e.preventDefault(); 
                    
                    const recaptchaToken = recaptchaRef.current?.getValue();
                    if (!recaptchaToken) {
                      toast.error("Please verify that you are not a robot.");
                      return;
                    }

                    const form = e.currentTarget;
                    const btn = form.querySelector('button[type="submit"]');
                    if (btn) btn.textContent = 'Submitting...';
                    
                    try {
                      const formData = new FormData(form);
                      const response = await fetch('/api/partner', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: formData.get('name'),
                          organization: formData.get('organization'),
                          email: formData.get('email'),
                          proposal: formData.get('proposal'),
                          recaptchaToken
                        })
                      });

                      if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(errData.error || 'Server connection failed');
                      }
                      
                      setSubmitted(true);
                      toast.success('Submitted successfully!');
                    } catch (err: any) {
                      console.error(err);
                      toast.error(err.message || 'Something went wrong. Please try again.');
                      if (btn) btn.textContent = 'Submit Proposal';
                      recaptchaRef.current?.reset();
                    }
                  }} className="flex flex-col gap-4 flex-1">
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="organization"
                        placeholder="Organization Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <textarea 
                        name="proposal"
                        placeholder="How would you like to partner?" 
                        rows={3}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors resize-none"
                      />
                    </div>
                    <div className="flex justify-center my-1 scale-90 origin-left">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfwCZYtAAAAAJfP8Lp_sa-rZjiIEFbC8SIhi0EW"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="mt-auto w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors"
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
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        recaptchaRef.current?.reset();
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
            className="relative w-full max-w-[500px] h-[500px] max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-[#004B36]/5 flex flex-col"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10 flex flex-col flex-1">
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
                  <form onSubmit={async (e) => { 
                    e.preventDefault(); 
                    
                    const recaptchaToken = recaptchaRef.current?.getValue();
                    if (!recaptchaToken) {
                      toast.error("Please verify that you are not a robot.");
                      return;
                    }

                    const form = e.currentTarget;
                    const btn = form.querySelector('button[type="submit"]');
                    if (btn) btn.textContent = 'Submitting...';
                    
                    try {
                      const formData = new FormData(form);
                      const response = await fetch('/api/volunteer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: formData.get('name'),
                          email: formData.get('email'),
                          area_of_interest: formData.get('area_of_interest'),
                          availability: formData.get('availability'),
                          recaptchaToken
                        })
                      });

                      if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(errData.error || 'Server connection failed');
                      }

                      setSubmitted(true);
                      toast.success('Submitted successfully!');
                    } catch (err: any) {
                      console.error(err);
                      toast.error(err.message || 'Something went wrong. Please try again.');
                      if (btn) btn.textContent = 'Submit';
                      recaptchaRef.current?.reset();
                    }
                  }} className="flex flex-col gap-4 flex-1">
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="area_of_interest"
                        placeholder="Area of Interest" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="availability"
                        placeholder="Availability" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div className="flex justify-center my-1 scale-90 origin-left">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfwCZYtAAAAAJfP8Lp_sa-rZjiIEFbC8SIhi0EW"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="mt-auto w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors"
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

function AmbassadorModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', social: '', motivation: '' });
  const [errors, setErrors] = useState({ email: '', phone: '', social: '' });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', social: '', motivation: '' });
        setErrors({ email: '', phone: '', social: '' });
        recaptchaRef.current?.reset();
      }, 300);
    }
  }, [isOpen]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[\d\s-]{8,}$/.test(phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email' && value) {
      setErrors(prev => ({ ...prev, email: validateEmail(value) ? '' : 'Please enter a valid email address' }));
    } else if (name === 'phone' && value) {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) ? '' : 'Please enter a valid phone number (min 8 digits)' }));
    } else if (name === 'social' && value) {
      setErrors(prev => ({ ...prev, social: value.length >= 3 ? '' : 'Please enter a valid profile link or handle' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.social && formData.motivation && 
                      !errors.email && !errors.phone && !errors.social;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#004B36]/60 backdrop-blur-sm"
            onClick={onClose} 
          />
          <div 
            className="relative w-full max-w-[500px] h-[500px] max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-[#004B36]/5 flex flex-col"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#004B36]/50 hover:text-[#004B36] transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 md:p-10 flex flex-col flex-1">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#004B36] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Thank You!</h3>
                  <p className="text-[#004B36]/60 mb-8">We have received your ambassador application. Our team will contact you soon.</p>
                  <button onClick={onClose} className="w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] transition-colors">
                     Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold mb-2 text-[#004B36]">Become an Ambassador</h2>
                  <p className="text-[#004B36]/60 text-sm mb-8">Represent ESPA Foundation in your community.</p>
                  <form onSubmit={async (e) => { 
                    e.preventDefault(); 
                    if (!isFormValid) return;
                    
                    const recaptchaToken = recaptchaRef.current?.getValue();
                    if (!recaptchaToken) {
                      toast.error("Please verify that you are not a robot.");
                      return;
                    }

                    const form = e.currentTarget;
                    const btn = form.querySelector('button[type="submit"]');
                    if (btn) btn.textContent = 'Submitting...';
                    
                    try {
                      const response = await fetch('/api/ambassador', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          ...formData,
                          recaptchaToken
                        })
                      });

                      if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(errData.error || 'Server connection failed');
                      }

                      setSubmitted(true);
                      toast.success('Submitted successfully!');
                    } catch (err: any) {
                      console.error(err);
                      toast.error(err.message || 'Something went wrong. Please try again.');
                      if (btn) btn.textContent = 'Apply Now';
                      recaptchaRef.current?.reset();
                    }
                  }} className="flex flex-col gap-4 flex-1">
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address" 
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#004B36]/10 focus:border-[#004B36]'} bg-transparent text-[#004B36] focus:outline-none transition-colors`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number" 
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#004B36]/10 focus:border-[#004B36]'} bg-transparent text-[#004B36] focus:outline-none transition-colors`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="social"
                        value={formData.social}
                        onChange={handleChange}
                        placeholder="Social Media Profile Link (LinkedIn, IG, etc.)" 
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${errors.social ? 'border-red-400 focus:border-red-500' : 'border-[#004B36]/10 focus:border-[#004B36]'} bg-transparent text-[#004B36] focus:outline-none transition-colors`}
                      />
                      {errors.social && <p className="text-red-500 text-xs mt-1 ml-1">{errors.social}</p>}
                    </div>
                    <div>
                      <textarea 
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Why do you want to be an ambassador?" 
                        rows={3}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#004B36]/10 bg-transparent text-[#004B36] focus:outline-none focus:border-[#004B36] transition-colors resize-none"
                      />
                    </div>
                    <div className="flex justify-center my-1 scale-90 origin-left">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfwCZYtAAAAAJfP8Lp_sa-rZjiIEFbC8SIhi0EW"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!isFormValid}
                      className="mt-auto w-full bg-[#004B36] text-white py-4 rounded-full font-bold hover:bg-[#003828] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Apply Now
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
  const [isAmbassadorOpen, setIsAmbassadorOpen] = useState(false);

  useEffect(() => {
    const handleOpenDonation = () => setIsDonationOpen(true);
    const handleOpenPartner = () => setIsPartnerOpen(true);
    const handleOpenVolunteer = () => setIsVolunteerOpen(true);
    const handleOpenAmbassador = () => setIsAmbassadorOpen(true);

    window.addEventListener('open-donation', handleOpenDonation);
    window.addEventListener('open-partner', handleOpenPartner);
    window.addEventListener('open-volunteer', handleOpenVolunteer);
    window.addEventListener('open-ambassador', handleOpenAmbassador);

    return () => {
      window.removeEventListener('open-donation', handleOpenDonation);
      window.removeEventListener('open-partner', handleOpenPartner);
      window.removeEventListener('open-volunteer', handleOpenVolunteer);
      window.removeEventListener('open-ambassador', handleOpenAmbassador);
    };
  }, []);

  return (
    <>
      <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
      <PartnerModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
      <VolunteerModal isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
      <AmbassadorModal isOpen={isAmbassadorOpen} onClose={() => setIsAmbassadorOpen(false)} />
    </>
  );
}
