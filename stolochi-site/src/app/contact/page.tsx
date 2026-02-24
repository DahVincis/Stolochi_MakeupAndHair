import type { Metadata } from "next";
import { getServices } from "@/lib/sheets";
import ContactForm from "@/components/sections/ContactForm";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Stolochi Makeup & Hair in Durham, NC. Book your bridal consultation, inquire about services, or ask any questions.",
};

export default async function ContactPage() {
  const services = await getServices();

  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal max-w-xl leading-tight">
            Book a Consultation
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info column */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-charcoal mb-6 leading-tight">
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p className="font-body text-sm text-muted leading-relaxed mb-8">
              Fill out the form and I&apos;ll get back to you within 24–48 hours.
              For urgent inquiries, feel free to call or text directly.
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-1">
                  Phone / Text
                </p>
                <a
                  href="tel:9195191218"
                  className="font-body text-charcoal hover:text-gold transition-colors duration-200"
                >
                  919-519-1218
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-1">
                  Location
                </p>
                <p className="font-body text-charcoal text-sm leading-relaxed">
                  3411 Balfour East
                  <br />
                  Durham, NC 27713
                </p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-1">
                  Service Area
                </p>
                <p className="font-body text-charcoal text-sm">
                  Durham · Raleigh · Chapel Hill
                  <br />
                  &amp; surrounding Triangle area
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-body text-xs text-muted leading-relaxed">
                Bridal dates book quickly. I recommend reaching out as soon
                as possible to secure your wedding date — especially for
                peak season (May–October).
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <ContactForm services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
