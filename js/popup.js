let badgeState = {text: 'On'};

function updateAndToggleBadgeAndButton(button) {
    badgeState.text = badgeState.text === 'On' ? 'Off' : 'On';
    chrome.action.setBadgeText({text: badgeState.text}); // Меняем badge
    button.classList.toggle("btn-outline-success"); // Меняем button
    button.classList.toggle("btn-outline-danger");
    button.textContent = button.classList.contains("btn-outline-success") ? "On" : "Off";
}

document.getElementById('toggleButton').addEventListener('click', function() {  
  chrome.runtime.sendMessage({toggleFilter: true});
  // btn = this; // тут this это именно кнопка, не весь DOM
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { 
    if (message.updateBadgeAndButtonMessage) { // Получаем запрос на изменение badge и button от background.js
      var button = document.getElementById('toggleButton');
      updateAndToggleBadgeAndButton(button);
    }
});


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
console.log(document.getElementById('setB'));

document.getElementById('getB').onclick = function() {
  chrome.storage.sync.get('input_value', function(data) {
    input_stroke.value = data.input_value;
    alert(data.input_value);
  });
}