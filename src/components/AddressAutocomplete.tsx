"use client";

import { useEffect, useRef, useState } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

interface GeoapifyFeature {
  properties?: { formatted?: string; address_line1?: string };
}

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-label-primary placeholder:text-label-tertiary transition-all duration-button ease-friction hover:border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "123 Main St, City, State",
  id,
  className,
}: AddressAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<GeocoderAutocomplete | null>(null);
  const onChangeRef = useRef(onChange);
  const [useFallback, setUseFallback] = useState(false);
  onChangeRef.current = onChange;

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    if (!apiKey || !containerRef.current || useFallback) return;

    let cancelled = false;

    const init = () => {
      if (cancelled || !containerRef.current) return;
      try {
        const instance = new GeocoderAutocomplete(
          containerRef.current,
          apiKey,
          {
            placeholder,
            lang: "en",
            limit: 5,
            countryCodes: ["us", "ca"],
            skipIcons: true,
          }
        );
        if (cancelled) return;

        autocompleteRef.current = instance;

        const handleSelect = (feature: GeoapifyFeature) => {
          const formatted =
            feature?.properties?.formatted ??
            feature?.properties?.address_line1;
          if (formatted) onChangeRef.current(formatted);
        };

        instance.on("select", handleSelect);

        // Safety: verify the input was actually added
        const timer = setTimeout(() => {
          if (cancelled) return;
          const hasInput = containerRef.current?.querySelector(".geoapify-autocomplete-input");
          if (!hasInput) {
            setUseFallback(true);
          }
        }, 300);
      } catch {
        setUseFallback(true);
      }
    };

    // Defer init to next tick so the container is fully in the DOM
    const t = setTimeout(init, 0);

    return () => {
      cancelled = true;
      clearTimeout(t);
      autocompleteRef.current?.off("select");
      autocompleteRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [placeholder, useFallback]);

  useEffect(() => {
    if (!useFallback && autocompleteRef.current && value !== undefined) {
      autocompleteRef.current.setValue(value);
    }
  }, [value, useFallback]);

  // Plain input fallback when autocomplete fails or no API key
  if (useFallback) {
    return (
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputBase} ${className ?? ""}`.trim()}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative address-autocomplete-wrapper w-full min-h-[3.25rem] ${className ?? ""}`.trim()}
      data-testid="address-autocomplete"
    />
  );
}
