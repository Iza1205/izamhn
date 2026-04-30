import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { RiArrowLeftLine, RiCalendarLine, RiTimeLine, RiEyeLine, RiShareLine } from "react-icons/ri";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  const post = await prisma.blog.findUnique({
    where: { slug, status: "published" },
    include: { tags: true },
  });
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blog.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Increment views (fire and forget)
  prisma.blog
    .update({
      where: { slug },
      data: { views: { increment: 1 } },
    })
    .catch(() => {});

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 mb-8 transition-colors"
      >
        <RiArrowLeftLine size={15} />
        Back to Blog
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 leading-tight max-w-4xl">
        {post.title}
      </h1>

      {/* 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── LEFT: main content ── */}
        <div className="flex-1 min-w-0">

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="mb-8 rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-100 dark:bg-neutral-800">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article content */}
          <article
            className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:rounded-xl prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* ── RIGHT: sidebar ── */}
        <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 flex flex-col gap-4">

          {/* Article Info */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
              Article Info
            </p>

            <div className="flex flex-col gap-3">
              {post.published_at && (
                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <RiCalendarLine size={16} className="shrink-0 text-neutral-400" />
                  {new Date(post.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}

              {post.read_time > 0 && (
                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <RiTimeLine size={16} className="shrink-0 text-neutral-400" />
                  {post.read_time} min read
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <RiEyeLine size={16} className="shrink-0 text-neutral-400" />
                {post.views.toLocaleString()} views
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="text-sm font-medium px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
              Share
            </p>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#5B4FCF' }}
            >
              <RiShareLine size={16} />
              Share Article
            </a>
          </div>

        </aside>
      </div>
    </main>
  );
}