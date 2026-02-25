import { NextRequest, NextResponse } from "next/server";
import { getAllWaitlistSignups } from "@/lib/waitlist-storage";

function csvEscape(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : req.nextUrl.searchParams.get("token");
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const signups = await getAllWaitlistSignups();
  const header = "id,email,property_address,source_path,created_at,unsubscribed_at";
  const rows = signups.map(
    (s) =>
      [s.id, s.email, s.property_address ?? "", s.source_path, s.created_at, s.unsubscribed_at ?? ""]
        .map(csvEscape)
        .join(",")
  );
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="waitlist-signups.csv"',
    },
  });
}
