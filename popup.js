document.getElementById('sortBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "sort_tabs" });
  showSortStatus()
});

const closeBtn = document.getElementById('closeSearchTabsBtn');

closeBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "close_search_tabs" });
  showCloseStatus()
});

const ua = navigator.userAgent;
if (ua.includes("YaBrowser")) {
  closeBtn.textContent = "Закрыть Яндекс поиск";
} else if (ua.includes("Chrome")) {
  closeBtn.textContent = "Закрыть Google поиск";
} else {
  closeBtn.textContent = "Закрыть поиск";
}

function showSortStatus() {
  const btn = document.getElementById("sortBtn");
  const originalText = btn.innerText;
  btn.innerText = "Готово!";
  btn.classList.add("done-button");
  setTimeout(() => {
    btn.innerText = originalText;
    btn.classList.remove("done-button");
  }, 1000);
}

function showCloseStatus() {
  const btn = document.getElementById("closeSearchTabsBtn");
  const originalText = btn.innerText;
  btn.innerText = "Готово!";
  btn.classList.add("done-button");
  setTimeout(() => {
    btn.innerText = originalText;
    btn.classList.remove("done-button");
  }, 1000);
}