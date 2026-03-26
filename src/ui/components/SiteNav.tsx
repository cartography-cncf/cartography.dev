"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/ui/components/Badge";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";
import { FeatherMenu, FeatherX } from "@subframe/core";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/community", label: "Community" },
  { href: "https://cartography-cncf.github.io/cartography/", label: "Docs" },
];

export function SiteNav({ currentPage }: { currentPage: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <TopbarWithRightNav
        leftSlot={
          <>
            <a href="/" className="flex items-center gap-2">
              <Image
                className="h-6 flex-none object-cover"
                src="/images/topbar-logo.svg"
                alt="Cartography logo"
                width={24}
                height={24}
              />
              <Badge variant="neutral">Cartography</Badge>
            </a>
          </>
        }
        rightSlot={
          <>
            <div className="flex items-center justify-end gap-2 mobile:hidden">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  <TopbarWithRightNav.NavItem selected={link.label === currentPage}>
                    {link.label}
                  </TopbarWithRightNav.NavItem>
                </a>
              ))}
            </div>
            <button
              className="hidden mobile:flex items-center justify-center p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FeatherX /> : <FeatherMenu />}
            </button>
          </>
        }
      />
      {mobileMenuOpen && (
        <div className="hidden mobile:flex w-full flex-col items-center gap-1 bg-neutral-50 px-4 py-3 rounded-lg shadow-md -mt-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="w-full">
              <TopbarWithRightNav.NavItem selected={link.label === currentPage}>
                {link.label}
              </TopbarWithRightNav.NavItem>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
