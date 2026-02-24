import type { Metadata } from "next";
import { getGallery } from "@/lib/sheets";
import GalleryGrid from "@/components/sections/GalleryGrid";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the Stolochi Makeup & Hair portfolio — bridal makeup, hair styling, bridesmaid looks, and special occasion glam in Durham, NC.",
};

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal max-w-xl leading-tight">
            Our Gallery
          </h1>
          <p className="font-body text-muted mt-6 max-w-lg leading-relaxed text-[15px]">
            Every look is a collaboration. Browse our portfolio for inspiration and to
            see the range of styles we&apos;ve created for our beautiful clients.
          </p>
        </div>
      </section>

      <GalleryGrid items={gallery} />
    </>
  );
}
