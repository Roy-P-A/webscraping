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

// function downloadImage(url, filename) {
//   fetch(url)
//     .then((response) => response.arrayBuffer())
//     .then((buffer) => {
//       const blob = new Blob([buffer], { type: "image/png" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = filename;
//       link.click();
//       URL.revokeObjectURL(url);
//     })
//     .catch((error) => {
//       console.error('Error downloading image:', error);
//     });
// }

function downloadImage(url, filename) {
  fetch(url, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    },
  })
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading image:", error);
    });
}

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
  const images = Array.from(
    document.querySelectorAll(".item-slider__image")
  ).map((image) => image.src);

  var headingName = "";
  if (document.querySelector(".item__name").innerText) {
    headingName = "Heading: " + document.querySelector(".item__name").innerText;
  } else {
    headingName = "";
  }
  var condition = "";
  if (document.querySelector(".item__condition").innerText) {
    condition = document.querySelector(".item__condition").innerText;
  } else {
    condition = "";
  }
  var age = "";
  if (document.querySelector(".item__age").innerText) {
    age = document.querySelector(".item__age").innerText;
  } else {
    age = "";
  }
  var description = "";
  if (document.querySelector(".item__description").innerText) {
    description =
      "Description: " + document.querySelector(".item__description").innerText;
  } else {
    description = "Description : ";
  }
  var rate = "";
  if (document.querySelector(".item-rate__rate").innerText) {
    rate = "Rate: " + document.querySelector(".item-rate__rate").innerText;
  } else {
    rate = "Rate: ";
  }

  var renterName = "";
  if (document.querySelector(".item-lender__name").innerText) {
    renterName =
      "Renter Name: " + document.querySelector(".item-lender__name").innerText;
  } else {
    renterName = "Renter Name: ";
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
    renterName +
    "\n\n" +
    imageName;

  // Download text content
  const textFilename = "text_content.txt";
  downloadText(data, textFilename);

  // Download images
  imageSrcs.forEach((imageUrl, index) => {
    const filename = `image_${index + 1}.jpg`;
    downloadImage(imageUrl.src, filename);
  });

  const data1 = "Data Scraped";
  chrome.runtime.sendMessage({ message: "data_extracted", data: data1 });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
