document.addEventListener("DOMContentLoaded", () => {
  console.log("Waiting for page load time...");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      console.warn("No active tab found!");
      document.getElementById("loadTime").textContent = "No active tab found!";
      return;
    }

    const currentTabURL = tabs[0].url;
    const storageKey = `tab-${currentTabURL}`;

    console.log("Fetching load time for:", storageKey);

    chrome.storage.local.get([storageKey], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
        document.getElementById("loadTime").textContent =
          "Error retrieving data.";
      } else if (!result || !result[storageKey]) {
        console.warn("Key not found in storage:", storageKey);
        document.getElementById("loadTime").textContent =
          "Load time not found!";
      } else {
        console.log("Stored value:", result[storageKey]);
        document.getElementById(
          "loadTime"
        ).textContent = `Page Load Time: ${result[storageKey]}`;
      }
    });
  });
});
