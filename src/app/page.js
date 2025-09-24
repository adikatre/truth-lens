"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * TruthLens: Real-Time Fact Checker (MVP Demo UI)
 * ------------------------------------------------
 * Paste this file into: src/app/page.jsx  (App Router)
 * TailwindCSS required (already set up in your project).
 *
 * All logic is mocked. Comments show where to integrate real AI / API calls later.
 */

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 antialiased">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24">
        <InputAndResults />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------- Header Section ----------------------------- */

function Header() {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(600px 300px at 20% -10%, rgba(59,130,246,.15), transparent), radial-gradient(600px 300px at 80% 0%, rgba(99,102,241,.15), transparent)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-10 sm:pt-16 sm:pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur shadow-xl px-6 py-8 sm:px-10 sm:py-12">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent">
                  TruthLens
                </span>
                : Real-Time Fact Checker
              </h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                <em>AI-Powered Web Application for Information Verification</em>
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              <Dot /> MVP Demo UI
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* --------------------------- Input + Results Card -------------------------- */

function InputAndResults() {
  const tabs = ["Upload File"]; // Stretch-ready: add "Paste Text", "Enter URL" if desired
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [fileName, setFileName] = useState("");
  const [freeText, setFreeText] = useState(""); // kept for future expansion
  const [urlText, setUrlText] = useState(""); // kept for future expansion

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]); // [{id, text, confidence, verdict, explanation, sources}]

  const hasInput = useMemo(() => {
    if (activeTab === "Upload File") return Boolean(fileName);
    return Boolean(freeText || urlText);
  }, [activeTab, fileName, freeText, urlText]);

  const onAnalyze = () => {
    // --- MOCKED ANALYSIS PIPELINE ---
    // Here you would:
    // 1) Upload / read file or text
    // 2) Call your AI/LLM + retrieval/fact-checking backend
    // 3) Stream results back
    setIsAnalyzing(true);
    setResults([]);

    // Simulate latency + mocked results
    const mockClaims = makeMockClaims(
      activeTab === "Upload File" ? fileName || "uploaded_document.pdf" : "input"
    );

    // Progressive reveal (nice for demos)
    let i = 0;
    const tick = () => {
      if (i < mockClaims.length) {
        setResults((prev) => [...prev, mockClaims[i]]);
        i++;
        setTimeout(tick, 350); // staggered fade-in
      } else {
        setIsAnalyzing(false);
      }
    };
    setTimeout(tick, 650);
  };

  const onDownload = () => {
    // Minimal “dummy” export (you can just alert if you prefer)
    const payload = {
      generatedAt: new Date().toISOString(),
      input: activeTab === "Upload File" ? { fileName } : { freeText, urlText },
      results,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `truthlens_report_${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  };

  return (
    <section className="mx-auto grid gap-6 px-0 sm:px-4">
      {/* Input Card */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="grid gap-6 p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === t
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "Upload File" && (
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-slate-700"
                >
                  Upload a file to check (no backend; filename only)
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <label
                    htmlFor="file"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <UploadIcon />
                    Choose File
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name || "")
                    }
                  />
                  <span
                    className={`truncate text-sm ${
                      fileName ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {fileName || "No file selected"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Supported formats (demo): .pdf, .docx, .txt (name only)
                </p>
              </div>

              <div className="flex gap-3 sm:justify-end">
                <button
                  onClick={onAnalyze}
                  disabled={isAnalyzing}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md ring-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAnalyzing ? (
                    <>
                      <Spinner />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <Sparkles />
                      Analyze
                    </>
                  )}
                </button>
                <button
                  onClick={onDownload}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                >
                  <DownloadIcon />
                  Download Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Results Dashboard</h2>
          <div className="text-sm text-slate-500">
            {results.length > 0
              ? `Found ${results.length} claims`
              : "Run an analysis to see claims"}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Claims & Explanations */}
          <div className="grid gap-4">
            {results.length === 0 && !isAnalyzing && (
              <EmptyState />
            )}

            <ul className="grid gap-4">
              {results.map((c, idx) => (
                <li
                  key={c.id}
                  className={`transform rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out ${
                    // fade-in cascade
                    "opacity-0 translate-y-2 animate-[fadein_.6s_ease-out_forwards]"
                  }`}
                  style={{
                    animationDelay: `${idx * 120}ms`,
                  }}
                >
                  <ClaimCard claim={c} />
                </li>
              ))}
            </ul>
          </div>

          {/* Sources Panel */}
          <aside className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-semibold">
                Source Recommendations
              </h3>
              <p className="mb-3 text-sm text-slate-600">
                Placeholder authoritative links your system might consult or cite.
                (These are examples; replace with your retrieval sources.)
              </p>
              <ul className="grid gap-2 text-sm">
                <SourceLink name="Wikipedia (relevant topic)" url="https://en.wikipedia.org/wiki/Main_Page" />
                <SourceLink name="Reuters (World News)" url="https://www.reuters.com/" />
                <SourceLink name="CDC (Health Topics)" url="https://www.cdc.gov/" />
                <SourceLink name="Stanford Encyclopedia of Philosophy" url="https://plato.stanford.edu/" />
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-semibold">What’s next?</h3>
              <ol className="list-decimal space-y-2 pl-4 text-sm text-slate-600">
                <li>
                  Replace mocked results with your AI pipeline (LLM + retrieval +
                  verifier).
                </li>
                <li>
                  Add evidence panels and inline citations per claim.
                </li>
                <li>Enable export to PDF and shareable report links.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>

      {/* Tiny CSS keyframes for fade-in */}
      <style jsx global>{`
        @keyframes fadein {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

/* --------------------------------- Cards ---------------------------------- */

function ClaimCard({ claim }) {
  const color = confidenceColor(claim.confidence);
  const verdictColor =
    claim.verdict === "Likely True"
      ? "bg-emerald-100 text-emerald-800 ring-emerald-600/20"
      : claim.verdict === "Uncertain"
      ? "bg-amber-100 text-amber-800 ring-amber-600/20"
      : "bg-rose-100 text-rose-800 ring-rose-600/20";

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Badge>Claim</Badge>
          <p className="max-w-[46ch] text-slate-800">{claim.text}</p>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${verdictColor}`}>
          <ShieldCheck />
          {claim.verdict}
        </span>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">Confidence</span>
          <span className="tabular-nums font-semibold text-slate-700">
            {Math.round(claim.confidence)}%
          </span>
        </div>
        <Progress value={claim.confidence} colorClass={color} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
        <p className="mb-2">
          <span className="font-semibold text-slate-800">Explanation: </span>
          {claim.explanation}
        </p>
        <div className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">Suggested sources: </span>
          {claim.sources.map((s, i) => (
            <span key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline-offset-2 hover:underline"
              >
                {s.name}
              </a>
              {i < claim.sources.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Progress({ value, colorClass }) {
  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full ${colorClass}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
        <SearchIcon />
      </div>
      <h3 className="text-base font-semibold">No results yet</h3>
      <p className="mt-1 text-sm text-slate-600">
        Upload a file and click <span className="font-semibold">Analyze</span> to
        generate mocked claims, confidence, explanations, and sources.
      </p>
    </div>
  );
}

/* ------------------------------ UI Atoms/Utils ----------------------------- */

function Badge({ children }) {
  return (
    <span className="inline-flex select-none items-center rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
      {children}
    </span>
  );
}

function SourceLink({ name, url }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
      <span className="text-slate-700">{name}</span>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
      >
        Visit <ExternalLink />
      </a>
    </li>
  );
}

function confidenceColor(pct) {
  if (pct >= 75) return "bg-emerald-500";
  if (pct >= 45) return "bg-amber-400";
  return "bg-rose-500";
}

function makeMockClaims(sourceLabel = "input") {
  // Example placeholder claims (customize per your domain)
  const base = [
    {
      text: `The uploaded ${sourceLabel} states that “green tea boosts metabolism by 30%.”`,
      confidence: 78,
      verdict: "Likely True",
      explanation:
        "Multiple peer-reviewed meta-analyses suggest a modest increase in energy expenditure due to catechins and caffeine, though effect sizes vary.",
      sources: [
        { name: "NIH Fact Sheet", url: "https://ods.od.nih.gov/" },
        { name: "Cochrane Review (related)", url: "https://www.cochranelibrary.com/" },
      ],
    },
    {
      text: `It also claims that “all blue light glasses prevent digital eye strain.”`,
      confidence: 42,
      verdict: "Uncertain",
      explanation:
        "Evidence is mixed; some RCTs report no significant benefit for symptoms vs. standard lenses. More robust, standardized trials are needed.",
      sources: [
        { name: "AAO (Blue Light)", url: "https://www.aao.org/eye-health" },
        { name: "PubMed Search", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      ],
    },
    {
      text: `Finally, it suggests “a daily 10,000-step goal is essential for health.”`,
      confidence: 31,
      verdict: "Likely False",
      explanation:
        "Health benefits accrue well below 10k steps; recent cohort studies show risk reduction around 6–8k steps/day for many adults.",
      sources: [
        { name: "CDC Physical Activity", url: "https://www.cdc.gov/physicalactivity/" },
        { name: "WHO Guidelines", url: "https://www.who.int/news-room/fact-sheets" },
      ],
    },
  ];

  // Give each an id and light jitter for demo variability
  return base.map((c, i) => ({
    id: `${Date.now()}_${i}`,
    ...c,
    confidence: Math.max(
      10,
      Math.min(95, Math.round(c.confidence + (Math.random() * 10 - 5)))
    ),
  }));
}

/* --------------------------------- Footer ---------------------------------- */

function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 text-center text-xs text-slate-500">
      <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
        Built with Next.js & TailwindCSS • All results are mocked for demo
        purposes • © {new Date().getFullYear()} TruthLens
      </div>
    </footer>
  );
}

/* --------------------------------- Icons ----------------------------------- */

function Dot() {
  return <span className="block h-2 w-2 rounded-full bg-emerald-500" />;
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 9l5-5 5 5" />
      <path d="M12 4v12" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" className="opacity-20" />
      <path d="M21 12a9 9 0 0 1-9 9" />
    </svg>
  );
}

function Sparkles() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2Zm7 9 1 2.6L22 15l-2 1 .8 2.4L19 17l-1.8 1.4L18 16l-2-.9 2-.9-.8-2.4L19 13l1-2Zm-14 0 1 2.6L8 15l-2 1 .8 2.4L6 17l-1.8 1.4L4 16l-2-.9 2-.9-.8-2.4L5 13l1-2Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function ExternalLink() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
      <path d="M21 10v11H3V3h11" />
    </svg>
  );
}

function ShieldCheck() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l8 4v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-4Zm-1 12l5-5-1.4-1.4L11 10.2 9.4 8.6 8 10l3 4Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}
