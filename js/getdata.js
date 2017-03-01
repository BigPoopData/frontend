//Initialize Variables
var neededGraphData = {};
//Some people may call this the mighty wall of Variables
var serverData = {};
var waterusage = 0;
var datetimestamp = new Date();
neededGraphData.graphvalue = 0;

var colorObject = {};
colorObject.closedColor = 'rgba(231, 76, 60, ';
colorObject.openColor = 'rgba(46, 204, 113, ';
colorObject.alphaFull = '1.0)';
colorObject.alphaDown = '0.3)';

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
    serverData = JSON.parse(msg.data);
    switch (serverData.name) {
        case "FullObject":
            neededGraphData.averagesPerDayObject = serverData.averageClosedDurationPerDay;
            neededGraphData.averagesPerMonthObject = serverData.averageClosedDurationPerMonth;

            neededGraphData.averagesPerMonthTimestamps = [];
            neededGraphData.averagesPerMonthData = [];
            neededGraphData.intervalsPerMonthData = [];

            neededGraphData.averagesPerDayTimestamps = [];
            neededGraphData.averagesPerDayData = [];
            neededGraphData.intervalsPerDayData = [];

            for (var j = 0; j < neededGraphData.averagesPerMonthObject.length; j++) {
                neededGraphData.averagesPerMonthTimestamps.push(neededGraphData.averagesPerMonthObject[j].timestamp);
                neededGraphData.averagesPerMonthData.push(Math.floor((neededGraphData.averagesPerMonthObject[j].average / 60) * 100) / 100);
                neededGraphData.intervalsPerMonthData.push(neededGraphData.averagesPerMonthObject[j].intervals);

            }
            for (var k = 0; k < neededGraphData.averagesPerDayObject.length; k++) {
                neededGraphData.averagesPerDayTimestamps.push(neededGraphData.averagesPerDayObject[k].timestamp);
                neededGraphData.averagesPerDayData.push(Math.floor((neededGraphData.averagesPerDayObject[k].average / 60) * 100) / 100);
                neededGraphData.intervalsPerDayData.push(neededGraphData.averagesPerDayObject[k].intervals);

            }
            neededGraphData.closedPercentage = serverData.closedOpenRatio.closedPercentage;
            neededGraphData.openPercentage = serverData.closedOpenRatio.openPercentage;
            neededGraphData.openPercentageGraphValue = 220 * serverData.closedOpenRatio.openPercentage / 100;
            neededGraphData.closedPercentageGraphValue = 220 * serverData.closedOpenRatio.closedPercentage / 100;
            neededGraphData.currentstatus = serverData.lastEvent.open;
            neededGraphData.datetimestamp = Date.parse(serverData.lastEvent.timestamp);
            var daterightnow = new Date();
            var dateinterval = daterightnow - neededGraphData.datetimestamp;
            neededGraphData.timedurationelapsed = Math.floor(dateinterval / 1000);
            break;

        case "sitzklo":
            neededGraphData.currentstatus = JSON.parse(msg.data).open;
            neededGraphData.timedurationelapsed = 0;
            myChartArray[0].destroy();
            myChartArray[1].destroy();

            break;
    }

    waterusage = serverData.totalIntervals * 9;

    setTimerDurationElapsed(neededGraphData.timedurationelapsed);

    console.log(serverData);

    switch (neededGraphData.currentstatus) {
        case "true":
            colorObject.currentColor = colorObject.openColor + colorObject.alphaFull;
            colorObject.currentColorLessOpacity = colorObject.openColor + colorObject.alphaDown;
            $('#status').text('open');
            $('.statuscolor').css("background-color", colorObject.currentColor);
            $('.underline').css("background-color", colorObject.currentColorLessOpacity);
            $('.ct-slice-donut').css("stroke", colorObject.currentColor);

            break;

        case "false":
        colorObject.currentColor = colorObject.closedColor + colorObject.alphaFull;
        colorObject.currentColorLessOpacity = colorObject.closedColor + colorObject.alphaDown;

            $('#status').text('occupied');
            $('.statuscolor').css("background-color", colorObject.currentColor);
            $('.underline').css("background-color", colorObject.currentColorLessOpacity);
            $('.ct-slice-donut').css("stroke", colorObject.currentColor);
    }

    //general Syntax:
    //universalGraph(destroyGraph, cartType, elementHTML, xAxis, yAxis, tooltipMessage, chartColor, chartHoverActive, chartHoverColor, animationEasing, lowerLevelGraphX, lowerLevelGraphY);

    universalGraph(false, 'bar', "myChart", neededGraphData.averagesPerMonthTimestamps, neededGraphData.averagesPerMonthData, "minutes", colorObject.currentColorLessOpacity, true, colorObject.currentColor, "easeInOutExpo", neededGraphData.averagesPerDayTimestamps,neededGraphData.averagesPerDayData);
    universalGraph(false, 'bar', "myChart2", neededGraphData.averagesPerMonthTimestamps, neededGraphData.intervalsPerMonthData, "visits", colorObject.currentColorLessOpacity, true, colorObject.currentColor, "easeInOutExpo", neededGraphData.averagesPerDayTimestamps, neededGraphData.intervalsPerDayData);
    closedopenGraph(neededGraphData.openPercentageGraphValue, neededGraphData.closedPercentageGraphValue, neededGraphData.closedPercentage);

    var waypoint = new Waypoint({
        element: document.getElementById('watersavings'),
        handler: function(direction) {
            if (firstscroll === 0) {
                water();
                firstscroll++;
            }
        },
        offset: '50%',
    });


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
