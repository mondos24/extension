// ELEMENTS
const inputSetElement = document.getElementById('inputSet');
const checkboxBlur = document.getElementById('flexSwitchCheckBlur');
const activeSpan = document.getElementById('activeSpan');
const inactiveSpan = document.getElementById('inactiveSpan');
const textareaElement = document.getElementById('exampleFormControlTextarea1');

// BUTTONS
const setButton = document.getElementById('setB');
const getButton = document.getElementById('getB');

const hideElement = (elem) => {
  elem.style.display = 'none';
}

const showElement = (elem) => {
  elem.style.display = '';
}

const handleOnStartState = () => {
  showElement(activeSpan);
  hideElement(inactiveSpan);
}

const handleOnStopState = () => {
  hideElement(activeSpan);
  showElement(inactiveSpan);
}



checkboxBlur.addEventListener('click', () => {
  const isRunning = checkboxBlur.checked
  isRunning ? handleOnStartState() : handleOnStopState(); // Если status - true, то Start
  chrome.runtime.sendMessage({ event: 'onSwitch', status: checkboxBlur.checked }); // background.js
});

textareaElement.addEventListener('click', () => {
  chrome.storage.local.get('clpbrd', function(data) {
    console.log(data.clpbrd);
    textareaElement.value = data.clpbrd;
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {toastify: true, text: "Текст вставлен"});
  }); 

})

chrome.storage.local.get(["status"], (result) => {
  console.log(result);
  const { status } = result;
  chrome.runtime.lastError
    ? console.error(chrome.runtime.lastError) // Если есть ошибка, вывести ошибку
    : status // иначе статус есть
    ? (checkboxBlur.checked = status, handleOnStartState()) // если он есть, вывести это
    : handleOnStopState(); // иначе это
});





// inputSetElement.value

setButton.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: "copyText",
    },
    function(response) {})
  }); 


  setButton.innerHTML = 'copied';
  chrome.storage.sync.set({'inputValue': inputSetElement.value}, function() {
    setTimeout(function() {
      setButton.innerHTML = 'copy';
    }, 1000); // 1000 milliseconds = 1 second
  });

}

getButton.onclick = function() {

  chrome.storage.sync.get('inputValue', function(data) {
    inputSetElement.value = data.inputValue;
  });

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { toastify: true, text: 'Прошлый запрос получен' }); // contentScript.js
  });
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {message: "Привет, contentScript!"});
  // });
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   if (request.clipboardContent) {
  //     // Используем содержимое буфера обмена
  //     console.log("Содержимое буфера обмена: " + request.clipboardContent);
  //   }
  // });
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}


/*
getButton.addEventListener('click', () => {
  if (inputSetElement.value) {
    console.log('data: ', inputSetElement.value);
  } else {
    console.log('empty')
  }
});
*/

