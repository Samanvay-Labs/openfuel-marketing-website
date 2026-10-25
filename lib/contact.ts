"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  organization: z
    .string()
    .trim()
    .min(2, "Please enter your organization.")
    .max(160),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  industry: z.string().trim().min(1, "Please select an industry."),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more about how we can help.")
    .max(5000),
  timeline: z.string().trim().min(1, "Please select a preferred timeline."),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    message: String(formData.get("message") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors!)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (apiKey && toEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const from =
        process.env.CONTACT_FROM_EMAIL ?? "Samanvay Labs <onboarding@resend.dev>";

      await resend.emails.send({
        from,
        to: toEmail,
        replyTo: data.email,
        subject: `Inquiry from ${data.name} · ${data.organization}`,
        text: [
          `Name: ${data.name}`,
          `Organization: ${data.organization}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "—"}`,
          `Industry: ${data.industry}`,
          `Timeline: ${data.timeline}`,
          "",
          "How can we help?",
          data.message,
        ].join("\n"),
      });
    } catch {
      return {
        status: "error",
        message:
          "We could not send your message right now. Please email hello@samanvaylabs.com directly.",
      };
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[contact form]", data);
  }

  return {
    status: "success",
    message:
      "We have received your inquiry. Our engineering team reviews every message thoughtfully and will respond shortly.",
  };
}
