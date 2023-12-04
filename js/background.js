chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled reason: ', details.reason);

  chrome.tabs.create({
    url: 'https://habr.com/ru/articles/'
  });
});

//
async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0].url;
}

chrome.tabs.onUpdated.addListener(async function () {
    console.log("TAB UPDATED")
    let url = await getTab()
    console.log(url)
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { url: url, act: true }); // contentScript.js
  });
})
//

chrome.runtime.onMessage.addListener( data => {
  const { event, status } = data;
  switch (event) {

    case 'onSwitch':
      handleOnSwitch(status);
      break;

    default:
      break;   
  }
});


const handleOnSwitch = (status) => {
  console.log('status:', status);
  const message = status ? { applyFilter: true } : { removeFilter: true }; // В зависимости от status (boolean) выбран фильтр, который применится

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message); // contentScript.js
  });

  chrome.storage.local.set({ status: status }, () => { // Store our status
    if (chrome.runtime.lastError) {
      console.error('Failed to store status:', chrome.runtime.lastError);
    } else {
      console.log('Status stored successfully.');
    }
  });
};

// chrome.contextMenus.create({
//     id: 'myContextMenu',
//     title: `Summarize "${"%s"}"`,
//     contexts: ['all']
// });


chrome.commands.onCommand.addListener((command) => {
  if (command === 'switch_blur') {

    chrome.storage.local.get(["status"], (result) => {
      const { status } = result;
      console.log(status, 'статус');
      handleOnSwitch(!status);
    });
  }
});

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


