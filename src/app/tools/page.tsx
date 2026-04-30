'use client';

import { useState } from 'react';
import { RiSearchLine, RiCodeSSlashLine, RiBrushLine, RiVideoLine } from 'react-icons/ri';

type Tool = {
  name: string;
  description: string;
  category: 'Design' | 'Video' | 'Developer';
  icon: string;
};

const tools: Tool[] = [
  // Design
  {
    name: 'Photoshop',
    description: 'Photo editing & compositing for raster graphics and digital art.',
    category: 'Design',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
  },
  {
    name: 'Illustrator',
    description: 'Vector graphics editor for logos, icons, and scalable illustrations.',
    category: 'Design',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
  },
  {
    name: 'Affinity',
    description: 'Professional vector and raster design — a powerful Adobe alternative.',
    category: 'Design',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Affinity_Designer_icon_2022.svg',
  },
  {
    name: 'Canva',
    description: 'Quick online design for social media graphics and presentations.',
    category: 'Design',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
  },
  {
    name: 'Figma',
    description: 'Collaborative UI/UX design, prototyping, and design systems.',
    category: 'Design',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
  },
  // Video
  {
    name: 'CapCut',
    description: 'All-in-one video editor with AI-powered effects and transitions.',
    category: 'Video',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Capcut-logo.svg/2048px-Capcut-logo.svg.png',
  },
  {
    name: 'DaVinci Resolve',
    description: 'Professional video editing, color grading, and audio post-production.',
    category: 'Video',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/DaVinci_Resolve_17_logo.svg/2048px-DaVinci_Resolve_17_logo.svg.png',
  },
  // Developer
  {
    name: 'VS Code',
    description: 'Lightweight code editor with built-in Git and extension support.',
    category: 'Developer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg',
  },
  {
    name: 'GitHub',
    description: 'Version control platform for hosting and collaborating on code.',
    category: 'Developer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  },
  {
    name: 'Vercel',
    description: 'Frontend cloud for deploying web apps with instant global CDN.',
    category: 'Developer',
    icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
  },
  {
    name: 'Supabase',
    description: 'Open-source Firebase alternative with Postgres and real-time API.',
    category: 'Developer',
    icon: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png',
  },
  {
    name: 'Firebase',
    description: "Google's platform for real-time database, auth, and cloud functions.",
    category: 'Developer',
    icon: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg',
  },
  {
    name: 'TypeScript',
    description: 'Typed JavaScript superset for safer, more scalable codebases.',
    category: 'Developer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
  },
  {
    name: 'React',
    description: 'Component-based library for building fast, interactive UIs.',
    category: 'Developer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  },
  {
    name: 'Next.js',
    description: 'React framework with SSR, routing, and full-stack capabilities.',
    category: 'Developer',
    icon: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png',
  },
  {
    name: 'PostgreSQL',
    description: 'Reliable open-source relational database with full SQL support.',
    category: 'Developer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for building custom designs fast.',
    category: 'Developer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
  },
  {
    name: 'Prisma',
    description: 'Type-safe ORM for Node.js with auto-migrations and schema management.',
    category: 'Developer',
    icon: 'https://avatars.githubusercontent.com/u/17219288?s=200&v=4',
  },
];

const categories = ['All', 'Design', 'Video', 'Developer'] as const;
type Category = (typeof categories)[number];

const categoryMeta: Record<string, { icon: React.ReactNode }> = {
  Design:    { icon: <RiBrushLine size={12} /> },
  Video:     { icon: <RiVideoLine size={12} /> },
  Developer: { icon: <RiCodeSSlashLine size={12} /> },
};

const categoryOrder: Tool['category'][] = ['Design', 'Video', 'Developer'];

function groupByCategory(items: Tool[]) {
  return categoryOrder
    .map((cat) => ({ cat, items: items.filter((t) => t.category === cat) }))
    .filter((g) => g.items.length > 0);
}

/* ── Shared card components ── */

function MobileCard({ tool }: { tool: Tool }) {
  return (
    <div className="flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={tool.icon}
          alt={tool.name}
          className="w-7 h-7 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <p className="text-[12px] font-semibold text-neutral-800 dark:text-neutral-200 text-center leading-tight">
        {tool.name}
      </p>
    </div>
  );
}

function DesktopCard({ tool, showBadge = false }: { tool: Tool; showBadge?: boolean }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
        <img
          src={tool.icon}
          alt={tool.name}
          className="w-7 h-7 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
            {tool.name}
          </p>
          {showBadge && (
            <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 shrink-0">
              {categoryMeta[tool.category].icon}
              {tool.category}
            </span>
          )}
        </div>
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-1">
          {tool.description}
        </p>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [active, setActive] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const filtered = tools.filter((t) => {
    const matchCat = active === 'All' || t.category === active;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const isGrouped = active === 'All' && !search;
  const grouped = isGrouped ? groupByCategory(filtered) : null;

  return (
    <section className="max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Tools
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Apps, frameworks, and platforms I use daily for design, video, and development.
        </p>
      </div>

      {/* ── Search ── */}
      <div className="relative mb-4">
        <RiSearchLine
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-[14px] outline-none
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            text-neutral-900 dark:text-neutral-100
            placeholder-neutral-400 dark:placeholder-neutral-500"
        />
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? tools.length
              : tools.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => { setActive(cat); setSearch(''); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-colors
                ${active === cat
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
            >
              {cat !== 'All' && categoryMeta[cat].icon}
              {cat}
              <span className={`text-[11px] tabular-nums ${active === cat ? 'opacity-50' : 'text-neutral-400 dark:text-neutral-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex items-center justify-center h-40 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <p className="text-[14px] text-neutral-400 dark:text-neutral-500">No tools found.</p>
        </div>
      )}

      {/* ── Grouped (All tab) ── */}
      {grouped && (
        <div className="flex flex-col gap-10">
          {grouped.map(({ cat, items }) => (
            <div key={cat}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
                  {categoryMeta[cat].icon}
                  <span className="text-[12px] font-semibold uppercase tracking-widest">
                    {cat}
                  </span>
                </div>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
                <span className="text-[12px] text-neutral-400 dark:text-neutral-500 tabular-nums">
                  {items.length}
                </span>
              </div>

              {/* Mobile: 3-col icon grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:hidden">
                {items.map((tool) => <MobileCard key={tool.name} tool={tool} />)}
              </div>

              {/* Desktop: 2-col list */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-2.5">
                {items.map((tool) => <DesktopCard key={tool.name} tool={tool} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Filtered / search flat list ── */}
      {!grouped && filtered.length > 0 && (
        <>
          {/* Mobile: 3-col */}
          <div className="grid grid-cols-3 gap-2.5 sm:hidden">
            {filtered.map((tool) => <MobileCard key={tool.name} tool={tool} />)}
          </div>

          {/* Desktop: 2-col */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-2.5">
            {filtered.map((tool) => <DesktopCard key={tool.name} tool={tool} showBadge />)}
          </div>
        </>
      )}

    </section>
  );
}