const sortBtn = document.getElementById('sortBtn');
const closeBtn = document.getElementById('closeSearchTabsBtn');

sortBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'sort_tabs' });
  showStatus(sortBtn);
});

closeBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'close_search_tabs' });
  showStatus(closeBtn);
});

const ua = navigator.userAgent;
if (ua.includes('YaBrowser')) {
  closeBtn.textContent = 'Закрыть Яндекс поиск';
} else if (ua.includes('Chrome')) {
  closeBtn.textContent = 'Закрыть Google поиск';
} else {
  closeBtn.textContent = 'Закрыть поиск';
}

function showStatus(button) {
  const originalText = button.innerText;
  button.innerText = 'Готово!';
  button.classList.add('done-button');
  setTimeout(() => {
    button.innerText = originalText;
    button.classList.remove('done-button');
  }, 1000);
}
