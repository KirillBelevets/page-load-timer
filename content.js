(() => {
  function getPageLoadTime() {
    const [navigation] = performance.getEntriesByType("navigation");

    if (!navigation) {
      return "Still Loading... (Navigation Undefined)";
    }

    if (navigation.loadEventEnd === 0) {
      console.warn("loadEventEnd is 0, trying fallback...");
      const loadTimeFallback =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      return loadTimeFallback > 0
        ? `${Math.round(loadTimeFallback)} ms (Fallback)`
        : "Still Loading...";
    }

    const loadTime = navigation.loadEventEnd - navigation.startTime;
    console.log("Navigation Load Time:", loadTime);

    return loadTime > 0 ? `${Math.round(loadTime)} ms` : "Still Loading...";
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      const pageLoadTime = getPageLoadTime();
      console.log("Page Load Time Captured:", pageLoadTime);

      const storageKey = `tab-${window.location.href}`;

      chrome.storage.local.set({ [storageKey]: pageLoadTime }, () => {
        if (chrome.runtime.lastError) {
          console.error("Storage set error:", chrome.runtime.lastError);
        } else {
          console.log(
            "Stored in chrome.storage.local:",
            storageKey,
            pageLoadTime
          );
        }
      });
    }, 100);
  });
})();
