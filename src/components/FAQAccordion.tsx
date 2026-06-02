import { useState } from "react";
import type { FAQItem } from "../data/faqData";

interface FAQAccordionProps {
  items: FAQItem[];
  searchQuery: string;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-teal-400/30 text-teal-300 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function FAQAccordion({ items, searchQuery }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([items[0]?.id]));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filtered = searchQuery.trim()
    ? items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <p className="text-zinc-400 text-sm">No questions match your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`rounded-xl border transition-all duration-200 ${
              isOpen
                ? "border-zinc-600/70 bg-zinc-800/60"
                : "border-zinc-700/50 bg-zinc-800/30 hover:border-zinc-600/50 hover:bg-zinc-800/50"
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-sm font-medium leading-snug transition-colors ${isOpen ? "text-white" : "text-zinc-200"}`}>
                {highlight(item.question, searchQuery)}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isOpen ? "bg-teal-500/20 text-teal-400 rotate-0" : "bg-zinc-700/60 text-zinc-400"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-5">
                <div className="h-px bg-zinc-700/50 mb-4" />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {highlight(item.answer, searchQuery)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
