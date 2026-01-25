"use client";

import { useEffect, useRef } from "react";

/**
 * useScrollBlur - Adds blur reveal effect to elements as they enter viewport
 * Inspired by interface-design.dev
 */
export function useScrollBlur(variant: "normal" | "heavy" | "stagger" = "normal") {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Add appropriate class based on variant
        const className = variant === "stagger" ? "scroll-blur-stagger" : variant === "heavy" ? "scroll-blur-heavy" : "scroll-blur";
        element.classList.add(className);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [variant]);

    return ref;
}
