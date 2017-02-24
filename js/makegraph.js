function drawgraph1(array, timestamp, barchartcolor) {
    console.log(barchartcolor);
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            //     labels: timestamp,
            //     scaleShowVerticalLines: true,
            //     type: 'line',
            //     label: 'Average Time in Minutes',
            //     data: array,
            //     showLine: true,
            //     borderColor: currentcolor,
            //     borderWidth: 1,
            //     tension: 0.1,
            //
            // }, {
            labels: timestamp,
            scaleShowVerticalLines: false,
            type: 'bar',
            label: 'Bar Component',
            data: array,
            backgroundColor: barchartcolor,
            hoverBackgroundColor: currentcolor
        }]

    };
    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart");
    myNewChart = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {
            tooltips: {
                mode: 'label',

                custom: function(tooltip) {
                    tooltip.caretSize = 10,
                        tooltip.backgroundColor = '#000';
                    cornerRadius = 100;
                },
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        var label = data.labels[tooltipItem.index];
                        return value + " Minutes";
                    },
                    afterLabel: function(tooltipItem, data) {
                        if (tooltipItem.index === 0) {
                            return "";
                        } else if (tooltipItem.index === 1) {
                            return "";
                        } else {
                            return "";
                        }
                    }
                }
            },
            animation: {
                easing: "easeInOutBounce" // tooltip animation
            },

            onClick: function handleClick(evt) {
                var activeElement = myNewChart.getElementAtEvent(evt);
                var activeLabel = activeElement[0]._chart.config.data.labels[activeElement[0]._index];
                var activeElementValue = activeElement[0]._chart.config.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                console.log(activeLabel);
                console.log(activeElementValue);
                myNewChart.destroy();
                customgraph(averagesPerDayMinutesObject, averagesPerDayTimestamps, graphcolor);
                // drawgraph1(array, timestamp, barchartcolor);
            },

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
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
    });
}

function drawgraph2(array, timestamp, barchartcolor) {
    console.log(barchartcolor);
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            //     labels: timestamp,
            //     scaleShowVerticalLines: true,
            //     type: 'line',
            //     label: 'Average Time in Minutes',
            //     data: array,
            //     showLine: true,
            //     borderColor: currentcolor,
            //     borderWidth: 1,
            //     tension: 0.1,
            //
            // }, {
            labels: timestamp,
            scaleShowVerticalLines: true,

            type: 'bar',
            label: 'Bar Component',
            data: array,
            backgroundColor: barchartcolor,
        }]

    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart2");
    var myNewChart2 = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }

    });
}

function customgraph(array, timestamp, barchartcolor) {
    console.log(barchartcolor);
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            //     labels: timestamp,
            //     scaleShowVerticalLines: true,
            //     type: 'line',
            //     label: 'Average Time in Minutes',
            //     data: array,
            //     showLine: true,
            //     borderColor: currentcolor,
            //     borderWidth: 1,
            //     tension: 0.1,
            //
            // }, {
            labels: timestamp,
            scaleShowVerticalLines: true,

            type: 'bar',
            label: 'Bar Component',
            data: array,
            backgroundColor: barchartcolor,
        }]

    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart");
    var myNewChart2 = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }

    });
}
