"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/ui/components/Badge";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";

function Community() {
  // Guidance: descriptions here should be short and plainly stated. No marketing speak.
  const [vendorCards, setVendorCards] = useState([
    {
      image: "/images/cloudanix-logo.svg",
      description: "CloudAnix is a cloud and code security platform.",
      website: "https://cloudanix.com"
    },
    {
      image: "/images/subimage-logo.svg",
      description: "SubImage is a cloud security platform started by Cartography's creators.",
      website: "https://subimage.io"
    }
  ]);

  useEffect(() => {
    // Randomize the order of vendor cards
    const shuffledCards = [...vendorCards].sort(() => Math.random() - 0.5);
    setVendorCards(shuffledCards);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container max-w-none flex w-full flex-col items-center gap-6 bg-default-background">
      <TopbarWithRightNav
        className="mobile:flex"
        leftSlot={
          <>
            <img
              className="h-6 flex-none object-cover"
              src="/images/topbar-logo.svg"
            />
            <Badge variant="neutral">Cartography</Badge>
          </>
        }
        rightSlot={
          <div className="flex items-center justify-end gap-2 mobile:px-2 mobile:py-2">
            <TopbarWithRightNav.NavItem>
              <a href="/">About</a>
            </TopbarWithRightNav.NavItem>
            <TopbarWithRightNav.NavItem selected={true}>
                <a href="community">Community</a>
            </TopbarWithRightNav.NavItem>
            <TopbarWithRightNav.NavItem>
                <a href="https://cartography-cncf.github.io/cartography/">Docs</a>
            </TopbarWithRightNav.NavItem>
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
            Commercial support and/or offerings built on Cartography
          </span>
          <span className="text-body font-body text-default-font">
            This list is ordered randomly on each page load. Cartography follows the <a href="https://contribute.cncf.io/maintainers/community/vendor-neutrality/" className="content-link">CNCF vendor neutrality policy</a>.
          </span>
          <div className="flex flex-col items-center justify-center gap-6">
            {vendorCards.map((card, index) => (
              <a 
                key={index} 
                href={card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full max-w-[768px] flex-wrap items-center gap-4 rounded-lg bg-neutral-50 px-4 py-3 shadow-lg transition-all hover:shadow-xl hover:bg-neutral-100 mobile:rounded-lg mobile:bg-neutral-50"
              >
                <div className="flex grow shrink-0 basis-0 items-center gap-4">
                  <Image
                    src={card.image}
                    alt={card.description}
                    width={160}
                    height={160}
                    className="h-40 w-40 flex-none object-contain"
                  />
                  <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color">
                    {card.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community; 