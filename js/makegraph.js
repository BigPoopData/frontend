function closedopenGraph(val1, val2, displayedPercentage) {
    var ctx = document.getElementById("chart-e1");
    var chart = new Chartist.Pie(ctx, {
        series: [val1, val2],
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
                    content: '<h3 class="openPercentage">' + displayedPercentage + '<span class="small">% closed</span></h3>'
                }]
            })
        ],
    });
    chart.on('draw', function(data) {
        if (data.type === 'slice' && data.index === 0) {
            var pathLength = data.element._node.getTotalLength();
            var g = data.element._node;


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

            if (g.parentNode.classList[1] === "ct-series-a")
            {
                data.element.attr({
                    style: 'stroke:' + colorObject.currentColorLessOpacity,
                    'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'

                });
            }

        }
    });
}


function universalGraph(chartType, elementHTML, xAxis, yAxis, tooltipMessage, chartColor, chartHoverActive, chartHoverColor, animationEasing, lowerLevelGraphX, lowerLevelGraphY, graphmenu) {
    var lineChartData = {
        labels: xAxis,
        scaleShowVerticalLines: true,
        datasets: [{
            labels: xAxis,
            data: yAxis,
            scaleShowVerticalLines: false,
            type: chartType,
            label: 'Bar Component',
            backgroundColor: chartColor,
            hoverBackgroundColor: chartHoverColor
        }]
    };

    var ctx = document.getElementById(elementHTML).getContext("2d");

    var graph = new Chart(ctx, {
        type: chartType,
        data: lineChartData,
        options: {
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        var label = data.labels[tooltipItem.index];
                        return value + " " + tooltipMessage;
                    },
                }
            },
            animation: {
                easing: animationEasing
            },

            onClick: function handleClick(evt) { //do this when Graph is clicked
                if (chartHoverActive) {
                    var activeElement = this.getElementAtEvent(evt);

                    var activeElementGraphData = {};
                    activeElementGraphData.activeX = activeElement[0]._chart.config.data.labels[activeElement[0]._index];
                    activeElementGraphData.activeY = activeElement[0]._chart.config.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                    activeElementGraphData.x = []; // x-Value for the new graph
                    activeElementGraphData.y = []; // y-Value for the new graph
                    activeElementGraphData.MonthYearValue = [];
                    // console.log(activeLabel);
                    // console.log(activeElementValue);


                    //lowerLevelGraphX, lowerLevelGraphY

                    for (var l = 0; l < lowerLevelGraphX.length; l++) {
                        var getMonths = {};
                        getMonths.checkIt = moment(lowerLevelGraphX[l]);
                        getMonths.month = getMonths.checkIt.format('MMM');
                        getMonths.day = getMonths.checkIt.format('D');
                        getMonths.year = getMonths.checkIt.format('YYYY');

                        activeElementGraphData.MonthYearValue.push(getMonths.month + " " + getMonths.year);
                        if (activeElementGraphData.MonthYearValue[l] == activeElementGraphData.activeX) {
                            activeElementGraphData.x.push(lowerLevelGraphX[l]);
                            activeElementGraphData.y.push(lowerLevelGraphY[l]);
                        }
                    }

                    graph.destroy();

                    graph = universalGraph('bar', elementHTML, activeElementGraphData.x, activeElementGraphData.y, tooltipMessage, colorObject.currentColorLessOpacity, false, colorObject.currentColorLessOpacity, "easeInOutExpo", lowerLevelGraphX, lowerLevelGraphY);

                    $(graphmenu).fadeIn('slow');
                }
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
            title: {
                fontFamily: 'Montserrat',
                fontStlye: 'bold',
            },
            legend: {
                display: false,
            },
        }
    });

    $(graphmenu).click(function() {
        graph.destroy();
        graph = universalGraph(chartType, elementHTML, xAxis, yAxis, tooltipMessage, chartColor, chartHoverActive, chartHoverColor, animationEasing, lowerLevelGraphX, lowerLevelGraphY, graphmenu);
        $(graphmenu).fadeOut('slow');
    });
    return graph;
}

function twoInOneGraph(chartType, elementHTML, yAxis, yAxis2, xAxis, chartColor, chartcolor2, animationEasing) {

    var lineChartData = {
        labels: xAxis,
        scaleShowVerticalLines: true,
        datasets: [{
            type: chartType,
            data: yAxis,
            scaleShowVerticalLines: false,
            label: ' AM.',
            backgroundColor: chartColor,
            hoverBackgroundColor: chartColor,

            },{
            type: chartType,
            data: yAxis2,
            scaleShowVerticalLines: false,
            label: ' PM.',
            backgroundColor: chartcolor2,
            hoverBackgroundColor: chartcolor2,
        }]
    };

    var ctx = document.getElementById(elementHTML).getContext("2d");

    var graph = new Chart(ctx, {
        type: chartType,
        data: lineChartData,
        options: {
            tooltips: {
                titleFontSize: 0,
                titleSpacing: 0,
                titleMarginBottom: 0,
                displayColors: false,
                enabled: true,
                mode: 'single',
                callbacks: {

                    // title: function(tooltipItem, data) {
                    //     console.log(data.datasets);
                        // return data.labels[tooltipItem[0].index] + data.datasets[data.datasets[0]].label;
                    // }

                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        var label = data.labels[tooltipItem.index];
                        return label + data.datasets[tooltipItem.datasetIndex].label + " : " + value + " minutes";

                        // return data.datasets[tooltipItems.datasetIndex].label + ;
                    }

                }
            },

            animation: {
                easing: animationEasing
            },
            scale:{
                ticks: {
                    beginAtZero: true
                }
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

    return graph;

}

function lineInOneGraph(chartType, elementHTML, data1, data2, chartColor, chartColor2, animationEasing) {
    var lineChartData = {
        scaleShowVerticalLines: true,
        datasets: [{
            type: chartType,
            data: data1,
            scaleShowVerticalLines: false,
            label: 'Open',
            backgroundColor: 'transparent',
            showLine: false,
            pointBackgroundColor: chartColor,

            },{
            type: chartType,
            data: data2,
            scaleShowVerticalLines: false,
            label: 'Closed',
            showLine: false,
            pointBackgroundColor: chartColor2,

        }]
    };

    var ctx = document.getElementById(elementHTML).getContext("2d");

    var graph = new Chart(ctx, {
        type: chartType,
        data: lineChartData,
        options: {
            tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {
                                label: function(tooltipItems, data) {


                                    var value = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                                    if (value.y > 60) {
                                        endvalue = Math.floor(value.y / 60 % 60 * 100) / 100 + " hours";
                                    } else {
                                        endvalue = value.y + " minutes";
                                    }

                                    var label = data.labels[tooltipItems.index];
                                    return data.datasets[tooltipItems.datasetIndex].label + " for " + endvalue;
                                }
                            }
                        },
            animation: {
                easing: animationEasing
            },
            scale:{
                ticks: {
                    beginAtZero: false
                }
            },

            scales: {
            yAxes: [{
                ticks: {
                                    min: 0,
                                    max: 3600
                                },
                // display: false,
                gridLines: {
                    display:false
                },
                type: 'logarithmic'
            }],
            xAxes: [{
                gridLines: {
                    display:false
                },
                type: 'time',
                    time: {
                        displayFormats: {

                            minute: 'h:mm:ss a',

                            day: 'll'
                        },
                        // unit: 'days'
                    }
                }]
            }
        },

            responsive: true,
            maintainAspectRatio: false,
            title: {
                fontFamily: 'Montserrat',
                fontStlye: 'bold',
            },
            legend: {
                display: true,
            },
        }
    );

    return graph;

}
