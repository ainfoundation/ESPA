import React, { useState } from 'react';
import { Banknote, ArrowUpRight, ArrowDownRight, Plus, X } from 'lucide-react';
import DraggableModal from './DraggableModal';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => createPortal(children, document.body);

export default function FundsView({ funds, setFunds, addLog, showToast }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);
  
  const [donorName, setDonorName] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [amount, setAmount] = useState('');
  
  const [allocationReason, setAllocationReason] = useState('');

  const handleAddFunds = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;
    
    const newTransaction = {
      id: Date.now(),
      type: 'donation',
      donorName,
      currency,
      amount: numAmount,
      date: new Date().toISOString()
    };
    
    setFunds({
      ...funds,
      [currency.toLowerCase()]: funds[currency.toLowerCase()] + numAmount,
      transactions: [newTransaction, ...funds.transactions]
    });
    
    addLog(`Added ${currency} ${numAmount} donation from ${donorName}`);
    showToast('Funds added successfully', 'success');
    setIsAdding(false);
    setDonorName('');
    setAmount('');
  };

  const handleAllocateFunds = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;
    
    if (funds[currency.toLowerCase()] < numAmount) {
      showToast(`Insufficient ${currency} funds`, 'error');
      return;
    }
    
    const newTransaction = {
      id: Date.now(),
      type: 'allocation',
      reason: allocationReason,
      currency,
      amount: numAmount,
      date: new Date().toISOString()
    };
    
    setFunds({
      ...funds,
      [currency.toLowerCase()]: funds[currency.toLowerCase()] - numAmount,
      transactions: [newTransaction, ...funds.transactions]
    });
    
    addLog(`Allocated ${currency} ${numAmount} for ${allocationReason}`);
    showToast('Funds allocated successfully', 'success');
    setIsAllocating(false);
    setAllocationReason('');
    setAmount('');
  };

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
            onClick={() => { setIsAdding(true); setAmount(''); setCurrency('PKR'); }}
            className="px-4 py-2 bg-[#004B36] hover:bg-[#003828] text-white rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <ArrowDownRight size={16} /> Add Funds
          </button>
          <button 
            onClick={() => { setIsAllocating(true); setAmount(''); setCurrency('PKR'); }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 border border-stone-200 shadow-sm"
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
                    <td className={`px-6 py-4 text-right font-bold ${tx.type === 'donation' ? 'text-green-600' : 'text-stone-900'}`}>
                      {tx.type === 'donation' ? '+' : '-'}{tx.currency === 'PKR' ? 'Rs ' : '\$\ '}{tx.amount.toLocaleString()}
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

      {isAdding && (
        <Portal>
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" onClick={() => setIsAdding(false)} />
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
            <DraggableModal className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col pointer-events-auto animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <ArrowDownRight className="text-green-600" size={24} /> Add Funds
                </h3>
                <button onClick={() => setIsAdding(false)} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddFunds} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Donor Name</label>
                  <input type="text" required value={donorName} onChange={e => setDonorName(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="Name of donor" />
                </div>
                <div className="flex gap-4">
                    <div className="w-1/3">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Currency</label>
                      <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] bg-white">
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Amount</label>
                      <input type="number" required min="1" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="0.00" />
                    </div>
                </div>
                <button type="submit" className="w-full py-3 mt-4 bg-[#004B36] text-white rounded-xl font-semibold shadow-sm hover:bg-[#003828] transition-colors">
                  Add Donation
                </button>
              </form>
            </DraggableModal>
          </div>
        </Portal>
      )}

      {isAllocating && (
        <Portal>
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[190] animate-in fade-in duration-200" onClick={() => setIsAllocating(false)} />
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
            <DraggableModal className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col pointer-events-auto animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <ArrowUpRight className="text-stone-600" size={24} /> Allocate Funds
                </h3>
                <button onClick={() => setIsAllocating(false)} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAllocateFunds} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Allocation Reason / Destination</label>
                  <input type="text" required value={allocationReason} onChange={e => setAllocationReason(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="Where are these funds going?" />
                </div>
                <div className="flex gap-4">
                    <div className="w-1/3">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Currency</label>
                      <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36] bg-white">
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Amount</label>
                      <input type="number" required min="1" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#004B36] focus:ring-1 focus:ring-[#004B36]" placeholder="0.00" />
                    </div>
                </div>
                <div className="text-xs text-stone-500 flex justify-end">Available: {currency === 'PKR' ? 'Rs' : '$'} {funds[currency.toLowerCase()].toLocaleString()}</div>
                <button type="submit" className="w-full py-3 mt-4 bg-stone-900 text-white rounded-xl font-semibold shadow-sm hover:bg-stone-800 transition-colors">
                  Allocate Funds
                </button>
              </form>
            </DraggableModal>
          </div>
        </Portal>
      )}
    </div>
  );
}