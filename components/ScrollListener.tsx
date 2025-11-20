"use client";

import { useCallback, useEffect } from "react";

export default function ScrollListener({ onFetch }: { onFetch: () => void }) {
  const handleScroll = useCallback(() => {
    // 1. Get the current scroll position
    const scrollTop = window.scrollY;
    // 2. Get the viewport height (visible window area)
    const windowHeight = window.innerHeight;
    // 3. Get the total height of the document (the entire page)
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user is near the bottom.
    // We use a small offset (e.g., 200px) to start loading before they hit the absolute bottom.
    const scrollThreshold = documentHeight - windowHeight - 200;

    if (scrollTop > scrollThreshold) {
      // If near the bottom, not currently loading, and there's potentially more data, fetch the next page.
      console.log("fetch more!");
      onFetch();
      //   fetchData(page);
    }
  }, [
    onFetch,
    // isLoading, hasMore,
    // page, fetchData
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup function: important to remove the listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Re-run effect if handleScroll changes (due to dependencies like page/isLoading)
  return <div>Scroll listener</div>;
}
