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