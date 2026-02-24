import type { Metadata } from "next";
import { getServices } from "@/lib/sheets";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Button from "@/components/ui/Button";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore bridal makeup, bridal hair, bridesmaid packages, and special occasion services offered by Stolochi Makeup & Hair in Durham, NC.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
            What We Offer
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal max-w-2xl leading-tight">
            Services &amp; Pricing
          </h1>
          <p className="font-body text-muted mt-6 max-w-xl leading-relaxed text-[15px]">
            All services are tailored to you. Prices listed are starting rates — final pricing
            is confirmed during your consultation based on your event details, location, and
            the specific look you&apos;re going for.
          </p>
        </div>
      </section>

      <ServicesGrid services={services} />

      {/* FAQ strip */}
      <section className="py-16 px-6 bg-cream border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-charcoal mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do you offer a bridal trial?",
                a: "Yes — I highly recommend a trial session 1–3 months before your wedding. It&apos;s the best way to test the look, timeline, and products before the big day.",
              },
              {
                q: "Do you travel to venues?",
                a: "Absolutely. I travel to your hotel, venue, or home anywhere in the Triangle area. Travel fees may apply for locations outside the Durham/Raleigh/Chapel Hill area.",
              },
              {
                q: "How far in advance should I book?",
                a: "Bridal dates book quickly — especially for peak season (May–October). I recommend booking at least 6–12 months in advance to secure your date.",
              },
              {
                q: "Can you accommodate the whole bridal party?",
                a: "Yes! I offer group rates for bridal parties of three or more. I can also bring a second artist for larger parties when needed.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-6">
                <h3 className="font-display text-lg text-charcoal mb-2">{q}</h3>
                <p className="font-body text-sm text-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: a }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-charcoal text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl text-white mb-4">
            Have More Questions?
          </h2>
          <p className="font-body text-cream/70 text-sm mb-8">
            Reach out — I&apos;m happy to chat about your event and put together a custom quote.
          </p>
          <Button href="/contact" size="lg">Contact Me</Button>
        </div>
      </section>
    </>
  );
}
