var firstscroll = 0;
// function pad(val) {
//     return val > 9 ? val : "0" + val;
// }
var sec = 'getting data';

function setTimerDurationElapsed(timeintevalarg) {
    sec = timeintevalarg;
    console.log("sec changed --> " + sec);
}

function pad(val) {

    return val;
}


setInterval(function() {
    $("#seconds").html(++sec % 60 + ' Seconds');
    if (sec > 60) {
        $("#minutes").html(pad(parseInt(sec / 60 % 60, 10)) + ' Minutes and ');
    } else {
        $("#minutes").html('');
    }

    if (sec > 3600) {
        $("#hours").html(pad(parseInt(sec / 60 / 60, 10)) + ' Hour, ');
    } else {
        $("#hours").html('');
    }


    if (sec > 7200) {
        $("#hours").html(pad(parseInt(sec / 60 / 60, 10)) + ' Hours, ');
    } else {
        $("#hours").html('');
    }

    //Statusmessages
    // if (currentstatus) {
    //     switch (true) {
    //         case (sec < 30):
    //             $("#statusmessage").html('"Go on, its free!"');
    //             break;
    //         case (sec < 120):
    //             $("#statusmessage").html('"What are you waiting for"');
    //             break;
    //         case (sec < 500):
    //             $("#statusmessage").html('"Come on in, theres even wifi"');
    //             break;
    //         case (sec < 800):
    //             $("#statusmessage").html('"Testmessage"');
    //             break;
    //
    //     }
    //
    // } else if (!currentstatus) {
    //     switch (true) {
    //         case (sec < 30):
    //             $("#statusmessage").html('"This could take longer..."');
    //             break;
    //         case (sec < 120):
    //             $("#statusmessage").html('Stay patient! We know you can do it!');
    //             break;
    //         case (sec < 500):
    //             $("#statusmessage").html('Really taking his/her time!');
    //             break;
    //
    //     }
    // }
}, 1000);

function water() {
    var waterid = "waternumbers";

    var options = {  
        useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
    };
    var waternum = new CountUp(waterid, 0, waterusage, 0, 1, options);
    waternum.start();
}

function rolls() {
    var rollsid = "papernumbers";

    var options = {  
        useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
    };
    var papernum = new CountUp(rollsid, 0, paperusage, 2, 1, options);
    papernum.start();
}


$(document).ready(function() {

    var sroptions = {
        duration: 500,
        reset: true,
        viewOffset: {
            top: -100,
            right: 0,
            bottom: -100,
            left: 0,
        },
    };

    window.sr = ScrollReveal().reveal();

    sr.reveal('.revealonscroll', sroptions);

    sr.reveal('.averagesreveal', sroptions, 100);

    sr.reveal('.intervalsreveal', sroptions, 100);

    sr.reveal('.closedopenreveal', sroptions, 200);

});
