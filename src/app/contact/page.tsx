import { Mail, Phone, MessageCircle, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { getSiteSettings } from "@/sanity/siteSettings";

function toWaMe(e164: string) {
  return `https://wa.me/${e164.replace(/[^\d]/g, "")}`;
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const channels = [
    {
      href: toWaMe(settings.whatsAppNumberE164),
      icon: MessageCircle,
      label: "WhatsApp Support",
      sub: "Fastest response · Primary channel",
      hoverColor: "#4ade80",
      external: true,
    },
    {
      href: `mailto:${settings.supportEmail}`,
      icon: Mail,
      label: settings.supportEmail,
      sub: "Responds within 24 hours",
      hoverColor: "var(--crimson-400)",
      external: false,
    },
    {
      href: `tel:${settings.supportPhoneE164}`,
      icon: Phone,
      label: settings.supportPhoneDisplay,
      sub: settings.supportHours ?? "Mon–Fri, 8am–5pm SAST",
      hoverColor: "var(--text-secondary)",
      external: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: "var(--glow-primary)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono tracking-wide mb-10 transition-colors hover-text-secondary"
          style={{ color: "var(--text-muted)" }}>
          <ChevronLeft size={14} /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="section-label"><span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />Contact Us</div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
              We&apos;re here to <span className="text-gradient-red">help</span>
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
              Have questions about our payment solutions? Reach out and a member of our team will respond as quickly as possible.
            </p>

            <div className="space-y-4">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a key={ch.href} href={ch.href} {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 glass-card hover-border-accent rounded-sm p-5 transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}>
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center transition-colors"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
                      <Icon size={16} style={{ color: "var(--crimson-400)" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{ch.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{ch.sub}</p>
                    </div>
                    <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Form or success */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
