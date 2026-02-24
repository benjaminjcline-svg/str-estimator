"use client";

import { useState, useEffect, useCallback } from "react";

function getTimeOfDayOverlay(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) {
    return "linear-gradient(180deg, rgba(255,248,240,0.4) 0%, transparent 50%)";
  }
  if (hour >= 8 && hour < 17) {
    return "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%)";
  }
  if (hour >= 17 && hour < 20) {
    return "linear-gradient(180deg, rgba(255,235,215,0.5) 0%, transparent 50%)";
  }
  return "linear-gradient(180deg, rgba(225,230,245,0.5) 0%, transparent 50%)";
}

interface BackgroundImageProps {
  location?: string;
}

export function BackgroundImage({ location }: BackgroundImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<string>("");

  const fetchImage = useCallback(async (loc?: string) => {
    const params = loc ? `?location=${encodeURIComponent(loc)}` : "";
    try {
      const res = await fetch(`/api/background-image${params}`);
      const data = await res.json();
      setImageUrl(data.url ?? null);
    } catch {
      setImageUrl(null);
    }
  }, []);

  useEffect(() => {
    setOverlay(getTimeOfDayOverlay());
    fetchImage(location);
  }, [location, fetchImage]);

  if (!imageUrl) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-sky-soft"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="fixed inset-0 -z-10 paper-texture"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: "blur(28px) saturate(0.6) brightness(1.05)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(242,240,235,0.98) 0%, rgba(242,240,235,0.95) 30%, rgba(212,221,216,0.5) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: overlay }}
      />
    </div>
  );
}
