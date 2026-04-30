"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiStar } from "react-icons/hi2";
import { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export default function PortfolioCard({ project }: Props) {
  const visibleTags = project.tags.slice(0, 4);
  const extraCount = project.tags.length - visibleTags.length;

  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl dark:hover:shadow-black/40">

        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl"
              style={{ background: project.color }}
            >
              <span>{project.emoji}</span>
            </div>
          )}

          {project.featured && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 text-xs font-medium px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700">
              <HiStar className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2 px-5 pt-5 flex-1">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
            {project.title}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-3 mt-auto">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-xs text-neutral-400 dark:text-neutral-500 py-1">
                +{extraCount}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-sm font-semibold transition-all group-hover:opacity-90">
            View Project
            <HiArrowRight className="w-4 h-4" />
          </div>
        </div>

      </article>
    </Link>
  );
}