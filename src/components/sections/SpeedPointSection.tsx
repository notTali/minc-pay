"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wifi, CreditCard, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

const highlights = [
  { icon: CreditCard, label: "Tap, Chip & Swipe" },
  { icon: Wifi,       label: "Wi-Fi & SIM Ready" },
  { icon: Zap,        label: "Fast Settlement"   },
];

export default function SpeedPointSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = sectionRef.current?.querySelectorAll(".sp-anim");
            items?.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red glow behind device */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)", opacity: 0.8 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Eyebrow */}
            <div
              className="sp-anim glass rounded-sm inline-flex items-center gap-3 px-4 py-2 mb-8"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                border: "1px solid rgba(220,38,38,0.25)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--crimson-500)" }}
              />
              <span
                className="text-xs font-mono tracking-[0.2em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Featured Device
              </span>
            </div>

            <h2
              className="sp-anim font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tight mb-6"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span style={{ color: "var(--text-primary)" }}>Meet the</span>
              <br />
              <span className="text-gradient">MincPay P5</span>
            </h2>

            <p
              className="sp-anim text-lg leading-relaxed mb-10 max-w-md"
              style={{
                color: "var(--text-secondary)",
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              A sleek, standalone payment terminal built for South African merchants. Accept all major cards, contactless, and QR payments — anywhere.
            </p>

            {/* Highlights */}
            <div
              className="sp-anim flex flex-col gap-4 mb-10"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(220,38,38,0.12)",
                      border: "1px solid rgba(220,38,38,0.2)",
                    }}
                  >
                    <Icon size={14} style={{ color: "var(--crimson-400)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="sp-anim flex flex-col sm:flex-row items-start gap-4"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <Link href="/apply" className="btn-primary group">
                Get This Device
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/devices" className="btn-secondary">
                View All Devices
              </Link>
            </div>
          </div>

          {/* ── Right: Device image ── */}
          <div
            className="sp-anim relative flex items-center justify-center"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Glow ring behind image */}
            <div
              className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-[80px]"
              style={{ backgroundColor: "rgba(220,38,38,0.15)" }}
            />

            {/* Floating card accents */}
            <div
              className="absolute top-4 right-4 md:right-8 glass rounded-sm px-3 py-2 hidden sm:flex items-center gap-2"
              style={{ border: "1px solid var(--border-default)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                Online & Ready
              </span>
            </div>

            <div
              className="absolute bottom-8 left-4 md:left-8 glass rounded-sm px-3 py-2 hidden sm:block"
              style={{ border: "1px solid var(--border-default)" }}
            >
              <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-muted)" }}>
                Settlement
              </div>
              <div className="text-sm font-bold" style={{ color: "var(--crimson-400)" }}>
                Next Day
              </div>
            </div>

            <Image
              src="/images/p5-removebg-preview.png"
              alt="Speedpoint P5 Payment Terminal"
              width={420}
              height={520}
              className="relative z-10 drop-shadow-2xl w-full max-w-[320px] md:max-w-[420px] object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}