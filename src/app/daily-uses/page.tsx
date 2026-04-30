import type { Metadata } from 'next';
import { RiMacLine, RiSmartphoneLine, RiHeadphoneLine, RiCameraLine, RiAppStoreLine, RiArrowRightLine } from 'react-icons/ri';
import PageHeading from '@/components/elements/PageHeading';

export const metadata: Metadata = { title: 'Daily Uses' };

const hardware = [
  { icon: RiMacLine, name: 'MacBook Pro M2', desc: 'Main machine untuk desain & editing', tag: 'Primary' },
  { icon: RiSmartphoneLine, name: 'iPhone 15 Pro', desc: 'On-the-go content creation & editing', tag: 'Daily' },
  { icon: RiHeadphoneLine, name: 'AirPods Pro', desc: 'Focus mode & meetings', tag: 'Daily' },
  { icon: RiCameraLine, name: 'Sony ZV-E10', desc: 'Shooting konten video & foto', tag: 'Studio' },
];

const apps = [
  {
    category: 'Design',
    items: [
      { name: 'Figma', desc: 'Semua design work dimulai di sini' },
      { name: 'Adobe Illustrator', desc: 'Vector, logo, dan branding' },
      { name: 'Adobe Photoshop', desc: 'Editing foto dan compositing' },
      { name: 'Canva', desc: 'Quick design & social media template' },
    ],
  },
  {
    category: 'Content',
    items: [
      { name: 'CapCut', desc: 'Edit TikTok & Reels' },
      { name: 'Lightroom Mobile', desc: 'Color grading foto di HP' },
      { name: 'InShot', desc: 'Quick video edit mobile' },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { name: 'Notion', desc: 'Content calendar & project tracking' },
      { name: 'Apple Notes', desc: 'Quick notes & brainstorming' },
      { name: 'Google Drive', desc: 'File storage & sharing dengan klien' },
    ],
  },
];

export default function DailyUsesPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeading title="Daily Uses" description="Setup dan tools yang aku pakai setiap hari." />

      {/* Hardware */}
      <div>
        <p className="section-label">Hardware</p>
        <div className="ios-group">
          {hardware.map(({ icon: Icon, name, desc, tag }) => (
            <div key={name} className="ios-row">
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px]" style={{ color: 'var(--text-primary)' }}>{name}</p>
                <p className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
              </div>
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--fill-secondary)', color: 'var(--text-tertiary)' }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Apps by category */}
      {apps.map(({ category, items }) => (
        <div key={category}>
          <p className="section-label">{category} Apps</p>
          <div className="ios-group">
            {items.map(({ name, desc }) => (
              <div key={name} className="ios-row">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}
                >
                  <RiAppStoreLine size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px]" style={{ color: 'var(--text-primary)' }}>{name}</p>
                  <p className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
