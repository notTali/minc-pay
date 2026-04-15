"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface Device {
  id: string;
  name: string;
  subtitle?: string;
  tagline: string;
  image: string;
  imageWidth: number;
  description: string;
  features: string[];
  badge: string;
  badgeColor: string;
}

export default function DeviceCard({ device }: { device: Device }) {
  return (
    <article
      className="group relative rounded-lg overflow-hidden flex flex-col device-card"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.3)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Badge */}
      <div className="absolute top-5 right-5 z-10">
        <span
          className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-sm"
          style={{
            backgroundColor: `${device.badgeColor}20`,
            color: device.badgeColor,
            border: `1px solid ${device.badgeColor}40`,
          }}
        >
          {device.badge}
        </span>
      </div>

      {/* Image */}
      <div
        className="relative flex items-center justify-center py-10 px-8"
        style={{ backgroundColor: "var(--bg-elevated)", minHeight: 280 }}
      >
        <div
          className="absolute w-48 h-48 rounded-full blur-[60px]"
          style={{ backgroundColor: `${device.badgeColor}20` }}
        />
        <Image
          src={device.image}
          alt={device.name}
          width={device.imageWidth}
          height={300}
          className="relative z-10 object-contain w-full drop-shadow-xl"
          style={{ maxWidth: device.imageWidth, transition: "transform 0.4s ease" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        <p
          className="text-xs font-mono tracking-widest uppercase mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          {device.tagline}
        </p>
        <h2
          className="font-display text-2xl font-black mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {device.name}
        </h2>
        {device.subtitle && (
          <p
            className="text-xs font-mono mb-3"
            style={{ color: "var(--crimson-400)" }}
          >
            {device.subtitle}
          </p>
        )}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {device.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-8 flex-1">
          {device.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5">
              <CheckCircle2
                size={14}
                style={{ color: "var(--crimson-400)", flexShrink: 0 }}
              />
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {feat}
              </span>
            </li>
          ))}
        </ul>

        <Link href="/apply" className="btn-primary group w-full justify-center">
          Apply for This Device
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}