'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { RiGoogleLine, RiMailLine, RiLockLine } from 'react-icons/ri';

export default function PortalLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/client-portal',
      redirect: false,
    });
    if (res?.error) {
      setError('Email atau password salah.');
      setLoading(false);
    } else if (res?.url) {
      window.location.href = res.url;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-[#111] rounded-[24px] p-10 w-full max-w-md border border-black/5 dark:border-white/5 text-center shadow-sm">
        <div className="mb-8">
          <p className="text-[13px] font-semibold text-black/30 dark:text-white/40 uppercase tracking-widest mb-3">izamhn portal</p>
          <h1 className="text-[28px] font-extrabold text-[#111] dark:text-white mb-2">
            Login to Portal
          </h1>
          <p className="text-[15px] text-black/50 dark:text-white/40">
            Login dengan akun Google kamu untuk mengakses client portal
          </p>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin} className="space-y-3 mb-4 text-left">
          <div className="relative">
            <RiMailLine size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-[12px] bg-[#f0f2f5] dark:bg-white/5 border border-black/5 dark:border-white/5 text-[14px] text-[#111] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#2d3b55]/30 dark:focus:ring-white/10 transition"
            />
          </div>
          <div className="relative">
            <RiLockLine size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-[12px] bg-[#f0f2f5] dark:bg-white/5 border border-black/5 dark:border-white/5 text-[14px] text-[#111] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#2d3b55]/30 dark:focus:ring-white/10 transition"
            />
          </div>
          {error && (
            <p className="text-[13px] text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3.5 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-[14px] text-[15px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          <span className="text-[12px] text-black/30 dark:text-white/30">atau</span>
          <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
        </div>

        {/* Google */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/client-portal' })}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-[#f0f2f5] dark:bg-white/5 border border-black/5 dark:border-white/10 text-[#111] dark:text-white rounded-[14px] text-[15px] font-semibold hover:opacity-80 transition-opacity"
        >
          <RiGoogleLine size={18} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}