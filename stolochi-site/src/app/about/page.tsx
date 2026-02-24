import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the artist behind Stolochi Makeup & Hair — a bridal beauty specialist based in Durham, NC, passionate about making every client feel confident and radiant.",
};

const values = [
  {
    title: "Personalized Approach",
    description:
      "Every face is unique. I take the time to understand your features, skin tone, and personal style before creating a look that feels authentically you.",
  },
  {
    title: "All-Day Wear",
    description:
      "I use professional, long-wearing products so your look stays flawless from the ceremony through the last dance.",
  },
  {
    title: "Calm & Relaxed Experience",
    description:
      "Your getting-ready time should be joyful, not stressful. I bring a calm, positive energy to ensure you feel at ease.",
  },
  {
    title: "Collaboration First",
    description:
      "I work closely with photographers, planners, and stylists to ensure your look photographs beautifully and fits seamlessly with your wedding aesthetic.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
            The Artist
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal max-w-2xl leading-tight">
            About Stolochi
          </h1>
        </div>
      </section>

      {/* Bio section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] bg-border overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80"
              alt="Makeup artist at work"
              fill
              className="object-cover object-top"
              unoptimized
            />
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold pointer-events-none" />
          </div>

          {/* Text */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-5">
              Durham, NC
            </p>
            <h2 className="font-display text-4xl text-charcoal mb-6 leading-tight">
              Beauty That Tells Your Story
            </h2>
            <div className="space-y-4 font-body text-muted leading-relaxed text-[15px]">
              <p>
                Welcome to Stolochi Makeup &amp; Hair — where every brushstroke is intentional
                and every look is designed to make you feel like the best version of yourself.
              </p>
              <p>
                Based in Durham, NC, I specialize in bridal makeup and hair for weddings,
                engagements, and special occasions across the Triangle area and beyond.
                With a deep passion for bridal beauty, I bring a meticulous eye for detail
                and a warm, collaborative spirit to every appointment.
              </p>
              <p>
                I believe your wedding day beauty should feel effortless — a natural extension
                of who you are, elevated for the most important day of your life. My goal is
                always to create a look that photographs beautifully, holds all day, and
                makes you feel radiant from the inside out.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Button href="/contact">Book a Consultation</Button>
              <Button href="/gallery" variant="outline">View Gallery</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="My Approach"
            title="What Sets Me Apart"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="p-8 bg-white border border-border hover:border-gold transition-colors duration-300">
                <div className="w-8 h-px bg-gold mb-5" />
                <h3 className="font-display text-xl text-charcoal mb-3">{v.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl text-white mb-4">
            Ready to Chat?
          </h2>
          <p className="font-body text-cream/70 text-sm mb-8 leading-relaxed">
            Reach out to schedule a consultation and let&apos;s start planning your perfect look.
          </p>
          <Button href="/contact" size="lg">Get in Touch</Button>
        </div>
      </section>
    </>
  );
}
