"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";

// ─── types ────────────────────────────────────────────────────────────────────
interface FormValues {
  name: string;
  email: string;
  company: string;
  description: string;
  /** Honeypot — must stay empty; hidden from real users */
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.description.trim()) {
    errors.description = "Tell us a bit about the project.";
  } else if (values.description.trim().length < 20) {
    errors.description = "Please add a little more detail (at least 20 characters).";
  }
  return errors;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const, delay },
});

function getHandleFromUrl(url: string | undefined, provider: "github" | "linkedin") {
  if (!url) return "";
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const last = parts.length ? parts[parts.length - 1] : u.hostname.replace(/^www\./, "");
    if (provider === "github") return `@${last}`;
    return last;
  } catch (e) {
    return url;
  }
}

const social = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    icon: Github,
    handle: getHandleFromUrl(siteConfig.social.github, "github"),
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: Linkedin,
    handle: getHandleFromUrl(siteConfig.social.linkedin, "linkedin"),
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--foreground)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--accent)]" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-red-500"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm " +
  "text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none " +
  "transition-colors duration-150 " +
  "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 " +
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500/20";

// ─── page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const uid = useId();
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    description: "",
    website: "",   // honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const id = (field: string) => `${uid}-${field}`;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name as keyof FormValues]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const allTouched = { name: true, email: true, company: true, description: true, website: false };
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        // Surface field-level errors returned by the API
        if (data.fieldErrors) {
          setErrors(data.fieldErrors as FormErrors);
        }
        setSubmitError(
          data.error ??
          "Something went wrong. Please try again or email us directly."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        {/* ── Page header ─────────────────────────────────────────────────── */}
        <motion.p
          {...fadeUp(0)}
          className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]"
        >
          Contact
        </motion.p>
        <motion.h1
          {...fadeUp(0.06)}
          className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl"
        >
          Let&apos;s talk infrastructure
        </motion.h1>
        <motion.p
          {...fadeUp(0.12)}
          className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]"
        >
          Describe the problem or project — the more specific, the better. We
          read every message and respond within one business day.
        </motion.p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* ── Form ──────────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.14)}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10"
                >
                  <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
                    <CheckCircle2 className="h-7 w-7 text-[var(--accent)]" strokeWidth={1.75} />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">
                    Message received
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    Thanks for reaching out. We&apos;ll review your message and
                    get back to you within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setValues({ name: "", email: "", company: "", description: "", website: "" });
                      setTouched({});
                      setErrors({});
                      setSubmitError(null);
                      setSubmitted(false);
                    }}
                    className="mt-2 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id={id("name")}
                      label="Name"
                      required
                      error={touched.name ? errors.name : undefined}
                    >
                      <input
                        id={id("name")}
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!(touched.name && errors.name)}
                        className={inputBase}
                      />
                    </Field>

                    <Field
                      id={id("email")}
                      label="Email"
                      required
                      error={touched.email ? errors.email : undefined}
                    >
                      <input
                        id={id("email")}
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!(touched.email && errors.email)}
                        className={inputBase}
                      />
                    </Field>
                  </div>

                  <Field id={id("company")} label="Company">
                    <input
                      id={id("company")}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Corp (optional)"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputBase}
                    />
                  </Field>

                  <Field
                    id={id("description")}
                    label="Project description"
                    required
                    error={touched.description ? errors.description : undefined}
                  >
                    <textarea
                      id={id("description")}
                      name="description"
                      rows={6}
                      placeholder={
                        "What are you trying to solve? Include any relevant details — current stack, scale, timeline, and what a good outcome looks like."
                      }
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!(touched.description && errors.description)}
                      className={`${inputBase} resize-y`}
                    />
                  </Field>

                  {/* Honeypot — invisible to real users, bots fill it in */}
                  <div aria-hidden="true" style={{ display: "none" }}>
                    <label htmlFor={id("website")}>Leave this empty</label>
                    <input
                      id={id("website")}
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit error banner */}
                  {submitError && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-3" role="alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-sm text-red-400">{submitError}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={
                        "inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold " +
                        "text-[var(--accent-fg)] shadow-sm transition-all duration-150 " +
                        "hover:bg-[var(--accent-hover)] " +
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 " +
                        "disabled:opacity-60 disabled:cursor-not-allowed"
                      }
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <motion.aside
            {...fadeUp(0.2)}
            className="flex flex-col gap-8 lg:pt-0"
          >
            {/* Email */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.75} />
                {siteConfig.contact.email}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                Prefer email? Send directly — we respond within one business
                day.
              </p>
            </div>

            {/* Availability */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Availability
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Open to new engagements
                </p>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted)]">
                Currently taking on project-based and retainer engagements.
                Earliest start: two weeks from enquiry.
              </p>
            </div>

            {/* Social */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Social
              </p>
              <ul className="space-y-3">
                {social.map(({ label, href, icon: Icon, handle }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <span className="font-medium text-[var(--foreground)]">
                        {label}
                      </span>
                      <span className="ml-auto text-xs">{handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </>
  );
}
