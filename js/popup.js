// ELEMENTS
const inputSetElement = document.getElementById('inputSet');
const checkboxBlur = document.getElementById('flexSwitchCheckBlur');
const activeSpan = document.getElementById('activeSpan');
const inactiveSpan = document.getElementById('inactiveSpan');

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
  const prefs = {
    status: checkboxBlur.checked
  };
  const isRunning = prefs.status
  if (isRunning) {
    handleOnStartState();
  } else {
    handleOnStopState();
  }
  chrome.runtime.sendMessage({ event: 'onSwitch', prefs });
});

checkboxBlur.addEventListener('click', () => {
  const prefs = {
    status: checkboxBlur.checked
  };
  const isRunning = prefs.status
  prefs.status ? handleOnStartState() : handleOnStopState(); // Если status - true, то Start
  chrome.runtime.sendMessage({ event: 'onSwitch', prefs }); // background.js
});


chrome.storage.local.get(["status"], (result) => {  
  const { status } = result;
  chrome.runtime.lastError
    ? console.error(chrome.runtime.lastError) // Если есть ошибка, вывести ошибку
    : status // иначе статус есть
    ? (checkboxBlur.checked = status, handleOnStartState()) // если он есть, вывести это
    : handleOnStopState(); // иначе это
});





// inputSetElement.value

setButton.onclick = function() {
  
  setButton.innerHTML = 'saved';
  chrome.storage.sync.set({'inputValue': inputSetElement.value}, function() {
    setTimeout(function() {
      setButton.innerHTML = 'save';
    }, 1000); // 1000 milliseconds = 1 second
  });

}

getButton.onclick = function() {

  chrome.storage.sync.get('inputValue', function(data) {
    inputSetElement.value = data.inputValue;
  });


  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "Привет, contentScript!"});
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.clipboardContent) {
      // Используем содержимое буфера обмена
      console.log("Содержимое буфера обмена: " + request.clipboardContent);
    }
  });
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

