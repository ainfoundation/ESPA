import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactUs() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <div className="bg-white min-h-[50vh] flex flex-col items-center justify-center pt-24 pb-16 px-6">
      <Helmet>
        <title>Contact Us | ESPA Foundation</title>
        <meta name="description" content="Contact the ESPA Foundation for inquiries, volunteering, or support." />
        <meta property="og:title" content="Contact Us | ESPA Foundation" />
      </Helmet>
      
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-[#004B36] mb-6">Contact Us</h1>
        <p className="font-sans text-xl font-normal text-[#004B36]/70 leading-relaxed mb-12">
          Have questions or want to get involved? We'd love to hear from you.
        </p>
        
        <div className="bg-[#004B36] p-8 rounded-3xl border border-[#004B36]/10 text-left shadow-lg">
          <form className="flex flex-col gap-6" onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const btn = form.querySelector('button[type="submit"]');
            
            const recaptchaToken = recaptchaRef.current?.getValue();
            if (!recaptchaToken) {
              alert("Please verify that you are not a robot.");
              return;
            }

            if (btn) btn.textContent = 'Sending...';
            try {
              const formData = new FormData(form);
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  message: formData.get('message'),
                  recaptchaToken
                })
              });

              if (!response.ok) throw new Error('Network response was not ok');
              
              form.reset();
              recaptchaRef.current?.reset();
              if (btn) btn.textContent = 'Message Sent Successfully!';
              setTimeout(() => {
                if (btn) btn.textContent = 'Send Message';
              }, 3000);
            } catch (err) {
              console.error(err);
              alert('Something went wrong. Please try again.');
              if (btn) btn.textContent = 'Send Message';
            }
          }}>
            <div>
              <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors" placeholder="Your Email Address" />
            </div>
            <div>
              <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Message</label>
              <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors resize-none" placeholder="How can we help?"></textarea>
            </div>
            <div className="flex justify-center my-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfwCZYtAAAAAJfP8Lp_sa-rZjiIEFbC8SIhi0EW"
                theme="dark"
              />
            </div>
            <button type="submit" className="w-full bg-white text-[#004B36] py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
