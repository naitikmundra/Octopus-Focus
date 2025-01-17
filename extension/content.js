function applyFocusEffect() {
  const url = window.location.pathname;

  if (url === "/watch") {
    const videoElement = document.querySelector("video");

    if (videoElement) {
      let currentElement = videoElement;
      let videoParents = new Set();

      while (currentElement) {
        videoParents.add(currentElement);
        currentElement = currentElement.parentElement;
      }

      const allElements = document.querySelectorAll("*");
      allElements.forEach((element) => {
        if (!videoParents.has(element)) {
          element.style.filter = "grayscale(100%)";
        } else {
          element.style.filter = "none";
        }
      });
    }
  } else {
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      element.style.filter = "grayscale(0%)";
    });
  }
}

function handleModeChange() {
  applyFocusEffect();
}

function handleFullScreenChange() {
  const isFullScreen = !!document.fullscreenElement;

  if (isFullScreen) {
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      element.style.filter = "none";
    });
  } else {
    applyFocusEffect();
  }
}

const observer = new MutationObserver(() => {
  handleModeChange();
});
observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener("load", () => {
  applyFocusEffect();
  document.addEventListener("fullscreenchange", handleFullScreenChange);
});

function runMyFunction() {
  applyFocusEffect();
}

function observeUrlChanges() {
  let lastUrl = location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      runMyFunction();
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  window.addEventListener("popstate", () => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      runMyFunction();
    }
  });
}

runMyFunction();
observeUrlChanges();

