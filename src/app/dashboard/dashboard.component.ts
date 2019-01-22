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
    donutChart: {string: Array<{'status': string, 'value': number}>};
    doughnutFilterData: Array<{'status': string, 'value': number, 'color': string}>;

    lineChartData: {string: Array<{
        'name': string,
        'data': Array<{
            'status': number,
            'timestamp': string
        }>
    }>};

    industryTypes: Array<string>;
    deviceLocations: Array<{
        'id': number,
        'name': string,
        'latitude': number,
        'longitude': number
    }>;

    lat: number;
    long: number;

    // lineData = {
    //     'industry': [{
    //         'name': 'device4',
    //         'data': [
    //             {
    //                 'timestamp': '11:00:00 ',
    //                 'status': 5
    //             },
    //             {
    //                 'timestamp': '12:00:00 ',
    //                 'status': 1
    //             },
    //             {
    //                 'timestamp': '13:00:00 ',
    //                 'status': 4
    //             },
    //             {
    //                 'timestamp': '14:00:00 ',
    //                 'status': 2
    //             },
    //             {
    //                 'timestamp': '15:00:00 ',
    //                 'status': 1
    //             },
    //             {
    //                 'timestamp': '16:00:00 ',
    //                 'status': 3
    //             },
    //             {
    //                 'timestamp': '17:00:00 ',
    //                 'status': 2
    //             },
    //             {
    //                 'timestamp': '18:00:00 ',
    //                 'status': 4
    //             },
    //             {
    //                 'timestamp': '19:50:00 ',
    //                 'status': 4
    //             }
    //         ]
    //     }]
    // };

    filterData = {};
    doughnutFilterDataToggle = cloneDeep(this.doughnutFilterData);

    nowDateTime = new Date();

    filteredData: object;
    // filteredDataToggle: object;
    private noOfDevices = 0;

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
            this.lat = response['data']['device_location'][0]['latitude'];
            this.long = response['data']['device_location'][0]['longitude'];

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

            const cloneLineData = cloneDeep(this.lineChartData);
            this.createLineGraph(cloneLineData);
        });

    }

    // ngAfterViewInit() {
    //     const cloneLineData = cloneDeep(this.lineData);
    //     this.createLineGraph(cloneLineData);
    // }

    countNoOfDevice(data) {
        this.noOfDevices = 0;
        for (const key_device in data) {
            if (data[key_device]) {
                this.noOfDevices = this.noOfDevices + data[key_device].value;
            }
        }
    }

    sumDonutChart(data) {
        for (const key in data) {
            if (data[key]) {
                for (const key_device in data[key]) {
                    if (data[key][key_device]) {
                        this.doughnutFilterData[key_device].value =
                            this.doughnutFilterData[key_device].value +
                            data[key][key_device].value;
                    }
                }
            }
        }
        this.countNoOfDevice(this.doughnutFilterData);
    }

    createLineGraph(data) {
        d3.select('#line_chart svg').remove();
        const margin = {top: 0, right: 20, bottom: 30, left: 20};
        const width = 650 - margin.left - margin.right;
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
        }

        for (const indexIndustry in this.filteredData) {
            if (this.filteredData[indexIndustry]) {

                const deviceData = this.filteredData[indexIndustry];
                for (const index in deviceData) {
                    if (deviceData[index]) {

                        const deviceStatusData = deviceData[index].data;
                        if (deviceStatusData) {

                            // change data
                            const lineGraphData: Array<any> = this.manipulateGraphData(
                                deviceStatusData
                            );

                            // format the data
                            lineGraphData.forEach(function (d) {
                                d['timestamp'] = d['timestamp'];
                                d['status_1'] = d['status'] - 0.5;
                            });

                            // set the colour scale
                            const color = d3.scaleOrdinal(d3.schemeCategory10);
                            // Scale the range of the data
                            x.domain(
                                d3.extent<any, any>(deviceStatusData, function (d) {
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
                                        .tickFormat(d3.timeFormat('%H %p'))
                                );

                            // draw line on tick
                            d3.selectAll('g.tick')
                            // only ticks that returned true for the filter will be included
                            // in the rest of the method calls:
                                .select('line') // grab the tick line
                                .attr('class', 'quadrantBorder') // style with a custom class and CSS
                                .style('stroke-width', 0.2) // or style directly with attributes or inline styles
                                .style('stroke', '#dcdcdc');

                            // Add the paths with different curves.

                            // if (lineGraphData.length === 2) {
                            //     svg.append('line')
                            //         .style('stroke-width', '1.5')
                            //         .style('fill', function (d) {
                            //             return 'rgba(0, 0, 0, 0)';
                            //         })
                            //         .on('mouseover', function (d) {
                            //             div
                            //                 .transition()
                            //                 .duration(200)
                            //                 .style('opacity', 0.9);
                            //             div
                            //                 .html(deviceData[index].name)
                            //                 .style('left', d3.event.pageX + 'px')
                            //                 .style('top', d3.event.pageY - 28 + 'px');

                            //             d3.select(this)
                            //                 .style('stroke-width', '3.5');
                            //         })
                            //         .on('mouseout', function (d) {
                            //             div
                            //                 .transition()
                            //                 .duration(50)
                            //                 .style('opacity', 0);

                            //             d3.select(this)
                            //                 .style('stroke-width', '1.5');
                            //         })
                            //         .style('stroke', function () {
                            //             // Add the colour
                            //             return line_color;
                            //         })
                            //         .attr('x1', lineGraphData[0].timestamp)
                            //         .attr('y1', lineGraphData[0].status_1)
                            //         .attr('x2', lineGraphData[1].timestamp)
                            //         .attr('y2', lineGraphData[1].status_1);
                            // } else {
                            //     svg
                            //         .append('path')
                            //         .datum(lineGraphData)
                            //         .attr('class', 'line')
                            //         .style('stroke-width', '1.5')
                            //         .style('fill', function (d) {
                            //             return 'rgba(0, 0, 0, 0)';
                            //         })
                            //         .on('mouseover', function (d) {
                            //             div
                            //                 .transition()
                            //                 .duration(200)
                            //                 .style('opacity', 0.9);
                            //             div
                            //                 .html(deviceData[index].name)
                            //                 .style('left', d3.event.pageX + 'px')
                            //                 .style('top', d3.event.pageY - 28 + 'px');

                            //             d3.select(this)
                            //                 .style('stroke-width', '3.5');
                            //         })
                            //         .on('mouseout', function (d) {
                            //             div
                            //                 .transition()
                            //                 .duration(50)
                            //                 .style('opacity', 0);

                            //             d3.select(this)
                            //                 .style('stroke-width', '1.5');
                            //         })
                            //         .style('stroke', function () {
                            //             // Add the colour
                            //             return line_color;
                            //         })
                            //         .attr(
                            //             'd',
                            //             d3
                            //                 .line<any>()
                            //                 .curve(d3.curveLinear)
                            //                 .x(function (d) {
                            //                     return x(d['timestamp']);
                            //                 })
                            //                 .y(function (d) {
                            //                     return y(d['status_1']);
                            //                 })
                            //         );
                            // }


                        }
                    }
                }
            }
        }
    }

    // change line_graph data
    manipulateGraphData(data) {

        // const parseTime = d3.timeParse('%H:%M:%S');
        const returnData = [];
        const dataLength = data.length;

        const firstData = data[0];
        firstData['timestamp'] = new Date(firstData['timestamp']);

        returnData.push(firstData);

        for (let i = 1; i < dataLength - 1; i++) {
            const prev_data = data[i - 1];
            const current_timestamp = new Date(data[i]['timestamp']);
            const current_status = data[i]['status'];

            // point 1
            let current_timestamp1 = cloneDeep(current_timestamp);
            const point_1 = {
                'timestamp': new Date(current_timestamp1.setMinutes(current_timestamp1.getMinutes() - 4)),
                'status': prev_data['status']
            };

            // point 6
            current_timestamp1 = cloneDeep(current_timestamp);
            const point_6 = {
                'timestamp': new Date(current_timestamp1.setMinutes(current_timestamp1.getMinutes() + 4)),
                'status': current_status
            };

            let point_2, point_3, point_4, point_5 = {};

            if (prev_data['status'] > current_status) {
                // point 2
                current_timestamp1 = cloneDeep(current_timestamp);
                point_2 = {
                    'timestamp': new Date(current_timestamp1.setMinutes(current_timestamp1.getMinutes() - 2)),
                    'status': prev_data['status'] - 0.05
                };

                // point 5
                current_timestamp1 = cloneDeep(current_timestamp);
                point_5 = {
                    'timestamp': new Date(current_timestamp1.setMinutes(current_timestamp1.getMinutes() + 2)),
                    'status': current_status + 0.05
                };

                // point 3
                point_3 = {
                    'timestamp': current_timestamp,
                    'status': prev_data['status'] - 0.2
                };

                // point 4
                point_4 = {
                    'timestamp': current_timestamp,
                    'status': current_status + 0.2
                };

            } else {
                // point 2
                current_timestamp1 = cloneDeep(current_timestamp);
                point_2 = {
                    'timestamp': new Date(current_timestamp1.setMinutes(current_timestamp1.getMinutes() - 2)),
                    'status': prev_data['status'] + 0.05
                };

                // point 5
                current_timestamp1 = cloneDeep(current_timestamp);
                point_5 = {
                    'timestamp': new Date(current_timestamp1.setMinutes(current_timestamp1.getMinutes() + 2)),
                    'status': current_status - 0.05
                };

                // point 3
                point_3 = {
                    'timestamp': current_timestamp,
                    'status': prev_data['status'] + 0.2
                };

                // point 4
                point_4 = {
                    'timestamp': current_timestamp,
                    'status': current_status - 0.2
                };
            }

            returnData.push(point_1, point_2, point_3, point_4, point_5, point_6);
        }

        if (dataLength > 1) {
            const lastData = data[dataLength - 1];
            lastData['timestamp'] = new Date(lastData['timestamp']);
            returnData.push(lastData);
            returnData.push({
                'timestamp': this.nowDateTime,
                'status': lastData['status']
            });
        } else {
            returnData.push({
                'timestamp': this.nowDateTime,
                'status': firstData['status']
            });
        }

        console.log(returnData, '*** Fuck ***');

        return returnData;
    }

    // Filter doughnut chart
    // toggleFeatureDoughnut(item, datavalue) {
    //     const ctx = document.getElementById('doughnut_chart');
    //     if (datavalue === true) {
    //         for (const key in this.donutChart[item]) {
    //             if (this.donutChart[item][key]) {
    //                 this.doughnutFilterDataToggle[key].value =
    //                     this.doughnutFilterDataToggle[key].value +
    //                     this.donutChart[item][key].value;
    //             }
    //         }
    //     } else {
    //         for (const key in this.donutChart[item]) {
    //             if (this.donutChart[item][key]) {
    //                 this.doughnutFilterDataToggle[key].value =
    //                     this.doughnutFilterDataToggle[key].value -
    //                     this.donutChart[item][key].value;
    //             }
    //         }
    //     }

    //     this.countNoOfDevice(this.doughnutFilterDataToggle);
    //     this.createDoughnutChart(ctx, this.doughnutFilterDataToggle);
    // }

    // filter line graph
    // toggleFeature(item, datavalue) {
    //     if (datavalue === true) {
    //         this.filterData[item] = cloneDeep(this.data_new[item]);
    //     } else {
    //         delete this.filterData[item];
    //     }
    //     if (Object.keys(this.filterData).length === 0) {
    //         const cloneObj = cloneDeep(this.data_new);
    //         this.createLineGraph(cloneObj);
    //     } else {
    //         this.createLineGraph(this.filterData);
    //     }
    // }

    // for map
    getlatlong(data: NgForm) {
        this.googleapiService
            .get_lat_long(data.value['address'])
            .subscribe(response => {
            });
    }

    // doughnut chart
    createDoughnutChart(node, data) {
        d3.select('#doughnut_chart svg').remove();
        const width = 180;
        const height = 180;
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
}
