document.getElementById("copyBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: getSessionStorageData,
      },
      (results) => {
        if (results && results[0] && results[0].result) {
          copyToClipboard(results[0].result);
        } else {
          showStatus("Failed to retrieve data!", true);
        }
      }
    );
  });
});
function getSessionStorageData() {
  return JSON.stringify({ ...sessionStorage }, null, 2);
}
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => showStatus("Session storage copied!", false),
    (err) => {
      showStatus("Copy failed!", true);
      console.error("Failed to copy session storage: ", err);
    }
  );
}
function showStatus(message, isError) {
  const statusElement = document.getElementById("status");
  statusElement.textContent = message;
  statusElement.className = isError ? "error" : "";
}
