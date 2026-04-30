import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ToolsSection from '@/components/sections/ToolsSection';
import WhoAmISection from '@/components/sections/WhoAmISection';
import GitHubContributions from '@/components/sections/GitHubContributions';
import WakaTimeSection from '@/components/sections/WakaTimeSection';

export const metadata: Metadata = {
  title: 'Iza Mahendra | Graphic Designer',
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroSection />
      <ToolsSection />
      <WhoAmISection />
      <GitHubContributions />
      <WakaTimeSection />
    </div>
  );
}