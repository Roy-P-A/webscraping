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
    const url = "http://localhost:8080/product/createProductScrap";
    sendPostRequest(url, receivedData);
  }
});

function sendPostRequest(url, payload) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.status === 201) {
        // Request successful (status code 201)
        const data3 = "Success";
        chrome.runtime.sendMessage({ message: "update_popup", data: data3 });
      } else {
        // Request failed, handle error
        throw new Error("Error: " + response.status);
      }
    })
    .catch((error) => {
      // Handle any errors (failure)
      const data1 = "Failed";
      chrome.runtime.sendMessage({ message: "update_popup", data: error });
    });
}
