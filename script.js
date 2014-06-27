// ==UserScript==
// @name           Disable SoundCloud Recommended Tracks
// @author         Kai Kuehner
// @contributor    Technowise
// @contributor    Andreas J. Schwarz
// @description    Prevents SoundCloud's Recommended Tracks from playing.
// @include        http://www.soundcloud.com/*
// @include        https://www.soundcloud.com/*
// @include        http://soundcloud.com/*
// @include        https://soundcloud.com/*
// @version        1.0
// ==/UserScript==
//-------------------------------------------------------------------------------------------

var sc_cp = {};
sc_cp.JQ = null;
sc_cp.checkTitleInterval = null;
GM_wait();

function checkTitle() {
	//Check the alt text on the player at the bottom of the screen
	var title = sc_cp.JQ("a.playbackTitle__link").attr("title");
	if(title != undefined && title.substring(0, 28) == "Playing from recommendations") {
		//Pause the track
		sc_cp.JQ(".playControl.playing").click();
	}
}

function GM_wait() {
	//Wait for jQuery to load
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 200);
	}
	else {
		sc_cp.JQ = unsafeWindow.jQuery;
		//Start checking player text
		sc_cp.checkTitleInterval = setInterval(checkTitle, 100);
	}
}