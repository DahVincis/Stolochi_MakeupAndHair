import Link from "next/link";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70 font-body">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl text-cream mb-3">
              Stolochi
            </p>
            <p className="text-gold font-body text-xs uppercase tracking-widest mb-4">
              Makeup &amp; Hair
            </p>
            <p className="text-sm leading-relaxed text-cream/60">
              Professional bridal beauty services serving Durham, NC and
              surrounding areas.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Navigate
            </p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Get In Touch
            </p>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href="tel:9195191218"
                  className="hover:text-gold transition-colors duration-200"
                >
                  919-519-1218
                </a>
              </li>
              <li className="leading-relaxed">
                3411 Balfour East
                <br />
                Durham, NC 27713
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold transition-colors duration-200"
                >
                  Send a message →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>© {year} Stolochi Makeup &amp; Hair. All rights reserved.</p>
          <p>Durham, NC · Serving the Triangle &amp; Beyond</p>
        </div>
      </div>
    </footer>
  );
}
