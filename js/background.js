chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled reason: ', details.reason);
  //
  // saveClipboardData();
  //
  chrome.tabs.create({
    url: 'https://habr.com/ru/articles/'
  });
});
// function saveClipboardData() {
//   chrome.storage.local.get(["status"], (result) => {
//     const { status } = result;
//     console.log(status, 'чи');
//     if (status) {
//       chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         chrome.tabs.sendMessage(tabs[0].id, { type: "enable", value: true }, (response) => {
//           console.log('Отправилось')
//         });
//       });
//     }
//   });
// }
//


chrome.runtime.onMessage.addListener( data => {
  const { event, prefs } = data;
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
  //
  // chrome.storage.sync.get(["clipboardData"]).then((result) => {
  //   console.log("Value currently is " + result.clipboardData);
  // });
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

chrome.contextMenus.create({
    id: 'myContextMenu',
    title: `Summarize "${"%s"}"`,
    contexts: ['all']
});


chrome.commands.onCommand.addListener((command) => {
  if (command === 'switch_blur') {
    console.log(`Command: ${command}`);
  }
  
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const offscreenCreate = async () => {
//   await copyFromClipboard();
// }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//   chrome.tabs.sendMessage(tabs[0].id, { type: "enable", value: true }, (response) => {});
// });

// When the browser action is clicked, `copyFromClipboard()` will use an offscreen
// document to write the value of `textToCopy` to the system clipboard.
// chrome.action.onClicked.addListener(async () => {
  // await copyFromClipboard();
  // console.log('Da');
// });

// Solution 1 - As of Jan 2023, service workers cannot directly interact with
// the system clipboard using either `navigator.clipboard` or
// `document.execCommand()`. To work around this, we'll create an offscreen
// document and pass it the data we want to write to the clipboard.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// async function copyFromClipboard() {
//   const clipboardText = await navigator.clipboard.readText();

//   await chrome.offscreen.createDocument({
//     url: 'offscreen.html',
//     reasons: [chrome.offscreen.Reason.CLIPBOARD],
//     justification: 'Copy text from the clipboard.'
//   });

//   // Now that we have an offscreen document, we can dispatch the
//   // message.
//   chrome.runtime.sendMessage({
//     type: 'copy-data-from-clipboard',
//     target: 'offscreen-doc',
//     data: clipboardText
//   });
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





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

