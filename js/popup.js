document.getElementById('toggleButton').addEventListener('click', function() {  // Слушаем кнопку в popup html
    chrome.runtime.sendMessage({toggleFilter: true});

    var button = this;
    if (button.classList.contains("btn-outline-success")) {
      button.classList.remove("btn-outline-success");
      button.classList.add("btn-outline-danger");
      button.textContent = "Off";
    } else {
      button.classList.remove("btn-outline-danger");
      button.classList.add("btn-outline-success");
      button.textContent = "On";
    }
});