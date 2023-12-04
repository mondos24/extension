document.addEventListener('copy', () => {
  ToastifyIt('Текст скопирован');
  navigator.clipboard.readText()
    .then(clpbrd => {
      chrome.storage.local.set({ clpbrd: clpbrd }, () => { // Store our status
        if (chrome.runtime.lastError) {
          console.error('Failed to store clpbrd:', chrome.runtime.lastError);
        } else {
          console.log('Clpbrd stored successfully.', clpbrd);
    }
  });
    })
    .catch(err => console.log(err));
})

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


//
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.act) {
    console.log(request);
  }
});
//






// const preEl = document.getElementById("secondary-inner");

// function removeItems(){

//   var ta = document.createElement('textarea');

//   // prevent user input
//   ta.addEventListener('cut', function(e) { e.preventDefault(); }, false);
//   ta.addEventListener('copy', function(e) { e.preventDefault(); }, false);
//   ta.addEventListener('paste', function(e) { e.preventDefault(); }, false);
//   ta.addEventListener('keydown', function(e) { e.preventDefault(); }, false);
//   elemWidth = preEl.offsetWidth;
//   ta.style.cssText = `
//                       width: ${elemWidth}px;
//                       height: 120px;
//                       resize: none;
//                       padding: 12px 20px;
//                       box-sizing: border-box;
//                       border: 2px solid #ccc;
//                       border-radius: 4px;
//                       background-color: #f8f8f8;
//                       font-size: 16px;`;
//   // listen for user selections
//   ta.textContent = 'Content from extension would be here'
//   ta.addEventListener('select', function() {
//       // function logic...
//   }, false);
//   preEl.prepend(ta)
// }

// removeItems();















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
