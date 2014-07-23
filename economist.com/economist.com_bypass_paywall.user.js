// ==UserScript==
// @name           The Economist: Bypass paywall
// @version        1.0
// @namespace      
// @author         Samat K Jain https://samat.org/
// @description    Bypass The Economist's paywall
// @match          http://www.economist.com/*
// @match          https://www.economist.com/*
// @include        http://www.economist.com/*
// @include        https://www.economist.com/*
// @run-at         window-load
// @grant          none
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    window.setTimeout(function() {
          document.body.appendChild(script);
          //document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return; 
} else {
	if (Economist.tools) {
		$('#paywall-coin').html('<h1 style=\"padding:1em;\">Bypassing paywall...</h1>');
		Economist.userData = { data: { status: 'print-subscriber' } };
		Economist.tools.paywall.checkSubscription();
	}
}
