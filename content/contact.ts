export const contactReasons = [
  "Project inquiry",
  "OpenFuel",
  "Partnership",
  "Careers",
  "Support",
  "Other",
] as const;

export const contactContent = {
  title: "Contact us",
  intro: "Tell us a little about what you need. We read every message and reply within two business days.",
  fields: {
    name: "Name",
    email: "Email",
    organization: "Organization (optional)",
    reason: "Reason",
    reasonPlaceholder: "Choose a reason",
    message: "Message",
  },
  submit: "Send message",
  sending: "Sending...",
  successTitle: "Thank you.",
  successBody: "Your message is on its way. We'll get back to you soon.",
} as const;
