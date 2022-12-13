const COOP_REPORT_URL = "https://coop-report-generator.glitch.me/";

// COOP
const popup = window.open(
  COOP_REPORT_URL,
  "popup",
  "width=420, height=420"
);
console.log(popup);
setTimeout(() => {
  // "hack" to generate the report: need to use setTimeout to wait for the navigation before calling postMessage
  // (this generates a report of type "access-to-coop-page-from-opener")
  popup.postMessage("test", "*");
}, 3000)

// Deprecation
window.webkitStorageInfo;
console.log(navigator.userAgent);

// Document policy violation
try {
  document.write("<h1>Hey!</h1>");
} catch (e) {
  console.log(e);
}

// Browser intervention
window.navigator.vibrate(1);

// Experimental: permissions policy violation
navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {});
