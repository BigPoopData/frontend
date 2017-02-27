function drawGraph1(destroyChart, dates, timestamp, barchartcolor) {
    if (destroyChart) {
        myNewChart.destroy();
    } else {
        var lineChartData = {
            labels: timestamp,
            scaleShowVerticalLines: true,
            datasets: [{
                //     labels: timestamp,
                //     scaleShowVerticalLines: true,
                //     type: 'line',
                //     label: 'Average Time in Minutes',
                //     data: dates,
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
                data: dates,
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
                            tooltip.backgroundColor = '#000',
                            cornerRadius = 9
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
                    easing: "easeInOutBounce"
                },

                onClick: function handleClick(evt) {
                    var activeElement = myNewChart.getElementAtEvent(evt);
                    var activeLabel = activeElement[0]._chart.config.data.labels[activeElement[0]._index];
                    var activeElementValue = activeElement[0]._chart.config.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                    var activeElementTimestamp = [];
                    // console.log(activeLabel);
                    // console.log(activeElementValue);
                    for (var l = 0; l < averagesPerDayObject.length; l++) {
                        var check = moment(averagesPerDayObject[l].timestamp);
                        var month = check.format('MMM');
                        var day = check.format('D');
                        var year = check.format('YYYY');

                        activeElementTimestamp.push(month + " " + year);
                        if (activeElementTimestamp[l] == activeLabel) {
                            activeAveragesLabelTimestamps.push(averagesPerDayObject[l].timestamp);
                            activeLabelAverages.push(averagesPerDayMinutesObject[l]);
                        }
                    }

                    myNewChart.destroy();
                    customgraph(activeLabelAverages, activeAveragesLabelTimestamps, graphcolor);
                    // drawgraph1(dates, timestamp, barchartcolor);
                },

                scales: {
                    xAxes: [{
                        borderWidth: 0,
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
                            display: false,
                            drawBorder: false
                        }
                    }],
                    yAxes: [{
                        borderWidth: 4,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    fontFamily: 'Montserrat',
                    fontStlye: 'bold',
                },
                legend: {
                    display: false,
                },
            }
        });
    }
}

function drawGraph2(destroyChart, dates, timestamp, barchartcolor) {
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            labels: timestamp,
            scaleShowVerticalLines: false,
            type: 'bar',
            label: 'Bar Component',
            data: dates,
            backgroundColor: barchartcolor,
            hoverBackgroundColor: currentcolor
        }]

    };

    if (destroyChart) {
        myNewChart3.destroy();
    } else {

        Chart.defaults.global.legend.display = false;

        var ctx = document.getElementById("myChart2");
        myNewChart3 = new Chart(ctx, {
            type: "bar",
            data: lineChartData,
            options: {
                tooltips: {
                    mode: 'label',

                    custom: function(tooltip) {
                        tooltip.caretSize = 10,
                            tooltip.backgroundColor = '#000',
                            cornerRadius = 9
                    },
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var value = data.datasets[0].data[tooltipItem.index];
                            var label = data.labels[tooltipItem.index];
                            return value + " visits";
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
                    easing: "easeInOutBounce"
                },

                onClick: function handleClick(evt) {
                    var activeElement = myNewChart.getElementAtEvent(evt);
                    var activeLabel = activeElement[0]._chart.config.data.labels[activeElement[0]._index];
                    var activeElementValue = activeElement[0]._chart.config.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                    var activeElementTimestamp = [];
                    // console.log(activeLabel);
                    // console.log(activeElementValue);
                    for (var l = 0; l < averagesPerDayObject.length; l++) {
                        var check = moment(averagesPerDayObject[l].timestamp);
                        var month = check.format('MMM');
                        var day = check.format('D');
                        var year = check.format('YYYY');

                        activeElementTimestamp.push(month + " " + year);
                        if (activeElementTimestamp[l] == activeLabel) {
                            activeIntervalsLabelTimestamps.push(averagesPerDayObject[l].timestamp);
                            activeLabelIntervals.push(intervalsPerDayObject[l]);
                        }
                    }

                    myNewChart3.destroy();
                    customgraph2(activeLabelIntervals, activeIntervalsLabelTimestamps, graphcolor);
                },

                scales: {
                    xAxes: [{
                        borderWidth: 0,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }],
                    yAxes: [{
                        borderWidth: 4,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            beginAtZero: true
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
}

function customgraph(dates, timestamp, barchartcolor) {
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            labels: timestamp,
            scaleShowVerticalLines: true,

            type: 'bar',
            label: 'Bar Component',
            data: dates,
            backgroundColor: barchartcolor,
        }]

    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart");
    var myNewChart2 = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {

            tooltips: {
                mode: 'label',

                custom: function(tooltip) {
                    tooltip.caretSize = 10,
                        tooltip.backgroundColor = '#000',
                        cornerRadius = 9
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
                easing: "easeInOutExpo" // tooltip animation
            },


            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
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

function customgraph2(dates, timestamp, barchartcolor) {
    var lineChartData = {
        labels: timestamp,
        scaleShowVerticalLines: true,
        datasets: [{
            labels: timestamp,
            scaleShowVerticalLines: true,

            type: 'bar',
            label: 'Bar Component',
            data: dates,
            backgroundColor: barchartcolor,
        }]

    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("myChart2");
    var myNewChart4 = new Chart(ctx, {
        type: "bar",
        data: lineChartData,
        options: {

            tooltips: {
                mode: 'label',

                custom: function(tooltip) {
                    tooltip.caretSize = 10,
                        tooltip.backgroundColor = '#000',
                        cornerRadius = 9
                },
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        var label = data.labels[tooltipItem.index];
                        return value + " visits";
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
                easing: "easeInOutExpo" // tooltip animation
            },

            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
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

function closedopenGraph() {
    var ctx = document.getElementById("chart-e1");
    var chart = new Chartist.Pie(ctx, {
        series: [openPercentageGraphValue, closedPercentageGraphValue],
        labels: ['', '']
    }, {
        donut: true,
        donutWidth: 20,
        startAngle: 210,
        total: 260,
        showLabel: false,
        plugins: [
            Chartist.plugins.fillDonut({
                items: [{ //Item 1
                    content: '<i class="fa fa-tachometer text-muted"></i>',
                    position: 'bottom',
                    offsetY: 10,
                    offsetX: -2
                }, { //Item 2
                    content: '<h3 class="openPercentage">' + closedPercentage + '<span class="small">% closed</span></h3>'
                }]
            })
        ],
    });
    chart.on('draw', function(data) {
        if (data.type === 'slice' && data.index === 0) {
            var pathLength = data.element._node.getTotalLength();


            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 1200,
                    from: -pathLength + 'px',
                    to: '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    fill: 'freeze'
                }
            };
            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });
            data.element.animate(animationDefinition, true);
        }
    });
};
