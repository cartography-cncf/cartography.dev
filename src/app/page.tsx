"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/ui/components/Badge";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";
import { Button } from "@/ui/components/Button";
import { FeatherPlay } from "@subframe/core";
import { FeatherGithub } from "@subframe/core";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherDatabase } from "@subframe/core";
import { FeatherNetwork } from "@subframe/core";
import { FeatherShieldCheck } from "@subframe/core";
import { TopbarWithCenterNav } from "@/ui/components/TopbarWithCenterNav";
import { GitHubStars } from "@/ui/components/GitHubStars";

function About() {
  return (
    <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-default-background mobile:flex-col mobile:flex-nowrap mobile:gap-12">
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
            <a href="/">
              <TopbarWithRightNav.NavItem selected={true}>About</TopbarWithRightNav.NavItem>
            </a>
            <a href="/blog">
              <TopbarWithRightNav.NavItem>Blog</TopbarWithRightNav.NavItem>
            </a>
            <a href="/community">
              <TopbarWithRightNav.NavItem>Community</TopbarWithRightNav.NavItem>
            </a>
            <a href="https://cartography-cncf.github.io/cartography/">
              <TopbarWithRightNav.NavItem>Docs</TopbarWithRightNav.NavItem>
            </a>
          </div>
        }
      />
      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-neutral-50 px-6 py-24 shadow-lg mobile:px-4 mobile:py-12">
        <div className="flex w-full max-w-[768px] flex-col items-center gap-4">
          <Image
            className="w-full max-w-[448px] flex-none mobile:h-auto mobile:w-full mobile:max-w-[320px] mobile:flex-none"
            src="/images/cartography-logo.svg"
            alt="Cartography logo"
            width={448}
            height={448}
            priority
          />
          <h1 className="text-heading-3 font-heading-3 text-neutral-400 text-center mobile:text-body mobile:font-body">
            Cartography: Open Source Infrastructure Mapping Tool
          </h1>
        </div>
        <div className="flex items-center gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
          <Button
            size="large"
            icon={<FeatherPlay />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              window.location.href = 'https://cartography-cncf.github.io/cartography/install.html';
            }}
          >
            Run locally
          </Button>
          <Button
            variant="neutral-secondary"
            size="large"
            icon={<FeatherGithub />}
            iconRight={<GitHubStars />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              window.location.href = 'https://github.com/cartography-cncf/cartography';
            }}
          >
            View on GitHub
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-8 bg-default-background px-6 mobile:px-4 mobile:py-0">
        <h2 className="text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-2 mobile:font-heading-2">
          Created at
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-8">
          <Image
            className="h-12 w-12 flex-none object-contain"
            src="/images/lyft-logo.png"
            alt="Lyft logo"
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-6 bg-default-background px-6 py-12 mobile:px-4 mobile:py-12">
        <h2 className="text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-2 mobile:font-heading-2">
          Used by
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-7 mobile:gap-4 max-w-4xl mx-auto">
          <Image
            className="h-16 w-16 flex-none object-contain"
            src="/images/lyft-logo.png"
            alt="Lyft logo"
            width={64}
            height={64}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/intel-logo.png"
            alt="Intel logo"
            width={128}
            height={128}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/foursquare-logo.png"
            alt="Foursquare logo"
            width={128}
            height={128}
          />
          <Image
            className="h-24 w-24 flex-none object-contain"
            src="/images/seatgeek-logo.png"
            alt="SeatGeek logo"
            width={96}
            height={96}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/company1.png"
            alt="Company 1 logo"
            width={128}
            height={128}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/company2.png"
            alt="Company 2 logo"
            width={128}
            height={128}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/company3.svg"
            alt="Company 3 logo"
            width={128}
            height={128}
          />
        </div>
        <span className="text-heading-2 font-heading-2 text-default-font text-center mobile:text-heading-3 mobile:font-heading-3">
          and many, many others.
        </span>
      </div>


      <div className="flex flex-col flex-wrap items-center justify-center gap-8  mt-4 px-6 mobile:px-4 mobile:py-0">
          <span className="text-body font-body text-subtext-color text-center">
            We are a <a href="https://www.cncf.io/projects/cartography/" target="_blank" className="content-link">Cloud Native Computing Foundation Sandbox project</a>.
          </span>
          <Image
            className="w-full max-w-[200px] flex-none mobile:h-auto mobile:w-full mobile:max-w-[192px] mobile:flex-none"
            src="/images/cncf-logo.svg"
            alt="CNCF logo"
            width={200}
            height={200}
          />
        </div>

      <div className="flex flex-col flex-wrap items-center justify-center gap-8 rounded-lg bg-neutral-50 px-6 py-12 shadow-lg mobile:px-4 mobile:py-12">
        <div className="flex flex-col flex-wrap items-start justify-center gap-8">
          <h2 className="text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-2 mobile:font-heading-2">
            Why Cartography?
          </h2>
        </div>
        <div className="flex max-w-[768px] flex-col flex-wrap items-start justify-center gap-8">
          <span className="text-body font-body text-subtext-color">
            Cartography lets you explore your infra in a visual way. It is very
            good at exposing otherwise hidden dependency relationships between
            your assets so that you may validate assumptions about security
            risks.
          </span>
          <span className="text-body font-body text-subtext-color">
            Service owners can generate asset reports, Red Teamers can discover
            attack paths, and Blue Teamers can identify areas for security
            improvement. All can benefit from using the graph for manual
            exploration through a web frontend interface, or in an automated
            fashion by calling the APIs.
          </span>
          <span className="text-body font-body text-subtext-color">
            Cartography was originally created by the security team at Lyft.
            You can read about its origin story <a href="https://eng.lyft.com/cartography-joins-the-cncf-6f6b7be099a7" target="_blank" className="content-link">here</a>.
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-8 rounded-lg bg-neutral-50 px-6 py-12 shadow-lg mobile:flex-col mobile:flex-wrap mobile:gap-8 mobile:px-4 mobile:py-12">
        <div className="flex grow shrink-0 basis-0 flex-wrap items-start justify-center gap-8">
          <div className="flex min-w-[208px] grow shrink-0 basis-0 flex-col items-start gap-4 mobile:h-auto mobile:min-w-[0px] mobile:grow mobile:shrink-0 mobile:basis-0">
            <IconWithBackground size="large" icon={<FeatherDatabase />} />
            <span className="text-heading-2 font-heading-2 text-default-font">
              Discover assets
            </span>
            <span className="text-body font-body text-subtext-color">
              Automatically discover all your cloud resources across providers
              and regions.
            </span>
          </div>
        </div>
        <div className="flex min-w-[208px] grow shrink-0 basis-0 flex-col items-start gap-4 mobile:h-auto mobile:w-full mobile:min-w-[0px] mobile:flex-none">
          <IconWithBackground
            variant="success"
            size="large"
            icon={<FeatherNetwork />}
          />
          <span className="text-heading-2 font-heading-2 text-default-font">
            Map dependencies
          </span>
          <span className="text-body font-body text-subtext-color">
            Visualize relationships between services, resources, and
            infrastructure components.
          </span>
        </div>
        <div className="flex min-w-[208px] grow shrink-0 basis-0 flex-col items-start gap-4 mobile:h-auto mobile:w-full mobile:min-w-[0px] mobile:flex-none">
          <IconWithBackground
            variant="warning"
            size="large"
            icon={<FeatherShieldCheck />}
          />
          <span className="text-heading-2 font-heading-2 text-default-font">
            Find security issues
          </span>
          <span className="text-body font-body text-subtext-color">
            Identify risks and compliance issues through analysis and data
            enrichment.
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-12 rounded-lg bg-neutral-50 px-6 py-12 shadow-lg">
        <div className="flex flex-col flex-wrap items-start justify-center gap-8">
          <span className="text-heading-1 font-heading-1 text-default-font text-center">
            Featured blogs and case studies
          </span>
        </div>
        <div className="flex max-w-[768px] flex-col flex-wrap items-start justify-center gap-8">
          <span className="text-body font-body text-subtext-color">
            <a href="https://eng.lyft.com/iam-whatever-you-say-iam-febce59d1e3b" target="_blank" className="content-link">IAM Whatever you say IAM</a>: using cartography to see who has access to
            what
          </span>
          <span className="text-body font-body text-subtext-color">
            <a href="https://blog.marcolancini.it/2020/blog-mapping-moving-clouds-with-cartography/" target="_blank" className="content-link">Mapping Moving Clouds:
            How to stay on top of your ephemeral environments with Cartography</a>
          </span>
          <span className="text-body font-body text-subtext-color">
            <a href="https://eng.lyft.com/vulnerability-management-at-lyft-enforcing-the-cascade-part-1-234d1561b994" target="_blank" className="content-link">Vulnerability Management at Lyft: Enforcing the Cascade</a>
          </span>
          <span className="text-body font-body text-subtext-color">
            <a href="https://eng.lyft.com/cartography-joins-the-cncf-6f6b7be099a7" target="_blank" className="content-link">Cartography joins the CNCF</a>
          </span>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center gap-12">
          <span className="text-heading-1 font-heading-1 text-default-font text-center">
            Conference talks
          </span>
        </div>
        <div className="flex max-w-[768px] flex-col flex-wrap items-start justify-center gap-8">
          <span className="text-body font-body text-subtext-color">
            <a href="https://www.youtube.com/watch?v=ZukUmZSKSek" target="_blank" className="content-link">Cartography: automating security visibility and democratization (BSides 2019):</a>
          </span>
          <span className="text-body font-body text-subtext-color">
            <a href="https://www.youtube.com/watch?v=ZwMSkFzgiFc" target="_blank" className="content-link">Cartography: using graphs to improve and scale security decision making (CNCF Security Day 2020):</a>            
          </span>
          <span className="text-body font-body text-subtext-color">
            <a href="https://www.youtube.com/watch?v=F4EFHK21Et0" target="_blank" className="content-link">Container vuln management with minimal burnout (BSidesSF2023):</a>
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-neutral-50 px-6 py-24 shadow-lg mobile:px-4 mobile:py-12">
        <div className="flex w-full max-w-[768px] flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-2 mobile:font-heading-2">
              Join Our Community
            </h2>
            <span className="text-body font-body text-subtext-color text-center">
              View source, read our discussions, join our Slack
            </span>
          </div>
          <Button
            size="large"
            icon={<FeatherGithub />}
            iconRight={<GitHubStars />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              window.location.href = 'https://github.com/cartography-cncf/cartography';
            }}
          >
            View on GitHub
          </Button>
        </div>
      </div>
      <TopbarWithCenterNav
        centerSlot={
          <>
            <div className="flex items-start gap-4">
              <a href="/">
                <TopbarWithRightNav.NavItem selected={true}>About</TopbarWithRightNav.NavItem>
              </a>
            </div>
            <div className="flex items-center justify-end gap-2">
              <a href="/blog">
                <TopbarWithRightNav.NavItem>Blog</TopbarWithRightNav.NavItem>
              </a>
              <a href="/community">
                <TopbarWithRightNav.NavItem>Community</TopbarWithRightNav.NavItem>
              </a>
              <a href="https://cartography-cncf.github.io/cartography/">
                <TopbarWithRightNav.NavItem>Docs</TopbarWithRightNav.NavItem>
              </a>
            </div>
          </>
        }
      />
      <div className="flex flex-col items-center gap-16 px-12 pb-12">
        <span className="text-body font-body text-subtext-color text-center">
          2025 © Cartography Project Authors. All rights reserved. The Linux
          Foundation has registered trademarks and uses trademarks. For a list
          of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage" target="_blank">Trademark Usage page</a>.
        </span>
      </div>
    </div>
  );
}

export default About; 