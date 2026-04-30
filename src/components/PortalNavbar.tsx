'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { RiSunLine, RiMoonLine, RiUserLine, RiArrowDownSLine, RiLogoutBoxLine } from 'react-icons/ri';
import { LiaUserCircle } from 'react-icons/lia';
import { IoIosArrowDropright } from 'react-icons/io';
import clsx from 'clsx';

const portalLinks = [
  { href: '/client-portal',          label: 'Home',     external: false },
  { href: '/client-portal/services', label: 'Services', external: false },
  { href: '/client-portal/products', label: 'Products', external: false },
  { href: '/client-portal/support',  label: 'Support',  external: false },
];

const morePortalLinks = [
  { href: '/client-portal/orders',  label: 'My Orders' },
  { href: '/client-portal/invoice', label: 'Invoice'   },
  { href: '/',                      label: 'Back to Personal Space' },
];

export default function PortalNavbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted]       = useState(false);
  const [moreOpen, setMoreOpen]     = useState(false);
  const [userOpen, setUserOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const moreRef    = useRef<HTMLDivElement>(null);
  const userRef    = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isMoreActive = morePortalLinks.some(
    ({ href }) => pathname === href || pathname.startsWith(href)
  );

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setMoreOpen(true);
  };
  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setMoreOpen(false), 100);
  };
  const handleUserEnter = () => {
    if (userTimer.current) clearTimeout(userTimer.current);
    setUserOpen(true);
  };
  const handleUserLeave = () => {
    userTimer.current = setTimeout(() => setUserOpen(false), 100);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full px-6 pt-4 pb-0">
      <nav
        className={clsx(
          'bg-[#0f0f0f] rounded-[20px] h-[80px] flex items-center shadow-2xl mx-auto transition-all duration-300 ease-in-out',
          scrolled ? 'max-w-[1000px] px-6' : 'max-w-full px-8'
        )}
      >
        {/* Logo */}
        <Link href="/client-portal" className="flex items-center gap-2 whitespace-nowrap shrink-0 group">
          <div className="relative h-8 w-20 overflow-hidden">
            <Image
              src="/logo.png"
              alt="izamhn"
              fill
              className="object-contain object-left absolute transition-all duration-300 ease-in-out translate-y-0 group-hover:-translate-y-full"
            />
            <Image
              src="/logo.png"
              alt="izamhn"
              fill
              className="object-contain object-left absolute transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0"
            />
          </div>
          <span className="text-[12px] font-medium text-white/40 bg-white/10 px-2 py-0.5 rounded-lg">portal</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-[28px] bg-white/20 mx-6 shrink-0" />

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 flex-1 min-w-0">
          {portalLinks.map(({ href, label, external }) => {
            const active = pathname === href || (href !== '/client-portal' && pathname.startsWith(href));
            const className = clsx(
              'px-3 py-2 rounded-xl text-[15px] font-medium transition-all duration-150 whitespace-nowrap shrink-0',
              active ? 'text-white' : 'text-white/60 hover:text-white',
            );
            return external ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
            ) : (
              <Link key={href} href={href} className={className}>{label}</Link>
            );
          })}

          {/* More dropdown */}
          <div ref={moreRef} className="relative shrink-0" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className={clsx(
              'flex items-center gap-1 px-3 py-2 rounded-xl text-[15px] font-medium transition-all duration-150',
              isMoreActive || moreOpen ? 'text-white' : 'text-white/60 hover:text-white',
            )}>
              More
              <RiArrowDownSLine size={15} className={clsx('opacity-60 transition-transform duration-200', moreOpen && 'rotate-180')} />
            </button>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1.5">
                {morePortalLinks.map(({ href, label }) => {
                  const active = pathname === href || pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMoreOpen(false)}
                      className={clsx(
                        'flex items-center px-4 py-2.5 text-[15px] font-medium transition-colors',
                        label === 'Back to Personal Space'
                          ? 'text-white/40 hover:text-white/60 border-t border-white/10 mt-1 pt-3'
                          : active ? 'text-white' : 'text-white/60 hover:text-white',
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'dark' ? <RiSunLine size={17} /> : <RiMoonLine size={17} />) : <RiSunLine size={17} />}
          </button>

          {/* User / Login */}
          {session?.user ? (
            <div ref={userRef} className="relative shrink-0" onMouseEnter={handleUserEnter} onMouseLeave={handleUserLeave}>
              <button className="group flex items-center gap-2.5 bg-white text-[#111] border-2 border-white rounded-xl px-4 py-[9px] text-[14px] font-semibold leading-none hover:bg-[#111] hover:text-white hover:border-white transition-all duration-200 whitespace-nowrap shrink-0 overflow-hidden">
                <span className="relative w-5 h-5 shrink-0 flex items-center justify-center">
                  {session.user.image ? (
                    <>
                      <img
                        src={session.user.image}
                        alt={session.user.name ?? ''}
                        className="absolute w-5 h-5 rounded-full object-cover transition-all duration-300 ease-in-out group-hover:-translate-x-5 group-hover:opacity-0"
                      />
                      <IoIosArrowDropright
                        size={20}
                        className="absolute transition-all duration-300 ease-in-out translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </>
                  ) : (
                    <>
                      <LiaUserCircle
                        size={20}
                        className="absolute transition-all duration-300 ease-in-out group-hover:-translate-x-5 group-hover:opacity-0"
                      />
                      <IoIosArrowDropright
                        size={20}
                        className="absolute transition-all duration-300 ease-in-out translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </>
                  )}
                </span>
                <span className="leading-none max-w-[100px] truncate">
                  {session.user.name?.split(' ')[0]}
                </span>
              </button>

              {userOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1.5">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-[14px] font-semibold text-white truncate">{session.user.name}</p>
                    <p className="text-[12px] text-white/40 truncate">{session.user.email}</p>
                    {session.user.role === 'admin' && (
                      <span className="mt-1 inline-block px-2 py-0.5 bg-orange-400/20 text-orange-400 text-[11px] font-semibold rounded-full">Admin</span>
                    )}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/client-portal' })}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[14px] font-medium text-white/60 hover:text-white transition-colors"
                  >
                    <RiLogoutBoxLine size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/client-portal/login"
              className="group flex items-center gap-2.5 bg-white text-[#111] border-2 border-white rounded-xl px-4 py-[9px] text-[14px] font-semibold leading-none hover:bg-[#111] hover:text-white hover:border-white transition-all duration-200 whitespace-nowrap shrink-0 overflow-hidden"
            >
              <span className="relative w-5 h-5 shrink-0 flex items-center justify-center">
                <LiaUserCircle
                  size={20}
                  className="absolute transition-all duration-300 ease-in-out group-hover:-translate-x-5 group-hover:opacity-0"
                />
                <IoIosArrowDropright
                  size={20}
                  className="absolute transition-all duration-300 ease-in-out translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </span>
              <span className="leading-none">Login Portal</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}