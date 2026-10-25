"use client";

import { useActionState } from "react";

import { submitContactForm, type ContactFormState } from "@/lib/contact";
import { contactContent } from "@/content/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const selectClassName = cn(
  "flex h-11 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );
  const fields = contactContent.form.fields;

  if (state.status === "success") {
    return (
      <div
        className="rounded-lg border border-border bg-surface p-8 md:p-10"
        role="status"
      >
        <h3 className="font-heading text-2xl font-medium text-foreground">
          {contactContent.form.successTitle}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {state.message ?? contactContent.form.successBody}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{fields.name}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!state.fieldErrors?.name}
            className="mt-2 h-11"
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div>
          <Label htmlFor="organization">{fields.organization}</Label>
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            required
            aria-invalid={!!state.fieldErrors?.organization}
            className="mt-2 h-11"
          />
          <FieldError message={state.fieldErrors?.organization} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">{fields.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!state.fieldErrors?.email}
            className="mt-2 h-11"
          />
          <FieldError message={state.fieldErrors?.email} />
        </div>
        <div>
          <Label htmlFor="phone">{fields.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2 h-11"
          />
          <FieldError message={state.fieldErrors?.phone} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="industry">{fields.industry}</Label>
          <select
            id="industry"
            name="industry"
            required
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.industry}
            className={cn(selectClassName, "mt-2")}
          >
            <option value="" disabled>
              Select industry
            </option>
            {contactContent.form.industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.industry} />
        </div>
        <div>
          <Label htmlFor="timeline">{fields.timeline}</Label>
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.timeline}
            className={cn(selectClassName, "mt-2")}
          >
            <option value="" disabled>
              Select timeline
            </option>
            {contactContent.form.timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.timeline} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">{fields.message}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={!!state.fieldErrors?.message}
          className="mt-2 min-h-32"
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 rounded-lg px-6 text-sm"
      >
        {pending ? "Sending…" : contactContent.form.submit}
      </Button>
    </form>
  );
}
