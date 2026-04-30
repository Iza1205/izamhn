'use client';

import { useState } from 'react';
import { RiBriefcaseLine, RiGraduationCapLine, RiAwardLine, RiMicLine } from 'react-icons/ri';
import ExperienceSection from '@/components/about/ExperienceSection';
import EducationSection from '@/components/about/EducationSection';
import CertificateSection from '@/components/about/CertificateSection';
import SpeakerSection from '@/components/about/SpeakerSection';

const tabs = [
  { key: 'experience',   label: 'Experience',   icon: RiBriefcaseLine,    component: ExperienceSection },
  { key: 'education',    label: 'Education',    icon: RiGraduationCapLine, component: EducationSection },
  { key: 'certificates', label: 'Certificates', icon: RiAwardLine,         component: CertificateSection },
  { key: 'speaker',      label: 'Speaker',      icon: RiMicLine,           component: SpeakerSection },
] as const;

type TabKey = typeof tabs[number]['key'];

export default function AboutTabs() {
  const [active, setActive] = useState<TabKey>('experience');

  const ActiveSection = tabs.find((t) => t.key === active)!.component;

  return (
    <div className="mb-8">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">

        {/* Tab bar */}
        <div className="flex items-center justify-center gap-5 p-2 border-b border-neutral-100 dark:border-neutral-800 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold whitespace-nowrap transition-all duration-150 ${
                active === key
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Active section content */}
        <div className="p-10">
          <ActiveSection />
        </div>

      </div>
    </div>
  );
}