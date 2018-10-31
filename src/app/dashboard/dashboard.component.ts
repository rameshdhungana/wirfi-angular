import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleApiService } from '../_services/google-api.service';
import {DashboardService} from '../_services/dashboard.service';
import * as d3 from 'd3';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  donut_chart: Array<any>;

  doughnut_filter_data = [
    {
      'status': 'ONLINE',
      'value': 0
    },
    {
      'status': 'CELL',
      'value': 0
    },
    {
      'status': 'AUTO RECOVER',
      'value': 0
    },
    {
      'status': 'WEAK SIGNAL',
      'value': 0
    },
    {
      'status': 'OFFLINE',
      'value': 0
    },
    {
      'status': 'ASLEEP',
      'value': 0
    }
  ];
  doughnut_filter_data_toggle = [
    {
      'status': 'ONLINE',
      'value': 0
    },
    {
      'status': 'CELL',
      'value': 0
    },
    {
      'status': 'AUTO RECOVER',
      'value': 0
    },
    {
      'status': 'WEAK SIGNAL',
      'value': 0
    },
    {
      'status': 'OFFLINE',
      'value': 0
    },
    {
      'status': 'ASLEEP',
      'value': 0
    }
  ];
  industry_types_line_graph = [];
  industry_types_doughnut_graph = [];
  filter_data = {};

  value_of_checkbox = [];

  data_new =  {
  //   'type1': [{
  //     'device_name': 'device1',
  //     'address': 'address',
  //     'data':  [
  //           {
  //             'date': '01:00:00',
  //             'status': 1
  //           },
  //           {
  //             'date': '02:00:00',
  //             'status': 2
  //           },
  //           {
  //             'date': '03:00:00',
  //             'status': 3
  //           },
  //           {
  //             'date': '04:00:00',
  //             'status': 4
  //           },
  //           {
  //             'date': '05:00:00',
  //             'status': 5
  //           },
  //           {
  //             'date': '06:00:00',
  //             'status': 6
  //           },
  //           {
  //             'date': '07:00:00',
  //             'status': 4
  //           },
  //           {
  //             'date': '08:00:00',
  //             'status': 4
  //           },
  //           {
  //             'date': '09:00:00',
  //             'status': 4
  //           }
  //         ]
  //  },
  //   {
  //     'device_name': 'device2',
  //     'address': 'address',
  //     'data':  [
  //           {
  //             'date': '01:00:00',
  //             'status': 1
  //           },
  //           {
  //             'date': '02:00:00',
  //             'status': 1
  //           },
  //           {
  //             'date': '03:00:00',
  //             'status': 3
  //           },
  //           {
  //             'date': '04:00:00',
  //             'status': 3
  //           },
  //           {
  //             'date': '05:00:00',
  //             'status': 2
  //           },
  //           {
  //             'date': '06:00:00',
  //             'status': 4
  //           },
  //           {
  //             'date': '07:00:00',
  //             'status': 6
  //           },
  //           {
  //             'date': '08:00:00',
  //             'status': 4
  //           },
  //           {
  //             'date': '09:00:00',
  //             'status': 4
  //           }
  //         ]
  //  }],
  'type2': [
  //    {
  //     'device_name': 'device3',
  //     'address': 'address',
  //     'data':  [
  //           {
  //             'date': '01:00:00',
  //             'status': 1
  //           },
  //           {
  //             'date': '02:00:00',
  //             'status': 2
  //           },
  //           {
  //             'date': '03:00:00',
  //             'status': 3
  //           },
  //           {
  //             'date': '04:00:00',
  //             'status': 5
  //           },
  //           {
  //             'date': '05:00:00',
  //             'status': 3
  //           },
  //           {
  //             'date': '06:00:00',
  //             'status': 6
  //           },
  //           {
  //             'date': '07:00:00',
  //             'status': 2
  //           },
  //           {
  //             'date': '08:00:00',
  //             'status': 4
  //           },
  //           {
  //             'date': '09:00:00',
  //             'status': 4
  //           }
  //         ]
  //  },
      {
        'device_name': 'device4',
        'address': 'address',
        'data':  [
          {
              'date': '01:00:00',
              'status': 5
          },
          {
              'date': '01:55:00',
              'status': 5
          },
          {
              'date': '01:57:30',
              'status': 4.95
          },
          {
              'date': '02:00:00',
              'status': 4.8
          },
          {
              'date': '02:00:00',
              'status': 1.2
          },
          {
              'date': '02:02:30',
              'status': 1.05
          },
          {
              'date': '02:05:00',
              'status': 1
          },
          {
              'date': '02:10:00',
              'status': 1
          },
          {
              'date': '02:12:30',
              'status': 1.05
          },
          {
            'date': '02:15:00',
            'status': 1.2
          },
          {
            'date': '02:15:00',
            'status': 1.8
          },
          {
            'date': '02:17:30',
            'status': 1.95
          },
          {
              'date': '02:20:00',
              'status': 2
          },
          {
              'date': '02:25:00',
              'status': 2
          },
          {
            'date': '02:27:30',
            'status': 1.95
          },
          {
              'date': '02:30:00',
              'status': 1.8
          },
          {
              'date': '02:30:00',
              'status': 1.2
          },
          {
              'date': '02:32:30',
              'status': 1.05
          },
          {
              'date': '02:35:00',
              'status': 1
          },
          {
              'date': '02:55:00',
              'status': 1
          },
          {
              'date': '02:57:30',
              'status': 1.05
          },
          {
              'date': '03:00:00',
              'status': 1.2
          },
          {
              'date': '03:00:00',
              'status': 3.8
          },
          {
              'date': '03:02:30',
              'status': 3.95
          },
          {
              'date': '03:05:00',
              'status': 4
          },
          {
              'date': '03:55:00',
              'status': 4
          },
          {
              'date': '03:57:30',
              'status': 3.95
          },
          {
              'date': '04:00:00',
              'status': 3.8
          },
          {
              'date': '04:00:00',
              'status': 2.2
          },
          {
              'date': '04:02:30',
              'status': 2.05
          },
          {
              'date': '04:05:00',
              'status': 2
          },
          {
              'date': '09:05:00',
              'status': 2
          }
        ]
      }
    ]
  };


  filtered_data: object;
  filtered_data_toggle: object;
  private no_of_devices = 0;
  // private stepRoundBefore: any;
  // private stepRoundAfter: any;

  constructor(
    private googleapiService: GoogleApiService,
    private dashboardservice: DashboardService
  ) {

      // function Step(context, t) {
      //   this._context = context;
      //   this._t = t;
      // }

      // Step.prototype = {
      //     areaStart: function() {
      //         this._line = 0;
      //     },
      //     areaEnd: function() {
      //         this._line = NaN;
      //     },
      //     lineStart: function() {
      //         this._x = this._y = NaN;
      //         this._point = 0;
      //     },
      //     lineEnd: function() {
      //         if (0 < this._t && this._t < 1 && this._point % 2 === 0) {
      //         this._context.lineTo(this._x, this._y);
      //         }

      //         if (this._line || (this._line !== 0 && this._point % 2 === 1)) {
      //         this._context.lineTo(this._x, this._y);
      //         }
      //         if (this._line >= 0) {
      //         this._t = 1 - this._t, this._line = 1 - this._line;
      //         }
      //     },

      //     point: function(x, y) {
      //         x = +x, y = +y;
      //         switch (this._point) {
      //         case 0:
      //             this._point = 1;
      //             this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
      //             break;
      //         case 1:
      //             this._point = 2; // proceed
      //             break;
      //         default:
      //             {
      //                 let xN, yN, mYb, mYa;
      //                 if (this._t <= 0) {
      //                     xN = Math.abs(x - this._x) * 0.25;
      //                     yN = Math.abs(y - this._y) * 0.25;
      //                     mYb = (this._y < y) ? this._y + yN : this._y - yN;
      //                     mYa = (this._y > y) ? y + yN : y - yN;

      //                     this._context.quadraticCurveTo(this._x, this._y, this._x, mYb);
      //                     this._context.lineTo(this._x, mYa);
      //                     this._context.quadraticCurveTo(this._x, y, this._x + xN, y);
      //                     this._context.lineTo(x - xN, y);

      //                 } else {
      //                     const x1 = this._x * (1 - this._t) + x * this._t;

      //                     xN = Math.abs(x - x1) * 0.25;
      //                     yN = Math.abs(y - this._y) * 0.25;
      //                     mYb = (this._y < y) ? this._y + yN : this._y - yN;
      //                     mYa = (this._y > y) ? y + yN : y - yN;
      //                     console.log(this._point);
      //                     this._context.quadraticCurveTo(x1, this._y, x1, mYb);
      //                     this._context.lineTo(x1, mYa);
      //                     this._context.quadraticCurveTo(x1, y, x1 + xN, y );
      //                     this._context.lineTo(x - xN, y);
      //                 }
      //                 break;
      //             }
      //         }
      //         this._x = x, this._y = y;
      //     }
      // };

      // this.stepRoundBefore = function(context) {
      //   return new Step(context, 0);
      // };

      // this.stepRoundAfter = function(context) {
      //     return new Step(context, 1);
      // };
  }

  ngOnInit() {
    this.dashboardservice.getDashboard().subscribe(
      response => {
        this.donut_chart = response['data']['donut_chart'];
        const ctx = document.getElementById('doughnut_chart');
        for (const key in response['data']['industry_type']) {
          if (response['data']['industry_type'][key]) {
            this.industry_types_doughnut_graph.push( response['data']['industry_type'][key]);
          }
        }
        this.sumDonutChart( this.donut_chart);
        this.createDoughnutChart(ctx, this.doughnut_filter_data);
      }
    );
  }

  ngAfterViewInit() {
    for (const industry_type in this.data_new) {
      if (this.data_new[industry_type]) {
        this.industry_types_line_graph.push(industry_type);
      }
    }
    const cloneobj = cloneDeep(this.data_new);
    this.createLineGraph(cloneobj);
  }

  noOfDevice(data) {
    this.no_of_devices = 0;
      for (const key_device in data) {
        if (data[key_device]) {
          this.no_of_devices = this.no_of_devices + data[key_device].value;
        }
      }
  }

  sumDonutChart(data) {
    this.filtered_data = {};
    for (const key in data) {
      if (data[key]) {
        for (const key_device in data[key]) {
          if (data[key][key_device]) {
            this.doughnut_filter_data[key_device].value = this.doughnut_filter_data[key_device].value + data[key][key_device].value;
          }
        }
      }
    }
    this.noOfDevice(this.doughnut_filter_data);
  }

  createLineGraph(data) {
    d3.select('#line_chart svg').remove();
    const margin = { top: 20, right: 150, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 302 - margin.top - margin.bottom;
    const status_colors = ['#3b7c36', '#3c4d84', '#b7c418', '#b48421', '#b10015', '#83858c'];
    this.filtered_data = data;
    
    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Define the div for the tooltip
    const div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

    // parse the date / time
     const parseTime = d3.timeParse('%H:%M:%S');

    // array of curve functions and tites
    const daCurve = { 'd3Curve': d3.curveStepAfter, 'curveTitle': 'curveStepAfter' };
    const line_color = 'white';

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('#line_chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
    for (const index in status_colors) {
      if (status_colors[index]) {
        svg.append('rect')
            .attr('width', width)
            .attr('height', (height / 6))
            .attr('transform', 'translate(0,' + (height / 6 * Number(index)) + ')')
            .attr('fill', status_colors[index])
            .attr('stop-opacity', 0);
      }
    }


    for (const index in status_colors) {
      if (status_colors[index]) {
        const gradient = svg.append('defs')
                          .append('linearGradient')
                          .attr('id', 'gradient')
                          .attr('x1', '0%')
                          .attr('y1', '50%')
                          .attr('x2', '100%')
                          .attr('y2', '50%')
                          .attr('spreadMethod', 'pad');

        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', '#000')
          .attr('stop-opacity', .55);

        gradient.append('stop')
          .attr('offset', '87%')
          .attr('stop-color', '#000')
          .attr('stop-opacity', .55);

        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', '#fff')
          .attr('stop-opacity', 0);

        svg.append('rect')
          .attr('width', width)
          .attr('height', (height / 6))
          .attr('transform', 'translate(' + 0  + ',' + (height / 6 * Number(index)) + ')')
          .attr('fill', 'url(#gradient)');
      }
    }

    for (const index_industry in this.filtered_data) {
      if (this.filtered_data[index_industry]) {
        const device_data = this.filtered_data[index_industry];
        for (const index in device_data) {
          if (device_data[index]) {
            const device_status_data = device_data[index].data;
            if (device_status_data) {
              // format the data
              device_status_data.forEach(function (d) {
                d['date'] = (parseTime(d['date']));
                d['status_1'] = d['status'] - 0.5;
              });

              // set the colour scale
              const color = d3.scaleOrdinal(d3.schemeCategory10);
              // Scale the range of the data
              x.domain(d3.extent<any, any>(device_status_data, function (d) { return ( d['date']); }));
              y.domain([0, 6]);

              // Add the X Axis
              svg.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x)
                .tickSize(-(height))
                .tickFormat(d3.timeFormat('%H:%M')));

              // draw line on tick
              d3.selectAll('g.tick')
              // only ticks that returned true for the filter will be included
              // in the rest of the method calls:
                .select('line') // grab the tick line
                .attr('class', 'quadrantBorder') // style with a custom class and CSS
                .style('stroke-width', 0.5) // or style directly with attributes or inline styles
                .style('stroke', '#dcdcdc');
                // .style('color', '#595a69');

              // Add the paths with different curves.
              svg.append('path')
                .datum(device_status_data)
                .attr('class', 'line')
                .style('stroke-width', '3')
                .style('fill', function(d) { return 'rgba(0, 0, 0, 0)'; })
                .on('mouseover', function(d) {
                  div.transition()
                      .duration(200)
                      .style('opacity', .9);
                  div	.html(device_data[index].device_name)
                      .style('left', (d3.event.pageX) + 'px')
                      .style('top', (d3.event.pageY - 28) + 'px');
                  })
                .on('mouseout', function(d) {
                  div.transition()
                      .duration(500)
                      .style('opacity', 0);
                })
                .style('stroke', function () { // Add the colour
                  return daCurve['color'] = line_color;
                })
                .attr('d', d3.line<any>()
                  // .curve(this.stepRoundAfter)
                  .curve(d3.curveLinear)
                  .x(function (d) {
                      return x((d['date']));
                    })
                  .y(function (d) { return y(d['status_1']); })
                );

            }
          }

        }
      }

    }
  }

  toggleFeatureDoughnut(item, datavalue) {
    const ctx = document.getElementById('doughnut_chart');
    if (datavalue === true) {
      for (const key in this.donut_chart[item]) {
        if (this.donut_chart[item][key]) {
          this.doughnut_filter_data_toggle[key].value = this.doughnut_filter_data_toggle[key].value + this.donut_chart[item][key].value;
        }
      }

    } else {
      for (const key in this.donut_chart[item]) {
        if (this.donut_chart[item][key]) {
          this.doughnut_filter_data_toggle[key].value = this.doughnut_filter_data_toggle[key].value - this.donut_chart[item][key].value;
        }
      }
    }

    this.noOfDevice(this.doughnut_filter_data_toggle);
    this.createDoughnutChart(ctx, this.doughnut_filter_data_toggle);
  }

  toggleFeature(item, datavalue) {
    if (datavalue === true) {
      this.filter_data[item] = cloneDeep(this.data_new[item]);
    } else {
      delete this.filter_data[item];
    }
    if (Object.keys(this.filter_data).length === 0 ) {
      const cloneObj = cloneDeep(this.data_new);
      this.createLineGraph(cloneObj);
    } else {
      this.createLineGraph(this.filter_data);
    }
  }

  // for map
  getlatlong(data: NgForm) {
    this.googleapiService.get_lat_long(data.value['address']).subscribe(response => {
    });
  }

  // doughnut chart
  createDoughnutChart(node, data) {
    d3.select('#doughnut_chart svg').remove();
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal()
                  .range(['#4aec26', '#5576e4', '#f0fc00', '#faac00', '#dd0000', 'gray']);

    const arc = d3.arc<any>()
                .outerRadius(radius - 10)
                .innerRadius(radius - 15);

    const pie = d3.pie<any>()
                .padAngle(.03)
                .sort(null)
                .value(function (d) {
                   return d.value;
                 });

    const canvas = d3.select(node)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    const group = canvas.append('g')
                      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const arcs = group.selectAll<any, any>('.arc')
                    .data(pie(data))
                    .enter()
                      .append('g')
                      .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', function(d: any): any {
          return color(d.data.status);
        });
    canvas.append('text')
        .attr('transform', function(d) { return 'translate(' + (width / 2 - 15) + ',' + height / 2 + ')'; })
        .attr('fill', 'white')
        .text(this.no_of_devices)
        .style('font-size', '35px')
        .style('font-weight', 'bold');

    canvas.append('text')
        .attr('transform', function(d) { return 'translate(' + (width / 2 - 38) + ',' + (height / 2 + 40) + ')'; })
        .attr('fill', 'gray')
        .text('DEVICES')
        .style('font-size', '18px');
  }

}
