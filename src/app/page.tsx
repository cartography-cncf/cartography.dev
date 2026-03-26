"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/ui/components/Button";
import { FeatherPlay } from "@subframe/core";
import { FeatherBookOpen } from "@subframe/core";
import { FeatherPause } from "@subframe/core";
import { FeatherGithub } from "@subframe/core";
import { FeatherSlack } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { TopbarWithRightNav } from "@/ui/components/TopbarWithRightNav";
import { TopbarWithCenterNav } from "@/ui/components/TopbarWithCenterNav";
import { SiteNav } from "@/ui/components/SiteNav";
import { GitHubStars } from "@/ui/components/GitHubStars";

function highlightCypher(code: string) {
  const tokens: string[] = [];
  const placeholder = (html: string) => {
    const id = tokens.length;
    tokens.push(html);
    return `\x00T${id}T\x00`;
  };

  let result = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Properties first — before keywords can match inside them
  result = result.replace(/\{([^}]+)\}/g,
    (_, p) => `{${placeholder(`<span style="color:#fcd34d">${p}</span>`)}}`);
  result = result.replace(/\[:([A-Z_]+)\]/g,
    (_, t) => `[:${placeholder(`<span style="color:#fb7185">${t}</span>`)}]`);
  result = result.replace(/:([A-Z][A-Za-z0-9_]*)/g,
    (_, l) => `:${placeholder(`<span style="color:#38bdf8">${l}</span>`)}`);
  result = result.replace(/\b(MATCH|RETURN|WHERE|WITH|LIMIT|ORDER BY|CREATE|DELETE|SET|REMOVE|MERGE|OPTIONAL MATCH|UNWIND|AS|AND|OR|NOT|IN|IS|NULL|TRUE|FALSE|CASE|WHEN|THEN|ELSE|END)\b/gi,
    (m) => placeholder(`<span style="color:#a78bfa;font-weight:600">${m}</span>`));
  result = result.replace(/\b(\d+)\b/g,
    (m) => placeholder(`<span style="color:#34d399">${m}</span>`));

  result = result.replace(/\x00T(\d+)T\x00/g, (_, i) => tokens[parseInt(i)]);
  return result;
}

const questions = [
  {
    question: "Which identities have access to which datastores?",
    cypher: `MATCH (a:AWSRole)-[r:CAN_READ]->(b:S3Bucket)\nRETURN * LIMIT 30;`,
  },
  {
    question: "Am I affected by critical vulnerabilities?",
    cypher: `MATCH (c:CVE)-[r:AFFECTS]->(i:Image)\nRETURN * LIMIT 30;`,
  },
  {
    question: "What are the network paths in and out of my environment?",
    cypher: `MATCH (dns:DNSRecord)-[r:DNS_POINTS_TO]->(lb:LoadBalancer)--(c:ECSContainer)\nRETURN * LIMIT 30;`,
  },
  {
    question: "Which compute instances are exposed to the internet? How?",
    cypher: `MATCH p = (inst:EC2Instance{exposed_internet: true})\nMATCH p2 = (inst)-[:MEMBER_OF_EC2_SECURITY_GROUP]->(sg:EC2SecurityGroup)--(r:IpRule)\nRETURN * LIMIT 30;`,
  },
  {
    question: "What AI agents are running in production, and what permissions do they have?",
    cypher: `MATCH p = (a:AIAgent)-[:DETECTED_IN]->(img:ECRImage)--(:ECRImage)--(c:ECSContainer)\nMATCH p2 = (c)<-[:HAS_CONTAINER]-(t:ECSTask)--(:ECSTaskDefinition)--(rol:AWSRole)\nMATCH p3 = (rol)--(pol:AWSPolicy)--(stmt:AWSPolicyStatement)\nRETURN * LIMIT 3;`,
  },
];

function About() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);

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
      <SiteNav currentPage="About" />
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
            icon={<FeatherBookOpen />}
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
        <div className="flex items-center gap-2 text-body font-body text-subtext-color whitespace-nowrap mobile:text-caption mobile:font-caption mobile:gap-1.5">
          <span>Created at</span>
          <Image
            className="h-8 w-8 flex-none object-contain mobile:h-6 mobile:w-6"
            src="/images/lyft-logo.png"
            alt="Lyft logo"
            width={32}
            height={32}
          />
          <span>·</span>
          <span>Now a</span>
          <a href="https://www.cncf.io/projects/cartography/" target="_blank" className="content-link">
            <Image
              className="h-12 flex-none object-contain mobile:h-8"
              src="/images/cncf-logo.svg"
              alt="CNCF logo"
              width={120}
              height={48}
            />
          </a>
          <span>Sandbox project</span>
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
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl w-full mobile:flex-col">
          {questions.map((q, i) => (
            <div
              key={i}
              className="rounded-lg bg-white border-l-4 border-brand-600 px-5 py-4 w-[calc(50%-0.5rem)] mobile:w-full cursor-pointer transition-all hover:shadow-md"
              onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-body font-body text-default-font">
                  {q.question}
                </span>
                <span className="text-neutral-300 shrink-0 mt-0.5 w-4 h-4">
                  {expandedCard === i ? <FeatherChevronUp /> : <FeatherChevronDown />}
                </span>
              </div>
              {expandedCard === i && (
                <pre
                  className="mt-3 rounded-md px-4 py-3 text-sm leading-relaxed overflow-x-auto"
                  style={{ backgroundColor: "#1e1e2e", color: "#cdd6f4" }}
                  dangerouslySetInnerHTML={{ __html: highlightCypher(q.cypher) }}
                />
              )}
            </div>
          ))}
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
          <div className="flex items-center gap-4 mobile:flex-col mobile:gap-3">
            <Button
              size="large"
              icon={<FeatherSlack />}
              onClick={() => {
                window.location.href = 'https://communityinviter.com/apps/cloud-native/cncf';
              }}
            >
              #cartography on CNCF Slack
            </Button>
            <Button
              variant="neutral-secondary"
              size="large"
              icon={<FeatherCalendar />}
              onClick={() => {
                window.location.href = 'https://zoom-lfx.platform.linuxfoundation.org/meetings/cartography?view=week';
              }}
            >
              Monthly community meeting
            </Button>
          </div>
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