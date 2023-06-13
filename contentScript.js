// contentScript.js

function downloadText(content, filename) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Scrape images and text
async function scrapeData() {


  var item = "";
  if (document.querySelector(".categories")) {
    item = "item: " + document.querySelector(".categories").innerText;
  } else {
    item = "";
  }

  var headingName = "";
  if (document.querySelector(".item__name")) {
    headingName = "Heading: " + document.querySelector(".item__name").innerText;
  } else {
    headingName = "";
  }
  var condition = "";
  if (document.querySelector(".item__condition")) {
    condition = document.querySelector(".item__condition").innerText;
  } else {
    condition = "";
  }
  var age = "";
  if (document.querySelector(".item__age")) {
    age = document.querySelector(".item__age").innerText;
  } else {
    age = "";
  }
  var description = "";
  if (document.querySelector(".item__description")) {
    description =
      "Description: " + document.querySelector(".item__description").innerText;
  } else {
    description = "Description : ";
  }
  var rate = "";
  if (document.querySelector(".item-rate__sum")) {
    rate = document.querySelector(".item-rate__sum").innerText;
  } else {
    rate = "";
  }

  var lenderName = "";
  if (document.querySelector(".item-lender__name")) {
    lenderName =
      "lender Name: " + document.querySelector(".item-lender__name").innerText;
  } else {
    lenderName = "lender Name: ";
  }

  const button = document
    .querySelector(".item-lender__contact")
    .querySelector(".button--block");
  if (button) {
    button.click();
  } else {
  }

 
  await wait(1000);

  var phoneNumber = "";
  if (document.querySelector(".item-lender__contact")) {
    if (button) {
      phoneNumber =
        "PhoneNumber: " +
        document.querySelector(".item-lender__contact").innerText;
    } else {
      phoneNumber = "";
    }
  } else {
    phoneNumber = "Phone Number: ";
  }

  let imageName = "";

  const tempElement = document.createElement("div");
  tempElement.innerHTML = document.querySelector("body").innerHTML;

  const imageElements = tempElement.querySelectorAll(".item-slider__slide img");

  const imageSrcs = Array.from(imageElements).map(
    (imageElement) => imageElement.src
  );

  for (let i of imageSrcs) {
    imageName += "\n\n" + i;
  }

  var data = "";
  data =
    item +
    "\n\n" +
    headingName +
    "\n\n" +
    condition +
    "\n\n" +
    age +
    "\n\n" +
    description +
    "\n\n" +
    rate +
    "\n\n" +
    lenderName +
    "\n\n" +
    phoneNumber.replace("Send message", "") +
    "\n\n" +
    imageName;

  // Download text content
  const textFilename = "text_content.txt";
  downloadText(data, textFilename);


  const data1 = "Data Scraped";
  chrome.runtime.sendMessage({ message: "data_extracted", data: data1 });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
