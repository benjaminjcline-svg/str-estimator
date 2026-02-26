"use client";

import { useState } from "react";

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-label-primary placeholder:text-label-tertiary transition-all duration-button ease-friction hover:border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20";

export type WaitlistFormProps = {
  sourcePath: string;
  /** "inline" = card on homepage (no modal title). "modal" = inside modal (with title and close). */
  mode: "inline" | "modal";
  onClose?: () => void;
};

export function WaitlistForm({ sourcePath, mode, onClose }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          property_address: propertyAddress.trim() || undefined,
          source_path: sourcePath,
          company: company || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error ?? "Something went wrong. Please try again.";
        setErrorMessage(data.details ? `${msg} ${data.details}` : msg);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (err) {
      const details = err instanceof Error ? err.message : "";
      setErrorMessage(details ? `Something went wrong. ${details}` : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={mode === "modal" ? "text-center py-4" : ""}>
        <p className="text-lg font-medium text-label-primary">
          You're on the list. We'll email you as soon as reports are live.
        </p>
        {mode === "modal" && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-6 px-5 py-2.5 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {mode === "modal" && (
        <>
          <h2 id="waitlist-modal-title" className="text-xl font-semibold text-label-primary mb-2 pr-8">
            Get notified when reports open
          </h2>
          <p className="text-sm text-label-secondary mb-6">
            Payments are temporarily unavailable while we complete standard business verification. Join the list and we'll email you when reports are live.
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="waitlist-email" className="block text-sm font-medium text-label-secondary">
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputBase}
            disabled={status === "submitting"}
            autoComplete="email"
          />
          <p className="text-xs text-label-tertiary">One email when reports are live. No spam.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="waitlist-address" className="block text-sm font-medium text-label-secondary">
            Property address <span className="font-normal text-label-tertiary">(optional)</span>
          </label>
          <input
            id="waitlist-address"
            type="text"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            placeholder="123 Main St, City, State"
            className={inputBase}
            disabled={status === "submitting"}
            autoComplete="street-address"
          />
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="waitlist-company">Company</label>
          <input
            id="waitlist-company"
            type="text"
            tabIndex={-1}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-rose-600" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-12 rounded-xl bg-accent text-white font-semibold transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 animate-loader-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Submitting…
            </span>
          ) : (
            "Notify me"
          )}
        </button>
      </form>
    </>
  );
}
