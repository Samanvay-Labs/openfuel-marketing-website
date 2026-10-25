// All site copy lives here.

export const site = {
  name: "OpenFuel",
  url: "https://openfuel.dev",
  email: "hello@samanvaylabs.com",
  title: "OpenFuel: Your merged PRs fuel your AI",
  description:
    "OpenFuel turns every merged open-source contribution into AI credits. Ship upstream, earn credits, build faster. A Samanvay Labs project.",
};

export const nav = {
  wordmark: "openfuel",
  links: [
    { label: "How it works", href: "/openfuel#how-it-works" },
    { label: "Credits", href: "/openfuel#credits" },
    { label: "FAQ", href: "/openfuel#faq" },
  ],
  cta: "Apply Soon",
  themeToggle: "Toggle light and dark mode",
};

export const hero = {
  label: "A Samanvay Labs project",
  headline: "Your merged PRs fuel your AI.",
  subtext:
    "OpenFuel turns every merged open-source contribution into AI credits. Ship upstream, earn credits, build faster.",
  primaryCta: "Apply Soon",
  terminal: {
    command: "openfuel status",
    lines: [
      "✓ PR #482 merged → +120 credits",
      "✓ PR #1031 merged → +80 credits",
    ],
    balance: "balance: 1,240 credits",
  },
};

export const mission = {
  label: "Mission",
  statement: "Democratizing AI by rewarding those who build for everyone.",
  support:
    "Every merged contribution earns AI credits, so the developers who give the most to software get the tools to build even more.",
};

export const howItWorks = {
  label: "How it works",
  title: "Four steps from merge to credits.",
  steps: [
    { n: "01", title: "Apply", text: "Apply with your GitHub account." },
    { n: "02", title: "Get approved", text: "Get approved after a review of your contribution history." },
    { n: "03", title: "Contribute", text: "Contribute to open source and get PRs merged." },
    { n: "04", title: "Earn and build", text: "Earn AI credits and spend them on AI-assisted coding in OpenFuel." },
  ],
};

export const verification = {
  label: "Verification",
  title: "Every merge is verified.",
  text: "Every merged pull request goes through the same checks, using data from the GitHub API. Credits are issued only when all four checks pass.",
  pipelineLabel: "Verification pipeline",
  pipeline: [
    { step: "merge", title: "PR merged", detail: "pull_request.closed\nmerged == true" },
    { step: "fetch", title: "GitHub API", detail: "GET /repos/{o}/{r}/pulls/{n}\n+ /files + /reviews" },
    { step: "check", title: "4 checks", detail: "author · size · repo · spam" },
    { step: "issue", title: "Credits issued", detail: "ledger += credits\nstatus: verified" },
  ],
  rules: [
    {
      id: "R1",
      name: "No self-merged PRs",
      text: "The person who merged the PR must be someone other than its author. A maintainer approval from another account is required.",
      check: "pr.merged_by.id != pr.user.id",
    },
    {
      id: "R2",
      name: "Minimum contribution size",
      text: "Whitespace, lockfile and generated-file changes are not counted. The rest of the diff has to be large enough to matter.",
      check: "meaningful_lines >= 10",
    },
    {
      id: "R3",
      name: "Project eligibility",
      text: "The repository has to be public, use an OSI-approved license, show real activity, and not have opted out.",
      check: "repo.public && repo.license.osi && !repo.opted_out",
    },
    {
      id: "R4",
      name: "Spam detection",
      text: "We look for burst patterns, PRs split into many tiny pieces, and accounts colluding to merge each other's work. Flagged PRs get a manual review.",
      check: "risk_score < THRESHOLD ? issue : review",
    },
  ],
};

export const credits = {
  label: "Credits",
  title: "How credits work.",
  intro: "Each merged PR is scored on two things: how large the change is and how widely the project is used. The base credits for your PR size are multiplied by the multiplier for the repository's star count.",
  formula: "credits = base(PR size) × multiplier(repo stars)",
  earnCaption: "1. Base credits by PR size",
  earnHead: ["PR size", "Base"],
  earn: [
    ["Small: docs, typos, minor fixes", "20"],
    ["Medium: bug fixes, small features", "50"],
    ["Large: features, refactors", "100"],
  ],
  starsCaption: "2. Multiplier by repository stars",
  starsHead: ["Repo stars", "Multiplier"],
  stars: [
    ["Under 1k", "× 1.0"],
    ["1k to 10k", "× 1.5"],
    ["10k to 50k", "× 2.0"],
    ["50k and above", "× 3.0"],
  ],
  exampleLabel: "Example",
  example: [
    "$ openfuel explain PR #1031",
    "size: medium        base: 50",
    "repo stars: 24.3k   multiplier: × 2.0",
    "earned: 50 × 2.0 = 100 credits",
  ],
  spendCaption: "3. Spending credits in OpenFuel",
  spendHead: ["Usage", "Cost"],
  spend: [
    ["AI chat and code questions", "1 / request"],
    ["AI code generation and edits", "2 / request"],
    ["Agentic multi-step tasks", "10 / task"],
  ],
};

export const maintainers = {
  label: "For maintainers",
  title: "Better contributors, on your terms.",
  intro: "Maintainers decide whether their project takes part. Joining happens in your repository, with no extra account and no tracking code.",
  flows: [
    {
      name: "Join",
      label: "Join flow",
      steps: [
        { title: "Add the file", detail: "Commit .openfuel.yml\nto the repo root" },
        { title: "Set your rules", detail: "enabled: true\nlabels: [good-first-issue]" },
        { title: "Automatic check", detail: "Public · OSI license\nRecent activity" },
        { title: "Listed", detail: "Merged PRs start\nearning credits" },
      ],
    },
  ],
  configLabel: ".openfuel.yml",
  config: [
    "# opt in to OpenFuel",
    "enabled: true",
    "",
    "# optional: only reward PRs with these labels",
    "labels: [bug, good-first-issue]",
    "",
    "# optional: never reward changes under these paths",
    "exclude_paths: [docs/translations/**]",
  ],
  benefitsLabel: "What maintainers get",
  benefits: [
    { k: "Vetted", v: "Every contributor's GitHub history is reviewed before they are approved." },
    { k: "Merge-only", v: "Credits are issued only after you merge, so unmerged PRs earn nothing." },
    { k: "Anti-spam", v: "PRs that are trivial, self-merged, or flagged as spam earn no credits." },
    { k: "Zero cost", v: "Free for maintainers. No seats to pay for and no lock-in." },
  ],
};

export const openSource = {
  label: "Open source",
  title: "OpenFuel is open source too.",
  text: "The tool you spend credits in is built in the open. Read the code, file issues, and send pull requests. They count.",
  stars: "★ Coming soon",
};

export const faq = {
  label: "FAQ",
  title: "Questions.",
  items: [
    { q: "Who can apply?", a: "Any developer with a GitHub account and a history of open-source contributions. We look for at least a few merged pull requests in public repositories that are not your own, on an account in good standing." },
    { q: "How long does approval take?", a: "Most applications are reviewed within 3 to 5 business days. You will get an email as soon as a decision is made." },
    { q: "What counts as a contribution?", a: "A pull request merged into an eligible open-source project that passes verification: merged by someone else, at least 10 meaningful changed lines, and not flagged as spam. Code, tests and substantial documentation all count." },
    { q: "Which projects are eligible?", a: "Any public repository with an OSI-approved license and recent activity, unless its maintainers have opted out. Maintainers can also join explicitly with a .openfuel.yml file to set their own rules." },
    { q: "How fast are credits issued?", a: "Usually within minutes of the merge. PRs flagged for manual review can take up to 48 hours." },
    { q: "Do credits expire?", a: "Credits stay valid for 12 months from the date they are issued, as long as your account remains active." },
    { q: "Can I cash out credits?", a: "No. Credits are for AI usage inside OpenFuel only and have no cash value." },
    { q: "Is OpenFuel free?", a: "OpenFuel is open source. AI usage is paid for with credits you earn by contributing, so there is no subscription and no card required." },
  ],
};

export const finalCta = {
  title: "Start earning from your next merge.",
  cta: "Apply Soon",
};

export const footer = {
  wordmark: "openfuel",
  tagline: "OpenFuel is a Samanvay Labs project.",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  copyright: "© 2026 Samanvay Labs",
};
