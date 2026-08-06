"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { contact, site } from "@/data/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!values.email.trim()) errors.email = "I need an email address to reply to.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "That doesn't look like a valid email.";
  if (values.message.trim().length < 10)
    errors.message = "A little more detail helps — at least 10 characters.";
  return errors;
}

/**
 * Contact form with no backend by default.
 *
 * If NEXT_PUBLIC_CONTACT_ENDPOINT is set (e.g. a Formspree URL) the form POSTs
 * JSON there. Otherwise it falls back to opening a pre-filled mail draft, so a
 * fresh deploy still works without any service to sign up for.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const endpoint = contact.formEndpoint;

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear the error as soon as the user starts fixing it.
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: bots fill every field, humans never see this one.
    if ((new FormData(event.currentTarget).get("company") as string)?.length) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem.
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl border border-term-green/30 bg-term-green/5 p-8"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-term-green/40 text-term-green">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold">
            {endpoint ? "Message sent" : "Your mail app should be open"}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {endpoint
              ? `Thanks for reaching out — I'll get back to you within 24 hours.`
              : `If nothing opened, email me directly at ${site.email}.`}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-line bg-elevated p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={errors.name}
          value={values.name}
          onChange={update("name")}
          autoComplete="name"
          placeholder="Ada Lovelace"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          value={values.email}
          onChange={update("email")}
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="mt-5">
        <Field
          id="message"
          label="Message"
          as="textarea"
          error={errors.message}
          value={values.message}
          onChange={update("message")}
          placeholder="What are you building, and where do you need help?"
        />
      </div>

      {/* Honeypot — hidden from users and assistive tech, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"} className="disabled:opacity-60">
          {status === "submitting" ? "Sending…" : "Send message"}
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="font-mono text-xs text-subtle">{contact.responseTime}</p>
      </div>

      {/* Announced to screen readers as soon as it appears. */}
      <p aria-live="polite" className="mt-4 text-sm text-term-rose empty:mt-0">
        {status === "error"
          ? `Something went wrong sending that. Email me directly at ${site.email}.`
          : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  as,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  as?: "textarea";
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `w-full rounded-lg border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle/70 transition-colors focus:outline-none ${
      error ? "border-term-rose" : "border-line hover:border-line-strong focus:border-accent"
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs tracking-wide text-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea rows={5} {...shared} {...rest} className={`${shared.className} resize-y`} />
      ) : (
        <input {...shared} {...rest} />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 font-mono text-xs text-term-rose">
          {error}
        </p>
      )}
    </div>
  );
}
