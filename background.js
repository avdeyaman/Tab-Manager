function parseUrl(tab) {
  try {
    return new URL(tab.url);
  } catch {
    return null;
  }
}

function sortTabs() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const sorted = tabs
      .map(tab => {
        const url = parseUrl(tab);
        if (!url) return null;
        return { id: tab.id, domain: url.hostname, title: tab.title };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.domain === b.domain) {
          return a.title.localeCompare(b.title);
        }
        return a.domain.localeCompare(b.domain);
      });

    for (let i = sorted.length - 1; i >= 0; i--) {
      chrome.tabs.move(sorted[i].id, { index: 0 });
    }
  });
}

function closeSearchTabs() {
  const isYandex = navigator.userAgent.includes("YaBrowser");

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      const url = parseUrl(tab);
      if (!url) return;

      if (isYandex) {
        if (url.hostname === "yandex.ru" && url.pathname.startsWith("/search/")) {
          chrome.tabs.remove(tab.id);
        }
      } else {
        if (
          (url.hostname === "www.google.com" || url.hostname === "www.google.ru") &&
          url.pathname.startsWith("/search")
        ) {
          chrome.tabs.remove(tab.id);
        }
      }
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sort_tabs") {
    sortTabs();
    sendResponse({ result: "ok" });
  } else if (request.action === "close_search_tabs") {
    closeSearchTabs();
    sendResponse({ result: "ok" });
  }
});