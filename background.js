function sortTabs() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const sorted = tabs
      .map(tab => {
        try {
          const url = new URL(tab.url);
          return { id: tab.id, domain: url.hostname, title: tab.title };
        } catch {
          return null;
        }
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
  chrome.tabs.query({}, (tabs) => {
    const isYandex = navigator.userAgent.includes("YaBrowser");

    tabs.forEach(tab => {
      try {
        const url = new URL(tab.url);
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
      } catch (e) {
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