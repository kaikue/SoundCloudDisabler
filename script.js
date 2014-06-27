// ==UserScript==
// @name           SoundCloud Continuous Play Disable/Enable Switch 
// @namespace      http://www.technowise.in
// @author         Technowise
// @description    Adds switch to Disable or Enable Continuous Play in SoundCloud.
// @include        http://www.soundcloud.com/*
// @include        https://www.soundcloud.com/*
// @include        http://soundcloud.com/*
// @include        https://soundcloud.com/*
// @version        0.2
// ==/UserScript==
//-------------------------------------------------------------------------------------------
var sc_cp = {};
sc_cp.JQ = null;
sc_cp.checkTitleInterval = null;
GM_wait();
function myMain()
{	
    console.log("myMain IS CALLED!");
	sc_cp.lastTitle = sc_cp.JQ("a.playbackTitle__link");
	if( !sc_cp.continuousPlayActivated )
	{
		sc_cp.checkTitleInterval = setInterval(checkTitle, 100);
	}

	/*sc_cp.JQ(".sc-button-play, .skipControl, .sound__waveform").live("click", function()
	{
		sc_cp.userSwitchedPlay = true;
		sc_cp.lastTitle = sc_cp.JQ("a.playbackTitle:first").attr("title");
	});*/
	//setTimeout(generateSwitch, 2000);//Setup the switch after 2 seconds from page load.
}

function checkTitle()
{	
    console.log("CHECKING TITLE");
	titleNow = sc_cp.JQ("a.playbackTitle__link");
    console.log(titleNow + " " + sc_cp.lastTitle + " " + sc_cp.userSwitchedPlay);
    //title = sc_cp.JQ("a.playbackTitle__link").attr("title");
    title = sc_cp.JQ("a.playbackTitle__link").attr("title");
    if(title != undefined && title.substring(0, 28) == "Playing from recommendations") {
        console.log("YOU SHOULD REALLY BE PAUSING NOW..." + title + " | " + title.substring(0, 28));
        sc_cp.JQ(".playControl.playing").click();
    }
	//if( typeof sc_cp.lastTitle != 'undefined' && titleNow != sc_cp.lastTitle  && sc_cp.userSwitchedPlay != true )
	//{
    //    console.log("PAUSING TRACK");
	//	sc_cp.lastTitle = titleNow;
	//	sc_cp.JQ(".playControl.playing").click();//Pause the track. (Do not autoplay next track you smart nut SoundCloud!).
	//}
	else
	if( sc_cp.userSwitchedPlay )//silently change the sc_cp.lastTitle.
	{
	   sc_cp.lastTitle = titleNow;
	}
	sc_cp.userSwitchedPlay = false;
}

function GM_wait() 
{	
    if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait, 200);
	}
    else 
    { 
		sc_cp.JQ = unsafeWindow.jQuery;
        myMain();
	}
}

function generateSwitch()
{
    var checkbox = 'checked', switchContainer;
    switchContainer = document.createElement('div');
    switchContainer.id = 'switchContainer';
    if ( !sc_cp.continuousPlayActivated ) 
	{
      checkbox = 'unchecked';
    } 
    switchContainer.innerHTML = '<div id="cp_onoffswitch" class="onoffswitch">' + '<input type="checkbox" id="onoffswitchID" name="onoffswitch" class="onoffswitch-checkbox"' + ("" + checkbox) + '>' + '<label class="onoffswitch-label" for="onoffswitchID">' + '<div class="onoffswitch-inner"></div>' + '<div class="onoffswitch-switch"></div>' + '</label>' + '</div>' + '<div class="switch-outerlabel">&nbsp;&nbsp;Continuous Play&nbsp;&nbsp;</div>';
    
	if( sc_cp.JQ("#onoffswitchID").length == 0 )
	{
		sc_cp.JQ(".header__container").append( switchContainer );
	}
	//Add styles to our little switches.

	GM_addStyle("#switchContainer{  background-color:#FFFFFF;}");
	GM_addStyle("#cp_onoffswitch{  float: right;  margin-top: 7px;}");
	GM_addStyle(".switch-outerlabel{  float: right;  margin: 7px 0px 7px 5px;  background-color:white;  border-radius: 5px;  text-align: right;}");
	GM_addStyle(".onoffswitch{   position: relative;  width: 56px;  -webkit-user-select:none;  -moz-user-select:none;  -ms-user-select: none;}");
	GM_addStyle(".onoffswitch-checkbox{  display: none;}");
	GM_addStyle(".onoffswitch-label{  display: block; overflow: hidden; cursor: pointer;  border: 2px solid #999999; border-radius: 5px;}");
	GM_addStyle(".onoffswitch-inner {  width: 200%; margin-left: -100%;  -moz-transition: margin 0.3s ease-in 0s; -webkit-transition: margin 0.3s ease-in 0s;  -o-transition: margin 0.3s ease-in 0s; transition: margin 0.3s ease-in 0s;}");
	GM_addStyle(".onoffswitch-inner:before, .onoffswitch-inner:after{  float: left; width: 50%; height: 19px; padding: 0; line-height: 19px;  font-size: 12px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;  -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;}");
	GM_addStyle(".onoffswitch-inner:before{  content: 'ON';  padding-left: 5px;  background-color: #FF4A00; color: #FFFFFF;}");
	GM_addStyle(".onoffswitch-inner:after{  content: 'OFF';  padding-right: 5px;  background-color: #D7D7D7; color: #999999;  text-align: right;}");
	GM_addStyle(".onoffswitch-switch{  width: 19px; margin: 0px;  background: #FFFFFF;  border: 2px solid #999999; border-radius: 5px;  position: absolute; top: 0; bottom: 0; right: 33px;  -moz-transition: all 0.3s ease-in 0s; -webkit-transition: all 0.3s ease-in 0s;  -o-transition: all 0.3s ease-in 0s; transition: all 0.3s ease-in 0s;  background-image: -moz-linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);  background-image: -webkit-linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);  background-image: -o-linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);  background-image: linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);}");
	GM_addStyle(".onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner{  margin-left: 0;}");
	GM_addStyle(".onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch{  right: 0px;}");
	sc_cp.JQ("#onoffswitchID").click( toggleContinuousPlay );
};

function toggleContinuousPlay(event)
{
	sc_cp.continuousPlayActivated = !sc_cp.continuousPlayActivated;    
    if ( sc_cp.continuousPlayActivated ) 
	{
	  clearInterval(sc_cp.checkTitleInterval);
    } 
	else 
	{
	  sc_cp.checkTitleInterval = setInterval(checkTitle, 900);
    }
	return true;
}