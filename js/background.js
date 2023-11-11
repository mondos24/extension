console.log('hi im service worker');
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: 'https://habr.com/ru/articles/'
    })
})

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.greeting == "hello") {
        sendResponse({farewell: "goodbye"});
      }
    }
);
*/

let filterEnabled = false;

function toggleFilter() {
    filterEnabled = !filterEnabled;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var message = (filterEnabled) ? {applyFilter: true} : {removeFilter: true};
        chrome.tabs.sendMessage(tabs[0].id, message);
        chrome.runtime.sendMessage({ updateBadgeAndButtonMessage: true });
    });
}
/*
function updateAndToggleBadge() { // Общаемся с popup.js для переключения badge
    chrome.runtime.sendMessage({ updateBadgeAndButtonMessage: true });
}
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleFilter) {
        toggleFilter();
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "switch_blur") {
        toggleFilter();
        // updateAndToggleBadge();
    }
});