javascript: (function () {
  function findVideoUrl() {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      return videoElement.currentSrc;
    }
    return null;
  }

  function findSKU() {
    const listOfElements = document.querySelectorAll("dl");
    for (let i = 0; i < listOfElements.length; i++) {
      const dtElement = listOfElements[i].querySelector("dt");
      if (dtElement.textContent.trim() === "SKU") {
        return listOfElements[i]
          .querySelector("dd")
          .querySelector("code")
          .textContent.trim();
      }
    }
    return null;
  }

  function findTitle() {
    let title = document.querySelectorAll("h2")[0].textContent.toLowerCase();
    const outputTitle = title.replace(/[ ,:;.!?&'"]+/g, "_");
    return outputTitle;
  }

  function searchOnFH() {
    let title = document.querySelectorAll("h2")[0].textContent.toLowerCase();
    const titleSearch = encodeURIComponent(title);
    window.open(`https://app.filmhub.com/?limit=50&with_name=${titleSearch}`);
  }

  function createOverlay(videoUrl, sku) {
    const overlayStyles = `
    position: fixed;
    padding-top: 2rem;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 9999;
  `;

    const overlay = document.createElement("div");
    overlay.setAttribute("style", overlayStyles);
    overlay.setAttribute("tabindex", "0");

    const contentStyles = `
    background-color: #fff;
    padding: 2rem;
    width: 40vw;
    text-align: center;
  `;

    const content = document.createElement("div");
    content.setAttribute("style", contentStyles);
    content.setAttribute("tabindex", "0");

    const videoContainer = document.createElement("div");
    videoContainer.style.display = "flex";
    videoContainer.style.alignItems = "center";

    const videoLabel = document.createElement("span");
    videoLabel.innerText = "URL: ";
    videoLabel.style.fontWeight = "bold";

    const videoText = document.createElement("input");
    videoText.value = videoUrl;
    videoText.style.overflow = "hidden";
    videoText.style.textOverflow = "ellipsis";
    videoText.style.whiteSpace = "nowrap";
    videoText.style.border = "none";
    videoText.style.marginLeft = "0.5rem";
    videoText.style.width = "100%";

    const copyCurlButton = document.createElement("button");
    copyCurlButton.style.marginLeft = "1rem";
    copyCurlButton.innerText = "Copy Curl";
    copyCurlButton.style.padding = "0.5rem 1rem";
    copyCurlButton.style.margin = "0.5rem 1rem";
    copyCurlButton.style.border = "none";
    copyCurlButton.style.backgroundColor = "#b59e7a";
    copyCurlButton.style.color = "#fff";
    copyCurlButton.style.cursor = "pointer";
    copyCurlButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(`curl -o ${sku.replace(/\/$/, ".mp4")} ${videoUrl}`)
        .then(() => {
          copyCurlButton.innerText = "Copied! 🎉";
          copyCurlButton.disabled = true;
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
    const videoCopyButton = document.createElement("button");
    videoCopyButton.style.marginLeft = "1rem";
    videoCopyButton.innerText = "Copy URL";
    videoCopyButton.style.padding = "0.5rem 1rem";
    videoCopyButton.style.margin = "0.5rem 1rem";
    videoCopyButton.style.border = "none";
    videoCopyButton.style.backgroundColor = "#b59e7a";
    videoCopyButton.style.color = "#fff";
    videoCopyButton.style.cursor = "pointer";
    videoCopyButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(videoUrl)
        .then(() => {
          videoCopyButton.innerText = "Copied! 🎉";
          videoCopyButton.disabled = true;
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });

    const skuContainer = document.createElement("div");
    skuContainer.style.display = "flex";
    skuContainer.style.alignItems = "center";
    skuContainer.style.marginTop = "1rem";

    const skuLabel = document.createElement("span");
    skuLabel.innerText = "SKU: ";
    skuLabel.style.fontWeight = "bold";

    const skuText = document.createElement("span");
    skuText.innerText = sku;
    skuText.style.marginLeft = "0.5rem";

    const skuCopyButton = document.createElement("button");
    skuCopyButton.style.marginLeft = "1rem";
    skuCopyButton.innerText = "Copy SKU";
    skuCopyButton.style.padding = "0.5rem 1rem";
    skuCopyButton.style.border = "none";
    skuCopyButton.style.backgroundColor = "#b59e7a";
    skuCopyButton.style.color = "#fff";
    skuCopyButton.style.cursor = "pointer";
    skuCopyButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(sku)
        .then(() => {
          skuCopyButton.innerText = "Copied! 🎉";
          skuCopyButton.disabled = true;
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });

    const closeButton = document.createElement("button");
    closeButton.style.marginTop = "1rem";
    closeButton.innerText = "Close";
    closeButton.style.padding = "0.5rem 1rem";
    closeButton.style.border = "none";
    closeButton.style.backgroundColor = "#b59e7a";
    closeButton.style.color = "#fff";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener("click", function () {
      overlay.remove();
    });

    const searchOnFHButton = document.createElement("button");
    searchOnFHButton.style.marginTop = "1rem";
    searchOnFHButton.style.marginRight = "2rem";
    searchOnFHButton.innerText = "Search (Filmhub)";
    searchOnFHButton.style.padding = "0.5rem 1rem";
    searchOnFHButton.style.border = "none";
    searchOnFHButton.style.backgroundColor = "#b59e7a";
    searchOnFHButton.style.color = "#fff";
    searchOnFHButton.style.cursor = "pointer";
    searchOnFHButton.addEventListener("click", searchOnFH);

    videoContainer.appendChild(videoLabel);
    videoContainer.appendChild(videoText);
    videoContainer.appendChild(videoCopyButton);

    skuContainer.appendChild(skuLabel);
    skuContainer.appendChild(skuText);
    skuContainer.appendChild(skuCopyButton);

    content.appendChild(videoContainer);
    content.appendChild(skuContainer);
    content.appendChild(searchOnFHButton);
    content.appendChild(copyCurlButton);
    content.appendChild(closeButton);

    overlay.appendChild(content);

    document.body.appendChild(overlay);

    overlay.focus();
  }

  function startBookmarklet() {
    const sku = findSKU();
    const videoUrl =
      findVideoUrl() || "Remember to play the video to render it";

    title = findTitle();
    const skuWithTitle = sku + "_" + title + "/";
    createOverlay(videoUrl, skuWithTitle);
  }
  startBookmarklet();
})();
