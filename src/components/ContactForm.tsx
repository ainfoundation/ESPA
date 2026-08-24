import React, { useState, useRef } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      recaptchaToken
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus('success');
      toast.success('Message sent successfully!');
      (e.target as HTMLFormElement).reset();
      recaptchaRef.current?.reset();
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
      setStatus('idle');
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="w-full">
      <h4 className="font-bold text-base mb-6 text-white/90">Get in Touch</h4>
      
        {status === 'success' ? (
          <div
            key="success"
            className="bg-[#003828] border border-[#004B36]/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3"
          >
            <CheckCircle className="text-white w-8 h-8" />
            <p className="text-white font-medium">Message sent successfully!</p>
            <p className="text-white/60 text-sm">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>
            <div>
              <textarea
                name="message"
                required
                placeholder="How can we help?"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
              />
            </div>
            <div className="flex justify-center my-1 scale-90 origin-left">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfwCZYtAAAAAJfP8Lp_sa-rZjiIEFbC8SIhi0EW"
                theme="dark"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-white text-[#004B36] font-bold text-sm rounded-xl px-4 py-3 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <div className="w-5 h-5 border-2 border-[#004B36]/30 border-t-[#004B36] rounded-full animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      
    </div>
  );
}
