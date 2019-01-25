import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GoogleApiService} from '../_services/google-api.service';
import {DashboardService} from '../_services/dashboard.service';
import * as d3 from 'd3';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    // donut chart variables
    donutChart: {string: Array<{'status': string, 'value': number}>};
    doughnutFilterData: Array<{'status': string, 'value': number, 'color': string}>;
    doughnutFilterDataToggle = cloneDeep(this.doughnutFilterData);
    private noOfDevices = 0;

    industryTypes: Array<string>;

    // line graph variables
    lineChartData: {string: Array<{
        'name': string,
        'data': Array<{
            'status': number,
            'timestamp': string
        }>
    }>};
    filterDataLineGraph = {};
    filteredData: object;
    nowDateTime = new Date();  // current date and time

    // device location variables
    deviceLocations: Array<{
        'id': number,
        'name': string,
        'latitude': number,
        'longitude': number
    }>;
    lat: number = 26.890959;
    long: number = -80.116577;

    data_new = {
        // 'type1': [
        //     {
        //         'name': 'device1',
        //         'data': [
        //             {
        //                 'timestamp': '01:00:00',
        //                 'status': 4
        //             },
        //             {
        //                 'timestamp': '02:00:00',
        //                 'status': 2
        //             },
        //             {
        //                 'timestamp': '03:00:00',
        //                 'status': 3
        //             },
        //             {
        //                 'timestamp': '04:00:00',
        //                 'status': 4
        //             },
        //             {
        //                 'timestamp': '05:00:00',
        //                 'status': 5
        //             },
        //             {
        //                 'timestamp': '06:00:00',
        //                 'status': 6
        //             },
        //             {
        //                 'timestamp': '06:10:00',
        //                 'status': 2
        //             },
        //             {
        //                 'timestamp': '09:01:00',
        //                 'status': 2
        //             }
        //         ]
        //     },
        //     {
        //         'name': 'device2',
        //         'data': [
        //             {
        //                 'timestamp': '01:00:00',
        //                 'status': 6
        //             },
        //             {
        //                 'timestamp': '03:00:00',
        //                 'status': 3
        //             },
        //             {
        //                 'timestamp': '05:00:00',
        //                 'status': 5
        //             },
        //             {
        //                 'timestamp': '08:00:00',
        //                 'status': 6
        //             },
        //             {
        //                 'timestamp': '09:01:00',
        //                 'status': 6
        //             }
        //         ]
        //     }
        // ],
        type2: [
            {
                'name': 'device3',
                'data': [
                    {
                        'timestamp': '2019-01-24T11:00:00Z',
                        'status': 1
                    },
                    {
                        'timestamp': '2019-01-24T12:00:00Z',
                        'status': 2
                    },
                    {
                        'timestamp': '2019-01-24T13:00:00Z',
                        'status': 3
                    },
                    {
                        'timestamp': '2019-01-24T14:00:00Z',
                        'status': 5
                    },
                    {
                        'timestamp': '2019-01-24T15:00:00Z',
                        'status': 3
                    },
                    {
                        'timestamp': '2019-01-24T16:00:00Z',
                        'status': 6
                    },
                    {
                        'timestamp': '2019-01-24T17:00:00Z',
                        'status': 2
                    },
                    {
                        'timestamp': '2019-01-24T19:10:00Z',
                        'status': 2
                    }
                ]
            },
            {
                'name': 'device4',
                'data': [
                    {
                        'timestamp': '2019-01-24T11:00:00Z',
                        'status': 5
                    },
                    {
                        'timestamp': '2019-01-24T13:20:00Z',
                        'status': 4
                    },
                    {
                        'timestamp': '2019-01-24T13:45:00Z',
                        'status': 1
                    },
                    {
                        'timestamp': '2019-01-24T15:50:00Z',
                        'status': 2
                    },
                    {
                        'timestamp': '2019-01-24T16:00:00Z',
                        'status': 1
                    },
                    {
                        'timestamp': '2019-01-24T18:00:00Z',
                        'status': 4
                    },
                    {
                        'timestamp': '2019-01-24T19:10:00Z',
                        'status': 4
                    }
                ]
            }
        ]
    };

    constructor(
        private googleapiService: GoogleApiService,
        private dashboardservice: DashboardService
    ) { }

    ngOnInit() {
        this.dashboardservice.getDashboard().subscribe(response => {
            this.lineChartData = response['data']['line_graph'];
            this.donutChart = response['data']['donut_chart'];
            this.doughnutFilterData = response['data']['donut_data_format'];
            this.industryTypes = response['data']['industry_type'];
            this.deviceLocations = response['data']['device_location'];
            if (this.deviceLocations) {
                this.lat = this.deviceLocations[0].latitude;
                this.long = this.deviceLocations[0].longitude;
            }

            const ctx = document.getElementById('doughnut_chart');

            // for (const key in response['data']['industry_type']) {
            //     if (response['data']['industry_type'][key]) {
            //         this.industryTypes.push(
            //             response['data']['industry_type'][key]
            //         );
            //     }
            // }

            this.sumDonutChart(this.donutChart);
            this.createDoughnutChart(ctx, this.doughnutFilterData);

            // const cloneLineData = cloneDeep(this.lineChartData);
            // this.createLineGraph(cloneLineData);
        });
    }

    ngAfterViewInit() {
        // for (const industry_type in this.data_new) {
        //     if (this.data_new[industry_type]) {
        //         this.industryTypes_line_graph.push(industry_type);
        //     }
        // }
        const cloneobj = cloneDeep(this.data_new);
        this.createLineGraph(cloneobj);
    }

    // Doughtnut chart count devices
    countNoOfDevice(data) {
        this.noOfDevices = 0;
        for (const deviceKey in data) {
            if (data[deviceKey]) {
                this.noOfDevices = this.noOfDevices + data[deviceKey].value;
            }
        }
    }

    // draw doughnut chart
    createDoughnutChart(node, data) {
        d3.select('#doughnut_chart svg').remove();
        const width = 175;
        const height = 175;
        const radius = Math.min(width, height) / 2;
        const color = d3
            .scaleOrdinal()
            .range(['#4aec26', '#5576e4', '#f0fc00', '#faac00', '#dd0000', 'gray']);

        const arc = d3
            .arc<any>()
            .outerRadius(radius - 10)
            .innerRadius(radius - 15);

        const pie = d3
            .pie<any>()
            .padAngle(0.03)
            .sort(null)
            .value(function (d) {
                return d.value;
            });

        const canvas = d3
            .select(node)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const group = canvas
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const arcs = group
            .selectAll<any, any>('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d: any): any {
                return color(d.data.status);
            });

        canvas
            .append('text')
            .attr('transform', function (d) {
                return 'translate(' + (width / 2 - 15) + ',' + height / 2 + ')';
            })
            .attr('fill', 'white')
            .text(this.noOfDevices)
            .style('font-size', '35px')
            .style('font-weight', 'bold');

        canvas
            .append('text')
            .attr('transform', function (d) {
                return 'translate(' + (width / 2 - 38) + ',' + (height / 2 + 40) + ')';
            })
            .attr('fill', 'gray')
            .text('DEVICES')
            .style('font-size', '18px');
    }

    // sums up all status data from different industry types of initial data
    sumDonutChart(data) {
        // this.filteredData = {};
        for (const key in data) {
            if (data[key]) {
                for (const deviceKey in data[key]) {
                    if (data[key][deviceKey]) {
                        this.doughnutFilterData[deviceKey].value =
                            this.doughnutFilterData[deviceKey].value +
                            data[key][deviceKey].value;
                    }
                }
            }
        }
        this.countNoOfDevice(this.doughnutFilterData);
    }

    // selects checked industry type and sums up status data.
    toggleFeatureDoughnut(item, datavalue) {
        const ctx = document.getElementById('doughnut_chart');
        if (datavalue === true) {
            for (const key in this.donutChart[item]) {
                if (this.donutChart[item][key]) {
                    this.doughnutFilterDataToggle[key].value =
                        this.doughnutFilterDataToggle[key].value +
                        this.donutChart[item][key].value;
                }
            }
        } else {
            for (const key in this.donutChart[item]) {
                if (this.donutChart[item][key]) {
                    this.doughnutFilterDataToggle[key].value =
                        this.doughnutFilterDataToggle[key].value -
                        this.donutChart[item][key].value;
                }
            }
        }

        this.countNoOfDevice(this.doughnutFilterDataToggle);
        this.createDoughnutChart(ctx, this.doughnutFilterDataToggle);
    }

    // create Line Graph
    createLineGraph(data) {
        d3.select('#line_chart svg').remove();
        const margin = {top: 0, right: 20, bottom: 30, left: 20};
        const width = 600 - margin.left - margin.right;
        const height = 240 - margin.top - margin.bottom;
        const status_colors = [
            '#1e7431',
            '#413a7f',
            '#b7c418',
            '#b48421',
            '#b10015',
            '#83858c'
        ];
        this.filteredData = data;

        // set the ranges
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Define the div for the tooltip
        const div = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        const line_color = 'white';

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3
            .select('#line_chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .style('background-color', '#30374a')
            .style('z-index', 10);

        // status labels
        // svg.append('text')
        // .attr('x', (width + 40))
        // .attr('y', (margin.top + 80 ))
        // .style('fill', 'white')
        // .style('font-size', '16px')
        // .text('3 Online');

        // svg.append('text')
        // .attr('x', (width + 40))
        // .attr('y', (margin.top + 100 ))
        // .style('fill', 'white')
        // .style('font-size', '16px')
        // .style('z-index', '1300')
        // .text('3 Cell');

        // svg.append('text')
        // .attr('x', (width + 40))
        // .attr('y', (margin.top + 120 ))
        // .style('fill', 'white')
        // .style('font-size', '16px')
        // .style('z-index', '1300')
        // .text('3 Auto Recover');

        // svg.append('text')
        // .attr('x', (width + 40))
        // .attr('y', (margin.top + 140 ))
        // .style('fill', 'white')
        // .style('font-size', '16px')
        // .style('z-index', '1300')
        // .text('3 Weak Signal');

        // svg.append('text')
        // .attr('x', (width + 40))
        // .attr('y', (margin.top + 160 ))
        // .style('fill', 'white')
        // .style('font-size', '16px')
        // .style('z-index', '1300')
        // .text('3 Offline');

        // fill color
        // for (const index in status_colors) {
        //     if (status_colors[index]) {
        //         svg
        //             .append('rect')
        //             .attr('width', width)
        //             .attr('height', height / 6)
        //             .attr(
        //                 'transform',
        //                 'translate(0,' + (height / 6) * Number(index) + ')'
        //             )
        //             .attr('fill', status_colors[index])
        //             .attr('stop-opacity', 0);
        //     }
        // }

        // draw separator
        for (let i = 0; i <= status_colors.length; i++) {
            svg
                .append('line')
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', (height / 6) * i)
                .attr('y2', (height / 6) * i)
                .attr('stroke', 'black')
                .attr('stroke-width', 0.5);
                // .attr('height', height / 6)
                // .attr(
                //     'transform',
                //     'translate(0,' + (height / 6) * Number(index) + ')'
                // )
                // .attr('fill', status_colors[index])
                // .attr('stop-opacity', 0);
        }

        // add gradient
        // for (const index in status_colors) {
        //     if (status_colors[index]) {
        //         const gradient = svg
        //             .append('defs')
        //             .append('linearGradient')
        //             .attr('id', 'gradient')
        //             .attr('x1', '0%')
        //             .attr('y1', '50%')
        //             .attr('x2', '100%')
        //             .attr('y2', '50%')
        //             .attr('spreadMethod', 'pad');

        //         gradient
        //             .append('stop')
        //             .attr('offset', '0%')
        //             .attr('stop-color', '#000')
        //             .attr('stop-opacity', 0.55);

        //         gradient
        //             .append('stop')
        //             .attr('offset', '87%')
        //             .attr('stop-color', '#000')
        //             .attr('stop-opacity', 0.55);

        //         gradient
        //             .append('stop')
        //             .attr('offset', '100%')
        //             .attr('stop-color', '#fff')
        //             .attr('stop-opacity', 0.1);

        //         svg
        //             .append('rect')
        //             .attr('width', width)
        //             .attr('height', height / 6)
        //             .attr(
        //                 'transform',
        //                 'translate(' + 0 + ',' + (height / 6) * Number(index) + ')'
        //             )
        //             .attr('fill', 'url(#gradient)');
        //     }
        // }

        for (const index_industry in this.filteredData) {
            if (this.filteredData[index_industry]) {

                const device_data = this.filteredData[index_industry];
                for (const index in device_data) {
                    if (device_data[index]) {

                        const device_status_data = device_data[index].data;
                        if (device_status_data) {

                            // change data
                            const line_graph_data = this.manipulateGraphData(
                                device_status_data
                            );

                            // format the data
                            line_graph_data.forEach(function (d) {
                                d['timestamp'] = d['timestamp'];
                                d['status_1'] = d['status'] - 0.5;
                            });

                            // set the colour scale
                            const color = d3.scaleOrdinal(d3.schemeCategory10);
                            // Scale the range of the data
                            x.domain(
                                d3.extent<any, any>(device_status_data, function (d) {
                                    return d['timestamp'];
                                })
                            );
                            y.domain([0, 6]);

                            // Add the X Axis
                            svg
                                .append('g')
                                .attr('transform', 'translate(0,' + height + ')')
                                .call(
                                    d3
                                        .axisBottom(x)
                                        .tickSize(-height)
                                        .tickFormat(d3.timeFormat('%H:%M'))
                                );

                            // draw line on tick
                            d3.selectAll('g.tick')
                            // only ticks that returned true for the filter will be included
                            // in the rest of the method calls:
                                .select('line') // grab the tick line
                                .attr('tick', 10)
                                .attr('class', 'quadrantBorder') // style with a custom class and CSS
                                .style('stroke-width', 0.2) // or style directly with attributes or inline styles
                                .style('stroke', '#dcdcdc');

                            // Add the paths with different curves.
                            svg
                                .append('path')
                                .datum(line_graph_data)
                                .attr('class', 'line')
                                .style('stroke-width', '1.5')
                                .style('fill', function (d) {
                                    return 'rgba(0, 0, 0, 0)';
                                })
                                .on('mouseover', function (d) {
                                    div
                                        .transition()
                                        .duration(200)
                                        .style('opacity', 0.9);
                                    div
                                        .html(device_data[index].name)
                                        .style('left', d3.event.pageX + 'px')
                                        .style('top', d3.event.pageY - 28 + 'px');

                                    d3.select(this)
                                        .style('stroke-width', '3.5');
                                })
                                .on('mouseout', function (d) {
                                    div
                                        .transition()
                                        .duration(50)
                                        .style('opacity', 0);

                                    d3.select(this)
                                        .style('stroke-width', '1.5');
                                })
                                .style('stroke', function () {
                                    // Add the colour
                                    return line_color;
                                })
                                .attr(
                                    'd',
                                    d3
                                        .line<any>()
                                        .curve(d3.curveLinear)
                                        .x(function (d) {
                                            return x(d['timestamp']);
                                        })
                                        .y(function (d) {
                                            return y(d['status_1']);
                                        })
                                );
                        }
                    }
                }
            }
        }
    }

    // change line graph data [decrease status value by 0.5 to display in the middle of quadrant and add 6 points]
    manipulateGraphData(data) {
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');
        const returnData = [];

        const data_length = data.length;
        const first_data = data[0];
        const last_data = data[data_length - 1];
        first_data['timestamp'] = parseTime(first_data['timestamp']);
        last_data['timestamp'] = parseTime(last_data['timestamp']);
        returnData.push(first_data);

        for (let i = 1; i < data_length - 1; i++) {
            const prev_data = data[i - 1];
            const currentTimestamp = parseTime(data[i]['timestamp']);
            const current_status = data[i]['status'];

            // get time difference between previous, current and next status change
            const prevTimeDiff = new Date(currentTimestamp).getTime() - new Date(parseTime(prev_data['timestamp'])).getTime();
            const nextTimeDiff = new Date(parseTime(data[i + 1]['timestamp'])).getTime() - new Date(currentTimestamp).getTime();

            // check if time difference between two statuses is less than 11 minutes,
            // get points in difference of 2 and 1 minutes else 4 and 2 minutes
            const p1Time = (prevTimeDiff < 660000) ? 2 : 4;
            const p6Time = (nextTimeDiff < 660000) ? 2 : 4;

            const p2Time = (prevTimeDiff < 660000) ? 1 : 2;
            const p5Time = (nextTimeDiff < 660000) ? 1 : 2;

            // check if status raises or declines
            const statusDecline = prev_data['status'] > current_status;

            // point 1
            let currentTimestamp1 = cloneDeep(currentTimestamp);
            const point_1 = {
                'timestamp': new Date(currentTimestamp1.setMinutes(currentTimestamp1.getMinutes() - p1Time)),
                'status': prev_data['status']
            };

            // point 6
            currentTimestamp1 = cloneDeep(currentTimestamp);
            const point_6 = {
                'timestamp': new Date(currentTimestamp1.setMinutes(currentTimestamp1.getMinutes() + p6Time)),
                'status': current_status
            };

            let point_2, point_3, point_4, point_5 = {};

            // point 2
            currentTimestamp1 = cloneDeep(currentTimestamp);
            point_2 = {
                'timestamp': new Date(currentTimestamp1.setMinutes(currentTimestamp1.getMinutes() - p2Time)),
                'status': statusDecline ? prev_data['status'] - 0.05 : prev_data['status'] + 0.05
            };

            // point 5
            currentTimestamp1 = cloneDeep(currentTimestamp);
            point_5 = {
                'timestamp': new Date(currentTimestamp1.setMinutes(currentTimestamp1.getMinutes() + p5Time)),
                'status': statusDecline ? current_status + 0.05 : current_status - 0.05
            };

            // point 3
            point_3 = {
                'timestamp': currentTimestamp,
                'status': statusDecline ? prev_data['status'] - 0.2 : prev_data['status'] + 0.2
            };

            // point 4
            point_4 = {
                'timestamp': currentTimestamp,
                'status': statusDecline ? current_status + 0.2 : current_status - 0.2
            };

            returnData.push(point_1, point_2, point_3, point_4, point_5, point_6);
        }

        returnData.push(last_data);
        return returnData;
    }

    // filter line graph
    toggleFeatureLineGraph(item, datavalue) {
        if (datavalue === true) {
            this.filterDataLineGraph[item] = cloneDeep(this.data_new[item]);
        } else {
            delete this.filterDataLineGraph[item];
        }
        if (Object.keys(this.filterDataLineGraph).length === 0) {
            const cloneObj = cloneDeep(this.data_new);
            this.createLineGraph(cloneObj);
        } else {
            this.createLineGraph(this.filterDataLineGraph);
        }
    }

    // for map
    getlatlong(data: NgForm) {
        this.googleapiService
            .get_lat_long(data.value['address'])
            .subscribe(response => {
            });
    }

}
