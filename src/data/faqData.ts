export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: string;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: "rocket",
    questions: [
      {
        id: "gs-1",
        question: "What is Velocity?",
        answer:
          "Velocity is your AI prompt companion that makes sure AI truly understands what you mean. It instantly upgrades your prompts so you get significantly better, more reliable results from ChatGPT, Claude, Gemini, and other tools — without changing your workflow.",
      },
      {
        id: "gs-2",
        question: "How does Velocity work?",
        answer:
          "You write your prompt naturally. Velocity analyzes it, adds structure, clarity, intent, and relevant context, then returns a much stronger version ready to use. It works seamlessly inside the tools you already love.",
      },
      {
        id: "gs-3",
        question: "Is Velocity a replacement for ChatGPT, Claude, or Gemini?",
        answer:
          "No. Velocity is not a replacement — it’s a powerful companion layer that makes your existing AI tools much more effective.",
      },
      {
        id: "gs-4",
        question: "How do I install the Chrome Extension?",
        answer:
          "Go to the Chrome Web Store, search for “Thinkvelocity”, click “Add to Chrome”, and pin the extension for quick access. Once installed, you can use it directly inside ChatGPT, Claude, and other platforms.",
      },
      {
        id: "gs-5",
        question: "Can I use Velocity on the web?",
        answer:
          "Yes. You can access the full Velocity experience at thinkvelocity.in — perfect for when you want a dedicated workspace.",
      },
      {
        id: "gs-6",
        question: "Do I need an account to use Velocity?",
        answer:
          "Yes. A free account lets you save your history, build collections, and use Memory features across both the extension and web version.",
      },
      {
        id: "gs-7",
        question: "How do I get started with Velocity?",
        answer:
          "Install the extension, sign up for a free account, and start enhancing prompts right away. You get 3 enhancements per day on Free to experience the difference.",
      },
    ],
  },
  {
    id: "features-usage",
    label: "Features & Usage",
    icon: "sparkles",
    questions: [
      {
        id: "fu-1",
        question: "How do I enhance a prompt?",
        answer:
          "Open the Velocity extension, type or paste your prompt, and click Enhance. You can also use the inline button directly inside ChatGPT or Claude.",
      },
      {
        id: "fu-2",
        question: "What is the difference between Enhance, Refine, Analyze, and Clarify?",
        answer:
          "Enhance: Our smart general upgrade — best for most situations. Refine: Makes your prompt more precise and detailed. Analyze: Breaks down complex requests and strengthens them. Clarify: Turns vague or messy ideas into clear, well-structured prompts.",
      },
      {
        id: "fu-3",
        question: "How many prompts can I enhance on the Free plan?",
        answer:
          "Free users get 3 enhancements per day.",
      },
      {
        id: "fu-4",
        question: "Can I save my prompts?",
        answer:
          "Yes. You can create Collections and save your favorite enhanced prompts for quick reuse anytime.",
      },
      {
        id: "fu-5",
        question: "How does Memory work?",
        answer:
          "Memory helps Velocity remember important context from your past conversations. Free users have limited Memory, while Pro users get unlimited Memory for much smarter results over time.",
      },
      {
        id: "fu-6",
        question: "What is the Prompt Library?",
        answer:
          "The Prompt Library is your space to browse, organize, and reuse your best prompts and templates. You can create your own collections and access them anytime.",
      },
    ],
  },
  {
    id: "pricing-plans",
    label: "Pricing & Plans",
    icon: "credit-card",
    questions: [
      {
        id: "pp-1",
        question: "What’s the difference between Free and Pro?",
        answer:
          "Free gives you 3 enhancements per day, limited Memory, and limited Collections. Pro removes all limits — unlimited enhancements, unlimited Memory, unlimited Collections, full access to Refine/Analyze/Clarify, priority speed, and advanced features.",
      },
      {
        id: "pp-2",
        question: "Can I try Pro before committing?",
        answer:
          "Yes. New users get a 3-day free trial with higher limits so you can experience the full power of Velocity.",
      },
      {
        id: "pp-3",
        question: "Can I cancel my Pro subscription anytime?",
        answer:
          "Yes. You can cancel or pause your subscription at any time from your account settings. No long-term contracts.",
      },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: "building",
    questions: [
      {
        id: "en-1",
        question: "What is Velocity Enterprise?",
        answer:
          "Velocity Enterprise is the team-ready version of Velocity. It gives organizations the same powerful prompting companion, plus governance, company context packs, guardrails, and observability so AI usage stays consistent, safe, and scalable.",
      },
      {
        id: "en-2",
        question: "How does governance work in Enterprise?",
        answer:
          "Admins can define company standards, brand voice, compliance rules, and restrictions. Velocity automatically applies them while keeping the experience simple and delightful for employees.",
      },
      {
        id: "en-3",
        question: "Can we customize Velocity for our company?",
        answer:
          "Yes. You can create custom Context Packs, set role-based policies, enable intelligent guardrails, and route prompts according to your needs.",
      },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: "wrench",
    questions: [
      {
        id: "tr-1",
        question: "The extension is not working properly. What should I do?",
        answer:
          "Try refreshing the page, restarting your browser, or reinstalling the extension. If the issue continues, reach out to our support team.",
      },
      {
        id: "tr-2",
        question: "I’m not seeing the Enhance button. Why?",
        answer:
          "Make sure you’re on a supported AI tool (ChatGPT, Claude, Gemini, etc.) and that the extension is enabled and pinned.",
      },
      {
        id: "tr-3",
        question: "My daily limit is reached. What now?",
        answer:
          "You can wait for the next day reset or upgrade to Pro for unlimited enhancements.",
      },
      {
        id: "tr-4",
        question: "How do I contact support?",
        answer:
          "You can reach us through the Help Center or by emailing velocity@toteminteractive.in. We usually respond within a few hours.",
      },
    ],
  },
];
