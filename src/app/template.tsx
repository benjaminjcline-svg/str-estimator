"use client";

import { useCallback, useEffect, useState } from "react";

const ANIM = "1.65s cubic-bezier(0.22, 1, 0.36, 1) forwards";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleAnimationEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "contentIn") setAnimationDone(true);
  }, []);

  const style = !mounted
    ? { opacity: 0, transform: "scale(0.98)", filter: "blur(8px)" as const }
    : animationDone
      ? { opacity: 1, transform: "scale(1)" }
      : { animation: `contentIn ${ANIM}` };

  return (
    <div className="min-h-full w-full" style={style} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  );
}
