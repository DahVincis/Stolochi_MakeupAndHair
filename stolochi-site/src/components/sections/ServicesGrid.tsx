import { type Service } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface ServicesGridProps {
  services: Service[];
  preview?: boolean;
}

export default function ServicesGrid({ services, preview = false }: ServicesGridProps) {
  const displayed = preview ? services.slice(0, 3) : services;

  // Group by category when not in preview mode
  const categories = preview
    ? null
    : Array.from(new Set(displayed.map((s) => s.category)));

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          subtitle="Each service is tailored to your vision, skin tone, and personal style — ensuring you look and feel your best."
        />

        {preview ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayed.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {categories!.map((category) => (
              <div key={category}>
                <h3 className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-8 border-b border-border pb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayed
                    .filter((s) => s.category === category)
                    .map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {preview && (
          <div className="text-center mt-12">
            <Button href="/services" variant="outline">
              View All Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group border border-border p-8 hover:border-gold transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-xl text-charcoal group-hover:text-gold transition-colors duration-300 leading-snug flex-1 pr-4">
          {service.name}
        </h3>
        <span className="font-body text-xs text-gold whitespace-nowrap mt-1">
          {service.price}
        </span>
      </div>
      <p className="font-body text-sm text-muted leading-relaxed">
        {service.description}
      </p>
      <div className="mt-6">
        <Button href="/contact" variant="ghost" className="px-0 text-xs">
          Book Now →
        </Button>
      </div>
    </div>
  );
}
