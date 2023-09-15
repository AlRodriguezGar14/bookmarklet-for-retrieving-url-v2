javascript: (function () {
  function findVideoUrl() {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      return videoElement.currentSrc;
    } else {
      console.log("<video> tag not found on the page.");
      return null;
    }
  }

  function createOverlay(videoUrl) {
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
      width: 40rem;
      text-align: center;
    `;

    const content = document.createElement("div");
    content.setAttribute("style", contentStyles);
    content.setAttribute("tabindex", "0");

    const urlContainer = document.createElement("div");
    urlContainer.style.display = "flex";
    urlContainer.style.alignItems = "center";

    const urlLabel = document.createElement("span");
    urlLabel.innerText = "Video: ";
    urlLabel.style.fontWeight = "bold";

    const urlText = document.createElement("input");
    urlText.value = videoUrl;
    urlText.style.overflow = "hidden";
    urlText.style.textOverflow = "ellipsis";
    urlText.style.whiteSpace = "nowrap";
    urlText.style.border = "none";
    urlText.style.marginLeft = "0.5rem";
    urlText.style.width = "100%";

    const copyButton = document.createElement("button");
    copyButton.style.marginRight = "0.5rem";
    copyButton.innerText = "Copy";
    copyButton.addEventListener("click", function () {
      urlText.select();
      document.execCommand("copy");
      copyButton.innerText = "Copied 🎉";
      copyButton.disabled = true;
    });

    const closeButton = document.createElement("button");
    closeButton.style.marginLeft = "0.5rem";
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", function () {
      overlay.remove();
    });

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.marginTop = "1rem";

    buttonsContainer.appendChild(copyButton);
    buttonsContainer.appendChild(closeButton);

    urlContainer.appendChild(urlLabel);
    urlContainer.appendChild(urlText);

    content.appendChild(urlContainer);
    content.appendChild(buttonsContainer);

    overlay.appendChild(content);

    document.body.appendChild(overlay);

    overlay.focus();
  }

  function startBookmarklet() {
    const videoUrl = findVideoUrl();

    if (videoUrl) {
      createOverlay(videoUrl);
    }
  }

  startBookmarklet();
})();
