"use client";

import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const saveScrollPosition = () => {
    sessionStorage.setItem("scrollPosition", scrollPosition.toString());
  };

  const restoreScrollPosition = () => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  };

  return { scrollPosition, saveScrollPosition, restoreScrollPosition };
}
