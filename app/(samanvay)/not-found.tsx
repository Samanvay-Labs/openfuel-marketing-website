import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Container className="flex flex-col items-start py-24 md:py-32">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            404
          </p>
          <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            Page not found
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            The page you are looking for does not exist or may have been moved.
            Return home or contact us if you need assistance.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/" />}
              className="h-11 rounded-lg px-5"
            >
              Return Home
            </Button>
            <Button
              variant="outline"
              render={<a href="mailto:hello@samanvaylabs.com" />}
              className="h-11 rounded-lg px-5"
            >
              Contact Us
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
