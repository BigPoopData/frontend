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


    if (currentstatus) {
        switch (true) {
            case (sec < 30):
                $("#statusmessage").html('"Go on, its free!"');
                break;
            case (sec < 120):
                $("#statusmessage").html('"What are you waiting for"');
                break;
            case (sec < 500):
                $("#statusmessage").html('"Come on in, theres even wifi"');
                break;
            case (sec < 800):
                $("#statusmessage").html('"Testmessage"');
                break;

        }

    } else if (!currentstatus) {
        switch (sec) {
            case 30:
                $("#statusmessage").html('"This could take longer..."');
                break;
            case 120:
                $("#statusmessage").html('Stay patient! We know you can do it!');
                break;
            case 500:
                $("#statusmessage").html('Really taking his/her time!');
                break;

        }
    }
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

$(document).ready(function() {

    var waypoint = new Waypoint({
        element: document.getElementById('watersavings'),
        handler: function(direction) {
            if (direction === 'down' && firstscroll === 0) {
                water();
                firstscroll++;
            }
        },
        offset: '75%',
    });
});
