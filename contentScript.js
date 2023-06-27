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

  if (document.querySelector(".item__age")) {
    if (document.querySelector(".item__age").innerText == "Age: Less Than 1 Year") {
      age = 10;
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
    category: item.split("/")[0],
    subCategory: item.split("/")[1],
    categoryType: item.split("/")[2],
    name: headingName,
    conditionValue: condition.replace("Condition:", ""),
    //age: age.replace("Age:", ""),
    // age: 0,
    age: age,
    description: description,
    preExistingDefects: "",
    lendRate: rate.replace("Lend for:", ""),
    userId: 0,
    media: imageName,
    availabilityStatus: "AVAILABLE",
    verificationStatus: "VERIFIED",
    source: "",
    userName: lenderName,
    mobileNumber: phoneNumber,
  };

  const data1 = payload;
  chrome.runtime.sendMessage({ message: "data_extracted", data: data1 });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
