let badgeState = {text: 'On'};

function updateAndToggleBadgeAndButton(button) {
    badgeState.text = badgeState.text === 'On' ? 'Off' : 'On';
    chrome.action.setBadgeText({text: badgeState.text});
    button.classList.toggle("btn-outline-success");
    button.classList.toggle("btn-outline-danger");
    button.textContent = button.classList.contains("btn-outline-success") ? "On" : "Off";

}

document.getElementById('toggleButton').addEventListener('click', function() {  
  chrome.runtime.sendMessage({toggleFilter: true});
  var button = this;
  // updateAndToggleBadgeAndButton(button);
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { 
    if (message.updateBadgeAndButtonMessage) { // Получаем запрос на изменение badge от background.js
      var button = document.getElementById('toggleButton');
      updateAndToggleBadgeAndButton(button);
    }
});