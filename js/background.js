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
    // changes
    const status = prefs.status;
    if (status) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Посылка в contentScript.js
        chrome.tabs.sendMessage(tabs[0].id, {applyFilter: true});
        });
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Посылка в contentScript.js
        chrome.tabs.sendMessage(tabs[0].id, {removeFilter: true});
        });
    }  
    //
    chrome.storage.local.set(prefs); // Store our prefs
}

// changes 
/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
    console.log(request);
    if (request.toggleFilter) { // из popup.js
        chrome.storage.local.get(["status"], (result) => {  // Sync elements and buttons
            const { status } = result;
            console.log(status);
        
            if (status) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {applyFilter: true});
                });
            } else {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {removeFilter: true});
                });
            }
        });
    }
});
*/





















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