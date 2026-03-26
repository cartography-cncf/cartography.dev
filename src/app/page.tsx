"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/ui/components/Badge";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";
import { Button } from "@/ui/components/Button";
import { FeatherPlay } from "@subframe/core";
import { FeatherPause } from "@subframe/core";
import { FeatherGithub } from "@subframe/core";
import { TopbarWithCenterNav } from "@/ui/components/TopbarWithCenterNav";
import { GitHubStars } from "@/ui/components/GitHubStars";

function About() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="container max-w-none flex w-full flex-col items-center gap-8 bg-default-background mobile:flex-col mobile:flex-nowrap mobile:gap-6">
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
      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-neutral-50 px-6 py-8 shadow-lg mobile:px-4 mobile:py-6">
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
        <div className="group relative w-full max-w-[768px]">
          <video
            ref={videoRef}
            className="w-full rounded-lg shadow-md"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/cartography_demo.mp4" type="video/mp4" />
          </video>
          <button
            onClick={toggleVideo}
            className="absolute bottom-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <span className="w-4 h-4">{isPlaying ? <FeatherPause /> : <FeatherPlay />}</span>
          </button>
        </div>
        <div className="flex items-center gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
          <Button
            size="large"
            icon={<FeatherPlay />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              window.location.href = 'https://cartography-cncf.github.io/cartography/';
            }}
          >
            View docs
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
        <div className="flex flex-col items-center gap-3">
          <span className="text-body font-body text-subtext-color text-center">
            We are a <a href="https://www.cncf.io/projects/cartography/" target="_blank" className="content-link">Cloud Native Computing Foundation Sandbox project</a>.
          </span>
          <Image
            className="w-full max-w-[160px] flex-none mobile:h-auto mobile:w-full mobile:max-w-[140px] mobile:flex-none"
            src="/images/cncf-logo.svg"
            alt="CNCF logo"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 bg-default-background px-6 mobile:px-4 mobile:py-0">
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
      <div className="flex flex-col flex-wrap items-center justify-center gap-3 bg-default-background px-6 py-2 mobile:px-4 mobile:py-1">
        <h2 className="text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-2 mobile:font-heading-2">
          Used by 70+ organizations
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 mobile:gap-3 max-w-4xl mx-auto">
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
            alt="Corelight logo"
            width={128}
            height={128}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/company2.png"
            alt="Bird logo"
            width={128}
            height={128}
          />
          <Image
            className="h-32 w-32 flex-none object-contain"
            src="/images/company3.svg"
            alt="Thought Machine logo"
            width={128}
            height={128}
          />
        </div>
      </div>


      <div className="flex w-full flex-col items-center gap-8 rounded-lg bg-neutral-50 px-6 py-12 shadow-lg mobile:px-4 mobile:py-8">
        <h2 className="text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-2 mobile:font-heading-2">
          Questions Cartography answers
        </h2>
        <div className="grid grid-cols-3 gap-4 max-w-4xl w-full mobile:grid-cols-1">
          <div className="rounded-lg bg-white border-l-4 border-brand-600 px-5 py-4">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Which identities have access to which datastores?
            </span>
          </div>
          <div className="rounded-lg bg-white border-l-4 border-brand-600 px-5 py-4">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Am I affected by critical vulnerabilities?
            </span>
          </div>
          <div className="rounded-lg bg-white border-l-4 border-brand-600 px-5 py-4">
            <span className="text-heading-3 font-heading-3 text-default-font">
              What are the network paths in and out of my environment?
            </span>
          </div>
          <div className="rounded-lg bg-white border-l-4 border-brand-600 px-5 py-4">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Which compute instances are exposed to the internet?
            </span>
          </div>
          <div className="rounded-lg bg-white border-l-4 border-brand-600 px-5 py-4">
            <span className="text-heading-3 font-heading-3 text-default-font">
              What AI agents are running in production, and what permissions do they have?
            </span>
          </div>
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