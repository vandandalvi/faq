import { useState } from "react";

interface AddQuestionModalProps {
  categoryLabel: string;
  onAdd: (question: string, answer: string) => void;
  onClose: () => void;
}

export default function AddQuestionModal({ categoryLabel, onAdd, onClose }: AddQuestionModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({ question: "", answer: "" });

  const validate = () => {
    const e = { question: "", answer: "" };
    if (!question.trim()) e.question = "Question is required.";
    if (!answer.trim()) e.answer = "Answer is required.";
    setErrors(e);
    return !e.question && !e.answer;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd(question.trim(), answer.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[480px] bg-[#161616] border border-[#252525] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
          <div>
            <h2 className="text-white text-[14px] font-semibold">Add New Question</h2>
            <p className="text-[#555] text-[11.5px] mt-0.5">Category: {categoryLabel}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1e1e1e] hover:bg-[#252525] flex items-center justify-center text-[#555] hover:text-[#aaa] transition-colors border border-[#2a2a2a]"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[#888] text-[11.5px] font-medium mb-1.5">
              Question <span className="text-[#4ecdc4]">*</span>
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => { setQuestion(e.target.value); if (errors.question) setErrors((p) => ({ ...p, question: "" })); }}
              placeholder="e.g. How do I reset my password?"
              className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-[13px] text-[#ccc] placeholder-[#444] outline-none transition-colors
                ${errors.question ? "border-red-500/50" : "border-[#252525] focus:border-[#3a3a3a]"}`}
            />
            {errors.question && <p className="text-red-400/80 text-[11px] mt-1">{errors.question}</p>}
          </div>

          <div>
            <label className="block text-[#888] text-[11.5px] font-medium mb-1.5">
              Answer <span className="text-[#4ecdc4]">*</span>
            </label>
            <textarea
              value={answer}
              onChange={(e) => { setAnswer(e.target.value); if (errors.answer) setErrors((p) => ({ ...p, answer: "" })); }}
              placeholder="Provide a clear, helpful answer..."
              rows={4}
              className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-[13px] text-[#ccc] placeholder-[#444] outline-none transition-colors resize-none
                ${errors.answer ? "border-red-500/50" : "border-[#252525] focus:border-[#3a3a3a]"}`}
            />
            {errors.answer && <p className="text-red-400/80 text-[11px] mt-1">{errors.answer}</p>}
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#252525] text-[#666] hover:text-[#aaa] hover:border-[#333] text-[13px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#1e2e2c] hover:bg-[#243835] border border-[#2a4040] text-[#4ecdc4] text-[13px] font-medium transition-colors"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
