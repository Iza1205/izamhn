'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { RiSunLine, RiMoonLine, RiUserLine, RiArrowDownSLine } from 'react-icons/ri';
import clsx from 'clsx';

const links = [
  { href: '/portfolio', label: 'Portfolio', external: false },
  { href: '/blog',      label: 'Blog',      external: false },
  { href: '/tools',     label: 'Tools',     external: false },
  { href: '/guestbook', label: 'Guestbook', external: false },
];

const moreLinks = [
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function NavbarMobile() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Tutup sheet saat navigasi
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock scroll saat sheet terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full px-6 pt-4 pb-0">
        <nav className="w-full bg-[#0f0f0f] rounded-[20px] px-5 h-[64px] flex items-center justify-between shadow-2xl">
          <Link href="/" className="relative h-8 w-20 shrink-0">
            <Image
              src="/logo.png"
              alt="izamhn"
              fill
              className="object-contain object-left"
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl"
            aria-label="Toggle menu"
          >
            <span className={clsx('block w-5 h-[2px] bg-white rounded-full transition-all duration-300', open && 'rotate-45 translate-y-[7px]')} />
            <span className={clsx('block w-5 h-[2px] bg-white rounded-full transition-all duration-300', open && 'opacity-0')} />
            <span className={clsx('block w-5 h-[2px] bg-white rounded-full transition-all duration-300', open && '-rotate-45 -translate-y-[7px]')} />
          </button>
        </nav>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom sheet */}
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f0f] rounded-t-[28px] transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Menu list */}
        <div className="px-5 pb-2 mt-2">
          {links.map(({ href, label, external }) => {
            const active = !external && (pathname === href || (href !== '/' && pathname.startsWith(href)));
            const className = clsx(
              'flex items-center py-3.5 text-[16px] font-medium border-b border-white/[0.06] transition-colors',
              active ? 'text-white' : 'text-white/40 hover:text-white'
            );
            return external ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className={className}>
                {label}
              </Link>
            );
          })}

          {/* More accordion */}
          <div>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className={clsx(
                'w-full flex items-center justify-between py-3.5 text-[16px] font-medium border-b border-white/[0.06] transition-colors',
                moreOpen ? 'text-white' : 'text-white/50 hover:text-white'
              )}
            >
              More
              <RiArrowDownSLine
                size={20}
                className={clsx('opacity-50 transition-transform duration-200', moreOpen && 'rotate-180')}
              />
            </button>

            {/* More items */}
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300',
                moreOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              {moreLinks.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'flex items-center pl-4 py-3 text-[15px] font-medium transition-colors',
                      active ? 'text-white' : 'text-white/40 hover:text-white'
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center gap-3 px-5 py-5">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />
            ) : <RiSunLine size={20} />}
          </button>

          <Link
            href="/client-portal"
            className="flex flex-1 items-center justify-center gap-2 bg-white text-[#111] rounded-2xl h-14 text-[16px] font-semibold hover:bg-white/90 transition-colors"
          >
            <RiUserLine size={18} />
            Client Portal
          </Link>
        </div>

        {/* Safe area spacer */}
        <div className="h-safe-bottom pb-5" />
      </div>
    </>
  );
}