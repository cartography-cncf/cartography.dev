import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogNav } from "./BlogNav";

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-default-background mobile:gap-12">
      <BlogNav />
      <div className="flex w-full max-w-[768px] flex-col items-center gap-12 px-6 mobile:px-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-heading-1 font-heading-1 text-default-font text-center">
            Blog
          </h1>
          <p className="text-body font-body text-subtext-color text-center max-w-[560px]">
            Project updates, technical deep dives, and community stories from the Cartography team.
          </p>
        </div>
        <div className="flex w-full flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex w-full flex-col gap-3 rounded-lg bg-neutral-50 px-6 py-6 shadow-lg transition-all hover:shadow-xl hover:bg-neutral-100"
            >
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
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-heading-2 font-heading-2 text-default-font hover:text-brand-700 transition-colors">
                  {post.title}
                </h2>
              </Link>
              {post.summary && (
                <p className="text-body font-body text-subtext-color">
                  {post.summary}
                </p>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="text-body font-body text-brand-700 hover:text-brand-800 transition-colors mt-1"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
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
