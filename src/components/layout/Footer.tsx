'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiInstagramLine,
  RiTiktokLine,
  RiWhatsappLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from 'react-icons/ri';

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/portfolio',  label: 'Portfolio' },
  { href: '/blog',       label: 'Blog' },
  { href: '/guestbook',  label: 'Guestbook' },
  { href: '/contact',    label: 'Contact' },
];

const socials = [
  { icon: RiInstagramLine, href: 'https://instagram.com/izamhn',           label: 'Instagram' },
  { icon: RiTiktokLine,    href: 'https://tiktok.com/@izamhn',             label: 'TikTok' },
  { icon: RiTwitterXLine,  href: 'https://x.com/izamahendra',              label: 'X' },
  { icon: RiYoutubeLine,   href: 'https://www.youtube.com/@Izamhn/shorts', label: 'YouTube' },
  { icon: RiWhatsappLine,  href: 'https://wa.me/6282285559247',            label: 'WhatsApp' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/client-portal')) return null;

  return (
    <footer className="mx-4 md:mx-6 mb-4 md:mb-6 rounded-3xl bg-[#0f0f0f] overflow-hidden">
      <div className="px-6 py-8 md:px-10 md:py-10">

        {/* Top row — brand + nav */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-black text-[18px] tracking-tight">izamhn.</span>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-[220px]">
              Graphic Designer & Content Creator based in Jakarta.
            </p>
          </div>

          {/* Nav links — wrap on mobile, row on desktop */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/40 hover:text-white text-[13px] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/[0.06]" />

        {/* Bottom row — copyright + socials */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* Copyright */}
          <p className="text-white/20 text-[12px]">
            © {new Date().getFullYear()} Iza Mahendra. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}