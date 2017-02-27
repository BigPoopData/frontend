//Initialize Variables
var averagesPerDayTimestamps = [];
var averagesPerMonthTimestamps = [];
var averagesPerDayObject = [];
var averagesPerMonthObject = [];
var averagesPerMonthMinutesObject = [];
var averagesPerDayMinutesObject = [];
var intervalsPerDayObject = [];
var intervalsPerMonthObject = [];
var intevervalsPerMonthTimestamps = [];
var currentstatus;
var waterusage = 0;
var closedcolor = 'rgba(231, 76, 60, ';
var opencolor = 'rgba(46, 204, 113, ';
var currentcolor;
var currentcolorlessopacity;
var alphafull = '1.0)';
var alphadown = '0.3)';
var datetimestamp = new Date();
var graphcolor;
var activeAveragesLabelTimestamps = [];
var activeLabelAverages = [];
var activeLabelIntervals = [];
var activeIntervalsLabelTimestamps = [];
var openPercentage;
var closedPercentage;
var openPercentageGraphValue;
var closedPercentageGraphValue;




var months = new Array(12);

//connect to websocket
var getData = new WebSocket("wss://metaklo.nico-rameder.at:8000/ws");

//send setup message
this.send = function(message, callback) {
    this.waitForConnection(function() {
        getData.send(message);
        if (typeof callback !== 'undefined') {
            callback();
        }
    }, 1000);
};

//wait until response
this.waitForConnection = function(callback, interval) {
    if (getData.readyState === 1) {
        callback();
    } else {
        var that = this;
        setTimeout(function() {
            that.waitForConnection(callback, interval);
        }, interval);
    }
};

//callback of response
this.send("setup", function() {
    console.log('server is up');
});

//executes on message from ws
getData.onmessage = function(msg) {
    result = JSON.parse(msg.data);
    switch (result.name) {
        case "FullObject":
            // dataset = result;
            averagesPerDayObject = result.averageClosedDurationPerDay;
            averagesPerMonthObject = result.averageClosedDurationPerMonth;
            for (var j = 0; j < averagesPerMonthObject.length; j++) {
                averagesPerMonthTimestamps.push(averagesPerMonthObject[j].timestamp);
                averagesPerMonthMinutesObject.push(Math.floor((averagesPerMonthObject[j].average / 60) * 100) / 100);
                intervalsPerMonthObject.push(averagesPerMonthObject[j].intervals);

            }
            for (var k = 0; k < averagesPerDayObject.length; k++) {
                averagesPerDayTimestamps.push(averagesPerDayObject[k].timestamp);
                averagesPerDayMinutesObject.push(Math.floor((averagesPerDayObject[k].average / 60) * 100) / 100);
                intervalsPerDayObject.push(averagesPerDayObject[k].intervals);

            }

            openPercentage = result.closedOpenRatio.openPercentage;
            openPercentageGraphValue = 220 * openPercentage / 100;
            closedPercentage = result.closedOpenRatio.closedPercentage;
            closedPercentageGraphValue = 220 * closedPercentage / 100;
            currentstatus = result.lastEvent.open;
            var daterightnow = new Date();
            datetimestamp = Date.parse(result.lastEvent.timestamp);
            var dateinterval = daterightnow - datetimestamp;
            var timedurationelapsed = Math.floor(dateinterval / 1000);
            break;

        case "sitzklo":
            currentstatus = JSON.parse(msg.data).open;
            timedurationelapsed = 0;
            drawGraph1(true, averagesPerMonthMinutesObject, averagesPerMonthTimestamps, graphcolor);
            drawGraph2(true, averagesPerMonthMinutesObject, averagesPerMonthTimestamps, graphcolor);

            break;
    }

    waterusage = result.totalIntervals * 9;

    setTimerDurationElapsed(timedurationelapsed);
    console.log(result);

    switch (currentstatus) {
        case "true":
            currentcolor = opencolor + alphafull;
            currentcolorlessopacity = opencolor + alphadown;
            $('#status').text('open');
            $('.statuscolor').css("background-color", currentcolor);
            $('.underline').css("background-color", currentcolorlessopacity);
            $('.ct-slice-donut').css("stroke", currentcolor);

            break;

        case "false":
            currentcolor = closedcolor + alphafull;
            currentcolorlessopacity = closedcolor + alphadown;
            $('#status').text('occupied');
            $('.statuscolor').css("background-color", currentcolor);
            $('.underline').css("background-color", currentcolorlessopacity);
            $('.ct-chart-donut .ct-series-a .ct-slice-donut').strokeStyle(currentcolor);
    }

    graphcolor = currentcolorlessopacity;

    drawGraph1(false, averagesPerMonthMinutesObject, averagesPerMonthTimestamps, graphcolor);
    drawGraph2(false, intervalsPerMonthObject, averagesPerMonthTimestamps, graphcolor);
    closedopenGraph();

    // drawGraph2(true, averagesPerDayMinutesObject, averagesPerDayTimestamps, graphcolor);

    $(".se-pre-con").fadeOut("slow");
    $('#main-content').fadeIn("slow");

    sr.reveal('.landingpage', {
      duration: 500,
      reset: false,
      delay: 100,
  }, 50);





};

window.onbeforeunload = function() {
    websocket.onclose = function() {}; // disable onclose handler first
    websocket.close();
};
