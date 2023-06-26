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
  var age = "";
  if (document.querySelector(".item__age")) {
    age = document.querySelector(".item__age").innerText;
  } else {
    age = "";
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

  //let imageName = "";
  let imageName = [];

  const tempElement = document.createElement("div");
  tempElement.innerHTML = document.querySelector("body").innerHTML;

  const imageElements = tempElement.querySelectorAll(".item-slider__slide img");

  const imageSrcs = Array.from(imageElements).map(
    (imageElement) => imageElement.src
  );

  for (let i of imageSrcs) {
    //imageName += "\n\n" + i;
    imageName.push(i);
  }

  // var data = "";
  // data =
  //   item +
  //   "\n\n" +
  //   headingName +
  //   "\n\n" +
  //   condition.replace("Condition:", "") +
  //   "\n\n" +
  //   age.replace("Age:", "") +
  //   "\n\n" +
  //   description +
  //   "\n\n" +
  //   rate.replace("Lend for:", "") +
  //   "\n\n" +
  //   lenderName +
  //   "\n\n" +
  //   phoneNumber.replace("Send message", "") +
  //   "\n\n" +
  //   imageName;

  //Download text content
  // const textFilename = "text_content.txt";
  // downloadText(data, textFilename);


  // const payload = {
  //   category: "string",
  //   subCategory: "string",
  //   categoryType: "string",
  //   name: "manu",
  //   conditionValue: "martinpa",
  //   age: 0,
  //   description: "hello",
  //   preExistingDefects: "string",
  //   lendRate: "500",
  //   userId: 0,
  //   media: ["sdd"],
  //   availabilityStatus: "AVAILABLE",
  //   verificationStatus: "VERIFIED",
  //   source: "string",
  //   userName: "martin",
  //   mobileNumber: "81130",
  // };

  const payload = {
    category: item.split("/")[0],
    subCategory: item.split("/")[1],
    categoryType: item.split("/")[2],
    name: headingName,
    conditionValue: condition.replace("Condition:", ""),
    //age: age.replace("Age:", ""),
    age: 0,
    description: description,
    preExistingDefects: "",
    lendRate: rate.replace("Lend for:", ""),
    userId: 0,
    media: imageName,
    availabilityStatus: "AVAILABLE",
    verificationStatus: "VERIFIED",
    source: "",
    userName: lenderName,
    mobileNumber: phoneNumber.replace("Send message", ""),
  };


  // const data1 = "Data Scraped";
  // chrome.runtime.sendMessage({ message: "data_extracted", data: data1 });

  const data1 = payload;
      chrome.runtime.sendMessage({ message: "data_extracted", data: data1 });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
