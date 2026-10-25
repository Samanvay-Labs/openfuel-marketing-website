import DotField from "@/components/DotField";
import {
  site, hero, mission, howItWorks, verification, credits, maintainers, openSource, faq, finalCta,
} from "@/content";

function Head({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <div className="sec-head">
      <p className="label">{label}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map(([a, b]) => (
          <tr key={a}><th scope="row">{a}</th><td className="mono">{b}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Home() {
  return (
    <>
      <section className="wrap hero" aria-labelledby="hero-title">
        <div className="hero-text">
        <p className="label">{hero.label}</p>
        <h1 id="hero-title">{hero.headline}</h1>
        <p className="lead">{hero.subtext}</p>
        <div className="ctas">
          <button type="button" className="btn btn-solid" disabled aria-disabled="true">{hero.primaryCta}</button>
        </div>
        <pre className="terminal" aria-label="Example terminal output of openfuel status">
          <code>
            <span className="muted">$ </span>{hero.terminal.command}{"\n"}
            {hero.terminal.lines.map((l) => l + "\n")}
            {hero.terminal.balance}
          </code>
        </pre>
        </div>
        <DotField />
      </section>

      <section className="wrap section mission reveal" aria-labelledby="mission-title">
        <p className="label">{mission.label}</p>
        <h2 id="mission-title" className="big">{mission.statement}</h2>
        <p className="lead">{mission.support}</p>
      </section>

      <section id="how-it-works" className="wrap section reveal" aria-labelledby="how-title">
        <Head id="how-title" label={howItWorks.label} title={howItWorks.title} />
        <ol className="grid grid-4">
          {howItWorks.steps.map((s) => (
            <li key={s.n} className="cell">
              <span className="mono num">{s.n}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section reveal" aria-labelledby="verify-title">
        <Head id="verify-title" label={verification.label} title={verification.title} />
        <p className="lead">{verification.text}</p>
        <ol className="pipeline" aria-label={verification.pipelineLabel}>
          {verification.pipeline.map((p, i) => (
            <li key={p.step} className="stage">
              <span className="mono num">{String(i + 1).padStart(2, "0")} · {p.step}</span>
              <h3>{p.title}</h3>
              <pre className="mono muted small">{p.detail}</pre>
            </li>
          ))}
        </ol>
        <ul className="grid grid-2">
          {verification.rules.map((r) => (
            <li key={r.id} className="cell">
              <span className="mono num">{r.id}</span>
              <h3>{r.name}</h3>
              <p className="muted">{r.text}</p>
              <code className="check">{r.check}</code>
            </li>
          ))}
        </ul>
      </section>

      <section id="credits" className="wrap section reveal" aria-labelledby="credits-title">
        <Head id="credits-title" label={credits.label} title={credits.title} />
        <p className="lead">{credits.intro}</p>
        <p className="formula mono">{credits.formula}</p>
        <div className="tables">
          <Table caption={credits.earnCaption} head={credits.earnHead} rows={credits.earn} />
          <Table caption={credits.starsCaption} head={credits.starsHead} rows={credits.stars} />
        </div>
        <div className="tables">
          <div>
            <p className="caption mono">{credits.exampleLabel}</p>
            <pre className="terminal example"><code>{credits.example.join("\n")}</code></pre>
          </div>
          <Table caption={credits.spendCaption} head={credits.spendHead} rows={credits.spend} />
        </div>
      </section>

      <section className="wrap section reveal" aria-labelledby="maint-title">
        <Head id="maint-title" label={maintainers.label} title={maintainers.title} />
        <p className="lead">{maintainers.intro}</p>
        {maintainers.flows.map((f) => (
          <div key={f.name} className="flow">
            <h3 className="mono flow-name">{f.name}</h3>
            <ol className="pipeline" aria-label={f.label}>
              {f.steps.map((s, i) => (
                <li key={s.title} className="stage">
                  <span className="mono num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <pre className="mono muted small">{s.detail}</pre>
                </li>
              ))}
            </ol>
          </div>
        ))}
        <div className="tables">
          <div>
            <p className="caption mono">{maintainers.configLabel}</p>
            <pre className="terminal example"><code>{maintainers.config.join("\n")}</code></pre>
          </div>
          <div>
            <p className="caption mono">{maintainers.benefitsLabel}</p>
            <dl className="benefits">
              {maintainers.benefits.map((b) => (
                <div key={b.k}>
                  <dt className="mono">{b.k}</dt>
                  <dd className="muted">{b.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap section reveal" aria-labelledby="os-title">
        <Head id="os-title" label={openSource.label} title={openSource.title} />
        <p className="lead">{openSource.text}</p>
        <div className="ctas">
          <a href={site.github} className="btn" target="_blank" rel="noopener noreferrer">{openSource.cta}</a>
          <span className="badge mono">{openSource.stars}</span>
        </div>
      </section>

      <section id="faq" className="wrap section reveal" aria-labelledby="faq-title">
        <Head id="faq-title" label={faq.label} title={faq.title} />
        <div className="faq">
          {faq.items.map((i) => (
            <details key={i.q}>
              <summary>{i.q}</summary>
              <p className="muted">{i.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap section final reveal" aria-labelledby="final-title">
        <h2 id="final-title" className="big">{finalCta.title}</h2>
        <button type="button" className="btn btn-solid" disabled aria-disabled="true">{finalCta.cta}</button>
      </section>
    </>
  );
}
