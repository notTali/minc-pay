import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { getSiteSettings } from "@/sanity/siteSettings";

function toWaMe(e164: string) {
  return `https://wa.me/${e164.replace(/[^\d]/g, "")}`;
}

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/minc-logo.png"
                alt={settings.brandName ?? "MINC Pay"}
                width={150}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Modern payment infrastructure for South African businesses. Accept every payment, everywhere.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 font-mono" style={{ color: "var(--text-primary)" }}>Solutions</h4>
            <ul className="space-y-2.5">
              {["Card Payments", "Contactless", "QR Code Payments", "Payment Links"].map((item) => (
                <li key={item}>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 font-mono" style={{ color: "var(--text-primary)" }}>Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works",    href: "/#how-it-works" },
                { label: "Devices We Offer", href: "/devices" },
                { label: "Apply Now",        href: "/apply" },
                { label: "Contact Us",       href: "/contact" },
                { label: "Admin Portal",     href: "/admin" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="text-sm transition-colors hover-text-secondary"
                    style={{ color: "var(--text-muted)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 font-mono" style={{ color: "var(--text-primary)" }}>Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href={toWaMe(settings.whatsAppNumberE164)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors hover-green"
                  style={{ color: "var(--text-muted)" }}>
                  <MessageCircle size={14} /> WhatsApp Support
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.supportEmail}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover-text-secondary"
                  style={{ color: "var(--text-muted)" }}>
                  <Mail size={14} /> {settings.supportEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.supportPhoneE164}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover-text-secondary"
                  style={{ color: "var(--text-muted)" }}>
                  <Phone size={14} /> {settings.supportPhoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} Designed and Developed by SKUN (PTY) LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {(settings.legalLinks ?? []).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs transition-colors hover-text-secondary"
                style={{ color: "var(--text-faint)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}