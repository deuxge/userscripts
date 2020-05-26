// ==UserScript==
// @name         ZT / AT overlay
// @namespace    deuxge
// @version      0.1
// @description  Make overlay donw on this websites (No more over all the page) and try to prevent advertisement click event.
// @author       deuxge
// @require      http://code.jquery.com/jquery-latest.js
// @match        *.extreme-down.xyz*
// @match        *.zone-annuaire.com
// @match        *.zone-annuaire.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var interval;

function hackClick(event){
    event.stopPropagation();
    // event.preventDefault();
}

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document.hidden) {
    if(interval) clearInterval(interval);
      console.log("Clear interval");
  } else {
      console.log("Start interval");
      // Create a loop as the div are updated regularly
      interval = window.setInterval(function() {
          var refDiv = $("div.footer,div.wrapper.toppad");
          // if(!refDiv.length) refDiv = $("div.wrapper.toppad");

          var div = refDiv.nextAll("div");
          console.log("F**** div",div);
          div.css("position","relative"); // Make the div at his place and not over all the page.
          div.unbind(); // Remove all event bind to it
          div.children().remove(); // Clean content
          $("a").off('click').click(hackClick);
      },1000);
  }
}

$( window ).unload(function() {
  if(interval) clearInterval(interval);
});

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document.hidden === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

window.setTimeout(handleVisibilityChange,2000);
