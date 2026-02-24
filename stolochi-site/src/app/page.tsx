import { getServices, getTestimonials, getGallery } from "@/lib/sheets";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import GalleryGrid from "@/components/sections/GalleryGrid";
import Button from "@/components/ui/Button";

export const revalidate = 86400;

export default async function HomePage() {
  const [services, testimonials, gallery] = await Promise.all([
    getServices(),
    getTestimonials(),
    getGallery(),
  ]);

  return (
    <>
      <Hero />

      {/* Services preview */}
      <ServicesGrid services={services} preview />

      {/* Gallery preview */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Portfolio
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Our Work
            </h2>
            <div className="mt-5 mx-auto w-12 h-px bg-gold" />
          </div>
          <GalleryGrid items={gallery} preview />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel testimonials={testimonials} preview dark={false} />

      {/* CTA strip */}
      <section className="py-24 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-white/70 mb-4">
            Ready to Begin?
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Let&apos;s Create Something Beautiful
          </h2>
          <p className="font-body text-white/80 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s your wedding day, a special event, or a personal
            photoshoot — I&apos;d love to be part of your story.
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
