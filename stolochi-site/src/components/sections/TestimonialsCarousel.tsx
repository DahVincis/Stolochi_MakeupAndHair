import { type Testimonial } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  preview?: boolean;
  dark?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-gold fill-gold" : "text-gold/30 fill-gold/30"}`}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({
  testimonials,
  preview = false,
  dark = false,
}: TestimonialsCarouselProps) {
  const displayed = preview ? testimonials.slice(0, 2) : testimonials;

  return (
    <section
      className={`py-24 px-6 ${dark ? "bg-charcoal" : "bg-cream"}`}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Kind Words"
          title="Client Love"
          subtitle={
            preview
              ? "Real brides, real results."
              : "Stories from brides and clients who trusted us on their most important days."
          }
          light={dark}
        />

        <div
          className={`grid grid-cols-1 ${
            preview ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-2"
          } gap-8`}
        >
          {displayed.map((t) => (
            <blockquote
              key={t.id}
              className={`p-8 border ${
                dark
                  ? "border-cream/10 bg-cream/5 hover:border-gold"
                  : "border-border bg-white hover:border-gold"
              } transition-all duration-300`}
            >
              <StarRating rating={t.rating} />
              <p
                className={`font-display text-lg leading-relaxed mt-4 mb-6 italic ${
                  dark ? "text-cream/90" : "text-charcoal"
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className={`w-8 h-px ${dark ? "bg-gold/60" : "bg-gold"}`}
                />
                <div>
                  <p
                    className={`font-body text-sm font-semibold ${
                      dark ? "text-cream" : "text-charcoal"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-muted">{t.location}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <Button
              href="/testimonials"
              variant={dark ? "outline" : "outline"}
              className={dark ? "border-gold text-gold hover:bg-gold hover:text-charcoal" : ""}
            >
              Read More Reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
