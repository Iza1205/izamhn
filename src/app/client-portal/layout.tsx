import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import SessionWrapper from '@/components/layout/SessionWrapper';
import ProgressBarProvider from '@/components/layout/ProgressBarProvider';
import PortalNavbar from '@/components/PortalNavbar';
import PortalNavbarMobile from '@/components/PortalNavbarMobile';

const onest = Onest({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Client Portal | izamhn',
  description: 'Explore my services and products, manage your orders, and access support all in one place.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={onest.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionWrapper>
          <ProgressBarProvider>
            <div className="hidden md:block">
              <PortalNavbar />
            </div>
            <div className="md:hidden">
              <PortalNavbarMobile />
            </div>
            <main className="px-0 py-10 pt-[10px] md:pt-[0px]">
              {children}
            </main>
          </ProgressBarProvider>
        </SessionWrapper>
      </ThemeProvider>
    </div>
  );
}