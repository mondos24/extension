document.getElementById('toggleButton').addEventListener('click', function() {  // Слушаем кнопку в popup html
    
    chrome.runtime.sendMessage({toggleFilter: true});
    var button = this;
    button.classList.toggle("btn-outline-success");
    button.classList.toggle("btn-outline-danger");
    button.textContent = button.classList.contains("btn-outline-success") ? "On" : "Off";
});