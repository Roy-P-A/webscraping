// background.js

chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["contentScript.js"],
    },
    function () {
      chrome.tabs.sendMessage(tab.id, { message: "scrape_data" });
    }
  );
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "data_extracted") {
    console.log("Entered IF Block");
    const receivedData = request.data;
    chrome.runtime.sendMessage({ message: "update_popup", data: receivedData });
  }
});
