"use client";

import { useState } from "react";
import { projects, FILTERS } from "@/data/projects";
import PortfolioCard from "@/components/elements/PortfolioCard";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section className="max-w-7xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Portfolio
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Things I&apos;ve built, shipped, and learned from open source projects,
          client work, and everything in between.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-150 ${
              activeFilter === f.value
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-neutral-400 dark:text-neutral-500 text-sm">
          No projects found for this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}