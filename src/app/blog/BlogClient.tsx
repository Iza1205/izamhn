"use client";

import { useState } from "react";
import Link from "next/link";

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string | null;
  status: string;
  views: number;
  read_time: number;
  published_at: string | null;
  created_at: string;
  tags: Tag[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatViews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function BlogClient({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Blog
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Tulisan seputar desain, konten, dan hal-hal yang aku pelajari.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 w-full max-w-xs">
        <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
          <svg
            className="h-4 w-4 text-neutral-400 dark:text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari artikel..."
          className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredBlogs.length === 0 ? (
        <p className="text-sm text-neutral-500">
          {query
            ? `Tidak ada artikel untuk "${query}".`
            : "Belum ada artikel."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              {/* Thumbnail */}
              <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                {blog.thumbnail ? (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Meta */}
                <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400 dark:text-neutral-500">
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {formatDate(blog.published_at ?? blog.created_at)}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                    {blog.read_time} min read
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {formatViews(blog.views)} views
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-lg font-bold leading-snug text-neutral-900 dark:text-neutral-100">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {blog.excerpt}
                  </p>
                )}

                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
                >
                  Read Article
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}