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
  return await navigator.clipboard.readText();
}

const writeClipboard = async (text) => {
  lastClipboardData = text;
  await navigator.clipboard.writeText(text);
  console.log('pizdorez', text);
}

const onClipboardChange = (text) => {
  writeClipboard(`<div>${text}</div>`);
}

const checkClipboard = () => {
  if(document.hasFocus()){
    navigator.clipboard.readText().then((clipboardData) => {
      if(clipboardData !== lastClipboardData){
        lastClipboardData = clipboardData;
        onClipboardChange(clipboardData);
      }
    });
  }
}

const startHandleClipboard = () => {
  navigator.clipboard.readText().then((text) => {
    lastClipboardData = text;
    interval = setInterval(checkClipboard, 500);
  })
}

const stopHandleClipboard = () => {
  clearInterval(interval);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.type){
    case "enable": {
      if(request.value){
        startHandleClipboard();
      } else {
        stopHandleClipboard();
      }
      sendResponse({ok: true});
      return
    }
  }
  sendResponse({ok: false});
});

chrome.runtime.sendMessage({type: "status"}, (res) => {
  if(res?.active){
    startHandleClipboard();
  } else {
    stopHandleClipboard();
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
