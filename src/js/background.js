const tabsMapping = {};

function toggleCurrentTab (tab) {
  const tabId = tab.id;
  const toBeEnabled = !(tabsMapping[tabId] || false);

  browser.tabs.executeScript({file: "js/content.js"})
    .then(() => {
      if (toBeEnabled) {
        browser.tabs.insertCSS({file: "css/content.css"});
        browser.tabs.sendMessage(tabId, {
          command: "scsnowmanify",
          scsnowmanURL: browser.extension.getURL("img/scsnowman.svg")
        });
        browser.browserAction.setBadgeText({
          text: "☂",
          tabId: tabId
        });
        browser.browserAction.setBadgeBackgroundColor({
          color: '#2060c0',
          tabId: tabId
        });
      } else {
        browser.tabs.removeCSS({file: "css/content.css"});
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
