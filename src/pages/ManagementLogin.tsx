import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ManagementLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-serif">
            Management Portal
          </h2>
        </div>
        <button
           onClick={() => navigate('/management/dashboard')}
           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#004B36] hover:bg-[#003828] transition-colors duration-200"
        >
           Enter Management Portal
        </button>
      </div>
    </div>
  );
}
