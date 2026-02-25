"use client";

import { useState } from "react";
import type { STRInput, PropertyType } from "@/lib/types";
import { AddressAutocomplete } from "./AddressAutocomplete";

interface STRFormProps {
  onSubmit: (email: string, input: STRInput) => Promise<void>;
  isSubmitting: boolean;
}

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-label-primary placeholder:text-label-tertiary transition-all duration-button ease-friction hover:border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function STRForm({ onSubmit, isSubmitting }: STRFormProps) {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("20");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyType, setPropertyType] = useState<PropertyType>("SFH");
  const [selfManaged, setSelfManaged] = useState(false);
  const [nightlyRate, setNightlyRate] = useState("");
  const [occupancy, setOccupancy] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawPrice = parseInt(purchasePrice.replace(/\D/g, ""), 10);
    const purchase_price = Number.isNaN(rawPrice) ? 0 : rawPrice;

    const downPct = parseFloat(downPayment);
    const down_payment_percent = Number.isNaN(downPct)
      ? 20
      : Math.max(0, Math.min(100, downPct));

    const ir = interestRate.trim() ? parseFloat(interestRate) : NaN;
    const interest_rate: number | "current market" =
      Number.isNaN(ir) ? "current market" : ir;

    const term = parseInt(loanTerm, 10);
    const loan_term = Number.isNaN(term) || term < 1 ? 30 : Math.max(15, Math.min(30, term));

    const nightRate = parseFloat(nightlyRate);
    const estimated_nightly_rate =
      nightlyRate.trim() !== "" && !Number.isNaN(nightRate) && nightRate > 0 ? nightRate : undefined;

    const occ = parseFloat(occupancy);
    const estimated_occupancy =
      occupancy.trim() !== "" && !Number.isNaN(occ) && occ >= 0 && occ <= 100 ? occ : undefined;

    const input: STRInput = {
      address: address.trim() || undefined,
      purchase_price,
      down_payment_percent,
      interest_rate,
      loan_term,
      property_type: propertyType,
      self_managed: selfManaged,
      estimated_nightly_rate,
      estimated_occupancy,
    };

    if (!input.purchase_price || input.purchase_price < 10000) {
      return;
    }

    await onSubmit(email, input);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPurchasePrice(raw ? parseInt(raw, 10).toLocaleString() : "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 overflow-visible isolation isolate">
      <div className="space-y-6 opacity-0 animate-slide-up overflow-visible relative z-[100]" style={{ animationFillMode: "forwards" }}>
        <h2 className="text-lg font-semibold text-label-primary tracking-tight">
          Your details
        </h2>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-label-secondary">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputBase}
          />
        </div>

        <div className="space-y-2 overflow-visible">
          <label htmlFor="address" className="block text-sm font-medium text-label-secondary">
            Address <span className="text-label-tertiary font-normal">(optional)</span>
          </label>
          {process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY ? (
            <AddressAutocomplete
              id="address"
              value={address}
              onChange={setAddress}
              placeholder="123 Main St, City, State"
            />
          ) : (
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, State"
              className={inputBase}
            />
          )}
        </div>
      </div>

      <div className="space-y-6 opacity-0 animate-slide-up relative z-0" style={{ animationFillMode: "forwards", animationDelay: "80ms" }}>
        <h2 className="text-lg font-semibold text-label-primary tracking-tight">
          Property & financing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-label-secondary">
              Purchase price
            </label>
            <input
              id="purchasePrice"
              type="text"
              required
              value={purchasePrice}
              onChange={handlePriceChange}
              placeholder="350,000"
              className={inputBase}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="downPayment" className="block text-sm font-medium text-label-secondary">
              Down payment %
            </label>
            <input
              id="downPayment"
              type="number"
              min="5"
              max="50"
              step="5"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className={inputBase}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="interestRate" className="block text-sm font-medium text-label-secondary">
              Interest rate %
            </label>
            <input
              id="interestRate"
              type="text"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Leave blank for market rate"
              className={inputBase}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="loanTerm" className="block text-sm font-medium text-label-secondary">
              Loan term (years)
            </label>
            <select
              id="loanTerm"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className={`${inputBase} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2386868b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
            >
              <option value="15">15 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-label-secondary">
            Property type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["SFH", "condo", "duplex"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPropertyType(type)}
                className={`px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-button ease-friction ${
                  propertyType === type
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-gray-200 bg-white text-label-secondary hover:border-gray-300 active:scale-[0.94]"
                }`}
              >
                {type === "SFH" ? "Single Family" : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={selfManaged}
            onClick={() => setSelfManaged(!selfManaged)}
            className={`relative w-12 h-7 rounded-full transition-all duration-card ease-friction ${
              selfManaged ? "bg-accent" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-all duration-card ease-friction ${
                selfManaged ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <label className="text-sm font-medium text-label-secondary cursor-pointer select-none">
            I plan to self-manage (no property manager)
          </label>
        </div>
      </div>

      <div className="space-y-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "160ms" }}>
        <h2 className="text-lg font-semibold text-label-primary tracking-tight">
          STR assumptions <span className="text-label-tertiary font-normal">(optional)</span>
        </h2>
        <p className="text-sm text-label-secondary -mt-2">
          Blank? We use conservative defaults. We cap the optimistic stuff either way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="nightlyRate" className="block text-sm font-medium text-label-secondary">
              Estimated nightly rate ($)
            </label>
            <input
              id="nightlyRate"
              type="number"
              min="50"
              max="2000"
              value={nightlyRate}
              onChange={(e) => setNightlyRate(e.target.value)}
              placeholder="e.g. 175"
              className={inputBase}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="occupancy" className="block text-sm font-medium text-label-secondary">
              Estimated occupancy %
            </label>
            <input
              id="occupancy"
              type="number"
              min="20"
              max="90"
              step="5"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
              placeholder="e.g. 60"
              className={inputBase}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 opacity-0 animate-slide-up space-y-4" style={{ animationFillMode: "forwards", animationDelay: "220ms" }}>
        <p className="text-sm text-label-secondary text-center">
          $49 one-time. No subscription. No upsell. No calls. No pressure.
        </p>
        <div className={`flex w-full transition-[justify-content] duration-300 ease-friction ${isSubmitting ? "justify-center" : "justify-stretch"}`}>
          <button
            type="submit"
            disabled={isSubmitting || !purchasePrice}
            className={`group relative h-14 overflow-hidden rounded-2xl bg-accent text-white font-semibold text-lg transition-all duration-300 ease-friction hover:bg-accent-hover active:bg-accent-pressed active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 flex items-center justify-center min-w-0 px-6 ${
              isSubmitting ? "w-14 rounded-full" : "w-full"
            }`}
          >
            <span
              className="transition-opacity duration-200"
              style={{ opacity: isSubmitting ? 0 : 1 }}
              aria-hidden={isSubmitting}
            >
              Stress-test this deal · $49
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
              style={{ opacity: isSubmitting ? 1 : 0 }}
              aria-hidden={!isSubmitting}
            >
              <svg className="w-6 h-6 animate-loader-spin" viewBox="0 0 24 24" fill="none" aria-label="Analyzing">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
        <p className="text-xs text-label-tertiary leading-relaxed text-center">
          By clicking above, you agree to our{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline">
            Terms of Service
          </a>
          {" "}and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline">
            Privacy Policy
          </a>
          , and understand this is not financial or investment advice.
        </p>
      </div>
    </form>
  );
}
