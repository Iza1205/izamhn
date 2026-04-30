import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Iza Mahendra",
  description: "Tulisan seputar desain, konten, dan hal-hal yang aku pelajari.",
};

export const revalidate = 60;

export default async function BlogPage() {
  let blogs = [];

  try {
    const result = await prisma.blog.findMany({
      where: { status: "published" },
      orderBy: { published_at: "desc" },
      include: { tags: true },
    });
    blogs = JSON.parse(JSON.stringify(result));
  } catch {
    // Database tidak bisa diakses saat build, tampilkan kosong dulu
    blogs = [];
  }

  return <BlogClient blogs={blogs} />;
}