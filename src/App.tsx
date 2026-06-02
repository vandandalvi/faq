import React, { useState, useMemo } from "react";
import { faqCategories, type FAQItem } from "./data/faqData";

/* ─── tiny SVG icons ─────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ─── category icon map ──────────────────────────────────── */
function CatIcon({ id, cls = "w-4 h-4" }: { id: string; cls?: string }) {
  const icons: Record<string, React.ReactElement> = {
    "getting-started": (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    "features-usage": (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>
      </svg>
    ),
    "pricing-plans": (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
      </svg>
    ),
    "enterprise": (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2"/>
        <path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>
      </svg>
    ),
    "technical-privacy": (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    "troubleshooting": (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  };
  return icons[id] ?? null;
}

/* ─── single accordion item ──────────────────────────────── */
function AccordionItem({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`rounded-[18px] border transition-all duration-200 ${
        open
          ? "border-[#2a3438] bg-[#1a1f22] shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
          : "border-[#202629] bg-[#15191b] hover:border-[#2a3438] hover:bg-[#1a1e20]"
      }`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[13.5px] font-medium text-[#e5eaee] leading-snug">{item.question}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-200 ${
            open ? "border-[#3a3f43] text-[#aab3b8]" : "border-[#2b3135] text-[#5f676d]"
          }`}
        >
          <ChevronDown open={open} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-5 pb-5">
          <p className="text-[13px] text-[#8d969d] leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────── */
export default function App() {
  const categories = faqCategories;
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.toLowerCase();
    return categories.flatMap((cat) =>
      cat.questions.filter(
        (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      )
    );
  }, [searchQuery, categories, isSearching]);

  const displayedItems = isSearching ? searchResults : activeCategory.questions;

  return (
    <div className="app-shell text-white">
      <div className="relative z-10">

      {/* ── HEADER ───────────────────────────────────── */}
      <div className="text-center pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-6">
        {/* eyebrow */}
        <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.32em] uppercase text-[#5c6369] mb-4">
          Help &amp; Support
        </p>
        {/* title */}
        <h1 className="font-display text-[32px] sm:text-[40px] md:text-[52px] font-semibold text-white leading-tight mb-3 tracking-[-0.02em]">
          Frequently Asked Questions
        </h1>
        {/* subtitle */}
        <p className="text-[#8b949c] text-[12.5px] sm:text-[13.5px] max-w-[520px] mx-auto leading-relaxed">
          Clear answers about how Velocity works, whether you're using the Chrome Extension, the web version, or running it for your team.
        </p>

        {/* ── SEARCH BAR ── */}
        <div className="mt-6 sm:mt-7 max-w-[560px] mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#586067] pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full bg-[#161c20] border border-[#2a3035] rounded-full pl-10 sm:pl-11 pr-9 sm:pr-10 py-[10px] sm:py-[12px] text-[12.5px] sm:text-[13px] text-[#d4d9dd] placeholder-[#5a6166] outline-none focus:border-[#3a444a] transition-colors shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6a7278] hover:text-[#aab3b8] transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────── */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 pb-20 sm:pb-24 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-full lg:w-[220px] flex-shrink-0 lg:sticky lg:top-6">
          {/* label */}
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.26em] uppercase text-[#4d585d] mb-3 px-1">
            Categories
          </p>

          {/* mobile category picker */}
          <div className="lg:hidden mb-4">
            <label className="sr-only" htmlFor="mobile-category-picker">
              Select category
            </label>
            <div className="relative">
              <select
                id="mobile-category-picker"
                value={activeCategoryId}
                onChange={(e) => {
                  setActiveCategoryId(e.target.value);
                  setSearchQuery("");
                }}
                className="w-full appearance-none rounded-[14px] border border-[#263033] bg-[#14191b] px-4 py-3 pr-10 text-[13px] font-medium text-[#d6dde0] outline-none shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667177]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* desktop category list */}
          <nav className="hidden lg:flex flex-col gap-1">
            {categories.map((cat) => {
              const active = cat.id === activeCategoryId && !isSearching;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[14px] text-[13px] font-medium text-left transition-all duration-150 border
                    ${active
                      ? "bg-[#1b2a29] text-white border-[#2f4544] shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                      : "bg-transparent text-[#778389] border-transparent hover:border-[#222b2d] hover:bg-[#14191a] hover:text-[#c7d0d4]"
                    }`}
                >
                  <span className={active ? "text-[#4edbcf]" : "text-[#4a5157]"}>
                    <CatIcon id={cat.id} cls="w-[15px] h-[15px]" />
                  </span>
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* ── SUPPORT CARD ── */}
          <div className="mt-5 sm:mt-6 rounded-2xl border border-[#1f2628] bg-[#131819] p-4 card-shadow">
            <p className="text-white text-[13px] font-semibold mb-1.5">Still got questions?</p>
            <p className="text-[#7f8a90] text-[11.5px] leading-relaxed mb-4">
              Our support team typically responds within 2 hours during business days.
            </p>
            <a
              href="mailto:velocity@toteminteractive.in"
              className="w-full inline-flex items-center justify-center bg-[#1b2122] hover:bg-[#232c2e] border border-[#2a3335] text-[#c7d0d4] text-[11.5px] font-medium py-2 rounded-xl transition-colors"
            >
              Contact Support
            </a>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 min-w-0 w-full">
          {/* section heading */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="font-display text-[18px] sm:text-[19px] md:text-[20px] font-semibold text-white tracking-[-0.01em]">
              {isSearching ? "Search Results" : activeCategory.label}
            </h2>
          </div>

          {/* accordion list */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {displayedItems.length === 0 ? (
              <div className="text-center py-16 text-[#556067] text-[13px]">No questions match your search.</div>
            ) : (
              displayedItems.map((item, i) => (
                <AccordionItem key={item.id} item={item} defaultOpen={i === 0 && !isSearching} />
              ))
            )}
          </div>

          {!isSearching && (
            <p className="text-[#3f474d] text-[11px] text-center mt-5">
              {activeCategory.questions.length} question{activeCategory.questions.length !== 1 ? "s" : ""} in this section
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
