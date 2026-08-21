import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DOMPurify from 'dompurify';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(5, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError('');
    
    // Sanitize inputs to prevent XSS
    const sanitizedEmail = DOMPurify.sanitize(data.email);
    const sanitizedPassword = DOMPurify.sanitize(data.password);
    
    const success = await login(sanitizedEmail, sanitizedPassword);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setAuthError('Invalid credentials or too many attempts. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-neutral-50/50">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[#004B36]/10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004B36] font-display mb-2">
            Secure Admin Login
          </h2>
          <p className="text-[#004B36]/70 text-sm">
            Enter your credentials to access the management portal.
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 leading-relaxed">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#004B36] mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004B36]/40 w-5 h-5" />
              <input
                id="email"
                type="email"
                placeholder="admin@espafoundation.org"
                {...register('email')}
                className={`w-full pl-12 pr-4 py-3.5 bg-neutral-50 border rounded-2xl outline-none transition-all ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-[#004B36]/10 focus:border-[#004B36] focus:ring-4 focus:ring-[#004B36]/10'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#004B36] mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004B36]/40 w-5 h-5" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full pl-12 pr-4 py-3.5 bg-neutral-50 border rounded-2xl outline-none transition-all ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-[#004B36]/10 focus:border-[#004B36] focus:ring-4 focus:ring-[#004B36]/10'
                }`}
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#004B36] text-white py-4 rounded-2xl font-bold hover:bg-[#003828] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
