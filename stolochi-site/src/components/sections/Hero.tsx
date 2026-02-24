import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85"
          alt="Bride on her wedding day"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.4em] text-gold-light mb-6">
          Durham, NC · Bridal Beauty Specialist
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8">
          Your Most Beautiful
          <br />
          <span className="text-gold">Day Begins Here</span>
        </h1>
        <p className="font-body text-base md:text-lg text-cream/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Professional bridal makeup and hair artistry crafted around your unique
          vision — so you can focus on the moments that matter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/contact" size="lg">
            Book a Consultation
          </Button>
          <Button href="/gallery" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-charcoal">
            View Gallery
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-cream/50">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-cream/50 to-transparent" />
      </div>
    </section>
  );
}
