let lastClipboardData = ''
let interval

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.applyFilter) {
    document.body.classList.add('filter-on');
  } else if (request.removeFilter) {
    document.body.classList.remove('filter-on');
  }
});


let filterCheck = () => { // Если в хранилище статус есть, то применяем фильтр по значению статуса
    chrome.storage.local.get(["status"], (result) => {

      const { status } = result;
      document.body.classList.toggle('filter-on', status ? true : false); // Если статус true, то filter-on в css
    });
}


filterCheck();


// changes
const readClipboard = async() => {
  
  const clipboardData = {
    CData: navigator.clipboard.readText()
  };
  chrome.storage.local.set(clipboardData, () => { // Store our clipboard data
    if (chrome.runtime.lastError) {
      console.error('Failed to store clipboard data:', chrome.runtime.lastError);
    } else {
      console.log('Clipboard data stored successfully.', clipboardData);
    }
  });
  return await navigator.clipboard.readText();
}
readClipboard();


























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
