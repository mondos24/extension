/*
chrome.runtime.sendMessage( {greeting: "hello"}, function(response) { // Общение content script с service worker
    console.log(response.farewell)
})
*/

// changes
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.applyFilter) {
    console.log('da, request apply filter');
    document.body.classList.add('filter-off');
  } else if (request.removeFilter) {
    console.log('da, request remove filter');
    document.body.classList.remove('filter-off');
  }
});


































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
