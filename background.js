// background.js

chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["contentScript.js"]
  }, function() {
    chrome.tabs.sendMessage(tab.id, { message: "scrape_data" });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "scraped_data") {
    chrome.action.setPopup({ tabId: sender.tab.id, popup: "popup.html" });
    chrome.action.getPopup({ tabId: sender.tab.id }, function(popup) {
      chrome.tabs.sendMessage(sender.tab.id, { message: "update_popup", textContent: request.textContent, popup: popup });
    });
  }
});