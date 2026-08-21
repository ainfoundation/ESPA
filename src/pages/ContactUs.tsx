import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function ContactUs() {
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
        
        <div className="bg-[#004B36]/5 p-8 rounded-3xl border border-[#004B36]/10 text-left">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#004B36]/50 uppercase tracking-wider mb-2">Email</h3>
            <a href="mailto:espafoundation@outlook.com" className="text-xl font-medium text-[#004B36] hover:text-[#004B36]/70 transition-colors">espafoundation@outlook.com</a>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#004B36]/50 uppercase tracking-wider mb-2">Address</h3>
            <p className="text-lg font-medium text-[#004B36]">
              A-36, CS-58, Bhai Jan Chowk,<br/>Aisha Manzil, FB Area<br/>Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
