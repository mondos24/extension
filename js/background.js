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
  });

  chrome.storage.local.set(prefs, () => { // Store our prefs
    if (chrome.runtime.lastError) {
      console.error('Failed to store prefs:', chrome.runtime.lastError);
    } else {
      console.log('Prefs stored successfully.');
    }
  });
};


/*
chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Context',
    contexts: ['all']
});
*/