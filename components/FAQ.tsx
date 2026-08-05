"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

const faqs = [
    {
        category: "General",
        question: "What tech stack do you primarily work with?",
        answer: "I specialize in React, Next.js, and TypeScript for frontend, with Node.js and Python on the backend. I also have experience with PostgreSQL, MongoDB, Redis, and cloud platforms like AWS and Vercel."
    },
    {
        category: "General",
        question: "Are you available for freelance or contract work?",
        answer: "Yes, I'm open to senior-level front-end roles, full-stack positions, and high-impact contract projects. Feel free to reach out through the contact form or email me directly."
    },
    {
        category: "General",
        question: "What kind of projects do you enjoy most?",
        answer: "I enjoy building complex, scalable systems — dashboards, real-time platforms, and products where design quality and performance are equally important."
    },
    {
        category: "Process",
        question: "How do you approach a new project?",
        answer: "I start by understanding the problem space and user needs, then architect a scalable foundation before writing UI code. I prioritize performance, accessibility, and maintainability from day one."
    },
    {
        category: "Process",
        question: "What's your testing strategy?",
        answer: "I use a combination of unit tests (Jest/Testing Library), integration tests, and E2E tests. I focus on testing critical user flows and business logic rather than chasing 100% coverage."
    },
    {
        category: "Process",
        question: "How do you handle performance optimization?",
        answer: "I profile first, then optimize. Common wins include code splitting with dynamic imports, proper image optimization with next/image, caching strategies, and eliminating unnecessary re-renders."
    },
    {
        category: "Technical",
        question: "How do you ensure accessibility?",
        answer: "I follow WCAG 2.1 guidelines: semantic HTML, proper ARIA attributes, keyboard navigation, focus management, sufficient color contrast, and testing with screen readers."
    },
    {
        category: "Technical",
        question: "What's your approach to state management?",
        answer: "I keep it simple — React's built-in hooks for local state, URL query state for filterable views, and Zustand or context for shared global state. I avoid over-engineering state."
    },
    {
        category: "Technical",
        question: "Do you have experience with design systems?",
        answer: "Yes. I've built and maintained component libraries using Tailwind CSS, shadcn/ui primitives, and Radix UI. I focus on consistent design tokens and reusable patterns."
    },
    {
        category: "Hiring",
        question: "What does your ideal role look like?",
        answer: "A senior or staff-level position where I can own frontend architecture, collaborate closely with design, and ship products that directly impact users."
    }
];

const categories = Array.from(new Set(faqs.map(item => item.category)));

function FAQItem({ faq, isOpen, onToggle, index }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void; index: number }) {
    const answerId = `faq-answer-${index}`;
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            viewport={{ once: true }}
            className={`border rounded-lg overflow-hidden transition-all duration-200 ${isOpen
                ? 'border-[--accent]/20 bg-zinc-900/60'
                : 'border-white/[0.04] bg-zinc-900/20 hover:border-white/[0.08] hover:bg-zinc-900/30'
                }`}
        >
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="w-full flex items-center justify-between p-4 text-left group"
            >
                <span className={`font-medium pr-6 transition-colors text-xs md:text-sm ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.question}
                </span>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium bg-zinc-800/50 text-zinc-500 border border-white/[0.04]">
                        {faq.category}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.15 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-900 text-zinc-600 group-hover:bg-zinc-800 group-hover:text-zinc-400'
                            }`}
                        aria-hidden="true"
                    >
                        <ChevronDown className="w-3 h-3" />
                    </motion.div>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={answerId}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="px-4 pb-4 text-zinc-400 text-xs leading-relaxed border-t border-white/[0.04] pt-3 max-w-4xl">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [activeCategory, setActiveCategory] = useState("General");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryCount = (category: string) => {
        return faqs.filter(f => f.category === category).length;
    };

    return (
        <section className="py-16 bg-black relative" id="faq">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-1.5 mb-3">
                        <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[--accent] font-medium">
                            FAQ
                        </span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
                        Questions<span className="text-[--accent]">?</span>
                    </h2>
                    <p className="text-zinc-500 max-w-md mx-auto text-xs leading-relaxed">
                        Common questions about my work, process, and technical approach.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-6 max-w-md mx-auto"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        aria-label="Search frequently asked questions"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/[0.06] rounded-lg py-2.5 pl-9 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[--accent]/20 focus:bg-zinc-900/80 transition-all shadow-lg shadow-black/20"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-200 ${activeCategory === category
                                ? "bg-zinc-800 text-white border border-white/15"
                                : "bg-transparent text-zinc-500 hover:text-zinc-300 border border-transparent hover:border-zinc-800"
                                }`}
                        >
                            {category}
                            <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold ${activeCategory === category
                                ? "bg-white text-black"
                                : "bg-zinc-900 text-zinc-600"
                                }`}>
                                {getCategoryCount(category)}
                            </span>
                        </button>
                    ))}
                </motion.div>

                <div className="space-y-2">
                    {filteredFaqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            index={i}
                        />
                    ))}
                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-10 text-zinc-600 text-xs">
                            No questions found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
