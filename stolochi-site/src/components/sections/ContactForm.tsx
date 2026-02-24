"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { type Service } from "@/types";

interface ContactFormProps {
  services: Service[];
}

export default function ContactForm({ services }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    eventDate: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleService(name: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(name)
        ? prev.services.filter((s) => s !== name)
        : [...prev.services, name],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", services: [], eventDate: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16 px-6 border border-gold bg-gold/5">
        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-2">Message Sent!</h3>
        <p className="font-body text-muted text-sm">
          Thank you for reaching out. I&apos;ll be in touch within 24–48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-body text-xs uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:text-gold-dark"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-body text-xs uppercase tracking-widest text-muted mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full border border-border bg-white px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-gold transition-colors duration-200"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-body text-xs uppercase tracking-widest text-muted mb-2">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full border border-border bg-white px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-gold transition-colors duration-200"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Phone + Event Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block font-body text-xs uppercase tracking-widest text-muted mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full border border-border bg-white px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-gold transition-colors duration-200"
            placeholder="(xxx) xxx-xxxx"
          />
        </div>
        <div>
          <label htmlFor="eventDate" className="block font-body text-xs uppercase tracking-widest text-muted mb-2">
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))}
            className="w-full border border-border bg-white px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-gold transition-colors duration-200"
          />
        </div>
      </div>

      {/* Services */}
      <div>
        <p className="font-body text-xs uppercase tracking-widest text-muted mb-3">
          Services Interested In
        </p>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => toggleService(service.name)}
              className={`font-body text-xs px-4 py-2 border transition-all duration-200 ${
                form.services.includes(service.name)
                  ? "bg-gold text-white border-gold"
                  : "border-border text-muted hover:border-gold hover:text-gold"
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-body text-xs uppercase tracking-widest text-muted mb-2">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="w-full border border-border bg-white px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
          placeholder="Tell me about your event, vision, or any questions you have…"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
          {errorMsg}
        </p>
      )}

      <Button type="submit" disabled={status === "loading"} size="lg" className="w-full sm:w-auto">
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
