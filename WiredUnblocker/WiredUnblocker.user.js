// ==UserScript==
// @name        WiredUnblocker
// @namespace   n/a
// @description Unblocks content from wired.com if you use ad blockers.
// @include     http://www.wired.com/*
// @match       http://www.wired.com/*
// @version     1
// @grant       none
// ==/UserScript==

var veil = document.getElementById('veil');
veil.remove();
document.body.classList.remove('no-scroll');

