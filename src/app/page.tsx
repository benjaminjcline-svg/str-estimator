import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-surface flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <HomePage />
    </Suspense>
  );
}
