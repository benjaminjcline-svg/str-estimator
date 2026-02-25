/**
 * Cron endpoint to refresh the daily STR brief.
 * Fetches feeds, generates one daily synthesis article (top 200 NA cities focus),
 * primes the cache, and revalidates. Call daily via Vercel Cron.
 * GET with ?secret=CRON_SECRET to prevent abuse.
 */

import { getCachedDailyArticle, getTodayDateString } from "@/lib/content-engine/brief-service";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = process.env.CRON_SECRET;

  if (secret && searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = getTodayDateString();
    const article = await getCachedDailyArticle(today);
    revalidatePath("/learn");
    revalidatePath("/learn/brief");
    revalidatePath(`/learn/brief/${today}`);
    return NextResponse.json({
      ok: true,
      date: today,
      articleGenerated: !!article,
      fetchedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[fetch-brief]", e);
    return NextResponse.json(
      { error: "Failed to fetch and generate brief" },
      { status: 500 }
    );
  }
}
