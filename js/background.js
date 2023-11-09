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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleFilter) {
        filterEnabled = !filterEnabled;
        if (filterEnabled) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {applyFilter: true});
            });
        } else {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {removeFilter: true});
            });
        }
    }
});