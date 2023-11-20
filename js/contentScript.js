/*
chrome.runtime.sendMessage( {greeting: "hello"}, function(response) { // Общение content script с service worker
    console.log(response.farewell)
})
*/

// changes
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.applyFilter) {
    document.body.classList.add('filter-on');
  } else if (request.removeFilter) {
    document.body.classList.remove('filter-on');
  }
});


function filterCheck() { // Если в хранилище статус есть, то применяем фильтр по значению статуса
    chrome.storage.local.get(["status"], (result) => {
        const { status } = result;
    
        if (status) {
            document.body.classList.add('filter-on');
        } else {
            document.body.classList.remove('filter-on');
        }
    });
}

filterCheck();

































/*
navigator.clipboard.readText()
      .then(text => {
        // здесь вы можете использовать переменную text, содержащую скопированный текст
        console.log('Скопированный текст:', text);
      })
      .catch(err => {
        console.error('Не удалось получить данные из буфера обмена:', err);
      });
*/
