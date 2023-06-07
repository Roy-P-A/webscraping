// background.js

chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["contentScript.js"]
  }, function() {
    chrome.tabs.sendMessage(tab.id, { message: "scrape_data" });
  });
});