"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Search, MessageCircle, FileText, Code, HelpCircle, Plus, Minus } from "lucide-react";

const categories = [
    { id: "all", label: "All", icon: HelpCircle },
    { id: "services", label: "Services", icon: Code },
    { id: "process", label: "Process", icon: FileText },
    { id: "support", label: "Support", icon: MessageCircle },
];

const faqs = [
    {
        category: "services",
        question: "What services do you offer?",
        answer: "I specialize in full-stack web development, UI/UX design, and performance optimization. This includes building custom web applications, landing pages, dashboards, and mobile-responsive interfaces using modern technologies like Next.js, React, and TypeScript."
    },
    {
        category: "services",
        question: "Do you work with startups or enterprises?",
        answer: "I work with clients of all sizes, from early-stage startups to established enterprises. My approach adapts to your specific needs, whether you need rapid prototyping for MVPs or enterprise-grade solutions with robust architecture."
    },
    {
        category: "process",
        question: "What is your development process?",
        answer: "My process includes discovery & planning, design mockups, iterative development with regular check-ins, thorough testing, and deployment. I use agile methodologies to ensure flexibility and transparency throughout the project."
    },
    {
        category: "process",
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on scope and complexity. A simple landing page might take 1-2 weeks, while a full web application could take 2-3 months. I'll provide a detailed timeline during our initial consultation."
    },
    {
        category: "support",
        question: "Do you provide ongoing maintenance?",
        answer: "Yes, I offer ongoing maintenance and support packages. This includes bug fixes, performance monitoring, security updates, and feature enhancements to keep your application running smoothly."
    },
    {
        category: "support",
        question: "How can I get started?",
        answer: "Simply reach out through the contact form or email. We'll schedule a discovery call to discuss your project requirements, timeline, and budget. From there, I'll provide a detailed proposal and we can begin!"
    },
];

function FAQItem({ faq, isOpen, onToggle, index }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                ? 'border-[--accent]/30 bg-zinc-900/80'
                : 'border-white/10 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60'
                }`}
            style={{
                boxShadow: isOpen ? '0 0 40px rgba(255, 107, 0, 0.08)' : 'none',
            }}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 text-left group"
            >
                <span className={`font-medium pr-4 transition-colors ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen
                        ? 'bg-[--accent] text-black'
                        : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'
                        }`}
                >
                    <Plus className="w-4 h-4" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-24 bg-black">
            <div className="max-w-3xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[--accent] mb-4 block font-medium">
                        Frequently Asked Questions
                    </span>
                    <h2 className="h2 mb-4">
                        Got <span className="gradient-text">Questions?</span>
                    </h2>
                    <p className="text-zinc-500 max-w-md mx-auto text-sm leading-relaxed">
                        Find answers to common questions about services, process, and how we can work together.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-6"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-white/10 rounded-xl py-3.5 px-11 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[--accent]/50 focus:bg-zinc-900/80 transition-all"
                    />
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? "bg-[--accent] text-black shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                                : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                                }`}
                        >
                            <cat.icon className="w-3.5 h-3.5" />
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-3">
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
                        <div className="text-center py-12 text-zinc-500 text-sm">
                            No questions found matching your search.
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 p-8 bg-zinc-900/50 border border-white/10 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.03) 0%, transparent 50%)',
                    }}
                >
                    <p className="text-zinc-400 text-sm mb-4">Still have questions?</p>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[--accent] text-black text-sm font-semibold rounded-full hover:bg-[--accent-light] transition-colors shadow-[0_0_30px_rgba(255,107,0,0.3)]"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Get in Touch
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
