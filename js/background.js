const activeTabs = new Set();


chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled reason: ', details.reason);
  chrome.tabs.create({
    url: 'https://habr.com/ru/articles/'
  });
});


chrome.runtime.onMessage.addListener(data => {
  const { event, prefs } = data;
  switch (event) {

    case 'onSwitch':
      handleOnSwitch(prefs);
      break;

    default:
      break;   
  }
});


const handleOnSwitch = prefs => {
  console.log('prefs:', prefs);
  const status = prefs.status;
  const message = status ? { applyFilter: true } : { removeFilter: true }; // В зависимости от status (boolean) выбран фильтр, который применится
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message); // contentScript.js

    // changes
    chrome.tabs.sendMessage(tabs[0].id, {type: 'enable', value: status}, (response) => {
      if (tabs[0].id){if(activeTabs.has(tabs[0].id)){
        if (status){
          activeTabs.delete(tabs[0].id);
        } else {
          activeTabs.add(tabs[0].id);
        }
      }}
    });


  });

  chrome.storage.local.set(prefs, () => { // Store our prefs
    if (chrome.runtime.lastError) {
      console.error('Failed to store prefs:', chrome.runtime.lastError);
    } else {
      console.log('Prefs stored successfully.');
    }
  });
};


// changes
chrome.tabs.onRemoved.addListener((tabId) => {
  if(activeTabs.has(tabId)){
    activeTabs.delete(tabId);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.type === 'status'){
    const tabId = sender?.tab?.id
    if(tabId){
      sendResponse({ active: activeTabs.has(tabId) });
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab?.id;
  if(tabId){
    
  }
})


/*
chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Context',
    contexts: ['all']
});
*/