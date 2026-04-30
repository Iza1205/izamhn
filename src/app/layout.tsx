import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import SessionWrapper from '@/components/layout/SessionWrapper';
import Navbar from '@/components/layout/Navbar';
import NavbarMobile from '@/components/layout/NavbarMobile';
import Footer from '@/components/layout/Footer';
import ProgressBarProvider from '@/components/layout/ProgressBarProvider';
import '@/styles/globals.css';

const onest = Onest({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: { default: 'Izamhn', template: '%s | Iza Mahendra' },
  description: 'Graphic Designer & Content Creator - Instagram & TikTok',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={onest.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionWrapper>
            <ProgressBarProvider>
              <div className="hidden md:block">
                <Navbar />
              </div>
              <div className="md:hidden">
                <NavbarMobile />
              </div>
              <main className="px-6 py-10 pt-[100px] md:pt-[125px]">
                {children}
              </main>
              <Footer />
            </ProgressBarProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}