//Initialize Variables
var origin = location.origin;

var neededData = {};
//Some people may call this the mighty wall of Variables
var serverData = {};
var waterusage = 0;
var paperusage = 0;
var datetimestamp = new Date();
neededData.graphvalue = 0;
neededData.oneToTwelve = [0, 1, 2, 3, 4, 5 ,6 ,7, 8, 9, 10, 11];

var colorObject = {};
colorObject.closedColor = 'rgba(231, 76, 60, ';
colorObject.openColor = 'rgba(46, 204, 113, ';
colorObject.alphaFull = '1.0)';
colorObject.alphaDown = '0.4)';

//connect to websocket
var getData = new WebSocket( origin.replace(/^(https?):\/\//,"wss://") + "/ws");

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
            neededData.averagesPerDayObject = serverData.averageClosedDurationPerDay;
            neededData.averagesPerMonthObject = serverData.averageClosedDurationPerMonth;

            neededData.averagesPerMonthTimestamps = [];
            neededData.averagesPerMonthData = [];
            neededData.intervalsPerMonthData = [];

            neededData.averagesPerDayTimestamps = [];
            neededData.averagesPerDayData = [];
            neededData.intervalsPerDayData = [];


            function roundToMilliseconds(num) {
                    return Math.floor((num.average / 60) * 100) / 100;
                }

            neededData.usagePerHourAm = _.map(serverData.usagePerHour.am, roundToMilliseconds);
            neededData.usagePerHourPm = _.map(serverData.usagePerHour.pm, roundToMilliseconds);

            neededData.totalEventsOpen = _.map(serverData.total.events.open, function (item){
                return {x: item.from, y: 1}
            });
            neededData.totalEventsClosed = _.map(serverData.total.events.closed, function (item){
                return {x: item.from, y: 1}
            });

            neededData.averagesPerMonthTimestamps = _.map(neededData.averagesPerMonthObject, 'timestamp');
            neededData.averagesPerMonthData = _.map(neededData.averagesPerMonthObject, roundToMilliseconds);
            neededData.intervalsPerMonthData = _.map(neededData.averagesPerMonthObject, 'intervals');

            neededData.averagesPerDayTimestamps = _.map(neededData.averagesPerDayObject, 'timestamp');
            neededData.averagesPerDayData = _.map(neededData.averagesPerDayObject, roundToMilliseconds);
            neededData.intervalsPerDayData = _.map(neededData.averagesPerDayObject, 'intervals');

            neededData.closedPercentage = serverData.closedOpenRatio.closedPercentage;
            neededData.openPercentage = serverData.closedOpenRatio.openPercentage;
            neededData.openPercentageGraphValue = 220 * serverData.closedOpenRatio.openPercentage / 100;
            neededData.closedPercentageGraphValue = 220 * serverData.closedOpenRatio.closedPercentage / 100;
            neededData.currentstatus = serverData.lastEvent.open;
            neededData.datetimestamp = Date.parse(serverData.lastEvent.timestamp);
            var daterightnow = new Date();
            var dateinterval = daterightnow - neededData.datetimestamp;
            neededData.timedurationelapsed = Math.floor(dateinterval / 1000);
            $('#totalminutes').text(Math.floor(serverData.total.duration.closed / 60 / 60 / 24 * 100)/100 + ' days');
            $('#totalaverage').text(Math.floor(serverData.total.average.closed / 60 * 100) / 100 + ' minutes');
            $('#totalintervals').text(serverData.total.intervals.closed + ' intervals');
            $('#totaltimespan').text(neededData.totalRecordingDays + ' days');

            neededData.totalRecordingDays = Math.floor( (new Date() - Date.parse(neededData.averagesPerDayObject[0].timestamp))/1000/60/60/24) ;
            paperusage = Math.floor(serverData.total.toiletPaperUsage.value * 100) / 100;
            break;

        case "sitzklo":
            neededData.currentstatus = JSON.parse(msg.data).open;
            neededData.timedurationelapsed = 0;

            neededData.graph1.destroy();
            neededData.graph2.destroy();
            neededData.graph3.destroy();
            neededData.graph4.destroy();


            break;
    }

    waterusage = serverData.totalIntervals * 9;



    setTimerDurationElapsed(neededData.timedurationelapsed);

    console.log(serverData);

    switch (neededData.currentstatus) {
        case "true":
            colorObject.currentColor = colorObject.openColor + colorObject.alphaFull;
            colorObject.currentColorLessOpacity = colorObject.openColor + colorObject.alphaDown;
            $('#status').text('open');
            $('.statuscolor').css("background-color", colorObject.currentColor);
            $('.underline').css("background-color", colorObject.currentColorLessOpacity);
            $('.ct-slice-donut').css("stroke", colorObject.currentColor );
            $('.currentcolor').css("color", colorObject.currentColorLessOpacity);
            $('.currentcolorfull').css("color", colorObject.currentColor);

            break;

        case "false":
        colorObject.currentColor = colorObject.closedColor + colorObject.alphaFull;
        colorObject.currentColorLessOpacity = colorObject.closedColor + colorObject.alphaDown;

            $('#status').text('occupied');
            $('.statuscolor').css("background-color", colorObject.currentColor);
            $('.underline').css("background-color", colorObject.currentColorLessOpacity);
            $('.ct-chart-donut .ct-series-a .ct-slice-donut').css("stroke", colorObject.currentColorLessOpacity);
            $('.currentcolor').css("color", colorObject.currentColorLessOpacity);
    }

    //general Syntax:
    //universalGraph(chartType, elementHTML, xAxis, yAxis, tooltipMessage, chartColor, chartHoverActive, chartHoverColor, animationEasing, lowerLevelGraphX, lowerLevelGraphY);
    //polarArea
    //average Graph
    neededData.graph1 = universalGraph('bar', "myChart", neededData.averagesPerMonthTimestamps, neededData.averagesPerMonthData, "minutes", colorObject.currentColorLessOpacity, true, colorObject.currentColor, "easeInOutExpo", neededData.averagesPerDayTimestamps,neededData.averagesPerDayData, '#graphmenu1');
    //interval Graph
    neededData.graph2 = universalGraph('bar', "myChart2", neededData.averagesPerMonthTimestamps, neededData.intervalsPerMonthData, "visits", colorObject.currentColorLessOpacity, true, colorObject.currentColor, "easeInOutExpo", neededData.averagesPerDayTimestamps, neededData.intervalsPerDayData, '#graphmenu2');
    //neededData.previousEvebtsGraph
    neededData.graph3 = twoInOneGraph('radar', 'myChart3', neededData.usagePerHourAm, neededData.usagePerHourPm, neededData.oneToTwelve, colorObject.currentColorLessOpacity, "easeInOutExpo");

    neededData.graph4 = lineInOneGraph('line', 'myChart4', neededData.totalEventsOpen, neededData.totalEventsClosed, colorObject.currentColorLessOpacity, colorObject.closedColor + colorObject.alphaFull, "easeInOutExpo");

    //closed open interval
    closedopenGraph(neededData.openPercentageGraphValue, neededData.closedPercentageGraphValue, neededData.closedPercentage);



    //waypoint for waterusage
    var waypoint = new Waypoint({
        element: document.getElementById('toiletdata'),
        handler: function(direction) {
            if (firstscroll === 0) {
                water();
                rolls();
                firstscroll++;
            }
        },
        offset: '80%',
    });

    //fadeout loading animation on load finish
    $(".se-pre-con").fadeOut("slow");

    $('#main-content').fadeIn("slow");

    sr.reveal('.landingpage', {
        duration: 500,
        reset: false,
        delay: 100,
    }, 50);
};

//disconnect on windows close
window.onbeforeunload = function() {
    websocket.onclose = function() {}; // disable onclose handler first
    websocket.close();
};
