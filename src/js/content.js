(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function insertScsnowman(scsnowmanURL) {
    removeExistingScsnowmans();
    let scsnowmanImage = document.createElement("img");
    scsnowmanImage.setAttribute("src", scsnowmanURL);
    scsnowmanImage.className = "scsnowmanify-image";
    document.body.appendChild(scsnowmanImage);
  }

  function removeExistingScsnowmans() {
    let existingScsnowmans = document.querySelectorAll(".scsnowmanify-image");
    for (let scsnowman of existingScsnowmans) {
      scsnowman.remove();
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "scsnowmanify") {
      insertScsnowman(message.scsnowmanURL);
    } else if (message.command === "reset") {
      removeExistingScsnowmans();
    }
  });

})();
