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

  var headingName ="";
  if(document.querySelector(".item__name").innerText){
    headingName =  "Heading:" +  document.querySelector(".item__name").innerText;
  }else{
    headingName = "";
  }
  var condition ="";
  if(document.querySelector(".item__name").innerText){
    condition =  "Heading:" +  document.querySelector(".item__name").innerText;
  }else{
    condition = "";
  }
  var age ="";
  if(document.querySelector(".item__name").innerText){
    age =  "Heading:" +  document.querySelector(".item__name").innerText;
  }else{
    age = "";
  }
  var description ="";
  if(document.querySelector(".item__name").innerText){
    description =  "Heading:" +  document.querySelector(".item__name").innerText;
  }else{
    description = "";
  }
  





  // Download images
  // images.forEach((imageUrl, index) => {
  //   const filename = `image_${index + 1}.jpg`;
  //   downloadImage(imageUrl, filename);
  // });

  // Download text content
  const textFilename = "text_content.txt";
  downloadText(headingName, textFilename);

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
