"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Search, MessageCircle } from "lucide-react";

// Data from the screenshots
const faqs = [
    // Templates
    {
        category: "Templates",
        question: "How do I download the templates after purchase?",
        answer: "After completing your purchase, you will receive an email with a download link. You can also access your downloads directly from your account dashboard under the 'Purchases' section at any time."
    },
    {
        category: "Templates",
        question: "Can I request custom modifications to the templates?",
        answer: "Yes, we offer custom modification services for all our templates. Please contact our support team with your specific requirements, and we'll provide a quote based on the scope of work."
    },
    {
        category: "Templates",
        question: "Do the templates work on mobile devices?",
        answer: "Absolutely. All our templates are fully responsive and optimized for mobile devices, tablets, and desktops to ensure a seamless user experience across all screen sizes."
    },
    // Licensing
    {
        category: "Licensing",
        question: "Are updates included in the price?",
        answer: "Yes, all future updates are included for free. We regularly update our templates to ensure compatibility with the latest technologies and to add new features."
    },
    {
        category: "Licensing",
        question: "Can I use the templates for client projects?",
        answer: "Yes, you can use the templates for client projects. The Commercial License allows you to use the template for a single end product (personal or client). For multiple clients, you would need a separate license for each project or an Extended License."
    },
    {
        category: "Licensing",
        question: "What does the Commercial License allow me to do?",
        answer: "The Commercial License allows you to use the item to create one single End Product for yourself or for one client (a 'single application'), and the End Product can be sold or distributed for free."
    },
    // Components
    {
        category: "Components",
        question: "Are the components compatible with my framework?",
        answer: "Our components are designed to be framework-agnostic where possible, but we provide specific implementations for React, Vue, and plain HTML/CSS. Check the documentation for each component for specific compatibility details."
    },
    {
        category: "Components",
        question: "How do I import the components into my project?",
        answer: "You can import components by copying the source code directly or using our CLI tool. Detailed installation instructions are provided in the documentation for each component."
    },
    // Support
    {
        category: "Support",
        question: "Is there technical support available if I need help?",
        answer: "Yes, we provide dedicated technical support via email and our discord community. Our team is available Mon-Fri to assist you with any installation or configuration issues."
    },
    {
        category: "Support",
        question: "Can I get a refund if I'm not satisfied?",
        answer: "We offer a 30-day money-back guarantee if the product is technically defective or not as described. Please review our refund policy for full details."
    }
];

// Get unique categories and their counts
const categories = Array.from(new Set(faqs.map(item => item.category)));

function FAQItem({ faq, isOpen, onToggle, index }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${isOpen
                ? 'border-[--accent]/30 bg-zinc-900/80'
                : 'border-white/5 bg-zinc-900/20 hover:border-white/10 hover:bg-zinc-900/40'
                }`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left group"
            >
                <span className={`font-medium pr-8 transition-colors text-base md:text-lg ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.question}
                </span>

                <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-white/5">
                        {faq.category}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-zinc-300'
                            }`}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="px-6 pb-6 text-zinc-400 text-base leading-relaxed border-t border-white/5 pt-4 max-w-4xl">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [activeCategory, setActiveCategory] = useState("Templates");
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
        <section className="py-24 bg-black relative" id="faq">
            {/* Background Grid - subtle and contained */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-6 font-medium">
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Got <span className="text-white">Questions?</span>
                    </h2>
                    <p className="text-zinc-500 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                        Find answers to common questions about our templates, components, and licensing options.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-10 max-w-xl mx-auto"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-4 px-12 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-[--accent]/30 focus:bg-zinc-900/80 transition-all shadow-lg shadow-black/20"
                    />
                </motion.div>

                {/* Category Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${activeCategory === category
                                ? "bg-zinc-800 text-white border border-white/20"
                                : "bg-transparent text-zinc-500 hover:text-zinc-300 border border-transparent hover:border-zinc-800"
                                }`}
                        >
                            {category}
                            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${activeCategory === category
                                ? "bg-white text-black"
                                : "bg-zinc-900 text-zinc-500"
                                }`}>
                                {getCategoryCount(category)}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4">
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
                        <div className="text-center py-16 text-zinc-500">
                            No questions found matching your criteria.
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                {/* Removed or simplified as per design focus, keeping it clean */}
            </div>
        </section>
    );
}
