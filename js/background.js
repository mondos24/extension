console.log('hi im service worker');
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: 'https://habr.com/ru/articles/'
    })
})

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // Общаемся с contentScript
      if (request.greeting == "hello") {
        sendResponse({farewell: "goodbye"});
      }
    }
);
*/

let filterEnabled = false;

function toggleFilter() { // Применяет/Удаляем фильтр и меняет badge и button
    filterEnabled = !filterEnabled;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var message = (filterEnabled) ? {applyFilter: true} : {removeFilter: true};
        chrome.tabs.sendMessage(tabs[0].id, message);
        chrome.runtime.sendMessage({ updateBadgeAndButtonMessage: true }); 
        // Общаемся с popup.js для переключения badge и button
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleFilter) {
        toggleFilter();
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "switch_blur") {
        toggleFilter();
    }
});

chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Context',
    contexts: ['all']
});