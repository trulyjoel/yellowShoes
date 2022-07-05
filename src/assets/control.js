var chosenFrequency = 88.5;
gRandom = Math.random().toString(36).substring(2, 5);
playerTimeout = 30000;
minTimeOut = 18000;
blastInterval = 3000;
changeInpBox = true;
errShown = false;
rtlTCP = "none";
streamingFormat = "wav";
uiVersion = `v3`;
showThese = ['Artist', 'Title', 'Genre', 'Audio bit rate', 'Station name', 'Format'];
error = "";
bookmarkClass = `class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart"`;
playingBool = false;
shorty = `class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b"`;
cancel1 = `<a href="javascript:void(0)" data-role="button" onclick=window.location.reload() id="editCancelButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-delete"  style="background: teal; color: white;" data-theme="c">Cancel</a>`;

var lastClick = 0;
var delay = 2000;

if (localStorage && 'playerTimeout' in localStorage) {
    playerTimeout = localStorage.playerTimeout;
} else {
    localStorage.playerTimeout = playerTimeout;
}


if (localStorage && 'rtlTCP' in localStorage) {
    rtlTCP = localStorage.rtlTCP;
} else {
    localStorage.rtlTCP = rtlTCP;
}

if (isiPhone()) {
    streamingFormat = "mp3";
}

if (localStorage && 'streamingFormat' in localStorage) {
    streamingFormat = localStorage.streamingFormat;
} else {
    localStorage.streamingFormat = streamingFormat;
}

// gif stuff
spinner = ``
if (localStorage && 'spinner' in localStorage) {
    spinner = localStorage.spinner;
}
// get it anyway..
gifPro = $.get("./basegif")
gifPro.done(function (tdata, status) {
    if (status == "success" && tdata.length > 0) {
        spinner = `<img src="data:image/gif;base64,${tdata}" style="width:96px;height:96px;">`;
        localStorage.spinner = spinner;
    } 
});


hasLame = false;
lameChecked = false;
function doLameCheck() {
    lameCheck = `./lameCheck?rand=${gRandom}`;
    $.get(lameCheck, function (tdata, status) {
        if (status == "success") {
            lameChecked = true;
            if (tdata.includes("OK")) {
                hasLame = true;
            }
        }
    });
}

doLameCheck();

if (isiPhone()) {
    //playerTimeout += 80000;
    if (!lameChecked) {
        doLameCheck();
    }
    if (hasLame) {
        showfreq();
        supBrah();
    } else {
        iosButton = `<a href="https://github.com/evuraan/yellowShoes/blob/main/IOS/README.md" data-role="button" id="gitHubBId" rel="external" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all ui-icon-info"  data-theme="c">Using IOS Devices</a>`;
        ("#princi").html(`Please set up <b>lame mp3 encoder</b> so IOS devices can playback HD FM radio.<p>${iosButton}`);
        $("#princi").show();
        $("#freqSlider").hide();
    }
} else { // not mp3, we can play wav
    showfreq();
    supBrah();
}


$("#freqSlider").change(function () {
    chosenFrequency = $("#slider-1").val();
    showfreq();
});

function localDemo() {
    if (localStorage && 'localDemoDone' in localStorage) {
        if (localStorage.localDemoDone == "true") {
            return
        }
    }
    lTxt = `
    <span id="demo">Welcome to the demo.<br>Below are some stations to try out:<br>
    <a href="javascript:void(0)" data-role="button" onclick="doneDemo()" id="jidembkr" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=106.9&program=1&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">106.9 Christmas Songs All Year Long!</a> 
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=106.1&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">106.1 Hits </a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=107.7&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">KNDD-FM 107.7 0</a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=92.5&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">KQMV-FM 92.5 0</a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=102.5&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">102.5  </a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=94.1&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">KSWD-FM 94.1 You Are Not Alone 0</a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=88.5&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">NPR 88.5 (0)</a>
<a href="javascript:void(0)" data-role="button" onclick="presetPlay('./getStream?freq=98.1&program=0&ran=${gRandom}&rtl_tcp=demo:3431&format=wav')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-heart" data-theme="c">Classical 98.1</a>
<p><a href="https://evuraan.info/yellowShoes/?PoC=${gRandom}" ${shorty} style="background: teal; color: white;">About yellowShoes</a>
</span>
    `
    $("#marks").html(lTxt);
}
localDemo()

function presetPlay(url) {
    $("#freqSlider").hide();
    $("#playButton").hide();

    playK(url);
}

function doneDemo() {
    ham = `Station`
    ham = `${ham}<br><a href="javascript:void(0)" onclick="pleaseHideSuggestions()" ${shorty} >Never Show these again</a> ${cancel1}`
    $("#demo").html(ham);
}

function pleaseHideSuggestions() {
    localStorage.localDemoDone = "true"
}

function checkBookMark(key) {
    data = localStorage.getItem('key');
    return (data.length > 0)
}

function toSettings() {
    $("#settings_princi").html("");
    $("#settings_princi").hide();
    $("#advanced_menu").show();
    location = "#settings"
}

function supBrah() {
    supUrl = `./whatsGoinOn?rand=${gRandom}`;
    $.get(supUrl, function (tdata, status) {
        if (tdata.freq) {
            inProgress = `Found a session in progress: ${tdata.freq} MHz<br>`;
            window.temp = tdata;
            jButton = `<p>${inProgress}<a href="javascript:void(0)" data-role="button" onclick=playFromTag() id="jButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-user"  data-theme="c">Join</a>`;
            $("#princi").html(jButton);
            showfreq();
        }
    });
}

function isiPhone() {
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
}

function stopAll() {
    if (lastClick >= (Date.now() - delay)) {
        return;
    }
    lastClick = Date.now();
    stopUrl = `./stop?ra=${gRandom}`;
    $.get(stopUrl);
    playingBool = false;
    setTitle();
}

function showfreq() {
    x = parseFloat(chosenFrequency);
    y = `${x.toFixed(1)} MHz`;
    m = `<b>Frequency:</b> ${y}`;
    z = `Play ${y}`;
    $("#playButton").text(z);
}
function echoTest(xx) {
    stopAll();
    $("#princi").hide();
    $("#player_area").hide();
    $("#blast_radius").html("");
    $("#blast_radius").hide();
    streamUrl = `./getStream?${xx}&rtl_tcp=${rtlTCP}&ran=${gRandom}&format=${localStorage.streamingFormat}`;
    playK(streamUrl);
}

function blaster() {
    btag = window.blastTag;
    if (btag.length == 0) {
        return;
    }
    infoUrl = `./getInfo?tag=${btag}&rando=${gRandom}`;
    fodder = `<p><a href="javascript:void(0)" data-role="button" onclick=FlipAudio() id="someButton" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all"  data-theme="c">${stopTxt}</a>`;

    $.get(infoUrl, function (blast, status) {
        if (status == "success") {
            if (blast == "") {
                return;
            }
            window.breeze = blast;
            txt1 = "";
            for (x of showThese) {
                if (x in blast) {
                } else {
                    continue;
                }
                val = blast[x];
                txt1 = `${x}: ${val}<br>${txt1}`;
            }
            progIdx = "";
            if ("SIGCT" in blast) {
                for (i = 0; i < blast.SIGCT; i++) {
                    salted = `freq=${blast.freq}&program=${i}`
                    thisID = `progIDX-${i}`;
                    activeP = `progIDX-${blast.programIndex}`;
                    if (thisID == activeP) {
                        progIdx = `<a href="javascript:void(0)" data-role="button" id="${thisID}" class="ui-link ui-btn ui-btn-b   ui-btn-inline ui-shadow ui-corner-all">(${i})</a>${progIdx}`;
                    } else {
                        progIdx = `<a href="javascript:void(0)" data-role="button" onclick="echoTest('${salted}')" id="${thisID}" class="ui-link ui-btn ui-btn-b   ui-btn-inline ui-shadow ui-corner-all"  data-theme="c">${i}</a>${progIdx}`;
                    }
                }
            }
            showThis = ""
            if (txt1.length > 0) {
                showThis = `${txt1}`;
            }

            if (progIdx.length > 0) {
                showThis = `${showThis}<br>Programs found 📻:<br>${progIdx}`;
            }

            $("#blast_radius").html(showThis);
            window.progKey = `freq=${blast.freq}&program=${blast.programIndex}`;
            if (window.progKey in localStorage) {
            } else {
                kkaa = `Add to Bookmark`;
                addMark = `<p id="ettuman"><a href="javascript:void(0)" data-role="button" onclick="addBookMark()" id="addMark" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-plus"  data-theme="c">${kkaa}</a>`;
                $("#blast_radius").append(addMark);
            }
        }
    });
    setTitle();
}

function addBookMark(blah) {
    stationName = breeze["Station name"];
    if (!stationName) {
        stationName = breeze.freq;
    }
    descriptor = `${stationName} ${breeze.freq} ${breeze.programIndex}`;
    title = breeze["Title"];
    if (title) {
        descriptor = `${stationName} ${breeze.freq} ${title} ${breeze.programIndex}`;
    }
    note = `Added ${descriptor}`;
    localStorage.setItem(window.progKey, descriptor);
    $("#ettuman").append(note);
}

function playK(kurl) {
    stopAll();
    $("#player_area").hide();
    $("#marks").hide();
    streamUrl = kurl;
    getVitals(kurl);
    errShown = false;
    error = "";
    window.fInterval = setInterval("playbackFailed()", playerTimeout);

    // spinner = `<img src="./gif" style="width:96px;height:96px;">`;
    $("#princi").html(`${spinner}<br>Please wait..`);
    $("#princi").show();
    $.get(streamUrl, function (tdata, status) {

        if (status == "success") {
            if (tdata.includes("Error:")) {
                $("#princi").html(tdata);
                $("#princi").show();
                window.error = `<p><mark>${tdata}</mark>`;
                return;
            }
            preText = `<p id="spinnerID">${spinner}<br>Please wait..</p>`;
            url = `./getAudio?tag=${tdata}&r=${gRandom}`;
            stopTxt = `Stop FM ${Freq} MHz (${Program})`;
            tempButton = `<p><a href="javascript:void(0)" data-role="button" onclick=FlipAudio() id="someButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-delete"  data-theme="c">${stopTxt}</a>`;
            playThis = `<p><audio autoplay controls id="beep" style="max-width: 400%;"><source src="${url}"></audio><p>${tempButton}`;
            $("#beep").css("background-color", "lightgrey");
            $("#player_area").html(playThis);
            $("#princi").html(preText);
            $("#princi").show();
            var media = document.getElementById('beep');
            media.addEventListener('playing', (event) => {
                clearInterval(window.fInterval);
                window.blastTag = tdata;
                $("#blast_radius").show()
                blastC = setInterval("blaster()", blastInterval);
                $("#beep").css("background-color", "white");
                $("#spinnerID").html("");
                $("#princi").hide();
                $("#player_area").show();
                $("#someButton").css("background-color", "red");
                playingBool = true;
                setTitle()
            });
            media.addEventListener('ended', (event) => {
                window.location.reload();
                $("#blast_radius").html("");
                playingBool = false;
                setTitle()
            });
        }
    });
}

function setTitle() {
    newTitle = "";
    if (playingBool) {
        if (window.breeze != undefined) {
            if (window.breeze.Artist != undefined) {
                newTitle = `${newTitle}${window.breeze.Artist}:`
            }
            if (window.breeze["Title"] != undefined) {
                newTitle = `${newTitle} ${window.breeze["Title"]}`
            }
            if (window.breeze["Station name"] != undefined) {
                newTitle = `${newTitle} (${window.breeze["Station name"]})`;
            }
        }
    }
    if (newTitle.length > 0) {
        document.title = newTitle
    } else {
        document.title = "yellowShoes"
    }
}

function playAudio() {
    stopAll();
    $("#freqSlider").hide();
    $("#playButton").hide();
    $("#player_area").hide();
    $("#blast_radius").hide();
    window.Freq = chosenFrequency;
    streamUrl = `./getStream?freq=${window.Freq}&rtl_tcp=${rtlTCP}&ran=${gRandom}&program=0&format=${localStorage.streamingFormat}`;
    playK(streamUrl);

}
function playFromTag() {
    someTag = window.temp.tag; someFreq = window.temp.freq;
    if (someTag.length == 0) {
        return;
    }

    if (someTag.freq == 0) {
        return;
    }

    $("#freqSlider").hide();

    url = `./getAudio?tag=${someTag}&r=${gRandom}`;
    window.fInterval = setInterval("playbackFailed()", playerTimeout);
    stopTxt = `Stop FM ${someFreq} MHz`;
    tempButton = `<p><a href="javascript:void(0)" data-role="button" onclick=window.location.reload() id="someButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-delete"  data-theme="c">${stopTxt}</a>`;
    playThis = `<p><audio autoplay controls id="beep" style="max-width: 400%;"><source src="${url}" type="audio/mpeg"></audio><p>${tempButton}`;
    $("#beep").css("background-color", "lightgrey");
    $("#player_area").html(playThis);
    $("#princi").hide();
    var media = document.getElementById('beep');
    media.addEventListener('playing', (event) => {
        clearInterval(window.fInterval);
        $("#beep").css("background-color", "white");
        $("#princi").hide();
        $("#player_area").show();
        $("#someButton").css("background-color", "red");
        playingBool = true;
        setTitle();
    });
    media.addEventListener('ended', (event) => {
        window.location.reload();
        playingBool = false;
        setTitle()
    });
}


function playbackFailed() {
    stopAll();
    failedTxt = `Error: Playback failed on ${window.Freq} MHz.`;
    $("#princi").html(failedTxt);
    $("#princi").show();
    errUrl = `./getErrMsg?r=${gRandom}`;

    if (!errShown) {
        $.get(errUrl, function (errMSG, status) {
            if (status == "success") {
                if (errMSG.length > 0) {
                    window.error = `<p id="fullErrId">Here's your full log:</p><pre>${errMSG}</pre>`;
                    $("#princi").append(window.error);
                    errShown = true
                }
            }
        });
    }

    if (window.error.length > 0) {
        $("#princi").append(window.error);
        errShown = true
    }
}

function FlipAudio() {
    var x = document.getElementById("beep");
    x.pause();
    $("#player_area").hide();
    $("#playButton").show();
    $("#freqSlider").show();
    $("#blast_radius").html("");
    $("#blast_radius").hide();

    stopAll();
}

function setRTLTCP() {
 // $("#settings_princi").html(`rtlTCP has been set to a preset value for the demo here.`);
 //  return

    x = $("#myInput").text();
    if (x.length == 0) {
        x = "none";
    }
    localStorage.rtlTCP = x;
    window.rtlTCP = x;
    goMain = `<p><a href="javascript:void(0)" data-role="button" onclick=window.location.reload() id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all"  data-theme="c">OK</a>`;
    $("#settings_princi").html(`rtlTCP has been set as ${window.rtlTCP}<p>${goMain}`);
}

function stopAllSessions() {
    $("#advanced_menu").hide();
    stopAll();
    $("#settings_princi").html("Stop request sent.");
    $("#settings_princi").show();
}


function ontoBookmarks() {
    clearInterval(window.fInterval);
    $("#marks").show();
    $("#freqSlider").hide();
    $("#blast_radius").hide();
    pets = ""
    i = 0;
    for (x in localStorage) {
        if (x.includes("freq=")) {
            yy = localStorage.getItem(x);
            if (yy.length == 0) {
                continue;
            }
            playThis = `./getStream?${x}&ran=${gRandom}&rtl_tcp=${rtlTCP}&format=${localStorage.streamingFormat}`;
            cattle = `<a href="javascript:void(0)" data-role="button" onclick="playK('${playThis}')" id="goMain" ${bookmarkClass}  data-theme="c">${yy}</a>`;
            pets = `${cattle} ${pets}`
            i++;
        }
    }

    x = ""
    if (i > 0) {
        x = pets;
    } else {
        x = "None found";
    }
    hideb = `<a href="javascript:void(0)" data-role="button" onclick="bookX()" id="jidembkr" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>`;
    bmrk = `<span id="bukmark">${hideb}${x}<p></span>`;
    $("#marks").html(bmrk);
    $("#princi").show();
}

function bookX() {
    $('#bukmark').hide();
    $("#blast_radius").show();
}


function removeBookMark(ting) {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    yy = localStorage.getItem(ting);
    if (yy.length == 0) {
        return;
    }
    remCancel = `<a href="javascript:void(0)" id="removeContId" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">No, I am not sure, Cancel</a>`
    okDelete = `<a href="javascript:void(0)" id="okRemoveId" onclick="okDeleteBuk('${ting}')" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Delete ${yy}</a>`
    remVshow = `${okDelete} ${remCancel}`
    $("#settings_princi").html(remVshow);
    $("#settings_princi").show();
}
contButton = `<a href="javascript:void(0)" id="deltedOKID" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Continue</a>`
function okDeleteBuk(ting) {
    localStorage.removeItem(ting);
    $("#settings_princi").html(`Deleted.<p>${contButton}`);

}

function toDeleteBooks() {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    pets = ""
    i = 0;
    for (x in localStorage) {
        if (x.includes("freq=")) {
            yy = localStorage.getItem(x);
            if (yy.length == 0) {
                continue;
            }
            cattle = `<a href="javascript:void(0)" data-role="button" onclick="removeBookMark('${x}')" id="goMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete"  data-theme="c">${yy}</a>`;
            pets = `${cattle} ${pets}`
            i++;
        }
    }

    if (i > 0) {
        deleteHere = `Delete your Bookmarks:<p>${pets}`;
        $("#settings_princi").append(deleteHere);
    } else {
        $("#settings_princi").html("None found");
    }
    $("#settings_princi").show();
}

function donate() {
    $("#advanced_menu").hide();
    donateText = `<p><form action="https://www.paypal.com/donate" method="post" target="_top"><input type="hidden" name="hosted_button_id" value="WTUV64BF3TLW2" /><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" /></form>`;
    $("#settings_princi").html(
        `<h2>Your donation is greatly appreciated!</h2>All donations will be used to maintain the project.<p><p>${donateText}`
    );
}


function about() {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    abtButton = `<a href="https://github.com/evuraan/yellowShoes/" data-role="button" id="gitHubBId" rel="external" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all ui-icon-info"  data-theme="c">yellowShoes: GitHub</a>`;
    // $("#settings_princi").html(`${abtButton}<p id="uiVerid">UI Version: ${uiVersion}</p>`);
    $("#settings_princi").show();
    aboutUrl = `./getVersion?ran=${gRandom}`
    donateButton = `<br><a href="javascript:void(0)" id="contiB" onclick=donate() class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Donate 💱</a>`;
    siteButton = `<a href="https://evuraan.info/yellowShoes/" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" rel="external" data-role="button" data-theme="b">yellowShoes</a>`;
    $.get(aboutUrl, function (data) {
        backEnd = `<p id="backEndId">Server Version: ${data}</p>`;
        tempSjow = `<p><pre>UI Version: ${uiVersion}<br>Server Version: ${data}</pre></p>${siteButton}${donateButton}`;
        $("#settings_princi").html(tempSjow)
    });

}

function exportSettings() {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    $("#nset").hide();
    var mySettings = {};
    // streamingFormat, playerTimeout, rtlTCP
    for (var i = 0; i < localStorage.length; i++) {
        taba = localStorage.key(i);
        if (taba.includes("freq=") && taba.includes("program=")) {
            mySettings[taba] = localStorage.getItem(taba)
            continue
        } else if (taba == "rtlTCP") {
            mySettings[taba] = localStorage.getItem(taba)
            continue
        } else if (taba == "playerTimeout") {
            mySettings[taba] = localStorage.getItem(taba)
            continue
        } else if (taba == "streamingFormat") {
            mySettings[taba] = localStorage.getItem(taba)
            continue
        }
    }
    if (Object.keys(mySettings).length < 1) {
        $("#settings_princi").html("Error 33.1 - no settings found!");
        $("#settings_princi").show();
        return
    }

    checkJurl = `./checkSettings?token=${gRandom}`;
    $("#addBID").hide();
    $("#snowPlay").hide();
    $("#settings_princi").html("Please wait..");
    $("#settings_princi").show();

    $.post(checkJurl, JSON.stringify(mySettings), function (tdata, status) {
        if (tdata.status) {
            delete (tdata["status"]);
            cr08 = `Sync settings and bookmarks across your devices/browsers<p>`
            thak = `${cr08} Lace key to import artifacts to your device: <mark>${tdata.lace}</mark>`;
            $("#settings_princi").html(thak);
        } else {
            $("#settings_princi").html(`Err 55.1: Unable to generate Lace Key.<p> ${tdata.err}`);
        }
        $("#settings_princi").show();
    });
}


function manageBooks() {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    addBButton = `<a href="#addBMarks" data-role="button" id="addAddtBId" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all ui-icon-plus"  data-theme="c">Add Bookmarks</a>`;
    editTxt = `<a href="javascript:void(0)" data-role="button" onclick="editMarks()" id="editBId" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all ui-icon-edit"  data-theme="c">Edit Bookmarks</a>`;
    delTxt = `<a href="javascript:void(0)" data-role="button" onclick="toDeleteBooks()" id="delBId" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-btn-icon-left ui-shadow ui-corner-all ui-icon-delete"  data-theme="c">Delete Bookmarks</a>`;
    manageTxt = `${addBButton} ${editTxt} ${delTxt}`;
    $("#settings_princi").append(manageTxt);
    $("#settings_princi").show();
}

function manageStreamingFormat() {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    // streamingFormat
    if (isiPhone()) {
        fmtCont = `<a href="javascript:void(0)" id="FormattagID" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Continue</a>`
        codec = `IOS Device detected - on these, only mp3 format is supported.<p>${fmtCont}`;
        $("#settings_princi").html(codec);
        $("#settings_princi").show();
    } else {
        mp3Button = `<a href="javascript:void(0)" data-role="button" onclick="selectCodec('mp3')" id="mp3ButtonID" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all"  data-theme="c">mp3</a>`;
        wavButton = `<a href="javascript:void(0)" data-role="button" onclick="selectCodec('wav')" id="wavButtonID" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all"  data-theme="c">wav</a>`;
        speechGyan = `<p>For an optimal listening experience, choose wav format. Please note though, wav format is uncompressed so you need to have a good data connection.`
        codec = `Current Format: ${localStorage.streamingFormat} ✅<p>${mp3Button} ${wavButton}${speechGyan}`;

        if (hasLame) {
            $("#settings_princi").html(codec);
            $("#settings_princi").show();

            if (localStorage.streamingFormat == "mp3") {
                $("#mp3ButtonID").css("background-color", "green");
            } else {
                $("#wavButtonID").css("background-color", "green");
            }
        } else {
            iosButton = `<a href="https://github.com/evuraan/yellowShoes/blob/main/IOS/README.md" data-role="button" id="gitHubBId" rel="external" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-btn-icon-left ui-corner-all ui-icon-info"  data-theme="c">mp3 encoder</a>`;
            codec = `no mp3 encoder found, only wav format supported.<p>${iosButton}`;
            $("#settings_princi").html(codec);
            $("#settings_princi").show();
        }
    }
}

function selectCodec(codec) {
    localStorage.streamingFormat = codec;
    codec = `Stream Format set as ${codec}.<p>${contButton}`;
    $("#settings_princi").html(codec);
    $("#settings_princi").show();
}

function editMarks() {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    pets = ""
    i = 0;
    for (x in localStorage) {
        if (x.includes("freq=")) {
            yy = localStorage.getItem(x);
            if (yy.length == 0) {
                continue;
            }
            cattle = `<a href="javascript:void(0)" data-role="button" onclick="editBMark('${x}')" id="editgoMain" class="ui-link ui-btn ui-btn-b ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-left ui-icon-edit"  data-theme="c">${yy}</a>`;
            pets = `${cattle} ${pets}`
            i++;
        }
    }

    if (i > 0) {
        deleteHere = `Edit your Bookmarks:<p>${pets}`;
        $("#settings_princi").append(deleteHere);
    } else {
        $("#settings_princi").html("None found");
    }
    $("#settings_princi").show();
}

function editBMark(x) {
    $("#advanced_menu").hide();
    $("#settings_princi").html("");
    yy = localStorage.getItem(x);
    if (yy.length == 0) {
        return;
    }
    tcpOK = `<p><a href="javascript:void(0)" data-role="button" onclick="editSave('${x}')" id="editOKButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-check"  data-theme="c">Apply</a>`;
    tcpCancel = `<a href="javascript:void(0)" data-role="button" onclick=window.location.reload() id="editCancelButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-delete"  data-theme="c">Cancel</a>`;
    eText = `<p id="editOd">Edit:<div contenteditable="true" id="newDescID"><u>${yy}</u></div></p>${tcpOK}${tcpCancel}`;
    $("#settings_princi").html(eText);
    $("#settings_princi").show();
}

function editSave(x) {
    newDesc = $("#newDescID").text();
    localStorage.setItem(x, newDesc);
    $("#advanced_menu").hide();
    contButton = `<a href="javascript:void(0)" id="cinreloadButton" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Continue</a>`
    $("#settings_princi").html(`Saved <b>${newDesc}</b><p>${contButton}`);
    ontoBookmarks();
}

function myInputPrep() {
    $("#myInput").css({
        "font-size": "16px", "height": "100%",
        "width": "70%",
        "box-sizing": "border-box",
        "border-radius": "4px",
        "border": "2px solid #ccc"
    });
}
function myInputChange() {
    $("#myInput").on("click", function (event) {
        if (changeInpBox) {
            changeInpBox = false;
            $("#myInput").text("");
            changeInput();
        }
    });

    $("#myInput").on("focus", function () {
        if (changeInpBox) {
            changeInpBox = false;
            $("#myInput").text("");
            changeInput();
        }
    });
}

function setPlayerTimeout() {
    contButton = `<p><a href="javascript:void(0)" id="cinreloadButton" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Continue</a>`

    x = $("#myInput").text();
    if (x.length == 0) {
        $("#settings_princi").html(`Invalid Entry.`);
        return
    }
    if (isNaN(x)) {
        $("#settings_princi").html(`Invalid Entry.`);
        return
    }

    tmo = parseInt(x);

    if (tmo > minTimeOut) {
        localStorage.playerTimeout = tmo;
        window.playerTimeout = tmo;
        $("#settings_princi").html(`<b>playerTimeout</b>: New Value: ${tmo}${contButton}`);
    } else {
        $("#settings_princi").html(`Too low, must be greater than ${minTimeOut}.`);
        return
    }
}

function toPlayerTimeoutSettings() {
    $("#advanced_menu").hide();
    desc = `<p><b>playerTimeout:</b> milliseconds to wait for playback<br><b>Minimum:</b> ${minTimeOut}<br><b>Description</b>: Increase <small>playerTimeout</small> if your SDR device needs more time.`;
    timeoutOKBtn = `<p><a href="javascript:void(0)" data-role="button" onclick=setPlayerTimeout() id="timeOOK" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-check"  data-theme="c">Apply</a>`;
    cancelBtn = `<a href="javascript:void(0)" id="cinreloadButton" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Cancel</a>`
    msg = `${desc}<p id="timeOID">Current: ${playerTimeout}</p>Enter new wait time:<br><div contenteditable="true" id="myInput">${playerTimeout}</div></p>${timeoutOKBtn}${cancelBtn}`
    $("#settings_princi").html(msg);
    $("#settings_princi").show();
    myInputPrep();
    myInputChange();
}
function importSettings() {
    $("#advanced_menu").hide();
    $("#nset").hide();
    desc = `<p>Keep your bookmarks and settings synchronized across your devices.</p>`
    applyBtn = `<p><a href="javascript:void(0)" data-role="button" onclick=doImpo() id="impID" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-check"  data-theme="c">Apply</a>`;
    cancelBtn = `<a href="javascript:void(0)" id="cinretariKiButton" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Cancel</a>`
    msg = `${desc}<p id="timeOID">Enter config (Lace) key:<div contenteditable="true" id="myInput">LaceKey</div></p>${applyBtn}${cancelBtn}`
    $("#settings_princi").html(msg);
    $("#settings_princi").show();
    myInputPrep();
    myInputChange();
}

function doImpo() {
    contButton = `<p><a href="javascript:void(0)" id="cinreloadButton" onclick="location.href='./main';" class="ui-link ui-btn ui-btn-b  ui-btn-inline ui-shadow ui-corner-all" data-role="button" data-theme="b">Continue</a>`
    x = $("#myInput").text();
    if (x.length == 0) {
        $("#settings_princi").html(`Invalid Entry.1`);
        return
    }

    payload = { "laceKey": x };
    laceUrl = `./import?token=${gRandom}`;
    $.post(laceUrl, payload, function (tdata, status) {

        if (tdata.status) {
            delete (tdata["status"]);
            i = 0;
            for (x of Object.keys(tdata)) {
                newVal = tdata[x];
                localStorage.setItem(x, newVal);
                i++
            }
            if (i > 0) {
                $("#settings_princi").html(`Imported ${i} artifacts to this device.`);
            } else {
                $("#settings_princi").html(`Failed to import artifacts to this device.`);
                return;
            }
        } else {
            $("#settings_princi").html(`Err: 44.1 - Import failed.<p>Is <mark>${x}</mark> valid?`);
        }
    });

}

function toRTLTCPSettings() {

    $("#advanced_menu").hide();
    tcpOK = `<p><a href="javascript:void(0)" data-role="button" onclick=setRTLTCP() id="tcpOKButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-check"  data-theme="c">Apply</a>`;
    tcpCancel = `<a href="javascript:void(0)" data-role="button" onclick=window.location.reload() id="tcpCancelButton" class="ui-link ui-btn ui-btn-b ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all ui-icon-delete"  data-theme="c">Cancel</a>`;

    settingsHtml = `<p id="tcpId"><b>rtltcp-host</b>: <small>${window.rtlTCP}</small><p id="rtlExample">Examples:<pre>192.168.1.1:1234<br>127.0.0.1<br>none</pre></p><div contenteditable="true" id="myInput">${rtlTCP}</div></p>${tcpOK}${tcpCancel}`;
    $("#settings_princi").html(settingsHtml);
    $("#settings_princi").show();
    myInputPrep();
    myInputChange();
}

function changeInput() {
    $("#myInput").css({
        "padding": "12px 20px", "width": "80%",
    });
}

function getVitals(inpt) {
    splat = inpt.split("?")
    if (splat.length != 2) {
        return
    }
    splat2 = splat[1].split("&")
    if (splat2.length < 2) {
        return
    }
    ft = ""
    pt = ""
    for (x of splat2) {
        if (x.includes("freq=")) {
            window.Freq = x.replaceAll("freq=", "")
            ft = x;
            continue;
        }
        if (x.includes("program=")) {
            window.Program = x.replaceAll("program=", "")
            pt = x;
            continue;
        }
    }
}


$('#addBID').submit(function () {
    bookMForm();
    return false;
});

function bookMForm() {
    postData = $("#addBID").serialize();
    bookValidateUrl = `./valBookMark?token=${gRandom}`;
    $("#addBID").hide();
    $("#snowPlay").hide();
    $("#tuu").html("Please wait..")
    $.post(bookValidateUrl, postData, function (tdata, status) {
        if (!tdata.status) {
            $("#tuu").html(`<b>Error:</b> Validation failed`);
            return;
        }
        someKey = `freq=${tdata.bFreq}&program=${tdata.Prog}`;
        if (someKey in localStorage) {
            $("#tuu").html(`Bookmark already exists`)
        } else {
            localStorage.setItem(someKey, tdata.bukName);
            $("#tuu").html(`Bookmark added!`);
        }
        return;
    });
}