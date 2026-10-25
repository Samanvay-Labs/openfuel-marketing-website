"use client";

import { useActionState } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactContent, contactReasons } from "@/content/contact";
import { submitContactForm, type ContactFormState } from "@/lib/contact";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const selectClassName = cn(
  "mt-2 flex h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none transition-colors",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
);

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const f = contactContent.fields;
  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-background">
      <Container className="grid gap-10 py-20 md:grid-cols-[1fr_1.4fr] md:py-28">
        <div>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {contactContent.title}
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
            {contactContent.intro}
          </p>
        </div>

        {state.status === "success" ? (
          <div className="rounded-lg border border-border bg-surface p-8" role="status">
            <h3 className="font-heading text-2xl font-medium text-foreground">
              {contactContent.successTitle}
            </h3>
            <p className="mt-3 text-muted-foreground">{contactContent.successBody}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-5" noValidate>
            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">{f.name}</Label>
                <Input id="name" name="name" autoComplete="name" required defaultValue={v.name}
                  aria-invalid={!!err.name} aria-describedby={err.name ? "name-err" : undefined} className="mt-2 h-11" />
                <FieldError id="name-err" message={err.name} />
              </div>
              <div>
                <Label htmlFor="email">{f.email}</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email}
                  aria-invalid={!!err.email} aria-describedby={err.email ? "email-err" : undefined} className="mt-2 h-11" />
                <FieldError id="email-err" message={err.email} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="organization">{f.organization}</Label>
                <Input id="organization" name="organization" autoComplete="organization" defaultValue={v.organization}
                  className="mt-2 h-11" />
              </div>
              <div>
                <Label htmlFor="reason">{f.reason}</Label>
                <select id="reason" name="reason" required defaultValue={v.reason ?? ""}
                  aria-invalid={!!err.reason} aria-describedby={err.reason ? "reason-err" : undefined} className={selectClassName}>
                  <option value="" disabled>{f.reasonPlaceholder}</option>
                  {contactReasons.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <FieldError id="reason-err" message={err.reason} />
              </div>
            </div>

            <div>
              <Label htmlFor="message">{f.message}</Label>
              <Textarea id="message" name="message" rows={5} required defaultValue={v.message}
                aria-invalid={!!err.message} aria-describedby={err.message ? "message-err" : undefined} className="mt-2 min-h-32" />
              <FieldError id="message-err" message={err.message} />
            </div>

            {state.status === "error" && state.message ? (
              <p className="text-sm text-destructive" role="alert">{state.message}</p>
            ) : null}

            <Button type="submit" disabled={pending} className="h-11 rounded-lg px-6 text-sm">
              {pending ? contactContent.sending : contactContent.submit}
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
