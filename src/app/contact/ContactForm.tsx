"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initial: ContactFormState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initial);
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e: Partial<ContactFormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setApiError("Failed to send. Please try WhatsApp or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const set =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      setErrors((p) => ({ ...p, [field]: undefined }));
    };

  if (success) {
    return (
      <div className="glass-card rounded-sm p-10 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)" }}
        >
          <CheckCircle2 size={24} style={{ color: "var(--crimson-400)" }} />
        </div>
        <h3 className="font-display text-2xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
          Message Sent
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Thanks for reaching out. We&apos;ll get back to you within 24 hours. For urgent queries, WhatsApp is fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-sm p-8 space-y-5">
      <h2 className="font-display text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        Send a message
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
            Your Name *
          </label>
          <input type="text" value={form.name} onChange={set("name")} placeholder="John Smith" className="input-field" />
          {errors.name && (
            <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
            Email *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="john@example.co.za"
            className="input-field"
          />
          {errors.email && (
            <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
          Phone (Optional)
        </label>
        <input type="tel" value={form.phone} onChange={set("phone")} placeholder="082 000 0000" className="input-field" />
      </div>

      <div>
        <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
          Subject *
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={set("subject")}
          placeholder="Question about payment devices"
          className="input-field"
        />
        {errors.subject && (
          <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>
          Message *
        </label>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={4}
          placeholder="Tell us how we can help..."
          className="input-field resize-none"
        />
        {errors.message && (
          <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>
            {errors.message}
          </p>
        )}
      </div>

      {apiError && (
        <div className="rounded-sm px-4 py-3" style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)" }}>
          <p className="text-sm" style={{ color: "var(--crimson-400)" }}>
            {apiError}
          </p>
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-50">
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <ArrowRight size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

