"use server";

import { contactReasons } from "@/content/contact";

export type ContactField = "name" | "email" | "reason" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField | "organization", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    organization: get("organization"),
    reason: get("reason"),
    message: get("message"),
  };

  // Honeypot: bots fill hidden fields, humans don't.
  if (get("website")) return { status: "success" };

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (values.name.length < 2 || values.name.length > 120)
    fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200)
    fieldErrors.email = "Please enter a valid email address.";
  if (!(contactReasons as readonly string[]).includes(values.reason))
    fieldErrors.reason = "Please choose a reason.";
  if (values.message.length < 10 || values.message.length > 5000)
    fieldErrors.message = "Please write at least a short message (10+ characters).";

  if (Object.keys(fieldErrors).length) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Samanvay Labs <onboarding@resend.dev>",
          to: [to],
          reply_to: values.email,
          subject: `[${values.reason}] ${values.name}`,
          text: [
            `Name: ${values.name}`,
            `Email: ${values.email}`,
            `Organization: ${values.organization || "-"}`,
            `Reason: ${values.reason}`,
            "",
            values.message,
          ].join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch (err) {
      console.error("Contact form delivery failed", err);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please email us directly.",
        values,
      };
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[contact] (no RESEND_API_KEY, not sent)", values);
  }

  return { status: "success" };
}
