const hidePage = `body > :not(.scsnowmanify-image) {
                    display: none;
                  }`;

const tabsMapping = {};

function toggleCurrentTab (tab) {
  const tabId = tab.id;
  const toBeEnabled = !(tabsMapping[tabId] || false);

  browser.tabs.executeScript({file: "js/content.js"})
    .then(() => {
      if (toBeEnabled) {
        browser.tabs.insertCSS({code: hidePage});
        browser.tabs.sendMessage(tabId, {
          command: "scsnowmanify",
          scsnowmanURL: browser.extension.getURL("img/scsnowman.svg")
        });
        browser.browserAction.setBadgeText({
          text: "✓",
          tabId: tabId
        });
        browser.browserAction.setBadgeBackgroundColor({
          color: '#008040',
          tabId: tabId
        });
      } else {
        browser.tabs.removeCSS({code: hidePage});
        browser.tabs.sendMessage(tabId, {
          command: "reset",
        });
        browser.browserAction.setBadgeText({
          text: "",
          tabId: tabId
        });
      }
      tabsMapping[tabId] = toBeEnabled;
    })
    .catch(reportExecuteScriptError);
}

function reportExecuteScriptError(error) {
  console.error(`Failed to execute scsnowmanify content script: ${error.message}`);
}

browser.browserAction.onClicked.addListener(toggleCurrentTab);
