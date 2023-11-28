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
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //chrome.storage.local.get(["cData"], (result) => {
    
    //   const { cData } = result;
    //   console.log(cData);
    // });
    
}

filterCheck();


chrome.runtime.onMessage.addListener( // this is the message listener
  function(request, sender, sendResponse) {
    if (request.message === "copyText")
      chrome.storage.sync.get('inputValue', function(data) {
      const textToCopy = data.inputValue;
      copyToTheClipboard(textToCopy);
      ToastifyIt('Текст скопирован');
    });
  }
);

async function copyToTheClipboard(textToCopy){
    const el = document.createElement('textarea');
    
    el.value = textToCopy;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

const ToastifyIt = async (text) => {
  Toastify({
    text: text,
    duration: 1500,
    gravity: "bottom",
    position: "center"
  }).showToast();
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toastify) {
    ToastifyIt(request.text);
  }
});

const preEl = document.getElementById("secondary-inner");


function removeItems(){

  var ta = document.createElement('textarea');

  // prevent user input
  ta.addEventListener('cut', function(e) { e.preventDefault(); }, false);
  ta.addEventListener('copy', function(e) { e.preventDefault(); }, false);
  ta.addEventListener('paste', function(e) { e.preventDefault(); }, false);
  ta.addEventListener('keydown', function(e) { e.preventDefault(); }, false);
  elemWidth = preEl.offsetWidth;
  ta.style.cssText = `
                      width: ${elemWidth}px;
                      height: 120px;
                      resize: none;
                      padding: 12px 20px;
                      box-sizing: border-box;
                      border: 2px solid #ccc;
                      border-radius: 4px;
                      background-color: #f8f8f8;
                      font-size: 16px;`;
  // listen for user selections
  ta.textContent = 'Content from extension would be here'
  ta.addEventListener('select', function() {
      // function logic...
  }, false);
  preEl.prepend(ta)
}

removeItems();
// changes
/*
const setClipboard = async () => {
  try {
    const clipboardData = await navigator.clipboard.readText();
  
    chrome.storage.local.set({ cData: clipboardData }, () => {
      if (chrome.runtime.lastError) {
        console.error('Failed to store clipboard data:', chrome.runtime.lastError);
      } else {
        console.log('Clipboard data stored successfully.');
      }
    });

    getStorageClipboardData();
  } catch (error) {
    console.error('Failed to read clipboard data:', error);
  }
}

const getStorageClipboardData = () => {
  chrome.storage.local.get("cData", (data) => {
    const { cData } = data;
    console.log(cData, 'Да, это гет');
  });
}

setClipboard();

*/


/*
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.message === "Привет, contentScript!") {
    try {
      const clipboardData = await navigator.clipboard.readText();
      chrome.runtime.sendMessage({ clipboardContent: clipboardData });
    } catch (error) {
      console.error('Failed to read clipboard data:', error);
    }
  }
});
*/








//
// let timeout;
// let lastClipboardData = "";

// const writeClipboard = async (text) => {
//   lastClipboardData = text;
//   await chrome.storage.sync.set({ clipboardData: text }).then(() => {
//     console.log('Буфер обмена записан')
//   });
// };

// function checkClipboard() {
//   if(document.hasFocus()){
//     navigator.clipboard.readText().then((clipboardData) => {

//       if (clipboardData !== lastClipboardData) {
//         lastClipboardData = clipboardData;
//         writeClipboard(clipboardData);
//       }
//     });
//   } 
// }
// const startHandleClipboard = () => {
//   navigator.clipboard.readText().then((text) => {
//     lastClipboardData = text;
//     timeout = setInterval(checkClipboard, 100);
//   });
// };

// const stopHandleClipboard = () => {
//   clearInterval(timeout);
// };

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   switch (request.type) {
//     case "enable": {
//       if (request.value) {
//         startHandleClipboard();
//       } else {
//         stopHandleClipboard();
//       }
//       sendResponse({ ok: true });
//       return;
//     }
//     case "copy": {
//       const text = request.text;
//       writeClipboard(text);
//       sendResponse({ ok: true });
//       return;
//     }
//   }
//   sendResponse({ ok: true });
// });
// 
//





























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
