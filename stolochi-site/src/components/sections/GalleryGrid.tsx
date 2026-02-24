"use client";

import { useState } from "react";
import Image from "next/image";
import { type GalleryItem } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";

interface GalleryGridProps {
  items: GalleryItem[];
  preview?: boolean;
}

export default function GalleryGrid({ items, preview = false }: GalleryGridProps) {
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const displayed = preview
    ? items.slice(0, 6)
    : active === "All"
    ? items
    : items.filter((i) => i.category === active);

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {!preview && (
          <SectionHeading
            eyebrow="Our Work"
            title="Gallery"
            subtitle="A glimpse into our portfolio of bridal and special occasion looks."
          />
        )}

        {/* Category filters (full page only) */}
        {!preview && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-body text-xs uppercase tracking-widest px-5 py-2 border transition-all duration-200 ${
                  active === cat
                    ? "bg-gold text-white border-gold"
                    : "border-border text-muted hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayed.map((item) => (
            <button
              key={item.id}
              onClick={() => !preview && setLightbox(item)}
              className={`relative overflow-hidden aspect-square group ${
                preview ? "cursor-default" : "cursor-pointer"
              }`}
              aria-label={`View ${item.caption}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-end">
                <p className="font-body text-xs text-white px-4 pb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <a
              href="/gallery"
              className="font-body text-xs uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:text-gold-dark hover:border-gold-dark transition-colors duration-200"
            >
              View Full Gallery →
            </a>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <div
            className="relative max-w-3xl w-full max-h-[85vh] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.imageUrl}
              alt={lightbox.caption}
              fill
              className="object-contain"
              unoptimized
            />
            <p className="absolute bottom-0 left-0 right-0 text-center font-body text-sm text-cream/80 py-3 bg-charcoal/60">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
