// contentScript.js

// Helper function to download an image
function downloadImage(url, filename) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    });
}

// Helper function to download text content
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
  const images = Array.from(document.querySelectorAll("img")).map(image => image.src);
  const text = document.querySelector("body").innerText;

  // Download images
  images.forEach((imageUrl, index) => {
    const filename = `image_${index + 1}.jpg`;
    downloadImage(imageUrl, filename);
  });

  // Download text content
  const textFilename = "text_content.txt";
  downloadText(text, textFilename);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "scrape_data") {
    scrapeData();
  }
});
