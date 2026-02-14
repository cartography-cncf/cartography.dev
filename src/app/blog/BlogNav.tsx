"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/ui/components/Badge";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";

export function BlogNav() {
  return (
    <TopbarWithRightNav
      leftSlot={
        <>
          <a href="/">
            <Image
              className="h-6 flex-none object-cover"
              src="/images/topbar-logo.svg"
              alt="Cartography logo"
              width={24}
              height={24}
            />
          </a>
          <Badge variant="neutral">Cartography</Badge>
        </>
      }
      rightSlot={
        <div className="flex items-center justify-end gap-2 mobile:flex-row mobile:flex-nowrap mobile:items-center mobile:justify-end mobile:gap-2 mobile:px-2 mobile:py-2">
          <TopbarWithRightNav.NavItem>
            <a href="/">About</a>
          </TopbarWithRightNav.NavItem>
          <TopbarWithRightNav.NavItem selected={true}>
            <a href="/blog">Blog</a>
          </TopbarWithRightNav.NavItem>
          <TopbarWithRightNav.NavItem>
            <a href="/community">Community</a>
          </TopbarWithRightNav.NavItem>
          <TopbarWithRightNav.NavItem>
            <a href="https://cartography-cncf.github.io/cartography/">Docs</a>
          </TopbarWithRightNav.NavItem>
        </div>
      }
    />
  );
}
