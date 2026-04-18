"use client";

import { useState } from "react";

const BOOKING_TYPES = ["Beat License", "Custom Production", "Mixing & Mastering", "Sync / Placement", "Other"];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#050505] border border-outline-variant border-l-4 border-l-primary shadow-2xl p-5 sm:p-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-2xl leading-none"
        >
          ×
        </button>

        {status === "sent" ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-4">✓</p>
            <h3 className="text-2xl font-black uppercase tracking-tight text-primary mb-2">Message Sent</h3>
            <p className="text-white/60">I&apos;ll get back to you shortly.</p>
            <button onClick={onClose} className="mt-8 bg-primary text-on-primary px-8 py-3 font-bold uppercase tracking-widest hover:bg-primary-dim transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2 font-label">Booking</span>
            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-8 font-headline">Get In Touch</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-label">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="bg-surface-container border border-outline-variant px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="bg-surface-container border border-outline-variant px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-white/40 font-label">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="bg-surface-container border border-outline-variant px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select inquiry type</option>
                  {BOOKING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-white/40 font-label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-surface-container border border-outline-variant px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-widest hover:bg-primary-dim transition-colors disabled:opacity-50 mt-2 font-label"
              >
                {status === "sending" ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
