'use client';

import {
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
} from 'react-icons/tb';
import { FiFigma } from 'react-icons/fi';
import {
  SiCanva,
  SiAffinitydesigner,
  SiPrisma,
  SiTypescript,
  SiSupabase,
  SiTailwindcss,
  SiPostgresql,
  SiFirebase,
} from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';
import { FaReact, FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';

type Tool = { name: string; Icon: IconType; color: string; bg: string };

const tools: Tool[] = [
  { name: 'Photoshop',         Icon: TbBrandAdobePhotoshop,   color: '#ffffff', bg: '#31A8FF' },
  { name: 'Illustrator',       Icon: TbBrandAdobeIllustrator, color: '#ffffff', bg: '#FF9A00' },
  { name: 'Figma',             Icon: FiFigma,                 color: '#ffffff', bg: '#F24E1E' },
  { name: 'Canva',             Icon: SiCanva,                 color: '#ffffff', bg: '#00C4CC' },
  { name: 'Affinity Designer', Icon: SiAffinitydesigner,      color: '#ffffff', bg: '#1B72BE' },
  { name: 'Prisma',            Icon: SiPrisma,                color: '#ffffff', bg: '#5A67D8' },
  { name: 'Next.js',           Icon: RiNextjsFill,            color: '#ffffff', bg: '#000000' },
  { name: 'TypeScript',        Icon: SiTypescript,            color: '#ffffff', bg: '#3178C6' },
  { name: 'React',             Icon: FaReact,                 color: '#ffffff', bg: '#20232a' },
  { name: 'Supabase',          Icon: SiSupabase,              color: '#ffffff', bg: '#3ECF8E' },
  { name: 'Tailwind CSS',      Icon: SiTailwindcss,           color: '#ffffff', bg: '#06B6D4' },
  { name: 'PostgreSQL',        Icon: SiPostgresql,            color: '#ffffff', bg: '#336791' },
  { name: 'Firebase',          Icon: SiFirebase,              color: '#ffffff', bg: '#F5820D' },
  { name: 'GitHub',            Icon: FaGithub,                color: '#ffffff', bg: '#24292E' },
];

function splitIntoRows(items: Tool[], rows: number): Tool[][] {
  const result: Tool[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => result[i % rows].push(item));
  return result;
}

const rowSpeeds = [55, 45, 65];
const rowDirections: ('left' | 'right')[] = ['left', 'right', 'left'];

function Pill({ name, Icon, color, bg }: Tool) {
  return (
    <div className="inline-flex items-center gap-2.5 border border-neutral-300/70 dark:border-white/10 rounded-full pl-1.5 pr-5 py-1.5 shrink-0 bg-white/30 dark:bg-white/5 backdrop-blur-md">
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        <Icon size={16} style={{ color }} />
      </span>
      <span className="text-[13px] md:text-[14px] font-semibold text-neutral-800 dark:text-white/80 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction, speed }: { items: Tool[]; direction: 'left' | 'right'; speed: number }) {
  const repeated = [...items, ...items, ...items, ...items];
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-2.5 w-max"
        style={{ animation: `${animationName} ${speed}s linear infinite` }}
      >
        {repeated.map((tool, i) => (
          <Pill key={`${tool.name}-${i}`} {...tool} />
        ))}
      </div>
    </div>
  );
}

export default function ToolsSection() {
  const rows = splitIntoRows(tools, 3);

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <section className="rounded-3xl px-6 py-8 md:px-10 md:py-10 overflow-hidden bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-neutral-300/70 dark:border-white/10">
        <div className="mb-7 md:mb-10">
          <h2 className="text-[26px] md:text-[38px] font-black text-neutral-900 dark:text-white leading-tight mb-2">
            What I work with
          </h2>
          <p className="text-neutral-500 dark:text-white/40 text-[14px] md:text-[18px] leading-relaxed max-w-lg">
            Tools and technologies I use to build things.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {rows.map((rowItems, i) => (
            <MarqueeRow
              key={i}
              items={rowItems}
              direction={rowDirections[i]}
              speed={rowSpeeds[i]}
            />
          ))}
        </div>
      </section>
    </>
  );
}