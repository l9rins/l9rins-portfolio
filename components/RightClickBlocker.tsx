"use client";

import { useEffect } from "react";

export function RightClickBlocker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      e.preventDefault();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "u") ||
        (e.key === "F12")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("contextmenu", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return null;
}
