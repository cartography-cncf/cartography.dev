"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { FeatherSun, FeatherMoon, FeatherMonitor } from "@subframe/core";
import * as SubframeCore from "@subframe/core";

type Theme = "light" | "system" | "dark";

const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: "light", icon: <FeatherSun />, label: "Light" },
  { value: "system", icon: <FeatherMonitor />, label: "System" },
  { value: "dark", icon: <FeatherMoon />, label: "Dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-0.5 rounded-md bg-neutral-100 p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={SubframeCore.twClassNames(
            "flex h-7 items-center justify-center rounded-md px-2 py-1 transition-colors",
            theme === option.value
              ? "bg-white shadow-sm text-default-font dark:bg-[rgb(55,55,55)] dark:shadow-none"
              : "text-subtext-color hover:text-default-font"
          )}
          title={option.label}
          aria-label={`Switch to ${option.label} theme`}
        >
          <SubframeCore.IconWrapper className="text-[14px]">
            {option.icon}
          </SubframeCore.IconWrapper>
        </button>
      ))}
    </div>
  );
}
