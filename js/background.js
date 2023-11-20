chrome.runtime.onInstalled.addListener(details => {
    console.log('onInstalled reason: ', details.reason);
    chrome.tabs.create({
        url: 'https://habr.com/ru/articles/'
    });
});


chrome.runtime.onMessage.addListener(data => {
    const {event, prefs} = data;
    switch (event) {
        case 'onSwitch':
            handleOnSwitch(prefs);
            break;
        default:
            break;
        
    }
});

const handleOnSwitch = (prefs) => {
    console.log('prefs:', prefs);
    
    chrome.storage.local.set(prefs); // Store our prefs
}

// changes 
let filterEnabled = false;
chrome.storage.local.get(["filterStatus"], (result) => {
    /*
    const { filterStatus } = result;
    filterEnabled = !filterStatus; //                               Поменять
    console.log('mi menyaem', filterStatus, filterEnabled);
    */
});
console.log(filterEnabled, 'eto on');


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
    if (request.toggleFilter) { // из popup.js
        console.log(filterEnabled);
        filterEnabled = !filterEnabled;
        chrome.storage.local.set({ filterStatus: filterEnabled });
        
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






















/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // Общаемся с contentScript
      if (request.greeting == "hello") {
        sendResponse({farewell: "goodbye"});
      }
    }
);
*/


/*
chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Context',
    contexts: ['all']
});
*/