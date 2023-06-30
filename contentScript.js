// contentScript.js

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Scrape images and text
async function scrapeData() {
  var item = "";
  if (document.querySelector(".categories")) {
    item = document.querySelector(".categories").innerText;
  } else {
    item = "";
  }

  var headingName = "";
  if (document.querySelector(".item__name")) {
    headingName = document.querySelector(".item__name").innerText;
  } else {
    headingName = "";
  }
  var condition = "";
  if (document.querySelector(".item__condition")) {
    condition = document.querySelector(".item__condition").innerText;
  } else {
    condition = "";
  }
  var age = 0;
  const regex = /\d+/;
  if (document.querySelector(".item__age")) {
    const match = document.querySelector(".item__age").innerText.match(regex);
    if (match) {
      const integer1 = parseInt(match[0], 10);
      age = (integer1 - 1) * 12 + 10;
    } else {
      age = 0;
    }
  } else {
    age = 0;
  }
  var description = "";
  if (document.querySelector(".item__description")) {
    description = document.querySelector(".item__description").innerText;
  } else {
    description = "";
  }
  var rate = "";
  if (document.querySelector(".item-rate__sum")) {
    rate = document.querySelector(".item-rate__sum").innerText;
  } else {
    rate = "";
  }

  var lenderName = "";
  if (document.querySelector(".item-lender__name")) {
    lenderName = document.querySelector(".item-lender__name").innerText;
  } else {
    lenderName = " ";
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
      phoneNumber = document.querySelector(".item-lender__contact").innerText;
    } else {
      phoneNumber = "";
    }
  } else {
    phoneNumber = "";
  }

  let imageName = [];
  const tempElement = document.createElement("div");
  tempElement.innerHTML = document.querySelector("body").innerHTML;

  const imageElements = tempElement.querySelectorAll(".item-slider__slide img");

  const imageSrcs = Array.from(imageElements).map(
    (imageElement) => imageElement.src
  );

  for (let i of imageSrcs) {
    imageName.push(i);
  }

  const payload = {
    category: item.split("/")[0].trim(),
    subCategory: item.split("/")[1].trim(),
    categoryType: item.split("/")[2].trim(),
    name: headingName.trim(),
    conditionValue: condition.replace("Condition:", "").replace(",","").trim(),
    age: age,
    description: description.trim(),
    //preExistingDefects: "",
    lendRate: rate.replace("Lend for:", "").trim(),
    //userId: 1,
    media: imageName,
    //availabilityStatus: "AVAILABLE",
    //verificationStatus: "VERIFIED",
    //source: "borrowme",
    userName: lenderName.trim(),
    mobileNumber: phoneNumber.trim(),
  };

  const data1 = payload;
  chrome.runtime.sendMessage({ message: "data_extracted", data: data1 });
  const buttonReset = document
    .querySelector(".item-lender__contact")
    .querySelector(".button--block");
  if (buttonReset) {
    buttonReset.click();
  } else {
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
