import type { Metadata } from "next";
import Link from "next/link";
import { getAllWaitlistSignups } from "@/lib/waitlist-storage";

export const metadata: Metadata = {
  title: "Waitlist export",
  description: "Admin view and export waitlist signups.",
  robots: "noindex, nofollow",
};

type Props = { searchParams: Promise<{ token?: string }> };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function AdminWaitlistPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return (
      <main className="min-h-screen bg-surface p-6">
        <div className="max-w-lg mx-auto mt-12 p-6 rounded-2xl bg-surface-elevated border border-gray-200 shadow-card">
          <h1 className="text-2xl font-semibold text-label-primary mb-2">Waitlist export</h1>
          <p className="text-sm text-label-secondary">
            Admin export is not configured. Add <code className="bg-gray-100 px-1 rounded">ADMIN_TOKEN</code> in your
            Vercel project environment variables, then redeploy.
          </p>
          <Link href="/" className="inline-block mt-6 text-sm font-medium text-accent hover:text-accent-hover">
            ← Back to site
          </Link>
        </div>
      </main>
    );
  }

  if (!token || token !== adminToken) {
    return (
      <main className="min-h-screen bg-surface p-6">
        <div className="max-w-md mx-auto mt-12 p-6 rounded-2xl bg-surface-elevated border border-gray-200 shadow-card">
          <h1 className="text-2xl font-semibold text-label-primary mb-2">Waitlist export</h1>
          <p className="text-sm text-label-secondary mb-6">
            Enter your admin token to view and download the waitlist. You set this as <code className="bg-gray-100 px-1 rounded">ADMIN_TOKEN</code> in Vercel.
          </p>
          <form method="get" action="/admin/waitlist" className="space-y-4">
            <label htmlFor="token" className="block text-sm font-medium text-label-primary">
              Admin token
            </label>
            <input
              id="token"
              name="token"
              type="password"
              autoComplete="off"
              placeholder="Paste your ADMIN_TOKEN"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-label-primary placeholder:text-label-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-colors"
            >
              View waitlist
            </button>
          </form>
          <Link href="/" className="inline-block mt-6 text-sm font-medium text-accent hover:text-accent-hover">
            ← Back to site
          </Link>
        </div>
      </main>
    );
  }

  const signups = await getAllWaitlistSignups();
  const csvUrl = `/api/admin/waitlist?token=${encodeURIComponent(token)}`;

  return (
    <main className="min-h-screen bg-surface p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-label-primary">Waitlist signups</h1>
          <div className="flex items-center gap-3">
            <a
              href={csvUrl}
              download="waitlist-signups.csv"
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
            >
              Download CSV
            </a>
            <Link href="/" className="text-sm font-medium text-label-secondary hover:text-accent">
              ← Back to site
            </Link>
          </div>
        </div>

        <p className="text-sm text-label-secondary mb-6">
          {signups.length} signup{signups.length !== 1 ? "s" : ""}. Use the button above to download the full CSV.
        </p>

        <div className="rounded-2xl border border-gray-200 bg-surface-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="text-left py-3 px-4 font-semibold text-label-primary">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-label-primary">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-label-primary">Date</th>
                </tr>
              </thead>
              <tbody>
                {signups.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 px-4 text-center text-label-tertiary">
                      No signups yet.
                    </td>
                  </tr>
                ) : (
                  signups.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 px-4 text-label-primary">{s.email}</td>
                      <td className="py-3 px-4 text-label-secondary">{s.source_path || "—"}</td>
                      <td className="py-3 px-4 text-label-secondary">{formatDate(s.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
