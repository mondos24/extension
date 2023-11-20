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


getButton.addEventListener('click', () => {
  if (inputSetElement.value) {
    console.log('data: ', inputSetElement.value);
  } else {
    console.log('empty')
  }
});


chrome.storage.local.get(["status"], (result) => {  
  const { status } = result;
  chrome.runtime.lastError
    ? console.error(chrome.runtime.lastError) // Если есть ошибка, вывести ошибку
    : status // иначе статус есть
    ? (checkboxBlur.checked = status, handleOnStartState()) // если он есть, вывести это
    : handleOnStopState(); // иначе это
});








/*
// chrome.storage.sync
var set_button = document.getElementById('setB');
var input_stroke = document.getElementById('input_set');

set_button.onclick = function() {
  set_button.innerHTML = 'saved';
  chrome.storage.sync.set({'input_value': input_stroke.value}, function() {
    setTimeout(function() {
      set_button.innerHTML = 'save';
    }, 1000); // 1000 milliseconds = 1 second
  });
}

document.getElementById('getB').onclick = function() {
  chrome.storage.sync.get('input_value', function(data) {
    input_stroke.value = data.input_value;
  });
}
*/