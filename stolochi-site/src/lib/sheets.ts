import { type Service, type Testimonial, type GalleryItem } from "@/types";
import { parseCsv } from "./csv";

// ---------------------------------------------------------------------------
// Mock data — used when GOOGLE_SHEETS_SPREADSHEET_ID is not set (local dev)
// ---------------------------------------------------------------------------

const mockServices: Service[] = [
  {
    id: "bridal_hair",
    name: "Bridal Hair Styling",
    description: "Elegant updos, romantic waves, and custom bridal hairstyles. Includes consultation.",
    price: "$350.00",
    category: "hair design",
    active: true,
  },
  {
    id: "bridal_makeup",
    name: "Bridal Makeup Application",
    description: "Full bridal makeup, including lash application and skin prep. Includes trial.",
    price: "$300.00",
    category: "makeup design",
    active: true,
  },
  {
    id: "trial_hair",
    name: "Bridal Hair Trial",
    description: "Practice session for the desired wedding day hairstyle.",
    price: "$150.00",
    category: "hair design",
    active: true,
  },
  {
    id: "trial_makeup",
    name: "Bridal Makeup Trial",
    description: "Practice session for the desired wedding day makeup look.",
    price: "$130.00",
    category: "makeup design",
    active: true,
  },
  {
    id: "bridesmaid_hair",
    name: "Bridesmaid Hair Styling",
    description: "Styling for members of the bridal party. Simple or complex styles.",
    price: "$120.00",
    category: "hair design",
    active: true,
  },
  {
    id: "bridesmaid_makeup",
    name: "Bridesmaid Makeup",
    description: "Full makeup application for bridesmaids.",
    price: "$100.00",
    category: "makeup design",
    active: true,
  },
  {
    id: "mother_hair",
    name: "Mother of the Bride Hair",
    description: "Hair styling for the mothers.",
    price: "$90.00",
    category: "hair design",
    active: true,
  },
  {
    id: "lashes_add_on",
    name: "Luxury Lash Upgrade",
    description: "Upgrade to premium mink or volume lashes.",
    price: "$45.00",
    category: "add-on",
    active: true,
  },
  {
    id: "touch_up_kit",
    name: "Day-of Touch-Up Kit",
    description: "Includes lip color, powder, and blotting papers.",
    price: "$50.00",
    category: "retail",
    active: true,
  },
  {
    id: "engagement_makeup",
    name: "Engagement Shoot Makeup",
    description: "Makeup service for engagement photo sessions.",
    price: "$180.00",
    category: "makeup design",
    active: true,
  },
];

const mockTestimonials: Testimonial[] = [
  {
    id: "T001",
    name: "Jessica A.",
    location: "Austin, TX",
    quote:
      "The hair and makeup were absolutely flawless! I felt like a movie star. Highly recommend for any bride.",
    rating: 5,
    active: true,
  },
  {
    id: "T002",
    name: "Sarah M.",
    location: "San Diego, CA",
    quote:
      "My trial was perfect, and the wedding day results were even better. Professional, calming, and incredibly talented.",
    rating: 5,
    active: true,
  },
  {
    id: "T003",
    name: "Emily K.",
    location: "Dallas, TX",
    quote:
      "They handled my large bridal party with ease and everyone looked stunning. Best decision for wedding beauty!",
    rating: 4,
    active: true,
  },
  {
    id: "T004",
    name: "Chloe P.",
    location: "New York, NY",
    quote:
      "The artists were punctual and made the getting-ready process so much fun. My makeup lasted all night!",
    rating: 5,
    active: true,
  },
  {
    id: "T005",
    name: "Madison R.",
    location: "Miami, FL",
    quote:
      "I was nervous about finding the right style, but the consultation was so helpful. The final look was exactly what I dreamed of.",
    rating: 5,
    active: true,
  },
];

const mockGallery: GalleryItem[] = [
  {
    id: "G001",
    imageUrl: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80",
    caption: "Classic bridal updo with a diamond hairpiece and soft waves.",
    category: "Hair Styling",
    active: true,
  },
  {
    id: "G002",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    caption: "Glowing, natural bridal makeup look with a rosy lip.",
    category: "Makeup",
    active: true,
  },
  {
    id: "G003",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    caption: "Romantic half-up, half-down style for a garden wedding.",
    category: "Hair Styling",
    active: true,
  },
  {
    id: "G004",
    imageUrl: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=600&q=80",
    caption: "Full-glam makeup for a modern bride, including dramatic lashes.",
    category: "Makeup",
    active: true,
  },
  {
    id: "G005",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    caption: "Mother of the Bride elegant chignon and soft, timeless makeup.",
    category: "Party Styling",
    active: true,
  },
];

// ---------------------------------------------------------------------------
// Google Sheets helpers
//
// ponytail: one Sheets fetch per request, no cache, so the owner's spreadsheet
// edits show up on the next page load. Add `revalidate` + an R2 incremental
// cache if traffic ever makes that a cost or a rate-limit problem.
// ---------------------------------------------------------------------------

/**
 * Reads one tab of the sheet as rows, header row dropped.
 *
 * Uses Google's CSV export, which needs no API key or service account — only
 * that the sheet is shared as "anyone with the link". Returns [] when
 * unconfigured so callers fall back to the sample content above.
 */
async function getSheet(tab: string): Promise<string[][]> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) return [];

  const url =
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq` +
    `?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Sheet "${tab}" returned ${res.status} (is it link-shared?)`);
  }

  const rows = parseCsv(await res.text());
  return rows.slice(1); // drop the header row
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  let rows: string[][] = [];
  try {
    rows = await getSheet("Services");
  } catch (err) {
    console.warn("[sheets] getServices failed, using mock data:", (err as Error).message);
    return mockServices;
  }

  if (rows.length === 0) return mockServices;

  return rows
    .map((row) => ({
      id: row[0] ?? "",
      name: row[1] ?? "",
      description: row[2] ?? "",
      price: row[3] ?? "",
      category: row[4] ?? "",
      active: row[5]?.toUpperCase() === "TRUE",
    }))
    .filter((s) => s.active);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  let rows: string[][] = [];
  try {
    rows = await getSheet("Testimonials");
  } catch (err) {
    console.warn("[sheets] getTestimonials failed, using mock data:", (err as Error).message);
    return mockTestimonials;
  }

  if (rows.length === 0) return mockTestimonials;

  return rows
    .map((row) => ({
      id: row[0] ?? "",
      name: row[1] ?? "",
      location: row[2] ?? "",
      quote: row[3] ?? "",
      rating: parseInt(row[4] ?? "5", 10),
      active: row[5]?.toUpperCase() === "TRUE",
    }))
    .filter((t) => t.active);
}

export async function getGallery(): Promise<GalleryItem[]> {
  let rows: string[][] = [];
  try {
    rows = await getSheet("Gallery");
  } catch (err) {
    console.warn("[sheets] getGallery failed, using mock data:", (err as Error).message);
    return mockGallery;
  }

  if (rows.length === 0) return mockGallery;

  return rows
    .map((row) => ({
      id: row[0] ?? "",
      imageUrl: row[1] ?? "",
      caption: row[2] ?? "",
      category: row[3] ?? "",
      active: row[4]?.toUpperCase() === "TRUE",
    }))
    .filter((g) => g.active);
}
