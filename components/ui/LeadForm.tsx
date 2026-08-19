import { BUSINESS, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";

interface LeadFormProps {
  heading?: string;
  subheading?: string;
  formId?: string;
  serviceOptions?: string[];
}

export default function LeadForm({
  heading = "Get a Free Quote",
  subheading = "Fill in your details and we'll call you back within 30 minutes.",
  formId = "lead-form",
  serviceOptions,
}: LeadFormProps) {
  const services = serviceOptions ?? [
    "Balcony Safety Nets",
    "Balcony Invisible Grills",
    "Staircase Safety Nets",
    "Apartment Safety Nets",
    "Industrial Safety Nets",
    "Duct Area Safety Nets",
    "Pet Safety Nets",
    "Child Safety Nets",
    "Monkey Safety Nets",
    "Coconut Tree Safety Nets",
    "Cloth Hangers",
    "Other / Not sure",
  ];

  return (
    <div aria-labelledby={`${formId}-heading`}>
      <h2
        id={`${formId}-heading`}
        className="text-2xl md:text-3xl font-bold text-white mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {heading}
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--dark-text-secondary)" }}>
        {subheading}
      </p>

      <form
        id={formId}
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
        className="space-y-4"
      >
        {/* Hidden fields */}
        <input type="hidden" name="_subject" value="New Safety Net Enquiry – Kovai Safety Nets" />
        <input type="hidden" name="_replyto" value="" />
        <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-name`} className="block text-xs font-semibold text-slate-300 mb-1">
              Your Name <span className="text-orange-400" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id={`${formId}-name`}
              name="name"
              required
              placeholder="E.g. Priya Sharma"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number <span className="text-orange-400" aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id={`${formId}-phone`}
              name="phone"
              required
              placeholder="E.g. 9876543210"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition"
              autoComplete="tel"
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-locality`} className="block text-xs font-semibold text-slate-300 mb-1">
            Your Area / Locality <span className="text-orange-400" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id={`${formId}-locality`}
            name="locality"
            required
            placeholder="E.g. RS Puram, Coimbatore"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-service`} className="block text-xs font-semibold text-slate-300 mb-1">
            Service Needed <span className="text-orange-400" aria-label="required">*</span>
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            required
            className="w-full rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-400 transition cursor-pointer"
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s} value={s} className="bg-slate-900 text-white">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="block text-xs font-semibold text-slate-300 mb-1">
            Additional Details (Optional)
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            placeholder="E.g. 2 balconies on the 5th floor, prefer black nets…"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition resize-none"
          />
        </div>

        <button
          type="submit"
          id={`${formId}-submit`}
          className="btn-primary-dark w-full py-4 text-base font-semibold"
        >
          📋 Request Free Quote
        </button>

        <p className="text-xs text-center pt-2" style={{ color: "var(--dark-text-tertiary)" }}>
          Or reach us directly:{" "}
          <a href={PHONE_URL} style={{ color: "var(--accent)" }} className="font-semibold hover:underline">
            📞 {BUSINESS.phone}
          </a>{" "}
          ·{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-semibold hover:underline"
          >
            💬 WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}
