export type Project = {
  slug: string;
  title: string;
  desc: string;
  longDesc: string;
  highlights: string[];
  tags: string[];
  category: string[];
  featured: boolean;
  emoji: string;
  color: string;
  image: string | null; // path dari /public, contoh: "/images/projects/workmates.png"
  liveUrl: string | null;
  githubUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "workmates",
    title: "WorkMates",
    desc: "WorkMates connects remote workers and digital nomads, helping you find and create co-working sessions at cafes and public spaces.",
    longDesc: `WorkMates was born from the frustration of working alone in cafes without knowing who else might want to co-work nearby. The app solves the real problem of remote workers feeling isolated despite being surrounded by people.\n\nBuilt with a real-time location layer on top of Firebase, the app lets you broadcast your presence at a specific venue, see who's nearby, and send a quick "join me?" ping. Sessions are ephemeral — they expire automatically so the data stays clean.`,
    highlights: [
      "Real-time presence with Firebase Realtime Database",
      "Google Maps integration for venue search",
      "Push notifications via Firebase Cloud Messaging",
      "Auth with NextAuth (Google + email)",
      "Responsive PWA — installable on mobile",
    ],
    tags: ["Next.js", "React.js", "Firebase", "NextAuth", "TailwindCSS", "TypeScript"],
    category: ["nextjs", "mobile", "featured"],
    featured: true,
    emoji: "🏠",
    color: "#e8e4ff",
    image: null, // ganti dengan "/images/projects/workmates.png" kalau sudah ada
    liveUrl: "https://workmates.example.com",
    githubUrl: "https://github.com/example/workmates",
  },
  {
    slug: "v1-portfolio",
    title: "v1.aulianza.com",
    desc: "Previously was aulianza.id. Personal website built originally from scratch using several powerful stacks.",
    longDesc: `This was my first serious personal website — originally at aulianza.id before moving to the .com domain. Built from scratch to learn Next.js App Router and to have a real place to share what I've learned.\n\nThe site features a blog with MDX, a project portfolio, a guestbook powered by Planetscale, and a tools section. Performance was a key focus — it consistently scores 95+ on Lighthouse.`,
    highlights: [
      "MDX-powered blog with syntax highlighting",
      "Guestbook with Prisma + PlanetScale",
      "Dark mode with system preference detection",
      "Edge-optimised with Next.js 13 App Router",
      "Animated page transitions",
    ],
    tags: ["Next.js", "React.js", "TypeScript", "TailwindCSS", "Prisma", "Firebase"],
    category: ["nextjs", "fullstack", "featured"],
    featured: true,
    emoji: "🌐",
    color: "#e0f0ff",
    image: null,
    liveUrl: "https://v1.aulianza.com",
    githubUrl: "https://github.com/aulianza/aulianza.id",
  },
  {
    slug: "landing-page",
    title: "aulianza.com",
    desc: "Personal landing page built with Next.js 13 App Router, TypeScript and Tailwind CSS.",
    longDesc: `The current iteration of my personal site — a cleaner, faster, and more focused version compared to v1. The goal was to have a single landing page that communicates who I am, what I do, and how to reach me in under 10 seconds.\n\nThe design is intentionally minimal, letting typography and whitespace do most of the heavy lifting. Built with Next.js 13 App Router and deployed on Vercel.`,
    highlights: [
      "Single-page layout with smooth scroll anchors",
      "Optimised Web Vitals — CLS 0, LCP < 1.2s",
      "Open Graph image auto-generation",
      "Framer Motion page transitions",
    ],
    tags: ["Next.js", "React.js", "TypeScript", "TailwindCSS"],
    category: ["nextjs", "featured"],
    featured: true,
    emoji: "✨",
    color: "#e8ffe4",
    image: null,
    liveUrl: "https://aulianza.com",
    githubUrl: "https://github.com/aulianza/aulianza.com",
  },
];

export const FILTERS = [
  { label: "All", value: "all" },
  { label: "Featured", value: "featured" },
  { label: "Next.js", value: "nextjs" },
  { label: "Mobile", value: "mobile" },
  { label: "Full Stack", value: "fullstack" },
];