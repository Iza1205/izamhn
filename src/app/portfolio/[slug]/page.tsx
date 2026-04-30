import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiCheckCircle } from "react-icons/hi2";
import { HiExternalLink } from "react-icons/hi";
import { FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Portfolio`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <section className="max-w-7xl mx-auto">
      {/* Back button */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 mb-8 hover:text-neutral-800 dark:hover:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">

        {/* ── Sidebar ───────────────────────────── */}
        <aside className="md:sticky md:top-24 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col gap-5">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h1>

          <hr className="border-neutral-100 dark:border-neutral-800" />

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              Description
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {project.desc}
            </p>
          </div>

          <hr className="border-neutral-100 dark:border-neutral-800" />

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-neutral-100 dark:border-neutral-800" />

          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
              Links
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white transition-colors"
              >
                <HiExternalLink className="w-4 h-4" />
                Live View
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-85 transition-opacity"
              >
                <FiGithub className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </aside>

        {/* ── Main Content ──────────────────────── */}
        <div>
          {/* Cover */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-8">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 75vw"
                priority
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-7xl"
                style={{ background: project.color }}
              >
                {project.emoji}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
              {project.title}
            </h2>

            {project.longDesc.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4"
              >
                {para}
              </p>
            ))}

            {project.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                  Highlights
                </h3>
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed"
                    >
                      <HiCheckCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}