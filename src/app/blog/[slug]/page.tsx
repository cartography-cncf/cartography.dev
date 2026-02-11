import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { BlogNav } from "../BlogNav";

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-default-background mobile:gap-12">
      <BlogNav />
      <article className="flex w-full max-w-[768px] flex-col items-start gap-8 px-6 mobile:px-4">
        <Link
          href="/blog"
          className="text-body font-body text-brand-700 hover:text-brand-800 transition-colors"
        >
          ← Back to blog
        </Link>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-heading-1 font-heading-1 text-default-font">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <time className="text-caption font-caption text-subtext-color">
              {formatDate(post.date)}
            </time>
            {post.author && (
              <>
                <span className="text-caption text-neutral-300">·</span>
                <span className="text-caption font-caption text-subtext-color">
                  {post.author}
                </span>
              </>
            )}
          </div>
        </div>
        <div
          className="prose prose-neutral max-w-none w-full"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <div className="flex flex-col items-center gap-16 px-12 pb-12">
        <span className="text-body font-body text-subtext-color text-center">
          2025 © Cartography Project Authors. All rights reserved. The Linux
          Foundation has registered trademarks and uses trademarks. For a list
          of trademarks of The Linux Foundation, please see our{" "}
          <a
            href="https://www.linuxfoundation.org/trademark-usage"
            target="_blank"
          >
            Trademark Usage page
          </a>
          .
        </span>
      </div>
    </div>
  );
}
