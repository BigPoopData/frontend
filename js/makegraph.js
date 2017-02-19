function drawgraph1(array, timestamp, barchartcolor) {
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            // type: 'line',
            // label: 'Average Time in Minutes',
            // data: array,
            // showLine: false,
            // borderColor: currentcolor,
            // borderWidth: 1,
            // tension: 0.1,
            //
            // }, {
            type: 'bar',
            label: 'Bar Component',
            data: array,
            borderColor: barchartcolor,
        }]

    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart");
    var myNewChart = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {
            scales: {
                xAxes: [{
                //     afterTickToLabelConversion: function(data){
                //    var xLabels = data.ticks;
                //    xLabels.forEach(function (labels, i) {
                //        if (i % 2 == 1){
                //            xLabels[i] = '';
                //        }
                //    });},
                    // ticks: {
                    //     autoSkip: true,
                    //     maxTicksLimit: 20
                    // },

                    gridLines: {
                        display: false
                    }}],
                yAxes: [{
                    gridLines: {
                        display: false
                    }}]},
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }

    });
}

function drawgraph2(array, timestamp, barchartcolor) {
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            // type: 'line',
            // label: 'Average Time in Minutes',
            // data: array,
            // showLine: false,
            // borderColor: currentcolor,
            // borderWidth: 1,
            // tension: 0.1,
            //
            // }, {
            type: 'bar',
            label: 'Bar Component',
            data: array,
            borderColor: barchartcolor,
        }]

    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart2");
    var myNewChart = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {
            scales: {
                xAxes: [{
                //     afterTickToLabelConversion: function(data){
                //    var xLabels = data.ticks;
                //    xLabels.forEach(function (labels, i) {
                //        if (i % 2 == 1){
                //            xLabels[i] = '';
                //        }
                //    });},
                    // ticks: {
                    //     autoSkip: true,
                    //     maxTicksLimit: 20
                    // },

                    gridLines: {
                        display: false
                    }}],
                yAxes: [{
                    gridLines: {
                        display: false
                    }}]},
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }

    });
}
