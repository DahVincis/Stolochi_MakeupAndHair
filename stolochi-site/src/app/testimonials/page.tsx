import type { Metadata } from "next";
import { getTestimonials } from "@/lib/sheets";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import Button from "@/components/ui/Button";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what brides and clients say about Stolochi Makeup & Hair in Durham, NC. Real reviews from real weddings and special occasions.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Kind Words
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal max-w-xl leading-tight">
            Client Testimonials
          </h1>
          <p className="font-body text-muted mt-6 max-w-lg leading-relaxed text-[15px]">
            I&apos;m honoured to be part of so many special moments. Here&apos;s what
            some of my clients have had to say.
          </p>
        </div>
      </section>

      <TestimonialsCarousel testimonials={testimonials} />

      {/* CTA */}
      <section className="py-20 px-6 bg-gold text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl text-white mb-4">
            Your Story Is Next
          </h2>
          <p className="font-body text-white/80 text-sm mb-8 leading-relaxed">
            Ready to experience the Stolochi difference? Let&apos;s chat about your vision.
          </p>
          <Button
            href="/contact"
            size="lg"
            className="bg-white text-gold hover:bg-cream border-white hover:border-cream"
          >
            Book a Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
