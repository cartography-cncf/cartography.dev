"use client";

import React, { useEffect, useState } from "react";
import { FeatherStar } from "@subframe/core";

// Global state - fetch once, use everywhere
let globalStars: number | null = null;
let fetchPromise: Promise<void> | null = null;
const listeners = new Set<(stars: number | null) => void>();

const fetchStarsOnce = async (): Promise<void> => {
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const response = await fetch('https://api.github.com/repos/cartography-cncf/cartography');
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }
      const data = await response.json();
      if (data.stargazers_count && typeof data.stargazers_count === 'number') {
        globalStars = data.stargazers_count;
      }
    } catch (error) {
      console.error('Failed to fetch GitHub stars:', error);
      globalStars = null;
    }
    
    // Notify all components
    listeners.forEach(listener => listener(globalStars));
  })();
  
  return fetchPromise;
};

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(globalStars);

  useEffect(() => {
    // Add this component to listeners
    listeners.add(setStars);
    
    // If we don't have stars yet, fetch them
    if (globalStars === null && !fetchPromise) {
      fetchStarsOnce();
    }
    
    // Cleanup
    return () => {
      listeners.delete(setStars);
    };
  }, []);

  if (stars === null || stars === undefined) return null;

  return (
    <div className="flex items-center gap-1">
      <FeatherStar className="h-4 w-4" />
      <span className="text-body font-body">{stars.toLocaleString()}</span>
    </div>
  );
} 