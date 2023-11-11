let badgeState = {text: 'On'};

function updateAndToggleBadge() {
    badgeState.text = badgeState.text === 'On' ? 'Off' : 'On';
    chrome.action.setBadgeText({text: badgeState.text});
}

document.getElementById('toggleButton').addEventListener('click', function() {  
  chrome.runtime.sendMessage({toggleFilter: true});
  var button = this;
  button.classList.toggle("btn-outline-success");
  button.classList.toggle("btn-outline-danger");
  button.textContent = button.classList.contains("btn-outline-success") ? "On" : "Off";
  updateAndToggleBadge();
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.updateBadge) {
      updateAndToggleBadge();
    }
});
