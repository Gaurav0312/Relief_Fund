// components/ScrollRestoration.js
"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    // Wait for DOM to be ready before restoring scroll
    const restoreScroll = () => {
      const savedY = sessionStorage.getItem("scrollY");
      if (savedY !== null) {
        // Give the page a moment to layout fully
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedY));
        }, 50); // short delay helps on mobile
      }
    };

    // Restore scroll on load
    if (document.readyState === "complete") {
      restoreScroll();
    } else {
      window.addEventListener("load", restoreScroll);
    }

    // Save scroll position before page unloads
    const saveScroll = () => {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("load", restoreScroll);
    };
  }, []);

  return null;
}
