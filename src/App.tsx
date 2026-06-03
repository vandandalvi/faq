import { useMemo, useState } from "react";
import CategoryIcon from "./components/CategoryIcon";
import { faqCategories, type FAQItem } from "./data/faqData";

function SearchIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function AccordionItem({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`group relative overflow-hidden rounded-[22px] border transition-all duration-300 ${
        open
          ? "border-[#19d8e6]/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_0_0_1px_rgba(25,216,230,0.12),0_22px_60px_rgba(0,0,0,0.35)]"
          : "border-white/8 bg-white/[0.03] hover:border-[#19d8e6]/22 hover:bg-white/[0.045]"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(25,216,230,0.55),transparent)] opacity-70" />
      <button
        onClick={() => setOpen((current) => !current)}
        className="relative z-10 flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={open}
      >
        <div className="space-y-2">
          <p className="max-w-3xl text-[15px] font-medium leading-6 text-white sm:text-base">
            {item.question}
          </p>
        </div>
        <span
          className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "border-[#19d8e6]/45 bg-[#19d8e6]/12 text-[#19d8e6] shadow-[0_0_18px_rgba(25,216,230,0.18)]"
              : "border-white/10 bg-white/[0.03] text-[#9db0b6] group-hover:border-[#19d8e6]/25 group-hover:text-white"
          }`}
        >
          <ChevronDown open={open} />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="mb-4 h-px bg-white/8" />
            <p className="max-w-3xl text-[13.5px] leading-7 text-[#bfd0d5] sm:text-[14px]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const categories = faqCategories;
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];

    const query = searchQuery.toLowerCase();
    return categories.flatMap((category) =>
      category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
      ),
    );
  }, [categories, isSearching, searchQuery]);

  const displayedItems = isSearching ? searchResults : activeCategory.questions;

  return (
    <div className="app-shell text-white">
      <div className="studio-grid" />
      <div className="studio-vignette" />
      <div className="studio-orb-a" />
      <div className="studio-orb-b" />
      <div className="studio-orb-c" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
        <section className="relative overflow-hidden px-2 pb-4 pt-2 text-center sm:px-4">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.34em] text-[#88a6ad]">
            Help &amp; Support
          </p>
          <h1 className="font-display mx-auto max-w-[12ch] text-[38px] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[54px] lg:text-[68px]">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-[62ch] text-[13.5px] leading-7 text-[#9cb1b7] sm:text-[14px]">
            Clear answers about how Velocity works, whether you&apos;re using the Chrome Extension, the web version, or running it for your team.
          </p>
          <div className="mx-auto mt-8 max-w-[560px]">
            <label className="search-shell">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search questions or topics..."
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </label>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="p-1">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#769097]">
                    Categories
                  </p>
                </div>
              </div>

              <div className="lg:hidden">
                <label className="sr-only" htmlFor="mobile-category-picker">
                  Select category
                </label>
                <div className="relative">
                  <select
                    id="mobile-category-picker"
                    value={activeCategoryId}
                    onChange={(event) => {
                      setActiveCategoryId(event.target.value);
                      setSearchQuery("");
                    }}
                    className="w-full appearance-none rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3 pr-11 text-[13px] font-medium text-[#eaf4f6] outline-none transition focus:border-[#19d8e6]/40 focus:bg-white/[0.06]"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8aa2a8]"
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

              <nav className="hidden gap-2 lg:flex lg:flex-col">
                {categories.map((category) => {
                  const active = category.id === activeCategoryId && !isSearching;

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategoryId(category.id);
                        setSearchQuery("");
                      }}
                      className={`category-pill ${active ? "category-pill-active" : "category-pill-idle"}`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-[14px] border ${
                          active
                            ? "border-[#19d8e6]/30 bg-[#19d8e6]/10 text-[#19d8e6]"
                            : "border-white/8 bg-white/[0.03] text-[#c4d2d6]"
                        }`}
                      >
                        <CategoryIcon icon={category.icon} className="h-[17px] w-[17px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-left">
                          {category.label}
                        </span>
                        <span className="mt-0.5 block text-left text-[11px] text-[#7e9399]">
                          {category.questions.length} entries
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="studio-panel relative overflow-hidden rounded-[26px] p-5">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[32px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] opacity-60" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#769097]">
                Need a human?
              </p>
              <h2 className="mt-3 text-lg font-semibold text-white">Still got questions?</h2>
              <p className="mt-2 max-w-[18ch] text-[13px] leading-6 text-[#a9bdc2]">
                Reach the Velocity team for product issues, billing questions, or enterprise onboarding help.
              </p>
              <a
                href="mailto:velocity@toteminteractive.in"
                className="mt-5 inline-flex w-full items-center justify-center rounded-[16px] border border-[#19d8e6]/30 bg-[#19d8e6]/10 px-4 py-3 text-[12px] font-semibold text-[#c4fbff] transition hover:border-[#19d8e6]/45 hover:bg-[#19d8e6]/14"
              >
                Contact Support
              </a>
            </div>
          </aside>

          <main className="space-y-4">
            <div className="mb-1 flex items-center justify-center lg:justify-start">
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.03em] text-white sm:text-[26px]">
                {isSearching ? "Search Results" : activeCategory.label}
              </h2>
            </div>

            {isSearching && (
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#19d8e6]/20 bg-[#19d8e6]/8 px-3 py-1 text-[11px] font-medium text-[#b8f8ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19d8e6] shadow-[0_0_10px_rgba(25,216,230,0.9)]" />
                  {displayedItems.length} result{displayedItems.length === 1 ? "" : "s"} for "{searchQuery.trim()}"
                </div>
              </div>
            )}

            <div className="space-y-3">
              {displayedItems.length === 0 ? (
                <div className="studio-panel rounded-[26px] px-6 py-14 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#7f949a]">
                    <SearchIcon />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">No matching answers yet</h3>
                  <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#96aab0]">
                    Try a broader keyword like "plan", "extension", or "support", or browse a category instead.
                  </p>
                </div>
              ) : (
                displayedItems.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    defaultOpen={index === 0 && !isSearching}
                  />
                ))
              )}
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
