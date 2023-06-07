// popup.js

document.addEventListener("DOMContentLoaded", function() {
  const scrapeButton = document.getElementById("scrapeButton");
  scrapeButton.addEventListener("click", function() {
    console.log("ddff")
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "scrape_data" });
    });
  });
});
