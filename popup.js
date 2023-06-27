// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const scrapeButton = document.getElementById("scrapeButton");
  scrapeButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "scrape_data" });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrapeButton1 = document.getElementById("refreshButton");
  scrapeButton1.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.runtime.reload();
    });
    
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "update_popup") {
    // Handle the message to update the DOM in the popup.html

    // Access the received data
    const receivedData = request.data;

    // Update the DOM of the popup.html
    const dataContainer = document.getElementById("data-container");
    if (receivedData == "") {
    } else if (receivedData == "Success") {
      dataContainer.textContent = receivedData;
      dataContainer.classList.add("data-container1");
    } else {
      dataContainer.textContent = receivedData;
      dataContainer.classList.add("data-container2");
    }
  }
});
