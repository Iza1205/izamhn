import ProfileSection from '@/components/about/ProfileSection';
import AboutTabs from '@/components/about/AboutTabs';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto">
      <ProfileSection />
      <AboutTabs />
    </section>
  );
}