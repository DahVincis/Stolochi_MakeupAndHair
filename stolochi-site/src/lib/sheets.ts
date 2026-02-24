import { type Service, type Testimonial, type GalleryItem } from "@/types";

// ---------------------------------------------------------------------------
// Mock data — used when GOOGLE_SHEETS_SPREADSHEET_ID is not set (local dev)
// ---------------------------------------------------------------------------

const mockServices: Service[] = [
  {
    id: "1",
    name: "Bridal Makeup",
    description:
      "Full glam bridal makeup tailored to your vision. Includes trial session, skin prep, and all-day wear products.",
    price: "Starting at $250",
    category: "Bridal",
    active: true,
  },
  {
    id: "2",
    name: "Bridal Hair",
    description:
      "Elegant updo, half-up, or soft waves designed to complement your dress and venue.",
    price: "Starting at $200",
    category: "Bridal",
    active: true,
  },
  {
    id: "3",
    name: "Bridal Package (Makeup + Hair)",
    description:
      "Complete bridal beauty package — makeup and hair together for a cohesive, stunning look on your big day.",
    price: "Starting at $400",
    category: "Bridal",
    active: true,
  },
  {
    id: "4",
    name: "Bridesmaid Makeup",
    description:
      "Beautiful makeup for your wedding party. Group rates available for three or more.",
    price: "Starting at $120",
    category: "Bridal Party",
    active: true,
  },
  {
    id: "5",
    name: "Bridesmaid Hair",
    description:
      "Styled hair for bridesmaids to complement the bridal look. Group rates available.",
    price: "Starting at $100",
    category: "Bridal Party",
    active: true,
  },
  {
    id: "6",
    name: "Special Occasion Makeup",
    description:
      "Look flawless for prom, galas, photoshoots, or any special event.",
    price: "Starting at $100",
    category: "Special Occasion",
    active: true,
  },
];

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Amara J.",
    location: "Durham, NC",
    quote:
      "She made me feel like royalty on my wedding day. My makeup lasted 12+ hours and I got compliments all night. Absolutely recommend!",
    rating: 5,
    active: true,
  },
  {
    id: "2",
    name: "Kezia T.",
    location: "Raleigh, NC",
    quote:
      "The bridal trial was so helpful — she listened to exactly what I wanted and delivered beyond my expectations. My hair was stunning all day.",
    rating: 5,
    active: true,
  },
  {
    id: "3",
    name: "Danielle R.",
    location: "Chapel Hill, NC",
    quote:
      "Professional, talented, and so kind. She kept my whole bridal party calm and gorgeous. Worth every penny!",
    rating: 5,
    active: true,
  },
  {
    id: "4",
    name: "Nicole B.",
    location: "Cary, NC",
    quote:
      "I had my makeup done for my engagement photos and it photographed beautifully. She truly understands what looks good on camera.",
    rating: 5,
    active: true,
  },
];

const mockGallery: GalleryItem[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80",
    caption: "Romantic bridal updo",
    category: "Bridal Hair",
    active: true,
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    caption: "Glam bridal makeup",
    category: "Bridal Makeup",
    active: true,
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    caption: "Bride getting ready",
    category: "Bridal",
    active: true,
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=600&q=80",
    caption: "Soft glam editorial look",
    category: "Special Occasion",
    active: true,
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    caption: "Bridal party hair styling",
    category: "Bridal Party",
    active: true,
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1560577718-97e50eb93f5e?w=600&q=80",
    caption: "Natural glam bridal makeup",
    category: "Bridal Makeup",
    active: true,
  },
];

// ---------------------------------------------------------------------------
// Google Sheets helpers
// ---------------------------------------------------------------------------

async function getSheet(range: string): Promise<string[][]> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    return [];
  }

  const { google } = await import("googleapis");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccountEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return (response.data.values as string[][]) ?? [];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  const rows = await getSheet("Services!A2:F100");

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
  const rows = await getSheet("Testimonials!A2:F100");

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
  const rows = await getSheet("Gallery!A2:E100");

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
