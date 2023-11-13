/*
chrome.runtime.sendMessage( {greeting: "hello"}, function(response) { // Общение content script с service worker
    console.log(response.farewell)
})
*/



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // Добавляем/Удаляем фильтр
    if (request.applyFilter) {
        document.body.classList.add('filter-off');
    } else if (request.removeFilter) {
        document.body.classList.remove('filter-off');
    }
});
