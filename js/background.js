chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled reason: ', details.reason);
  //
  saveClipboardData();
  //
  chrome.tabs.create({
    url: 'https://habr.com/ru/articles/'
  });
});

//
function saveClipboardData() {
  chrome.storage.local.get(["status"], (result) => {
    const { status } = result;
    console.log(status, 'чи');
    if (status) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "enable", value: true }, (response) => {
          console.log('Отправилось')
        });
      });
    }
  });
}
//


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
  //
  chrome.storage.sync.get(["clipboardData"]).then((result) => {
    console.log("Value currently is " + result.clipboardData);
  });
  //
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


chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  chrome.tabs.sendMessage(tabs[0].id, { type: "enable", value: true }, (response) => {});
});

/*
chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Context',
    contexts: ['all']
});
*/



/*
chrome.action.onClicked.addListener(() => {
  console.log('чи');
  chrome.storage.local.get(["status"], (result) => {
    const { status } = result;
    console.log(status, 'чи');
    if (status) {
      chrome.tabs.sendMessage(tabId, { type: "enable", value: true }, (response) => {});
    } else {
      chrome.tabs.sendMessage(tabId, { type: "enable", value: false }, (response) => {});
    }
  });
});
*/

