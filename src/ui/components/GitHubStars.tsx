"use client";

import React, { useEffect, useState } from "react";
import { FeatherStar } from "@subframe/core";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/cartography-cncf/cartography');
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
      }
    };

    fetchStars();
  }, []);

  if (stars === null) return null;

  return (
    <div className="flex items-center gap-1">
      <FeatherStar className="h-4 w-4" />
      <span className="text-body font-body">{stars.toLocaleString()}</span>
    </div>
  );
} 