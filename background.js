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
    chrome.runtime.sendMessage({ message: "update_popup", data: receivedData });
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
      if (response.ok) {
        // Request successful, handle response

        return response.json();
      } else {
        // Request failed, handle error
        const data1 = "Failed";
        chrome.runtime.sendMessage({ message: "update_popup", data: data1 });
        throw new Error("Error: " + response.status);
      }
    })
    .then((responseData) => {
      // Handle the response data
      console.log(responseData);
      const data1 = "Success";
      chrome.runtime.sendMessage({ message: "update_popup", data: data1 });
    })
    .catch((error) => {
      // Handle any errors
      const data1 = error;
      chrome.runtime.sendMessage({ message: "update_popup", data: data1 });
    });
}
