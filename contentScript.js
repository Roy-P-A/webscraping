// contentScript.js

function downloadImage(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    });
}

// Helper function to download text content
// function downloadText(content, filename) {
//   const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = filename;
//   link.click();
//   URL.revokeObjectURL(url);
// }

function downloadText(content, filename) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Scrape images and text
function scrapeData() {
  // console.log("Hello");
  // const images = Array.from(document.querySelectorAll("img")).map(
  //   (image) => image.src
  // );
  //const text = document.querySelector("body").innerText;

  const text = "Hello1";

  var headingName = "";
  if (document.querySelector(".item__name").innerText) {
    headingName = "Heading: " + document.querySelector(".item__name").innerText;
  } else {
    headingName = "";
  }
  var condition = "";
  if (document.querySelector(".item__condition").innerText) {
    condition =
      document.querySelector(".item__condition").innerText;
  } else {
    condition = "";
  }
  var age ="";
  if(document.querySelector(".item__age").innerText){
    age = document.querySelector(".item__age").innerText;
  }else{
    age = "";
  }
  var description ="";
  if(document.querySelector(".item__description").innerText){
    description =  "Description: " +  document.querySelector(".item__description").innerText;
  }else{
    description = "Description : ";
  }
  var rate ="";
  if(document.querySelector(".item-rate__rate").innerText){
    rate =  "Rate: " +  document.querySelector(".item-rate__rate").innerText;
  }else{
    rate = "Rate: ";
  }

  var renterName ="";
  if(document.querySelector(".item-lender__name").innerText){
    renterName =  "Renter Name: " +  document.querySelector(".item-lender__name").innerText;
  }else{
    renterName = "Renter Name: ";
  }


  

  var data = "";
  data = headingName + "\n\n"+ condition + "\n\n" + age + "\n\n" + description + "\n\n" + rate + "\n\n" + renterName;

  // Download images
  // images.forEach((imageUrl, index) => {
  //   const filename = `image_${index + 1}.jpg`;
  //   downloadImage(imageUrl, filename);
  // });

  // Download text content
  const textFilename = "text_content.txt";
  downloadText(data, textFilename);

  // var headingName = document.querySelector("item_name").innerText;
  // const data = {
  //   title: "hello",

  //   // Add more data points as needed
  // };
  //chrome.runtime.sendMessage({ message: "data_extracted", data });

  // chrome.runtime.sendMessage(
  //   { Message: "data_extracted" },
  //   function (response) {}
  // );
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
