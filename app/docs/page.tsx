import type { Metadata } from "next";
import Link from "next/link";
import { docs, site } from "@/content";

export const metadata: Metadata = { title: `${docs.title} | ${site.name}` };

export default function Docs() {
  return (
    <section className="wrap hero" aria-labelledby="docs-title">
      <p className="label">{site.name}</p>
      <h1 id="docs-title">{docs.title}</h1>
      <p className="lead">{docs.text}</p>
      <div className="ctas">
        <Link href="/" className="btn">{docs.back}</Link>
      </div>
    </section>
  );
}
