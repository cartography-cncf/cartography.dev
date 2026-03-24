"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/ui/components/Badge";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";

function Community() {

  return (
    <div className="container max-w-none flex w-full flex-col items-center gap-6 bg-default-background">
      <TopbarWithRightNav
        className="mobile:flex"
        leftSlot={
          <>
            <a href="/">
              <img
                className="h-6 flex-none object-cover"
                src="/images/topbar-logo.svg"
                alt="Cartography logo"
              />
            </a>
            <Badge variant="neutral">Cartography</Badge>
          </>
        }
        rightSlot={
          <div className="flex items-center justify-end gap-2 mobile:px-2 mobile:py-2">
            <a href="/">
              <TopbarWithRightNav.NavItem>About</TopbarWithRightNav.NavItem>
            </a>
            <a href="/blog">
              <TopbarWithRightNav.NavItem>Blog</TopbarWithRightNav.NavItem>
            </a>
            <a href="/community">
              <TopbarWithRightNav.NavItem selected={true}>Community</TopbarWithRightNav.NavItem>
            </a>
            <a href="https://cartography-cncf.github.io/cartography/">
              <TopbarWithRightNav.NavItem>Docs</TopbarWithRightNav.NavItem>
            </a>
          </div>
        }
      />
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col flex-wrap items-start justify-center gap-6 bg-default-background px-6 py-12">
          <span className="text-heading-1 font-heading-1 text-default-font text-center">
            Cartography community
          </span>
          <div className="flex max-w-[768px] flex-col flex-wrap items-start justify-center gap-6">
            <span className="text-body font-body text-default-font">
              Cartography is a CNCF Sandbox project and makes decisions fully in the open.
            </span>
          </div>
          <div className="flex max-w-[768px] flex-col flex-wrap items-start justify-center gap-6">
            <span className="text-body font-body text-default-font">
              Information on our community - such as monthly Zoom meetings and
              how to join the Slack channel - is kept up to date on the <a href="https://github.com/cartography-cncf/cartography/?tab=readme-ov-file#community" className="content-link">GitHub readme</a>.
            </span>
          </div>
          <div className="flex max-w-[768px] flex-col flex-wrap items-start justify-center gap-6">
            <span className="text-body font-body text-default-font">
              Security issues: see <a href="https://github.com/cartography-cncf/cartography/blob/master/SECURITY.md" className="content-link">here</a>.
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-start justify-center gap-6 bg-default-background px-6 py-12">
          <span className="text-heading-1 font-heading-1 text-default-font text-center">
            Commercial Support
          </span>
          <span className="text-body font-body text-default-font">
            See <a href="https://github.com/cartography-cncf/cartography/blob/master/SUPPORT.md" className="content-link">listing criteria</a>. Cartography follows the <a href="https://contribute.cncf.io/maintainers/community/vendor-neutrality/" className="content-link">CNCF vendor neutrality policy</a>.
          </span>
          <div className="flex flex-col items-center justify-center gap-6">
            <a
              href="https://subimage.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-[768px] flex-wrap items-center gap-4 rounded-lg bg-neutral-50 px-4 py-3 shadow-lg transition-all hover:shadow-xl hover:bg-neutral-100 mobile:rounded-lg mobile:bg-neutral-50"
            >
              <div className="flex grow shrink-0 basis-0 items-center gap-4">
                <Image
                  src="/images/subimage-logo.svg"
                  alt="SubImage"
                  width={160}
                  height={160}
                  className="h-40 w-40 flex-none object-contain"
                />
                <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color">
                  SubImage is a cloud security platform started by Cartography&#39;s creators. SubImage also offers Cartography deployment support, training, and consulting.
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community; 