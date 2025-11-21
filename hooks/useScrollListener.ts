"use client";

import { useCallback, useEffect } from "react";

// custom hook useScrollListener to listen to window object once we've reached to the bottom on the page, and then fetch more data.
export default function useScrollListener({
  onFetch,
}: {
  onFetch: () => void;
}) {
  const handleScroll = useCallback(() => {
    // get current pos
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // if too close to bottom then start fetching
    const scrollThreshold = documentHeight - windowHeight - 200; // 200 is buffer so user doesn't get too close to bottom
    if (scrollTop > scrollThreshold) {
      onFetch();
    }
  }, [onFetch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // attach listener to window
    return () => {
      window.removeEventListener("scroll", handleScroll); // cleanup
    };
  }, [handleScroll]);
}
