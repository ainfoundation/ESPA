import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const DetailRow = ({ label, value, subValue, highlight = false }: { label: string, value: string, subValue?: string, highlight?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied!`, {
      style: {
        background: '#004B36',
        color: '#fff',
        borderRadius: '12px'
      }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start justify-between group py-1">
      <div>
        <span className="text-white/60 block text-xs uppercase tracking-wider mb-1 font-medium">{label}</span>
        <span className={`font-medium ${highlight ? 'font-semibold text-xl' : 'text-lg tracking-wide break-all'}`}>{value}</span>
        {subValue && <span className="italic text-white/80 text-sm block mt-1">{subValue}</span>}
      </div>
      <button 
        onClick={handleCopy}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all flex-shrink-0 ml-4 mt-1 active:scale-95"
        title="Copy to clipboard"
      >
        {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default function Donate() {
  const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-[#004B36] mb-6 tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-stone-600 leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 pt-16 md:pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-0">
        <SectionHeader 
          title="Make a Donation" 
          subtitle="You can support the ESPA Foundation directly by making a secure bank transfer to one of our regional accounts below. Your contribution helps us expand educational access globally."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Canada */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#004B36] text-white rounded-3xl p-8 md:p-10 shadow-xl flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">
              Canadian Donors
            </h3>
            <div className="space-y-4 flex-grow text-[15px]">
              <DetailRow label="Bank Name" value="Citibank NA Canadian Branch" highlight />
              <DetailRow label="Institution Number" value="0328" />
              <DetailRow label="Transit Number" value="20012" />
              <DetailRow label="Account Type" value="Checking" />
              <DetailRow label="Account Number" value="3013202962" />
              <DetailRow label="Beneficiary Name" value="Rameez Taj" subValue="Official Representative" />
            </div>
          </motion.div>

          {/* UK & Europe */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#004B36] text-white rounded-3xl p-8 md:p-10 shadow-xl flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">
              UK & European Donors
            </h3>
            <div className="space-y-4 flex-grow text-[15px]">
              <DetailRow label="Bank Name" value="Citibank" highlight />
              <DetailRow label="Sort Code" value="185008" />
              <DetailRow label="Account Number" value="56255884" />
              <DetailRow label="IBAN" value="GB25CITI18500856255884" />
              <DetailRow label="BIC" value="CITIGB2L" />
              <DetailRow label="Beneficiary Name" value="Rameez Taj" subValue="Official Representative" />
            </div>
          </motion.div>

          {/* USA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#004B36] text-white rounded-3xl p-8 md:p-10 shadow-xl flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">
              US Donors
            </h3>
            <div className="space-y-4 flex-grow text-[15px]">
              <DetailRow label="Bank Name" value="Citibank" highlight />
              <DetailRow label="Routing (ABA)" value="031100209" />
              <DetailRow label="Account Number" value="70582690002604429" />
              <DetailRow label="Account Type" value="Checking" />
              <DetailRow label="SWIFT Code" value="CITIUS33" />
              <DetailRow label="Beneficiary Name" value="Rameez Taj" subValue="Official Representative" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
