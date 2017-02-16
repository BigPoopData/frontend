var dataset = [];
var timestampsObject = [];
var averagesObject = [];
var datasetObject = [];
var currentstatus;
var waterusage = 2523;
var closedcolor = 'rgba(231, 76, 60, ';
var opencolor = 'rgba(46, 204, 113, ';
var currentcolor;
var currentcolorlessopacity;
var alphafull = '1.0)';
var alphadown = '0.3)';
var datetimestamp = new Date();


var getData = new WebSocket("wss://metaklo.nico-rameder.at:8000/ws");


this.send = function(message, callback) {
    this.waitForConnection(function() {
        getData.send(message);
        if (typeof callback !== 'undefined') {
            callback();
        }
    }, 1000);
};

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

this.send("setup", function() {
    console.log('server is up');
});

getData.onmessage = function(msg) {
    result = JSON.parse(msg.data);
    switch (result.name) {
        case "FullObject":
            dataset = result;
            datasetObject = dataset.averageClosedDurationPerDay;
            //if (averagesObject.length < 1) {
            for (var j = 0; j < datasetObject.length; j++) {
                timestampsObject.push(datasetObject[j].timestamp);
                averagesObject.push(Math.floor((datasetObject[j].average / 60)* 100) / 100);
            }
            //}
            currentstatus = dataset.lastEvent.open;
            var daterightnow = new Date();
            datetimestamp = Date.parse(dataset.lastEvent.timestamp);
            var dateinterval = daterightnow - datetimestamp;
            var timedurationelapsed = Math.floor(dateinterval/1000);
            break;

        case "sitzklo":
            currentstatus = JSON.parse(msg.data).open;
            console.log(msg.data);
            timedurationelapsed = 0;
            break;
    }

    setTimerDurationElapsed(timedurationelapsed);

    switch (currentstatus) {
        case "true":
            $('#status').text('open');
            $('.statuscolor').css("background-color", opencolor + alphafull);
            currentcolor = opencolor + alphafull;
            currentcolorlessopacity = opencolor + alphadown;

            break;
        case "false":
            $('#status').text('occupied');
            $('.statuscolor').css("background-color", closedcolor + alphafull);
            currentcolor = closedcolor + alphafull;
            currentcolorlessopacity = closedcolor + alphadown;
    }

    drawgraph1(averagesObject, timestampsObject, currentcolor);

    $(".se-pre-con").fadeOut("slow");
    $('#main-content').fadeIn("slow");

};

window.onbeforeunload = function() {
    websocket.onclose = function() {}; // disable onclose handler first
    websocket.close();
};
