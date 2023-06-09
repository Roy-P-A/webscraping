// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const scrapeButton = document.getElementById("scrapeButton");
  scrapeButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "scrape_data" });
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
    } else {
      dataContainer.textContent = receivedData;
      dataContainer.classList.add("data-container1");
    }
  }
});
