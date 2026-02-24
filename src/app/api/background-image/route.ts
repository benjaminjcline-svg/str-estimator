import { NextRequest, NextResponse } from "next/server";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80";

function extractLocationFromAddress(address: string): string | null {
  const trimmed = address.trim();
  if (!trimmed || trimmed.length < 3) return null;

  const parts = trimmed.split(",").map((p) => p.trim());
  const city = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  const region = parts.length >= 3 ? parts[parts.length - 1] : null;

  if (city && /^[a-zA-Z\s\-]+$/.test(city)) {
    return region ? `${city} ${region}` : city;
  }
  return trimmed.length > 10 ? trimmed : null;
}

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location");
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;

  const searchQuery = location
    ? extractLocationFromAddress(location) ?? location
    : null;

  if (!apiKey) {
    return NextResponse.json({
      url: DEFAULT_IMAGE,
      attribution: "Unsplash",
    });
  }

  if (!searchQuery) {
    return NextResponse.json({
      url: DEFAULT_IMAGE,
      attribution: "Unsplash",
    });
  }

  try {
    const query = encodeURIComponent(`${searchQuery} landmark scenic`);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({
        url: DEFAULT_IMAGE,
        attribution: "Unsplash",
      });
    }

    const data = (await res.json()) as {
      results?: Array<{ urls?: { regular?: string }; user?: { name?: string }; links?: { html?: string } }>;
    };

    const result = data.results?.[0];
    const url = result?.urls?.regular;

    if (!url) {
      return NextResponse.json({
        url: DEFAULT_IMAGE,
        attribution: "Unsplash",
      });
    }

    const sizedUrl = url.includes("?") ? `${url}&w=1920&q=80` : `${url}?w=1920&q=80`;
    return NextResponse.json({
      url: sizedUrl,
      attribution: result.user?.name ?? "Unsplash",
    });
  } catch {
    return NextResponse.json({
      url: DEFAULT_IMAGE,
      attribution: "Unsplash",
    });
  }
}
