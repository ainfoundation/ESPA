import React, { useState, useEffect } from 'react';
import { Banknote, ArrowUpRight, ArrowDownRight, Plus, X } from 'lucide-react';
import DraggableModal from './DraggableModal';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => createPortal(children, document.body);

export default function FundsView({ funds, setFunds, addLog, showToast }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [amountPKR, setAmountPKR] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [allocationReason, setAllocationReason] = useState('');

  useEffect(() => {
    if (isAdding) {
      const draft = window.localStorage.getItem('ain_draft_add_fund');
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setDonorName(parsed.donorName || '');
          setAmountPKR(parsed.amountPKR || '');
          setAmountUSD(parsed.amountUSD || '');
        } catch (e) {}
      }
    } else if (isAllocating) {
      const draft = window.localStorage.getItem('ain_draft_allocate_fund');
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setAllocationReason(parsed.allocationReason || '');
          setAmountPKR(parsed.amountPKR || '');
          setAmountUSD(parsed.amountUSD || '');
        } catch (e) {}
      }
    }
  }, [isAdding, isAllocating]);

  useEffect(() => {
    if (isAdding && (donorName || amountPKR || amountUSD)) {
      window.localStorage.setItem('ain_draft_add_fund', JSON.stringify({ donorName, amountPKR, amountUSD }));
    }
  }, [donorName, amountPKR, amountUSD, isAdding]);

  useEffect(() => {
    if (isAllocating && (allocationReason || amountPKR || amountUSD)) {
      window.localStorage.setItem('ain_draft_allocate_fund', JSON.stringify({ allocationReason, amountPKR, amountUSD }));
    }
  }, [allocationReason, amountPKR, amountUSD, isAllocating]);

  const handleSaveAddDraft = () => {
    window.localStorage.setItem('ain_draft_add_fund', JSON.stringify({ donorName, amountPKR, amountUSD }));
    showToast("Add Fund draft saved!", "success");
  };

  const handleSaveAllocateDraft = () => {
    window.localStorage.setItem('ain_draft_allocate_fund', JSON.stringify({ allocationReason, amountPKR, amountUSD }));
    showToast("Allocate Fund draft saved!", "success");
  };

  
  
  

  const handleAddFunds = (e) => {
    e.preventDefault();
    if (!amountPKR && !amountUSD) {
      showToast('Please enter an amount in PKR or USD.', 'error');
      return;
    }
    const valPKR = Number(amountPKR) || 0;
    const valUSD = Number(amountUSD) || 0;
    
    if (valPKR <= 0 && valUSD <= 0) return;
    
    const newTx = {
      id: Date.now(),
      type: 'donation',
      donorName,
      amountPKR: valPKR,
      amountUSD: valUSD,
      date: new Date().toISOString()
    };
    
    const updatedFunds = {
      ...funds,
      pkr: funds.pkr + valPKR,
      usd: funds.usd + valUSD,
      transactions: [newTx, ...funds.transactions]
    };
    
    setFunds(updatedFunds);
    setIsAdding(false);
    setDonorName('');
    setAmountPKR('');
    setAmountUSD('');
    window.localStorage.removeItem('ain_draft_add_fund');
    showToast('Donation added successfully', 'success');
    addLog(`Donation of PKR ${valPKR} / USD ${valUSD} added from ${donorName}`);
  };

  const handleAllocateFunds = (e) => {
    e.preventDefault();
    if (!amountPKR && !amountUSD) {
      showToast('Please enter an amount in PKR or USD.', 'error');
      return;
    }
    const valPKR = Number(amountPKR) || 0;
    const valUSD = Number(amountUSD) || 0;
    
    if (valPKR <= 0 && valUSD <= 0) return;
    
    if (valPKR > funds.pkr || valUSD > funds.usd) {
      showToast('Insufficient funds available', 'error');
      return;
    }
    
    const newTx = {
      id: Date.now(),
      type: 'allocation',
      reason: allocationReason,
      amountPKR: valPKR,
      amountUSD: valUSD,
      date: new Date().toISOString()
    };
    
    const updatedFunds = {
      ...funds,
      pkr: funds.pkr - valPKR,
      usd: funds.usd - valUSD,
      transactions: [newTx, ...funds.transactions]
    };
    
    setFunds(updatedFunds);
    setIsAllocating(false);
    setAllocationReason('');
    setAmountPKR('');
    setAmountUSD('');
    window.localStorage.removeItem('ain_draft_allocate_fund');
    showToast('Funds allocated successfully', 'success');
    addLog(`Allocated PKR ${valPKR} / USD ${valUSD} for ${allocationReason}`);
  };


  if (isAdding || isAllocating) {
    return (
      <div className="flex flex-col h-full bg-stone-50/50 rounded-tl-3xl shadow-sm border-l border-t border-stone-200/60 leading-tight relative p-4 md:p-8 overflow-hidden">
        <div className="shrink-0 flex items-center gap-4 mb-6">
          <button onClick={() => { setIsAdding(false); setIsAllocating(false); }} className="p-2 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h1 className="text-3xl font-semibold text-stone-900">{isAdding ? 'Add Funds' : 'Allocate Funds'}</h1>
            <p className="text-stone-500 text-base mt-1 font-medium">Fill in the details below to {isAdding ? 'record a new donation' : 'allocate funds'}.</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm flex flex-col overflow-hidden min-h-0 flex-1">
          <div className="flex-1 overflow-auto p-6 md:p-8">
            {isAdding ? (
                <form onSubmit={handleAddFunds} className="space-y-4 max-w-2xl mx-auto pb-12">

                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Donor Name</label>
                  <input type="text" required value={donorName} onChange={e => setDonorName(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="Name of donor" />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Amount (PKR)</label>
                      <input type="number" min="0" value={amountPKR} onChange={e => { setAmountPKR(e.target.value); if(!amountUSD && e.target.value) setAmountUSD((Number(e.target.value)/278).toFixed(2)) }} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="0.00" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Amount (USD)</label>
                      <input type="number" min="0" value={amountUSD} onChange={e => { setAmountUSD(e.target.value); if(!amountPKR && e.target.value) setAmountPKR((Number(e.target.value)*278).toFixed(0)) }} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="0.00" />
                    </div>
                </div>
                <div className="text-xs text-stone-500 flex justify-end">Available: Rs {funds.pkr.toLocaleString()} | $ {funds.usd.toLocaleString()}</div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                  <button type="button" onClick={handleSaveAddDraft} className="px-5 py-2.5 rounded-full font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors">Save Draft</button>
                  <button type="submit" className="px-5 py-2.5 rounded-full font-semibold text-white bg-[#004B36] hover:bg-[#003828] transition-colors">Add Donation</button>
                </div>

                </form>
            ) : (
                <form onSubmit={handleAllocateFunds} className="space-y-4 max-w-2xl mx-auto pb-12">

                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Allocation Reason / Destination</label>
                  <input type="text" required value={allocationReason} onChange={e => setAllocationReason(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="Where are these funds going?" />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Amount (PKR)</label>
                      <input type="number" min="0" value={amountPKR} onChange={e => { setAmountPKR(e.target.value); if(!amountUSD && e.target.value) setAmountUSD((Number(e.target.value)/278).toFixed(2)) }} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="0.00" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Amount (USD)</label>
                      <input type="number" min="0" value={amountUSD} onChange={e => { setAmountUSD(e.target.value); if(!amountPKR && e.target.value) setAmountPKR((Number(e.target.value)*278).toFixed(0)) }} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="0.00" />
                    </div>
                </div>
                <div className="text-xs text-stone-500 flex justify-end">Available: Rs {funds.pkr.toLocaleString()} | $ {funds.usd.toLocaleString()}</div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                  <button type="button" onClick={handleSaveAllocateDraft} className="px-5 py-2.5 rounded-full font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors">Save Draft</button>
                  <button type="submit" className="px-5 py-2.5 rounded-full font-semibold text-white bg-[#004B36] hover:bg-[#003828] transition-colors">Allocate Funds</button>
                </div>

                </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8 h-full flex flex-col tracking-tight relative p-4 md:p-8 overflow-hidden">
      <div className="shrink-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 flex items-center gap-2">Funds & Allocations
          </h1>
          <p className="text-stone-500 text-base mt-2 font-medium">Manage incoming donations and outgoing allocations.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setIsAdding(true); setAmountPKR(''); setAmountUSD(''); }}
            className="px-4 py-2 bg-[#004B36] hover:bg-[#003828] text-white rounded-full font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <ArrowDownRight size={16} /> Add Funds
          </button>
          <button 
            onClick={() => { setIsAllocating(true); setAmountPKR(''); setAmountUSD(''); }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 border border-stone-200 shadow-sm"
          >
            <ArrowUpRight size={16} /> Allocate Funds
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm flex flex-col overflow-hidden min-h-0 flex-1">
        <div className="p-4 border-b border-stone-100 shrink-0 bg-stone-50 flex gap-8">
            <div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Total PKR Available</div>
                <div className="text-2xl font-bold text-stone-900">Rs {funds.pkr.toLocaleString()}</div>
            </div>
            <div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Total USD Available</div>
                <div className="text-2xl font-bold text-stone-900">\$\{funds.usd.toLocaleString()}</div>
            </div>
        </div>

        <div className="flex-1 overflow-auto p-0">
          {funds.transactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10 border-b border-stone-200 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap">Details</th>
                  <th className="px-6 py-4 font-semibold text-stone-600 text-sm whitespace-nowrap text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {funds.transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-6 py-4 text-stone-600 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {tx.type === 'donation' ? (
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 tracking-wide uppercase">
                            Donation
                          </span>
                      ) : (
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-bold bg-stone-100 text-stone-700 tracking-wide uppercase">
                            Allocation
                          </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                        <div className="font-semibold text-stone-900 text-sm">
                            {tx.type === 'donation' ? `From: ${tx.donorName}` : `For: ${tx.reason}`}
                        </div>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${tx.type === 'donation' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'donation' ? '+' : '-'} {tx.amountPKR !== undefined ? (
                        (tx.amountPKR ? `Rs ${tx.amountPKR.toLocaleString()}` : '') + 
                        (tx.amountPKR && tx.amountUSD ? ' | ' : '') + 
                        (tx.amountUSD ? `$${tx.amountUSD.toLocaleString()}` : '')
                      ) : (
                        tx.currency === 'PKR' ? `Rs ${tx.amount?.toLocaleString()}` : `$${tx.amount?.toLocaleString()}`
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-stone-500 flex flex-col items-center">
              <Banknote size={48} className="text-stone-300 mb-4" />
              <p className="font-medium text-stone-600">No transactions recorded</p>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}