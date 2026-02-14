import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug, getPostMeta } from "@/lib/blog";
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostMeta(params.slug);
  if (!post) return {};

  const title = `${post.title} | Cartography Blog`;
  const description = post.summary;

  return {
    title,
    description,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      siteName: "Cartography",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
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
                {post.authorUrl ? (
                  <a
                    href={post.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caption font-caption text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    {post.author}
                  </a>
                ) : (
                  <span className="text-caption font-caption text-subtext-color">
                    {post.author}
                  </span>
                )}
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
